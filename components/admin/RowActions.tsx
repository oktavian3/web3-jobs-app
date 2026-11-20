"use client";

import { useRef } from "react";
import { Eye, EyeOff, Trash2 } from "lucide-react";
import { deleteJobAction, togglePublishAction } from "@/app/admin/actions";

export default function RowActions({ id, title, published }: { id: string; title: string; published: boolean }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  return (
    <>
      <form action={togglePublishAction}>
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="publish" value={String(!published)} />
        <button type="submit" className="icon-button" aria-label={published ? `Unpublish ${title}` : `Publish ${title}`} title={published ? "Unpublish" : "Publish"}>
          {published ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
        </button>
      </form>
      <button type="button" className="icon-button hover:!border-red-200 hover:!text-red-700" aria-label={`Delete ${title}`} title="Delete" onClick={() => dialogRef.current?.showModal()}>
        <Trash2 className="h-4 w-4" aria-hidden="true" />
      </button>
      <dialog ref={dialogRef} aria-labelledby={`del-${id}`} className="m-auto w-[min(92vw,420px)] rounded-[20px] border border-border bg-surface p-0 shadow-lift backdrop:bg-ink/40">
        <form action={deleteJobAction} className="p-6">
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="confirm" value="delete" />
          <h2 id={`del-${id}`} className="text-[19px] font-medium tracking-[-0.02em]">Delete this job?</h2>
          <p className="mt-2 text-[14px] leading-[1.6] text-muted">
            “{title}” will be removed from the dashboard and from /jobs. This cannot be undone. To hide it temporarily, unpublish it instead.
          </p>
          <div className="mt-6 flex justify-end gap-2">
            <button type="button" className="btn-secondary !h-10" onClick={() => dialogRef.current?.close()} autoFocus>
              Cancel
            </button>
            <button type="submit" className="btn-ink !h-10 !bg-red-700 hover:!bg-red-800">
              Delete job
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
