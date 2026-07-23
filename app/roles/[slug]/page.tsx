import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getRoleBySlug, roles, type EvidenceTier } from "@/data/roles";
import { getRoleContent } from "@/data/roleContent";
import { getSalaryContext } from "@/data/salaryContext";
import { portfolioProjects } from "@/data/portfolioProjects";
import { Shell, Container, FinalCTA } from "@/components/kraft/Primitives";
import RoleGuide from "@/components/kraft/role/RoleGuide";
import type { RelatedRole } from "@/components/kraft/role/sections";

export function generateStaticParams() {
  return roles.map((role) => ({ slug: role.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const role = getRoleBySlug(slug);
  const content = role ? getRoleContent(role.slug) : undefined;
  return {
    title: role ? `${role.title} | KRAFT Role Guide` : "Role Guide",
    description: content?.summary,
  };
}

const tierRank: Record<EvidenceTier, number> = { Direct: 3, "Broad market": 2, Adjacent: 1, Unverified: 0 };

export default async function RoleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const role = getRoleBySlug(slug);
  if (!role) notFound();

  const content = getRoleContent(role.slug);
  if (!content) notFound();

  const research = getSalaryContext(role);
  const primaryTier: EvidenceTier =
    research.salaryEvidence
      .map((item) => item.canonicalTier)
      .filter((tier): tier is EvidenceTier => Boolean(tier))
      .sort((a, b) => tierRank[b] - tierRank[a])[0] ?? "Unverified";

  const relatedRoles: RelatedRole[] = role.relatedRoleSlugs
    .map((relatedSlug) => getRoleBySlug(relatedSlug))
    .filter((related): related is NonNullable<typeof related> => Boolean(related))
    .map((related) => ({ slug: related.slug, title: related.title, lane: related.lane }));

  const project = portfolioProjects.find((item) => item.targetRole === role.slug);
  const proofHref = project ? `/portfolio/${project.slug}` : "/portfolio";

  return (
    <Shell>
      <Container className="space-y-10 py-12 sm:py-16">
        <Link href="/roles" className="inline-flex items-center gap-2 text-sm font-extrabold text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
          <ArrowLeft className="h-4 w-4" /> Back to roles
        </Link>

        <header className="max-w-3xl">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.14em] text-blue-700">
            {role.lane}
          </span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">{role.title}</h1>
          <p className="mt-5 text-lg leading-8 text-muted">{content.summary}</p>
        </header>

        <RoleGuide
          role={role}
          content={content}
          salary={{ confidence: role.compensationConfidence, tier: primaryTier }}
          relatedRoles={relatedRoles}
          reviewed={research.lastReviewed}
          proofHref={proofHref}
          interviewHref="/interview-prep"
        />

        <FinalCTA
          title="Turn this role into evidence."
          copy="Choose a proof-of-work project, package the result, and practice the questions this role is likely to ask."
          primary={{ href: proofHref, label: "Choose a Project" }}
          secondary={{ href: "/interview-prep", label: "Practice Questions" }}
        />
      </Container>
    </Shell>
  );
}
