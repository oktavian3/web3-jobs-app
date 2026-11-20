"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";

export default function CopyLinkButton() {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(window.location.href);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        } catch {
          /* clipboard blocked: no-op */
        }
      }}
      className="btn-secondary !h-10 w-full !rounded-[12px] !text-[13.5px]"
    >
      {copied ? <Check className="h-4 w-4 text-blue" aria-hidden="true" /> : <Link2 className="h-4 w-4" aria-hidden="true" />}
      <span aria-live="polite">{copied ? "Copied" : "Copy link"}</span>
    </button>
  );
}
