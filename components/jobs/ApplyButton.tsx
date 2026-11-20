"use client";

import { useState } from "react";
import { Drawer } from "vaul";
import { ArrowUpRight, Check, ShieldCheck } from "lucide-react";
import { safety } from "@/lib/jobs/content";

function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/** Apply interstitial: one sheet that repeats the domain check, then hands
 *  off to the employer's page. Without JS the link still works directly. */
export default function ApplyButton({ applyUrl, company }: { applyUrl: string; company: string }) {
  const [open, setOpen] = useState(false);
  const host = hostOf(applyUrl);

  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <a
        href={applyUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
          e.preventDefault();
          setOpen(true);
        }}
        aria-haspopup="dialog"
        className="btn-primary mt-6 !h-12 w-full !rounded-[14px] !text-[15px]"
      >
        Apply on official site <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">(opens external site)</span>
      </a>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[60] bg-ink/40" />
        <Drawer.Content
          aria-describedby="apply-sheet-desc"
          className="fixed inset-x-0 bottom-0 z-[61] mx-auto flex w-full max-w-[560px] flex-col rounded-t-[24px] border border-border bg-surface outline-none"
        >
          <div className="mx-auto mt-2.5 h-1.5 w-10 shrink-0 rounded-full bg-border-strong" aria-hidden="true" />
          <div className="px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-5">
            <div className="flex items-center gap-2 text-blue-deep">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              <Drawer.Title className="eyebrow !text-blue-deep">Before you apply</Drawer.Title>
            </div>
            <p id="apply-sheet-desc" className="mt-4 text-[15px] leading-[1.55] text-ink">
              {company} · <span className="rounded-md bg-soft px-1.5 py-0.5 font-mono text-[13px]">{host}</span>
            </p>
            <ul className="mt-4 space-y-2.5 text-[14px] leading-[1.5] text-ink">
              {safety.map((s) => (
                <li key={s} className="flex gap-2.5">
                  <Check className="mt-[3px] h-3.5 w-3.5 shrink-0 text-blue" aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row">
              <Drawer.Close className="btn-secondary !h-12 flex-1 !rounded-[14px]">Cancel</Drawer.Close>
              <a
                href={applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="btn-primary !h-12 flex-[1.4] !rounded-[14px]"
              >
                Apply on official site <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">(opens external site)</span>
              </a>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
