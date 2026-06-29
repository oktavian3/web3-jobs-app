import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getRoleBySlug, roles, type CareerLane } from "@/data/roles";
import { glossaryTerms } from "@/data/glossary";
import { jobBoards } from "@/data/jobBoards";
import { portfolioProjects } from "@/data/portfolioProjects";
import { interviewQuestions } from "@/data/interviewQuestions";
import { learningCategories } from "@/data/learningResources";
import { Shell, Container, Card, PrimaryLink, SecondaryLink, FinalCTA } from "@/components/kraft/Primitives";
import RoleDetailInteractive from "@/components/kraft/RoleDetailInteractive";

export function generateStaticParams() {
  return roles.map((role) => ({ slug: role.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const role = getRoleBySlug(slug);
  return { title: role ? `${role.title} | KRAFT Role Guide` : "Role Guide" };
}

const learningByLane: Record<CareerLane, string[]> = {
  "Community & Growth": ["basics", "community", "content"],
  "Content & Marketing": ["basics", "content", "research"],
  "Product & Operations": ["basics", "product-ops", "design"],
  "Research & Data": ["basics", "research", "content"],
  "Technical & Security": ["basics", "developers", "research"],
  "Creative & Design": ["basics", "design", "product-ops"],
  "Governance, Legal & People": ["basics", "community", "product-ops"],
  "Trading & Finance Adjacent": ["basics", "research", "developers"],
};

export default async function RoleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const role = getRoleBySlug(slug);
  if (!role) notFound();

  const project = portfolioProjects.find((item) => item.targetRole === role.slug);
  const projectHref = project ? `/portfolio/${project.slug}` : "/portfolio";
  const matchedTerms = glossaryTerms.filter((term) => role.relatedGlossary.includes(term.term));
  const relatedTerms = (matchedTerms.length ? matchedTerms : glossaryTerms.filter((term) => term.usedInRoles.includes(role.lane))).slice(0, 6);
  const matchedBoards = jobBoards.filter((board) => role.recommendedPlatforms.includes(board.name));
  const relatedBoards = (matchedBoards.length ? matchedBoards : jobBoards.slice(0, 3)).slice(0, 3);
  const laneQuestions = interviewQuestions.filter((question) => question.lane === role.lane).map((question) => question.question);
  const questions = Array.from(new Set([...role.interviewQuestions, ...laneQuestions]));
  const relatedRoles = roles.filter((item) => item.lane === role.lane && item.slug !== role.slug).slice(0, 3);
  const learnResources = learningCategories
    .filter((category) => learningByLane[role.lane].includes(category.slug))
    .flatMap((category) => category.resources)
    .slice(0, 4);

  return (
    <Shell>
      <Container className="space-y-8 py-12 sm:py-16">
        <Link href="/roles" className="inline-flex items-center gap-2 text-sm font-extrabold text-blue-700">
          <ArrowLeft className="h-4 w-4" /> Back to roles
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1.12fr_0.88fr]">
          <div>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.14em] text-blue-700">{role.lane}</span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink sm:text-6xl">{role.title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">{role.summary}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="tag">{role.level}</span>
              <span className="tag">{role.mode}</span>
              {role.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
            </div>
          </div>
          <Card className="reveal-card p-6">
            <h2 className="text-xl font-extrabold text-ink">Next action</h2>
            <p className="mt-3 text-sm leading-6 text-muted">{role.assignment}</p>
            <div className="mt-6 flex flex-col gap-3">
              <PrimaryLink href={projectHref}>Build Proof-of-Work</PrimaryLink>
              <SecondaryLink href="/interview-prep">Practice Interview Questions</SecondaryLink>
            </div>
          </Card>
        </div>

        <RoleDetailInteractive
          role={role}
          project={project}
          relatedTerms={relatedTerms}
          relatedBoards={relatedBoards}
          relatedRoles={relatedRoles}
          questions={questions}
          learnResources={learnResources}
        />

        <FinalCTA title="Turn this role into evidence." copy="Choose a proof project, package the result, and practice the questions this role is likely to ask." primary={{ href: projectHref, label: "Choose a Project" }} secondary={{ href: "/interview-prep", label: "Practice Questions" }} />
      </Container>
    </Shell>
  );
}
