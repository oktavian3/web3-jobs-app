import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import JobForm from "@/components/admin/JobForm";
import { getAdminUser, getSupabaseServer } from "@/lib/supabase-auth/server";
import { roles } from "@/data/roles";
import type { JobRecord } from "@/lib/jobs/schema";

export const metadata: Metadata = { title: "Edit job" };
export const dynamic = "force-dynamic";

export default async function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");
  const { id } = await params;
  const supabase = (await getSupabaseServer())!;
  const { data } = await supabase.from("jobs").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  return (
    <AdminShell email={user.email ?? ""}>
      <JobForm job={data as JobRecord} roles={roles.map((r) => ({ slug: r.slug, title: r.title, lane: r.lane }))} />
    </AdminShell>
  );
}
