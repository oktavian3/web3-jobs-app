"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAdminUser, getSupabaseServer, isAllowedAdmin } from "@/lib/supabase-auth/server";
import { jobInputSchema } from "@/lib/jobs/schema";

export type ActionState = { ok: boolean; message?: string; fieldErrors?: Record<string, string[]> };

export async function signInAction(_: ActionState, formData: FormData): Promise<ActionState> {
  const supabase = await getSupabaseServer();
  if (!supabase) return { ok: false, message: "Supabase is not configured on this deployment." };
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { ok: false, message: "Enter your email and password." };
  if (!isAllowedAdmin(email)) return { ok: false, message: "This email is not on the admin allowlist." };
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { ok: false, message: "Email or password is incorrect." };
  redirect("/admin");
}

export async function signOutAction() {
  const supabase = await getSupabaseServer();
  await supabase?.auth.signOut();
  redirect("/admin/login");
}

async function requireAdmin() {
  const user = await getAdminUser();
  const supabase = await getSupabaseServer();
  if (!user || !supabase) throw new Error("Unauthorized");
  return supabase;
}

function parseForm(formData: FormData) {
  const tags = String(formData.get("tags") ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  return jobInputSchema.safeParse({
    title: formData.get("title"),
    company: formData.get("company"),
    company_logo_url: formData.get("company_logo_url") ?? "",
    lane: formData.get("lane"),
    work_type: formData.get("work_type"),
    employment_type: formData.get("employment_type") || null,
    location: formData.get("location") ?? "",
    seniority: formData.get("seniority") || "Not specified",
    salary: formData.get("salary") ?? "",
    apply_url: formData.get("apply_url"),
    description: formData.get("description") ?? "",
    role_slug: formData.get("role_slug") ?? "",
    tags,
    is_published: formData.get("is_published") === "on",
    posted_at: formData.get("posted_at"),
  });
}

function revalidatePublic(id?: string) {
  revalidatePath("/jobs");
  revalidatePath("/admin");
  if (id) revalidatePath(`/jobs/${id}`);
}

export async function saveJobAction(_: ActionState, formData: FormData): Promise<ActionState> {
  let supabase;
  try {
    supabase = await requireAdmin();
  } catch {
    return { ok: false, message: "Your session expired. Sign in again." };
  }
  const parsed = parseForm(formData);
  if (!parsed.success) {
    return { ok: false, message: "Check the highlighted fields.", fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }
  const id = String(formData.get("id") ?? "");
  const query = id
    ? supabase.from("jobs").update(parsed.data).eq("id", id).select("id").single()
    : supabase.from("jobs").insert(parsed.data).select("id").single();
  const { data, error } = await query;
  if (error) return { ok: false, message: `Could not save: ${error.message}` };
  revalidatePublic(data.id);
  redirect(`/admin?saved=${data.id}`);
}

export async function togglePublishAction(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id"));
  const publish = formData.get("publish") === "true";
  await supabase.from("jobs").update({ is_published: publish }).eq("id", id);
  revalidatePublic(id);
}

export async function deleteJobAction(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id"));
  if (formData.get("confirm") !== "delete") return;
  await supabase.from("jobs").delete().eq("id", id);
  revalidatePublic(id);
  redirect("/admin?deleted=1");
}
