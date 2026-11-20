import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import JobForm from "@/components/admin/JobForm";
import { getAdminUser } from "@/lib/supabase-auth/server";
import { roles } from "@/data/roles";

export const metadata: Metadata = { title: "Post a job" };
export const dynamic = "force-dynamic";

export default async function NewJobPage() {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");
  return (
    <AdminShell email={user.email ?? ""}>
      <JobForm roles={roles.map((r) => ({ slug: r.slug, title: r.title, lane: r.lane }))} />
    </AdminShell>
  );
}
