"use client";

import { Bookmark } from "lucide-react";
import { useSavedJobs } from "./useSavedJobs";

export default function SaveJobButton({ id, title, variant = "icon" }: { id: string; title: string; variant?: "icon" | "button" }) {
  const { isSaved, toggle } = useSavedJobs();
  const saved = isSaved(id);
  if (variant === "button") {
    return (
      <button type="button" onClick={() => toggle(id)} aria-pressed={saved} className="btn-secondary !h-10 w-full !rounded-[12px] !text-[13.5px]">
        <Bookmark className={`h-4 w-4 ${saved ? "fill-blue text-blue" : ""}`} aria-hidden="true" />
        {saved ? "Saved" : "Save"}
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(id);
      }}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${title} from saved` : `Save ${title}`}
      className="relative z-10 grid h-10 w-10 place-items-center rounded-full text-muted transition-colors hover:bg-soft hover:text-ink"
    >
      <Bookmark className={`h-[18px] w-[18px] ${saved ? "fill-blue text-blue" : ""}`} aria-hidden="true" />
    </button>
  );
}
