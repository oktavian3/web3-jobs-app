"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAdminUser, getSupabaseServer, isAllowedAdmin } from "@/lib/supabase-auth/server";
import { jobInputSchema } from "@/lib/jobs/schema";

export type ActionState = { ok: boolean; message?: string; fieldErrors?: Record<string, string[]> };

function signInErrorMessage(error: { code?: string; status?: number; message: string }) {
  switch (error.code) {
    case "invalid_credentials":
      return "Email or password is incorrect.";
    case "email_not_confirmed":
      return "This user isn't confirmed in Supabase. In Authentication → Users, delete it and add it again with Auto Confirm User ticked.";
    case "user_banned":
      return "This user is banned in Supabase.";
    case "over_request_rate_limit":
    case "over_email_send_rate_limit":
      return "Too many attempts. Wait a minute and try again.";
  }
  if (error.status === 401 || error.status === 403 || /api key/i.test(error.message)) {
    return "Supabase rejected the API key. Check NEXT_PUBLIC_SUPABASE_ANON_KEY (use the anon / publishable key).";
  }
  if (error.status === 404 || !error.status) {
    return "Couldn't reach Supabase auth. Check NEXT_PUBLIC_SUPABASE_URL (it should look like https://xxxx.supabase.co).";
  }
  return `Sign-in failed: ${error.message}`;
}

export async function signInAction(_: ActionState, formData: FormData): Promise<ActionState> {
  const supabase = await getSupabaseServer();
  if (!supabase) return { ok: false, message: "Supabase is not configured on this deployment." };
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { ok: false, message: "Enter your email and password." };
  if (!isAllowedAdmin(email)) return { ok: false, message: "This email is not on the admin allowlist." };
  let error;
  try {
    ({ error } = await supabase.auth.signInWithPassword({ email, password }));
  } catch (e) {
    console.error("[admin] sign-in threw:", e);
    return { ok: false, message: "Couldn't reach Supabase. Check NEXT_PUBLIC_SUPABASE_URL in the Vercel environment variables." };
  }
  if (error) {
    console.error("[admin] sign-in failed:", error.code, error.status, error.message);
    return { ok: false, message: signInErrorMessage(error) };
  }
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
  revalidatePath("/");
  revalidatePath("/jobs");
  revalidatePath("/api/search-index");
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
