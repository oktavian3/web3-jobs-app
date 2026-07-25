import { notFound } from "next/navigation";

// /posts is intentionally hidden from the public product for this release
// (approved decision, Phase 1). The Supabase `job_updates` table, admin routes,
// admin authentication, and admin APIs are preserved so editorial posts can
// return later. Public access returns a normal not-found state.
export default function PostsPage() {
  notFound();
}
