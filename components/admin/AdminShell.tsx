import Image from "next/image";
import Link from "next/link";
import { ExternalLink, LogOut } from "lucide-react";
import { signOutAction } from "@/app/admin/actions";

export default function AdminShell({ email, children }: { email: string; children: React.ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-30 border-b border-border bg-canvas/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[60px] w-full max-w-[1200px] items-center gap-4 px-5 sm:px-8">
          <Link href="/admin" className="inline-flex items-center gap-2.5" aria-label="KRAFT admin home">
            <Image src="/kraft%20logo%20trans.png" alt="" width={28} height={28} className="h-7 w-7 object-contain" />
            <span className="text-[16px] font-semibold tracking-[-0.03em]">KRAFT</span>
            <span className="rounded-full bg-ink px-2 py-0.5 font-mono text-[10.5px] uppercase tracking-[0.06em] text-white">Admin</span>
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <Link href="/jobs" target="_blank" className="hidden h-9 items-center gap-1.5 rounded-full px-3 text-[13.5px] text-muted hover:text-ink sm:inline-flex">
              View site <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <span className="hidden max-w-[200px] truncate text-[13px] text-muted md:inline" title={email}>{email}</span>
            <form action={signOutAction}>
              <button type="submit" className="btn-secondary !h-9 !px-3 !text-[13px]">
                <LogOut className="h-4 w-4" aria-hidden="true" /> Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <div id="admin-main" className="mx-auto w-full max-w-[1200px] px-5 py-10 sm:px-8">{children}</div>
    </>
  );
}
