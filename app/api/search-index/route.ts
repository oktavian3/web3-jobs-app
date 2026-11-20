import { NextResponse } from "next/server";
import { roles } from "@/data/roles";
import { glossaryTerms } from "@/data/glossary";
import { getPublicJobs } from "@/lib/jobs/repository";

export const revalidate = 300;

/** Small index for the ⌘K site search, fetched only when the dialog opens. */
export async function GET() {
  const jobs = await getPublicJobs();
  const items = [
    ...jobs.map((j) => ({ type: "Job", title: j.title, sub: j.company, href: `/jobs/${j.id}` })),
    ...roles.map((r) => ({ type: "Role", title: r.title, sub: r.lane, href: `/roles/${r.slug}` })),
    ...glossaryTerms.map((g) => ({ type: "Term", title: g.term, sub: g.category, href: `/glossary/${g.slug}` })),
  ];
  return NextResponse.json(items, { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } });
}
