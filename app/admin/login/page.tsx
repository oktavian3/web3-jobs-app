import type { Metadata } from "next";
import Image from "next/image";
import LoginForm from "@/components/admin/LoginForm";
import { supabaseConfigured } from "@/lib/supabase-auth/server";

export const metadata: Metadata = { title: "Sign in" };

const errors: Record<string, string> = {
  "not-allowed": "You are signed in, but this email is not on the admin allowlist.",
  "not-configured": "Admin is not configured yet: set the Supabase env vars and ADMIN_EMAILS.",
};

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  const configured = supabaseConfigured();
  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden px-5 py-16">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="relative w-full max-w-[400px]">
        <div className="flex items-center gap-2.5">
          <Image src="/kraft%20logo%20trans.png" alt="" width={32} height={32} className="h-8 w-8 object-contain" />
          <span className="text-[18px] font-semibold tracking-[-0.03em]">KRAFT</span>
          <span className="rounded-full bg-ink px-2 py-0.5 font-mono text-[10.5px] uppercase tracking-[0.06em] text-white">Admin</span>
        </div>
        <h1 className="mt-8 text-[34px] font-medium leading-[1.05] tracking-[-0.04em]">Sign in to post jobs</h1>
        <p className="mt-2 text-[15px] text-muted">Only allowlisted admin emails can sign in.</p>
        {error && errors[error] ? (
          <p role="alert" className="mt-6 rounded-[12px] border border-amber-200 bg-amber-50 px-4 py-3 text-[14px] text-amber-900">{errors[error]}</p>
        ) : null}
        {!configured && error !== "not-configured" ? (
          <p role="alert" className="mt-6 rounded-[12px] border border-amber-200 bg-amber-50 px-4 py-3 text-[14px] text-amber-900">{errors["not-configured"]}</p>
        ) : null}
        <div className="card-surface mt-6 p-6">
          <LoginForm disabled={!configured} />
        </div>
      </div>
    </div>
  );
}
