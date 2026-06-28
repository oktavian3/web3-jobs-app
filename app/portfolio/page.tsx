import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { portfolioProjects } from "@/data/portfolioProjects";
import { getRoleBySlug } from "@/data/roles";
import { Shell, Container, SectionHeading, Card, FinalCTA } from "@/components/kraft/Primitives";

export default function PortfolioPage() {
  return (
    <Shell>
      <Container className="space-y-12 py-12 sm:py-16">
        <SectionHeading eyebrow="Portfolio Resources" title="Choose a proof-of-work project." copy="Each brief includes context, task, deliverable, constraints, evaluation rubric, and how to present it as a case study." />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {portfolioProjects.map((project) => {
            const role = getRoleBySlug(project.targetRole);
            return (
              <Card key={project.slug} className="flex flex-col p-5">
                <span className="tag">{role?.lane ?? "KRAFT"}</span>
                <h2 className="mt-4 text-xl font-extrabold tracking-tight text-ink">{role?.title ?? project.targetRole}</h2>
                <p className="mt-3 text-sm leading-6 text-muted">{project.task}</p>
                <div className="mt-5 rounded-2xl bg-soft p-4">
                  <h3 className="text-sm font-extrabold text-ink">Deliverable</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{project.deliverable}</p>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">{project.rubric.slice(0, 3).map((item) => <span key={item} className="tag">{item}</span>)}</div>
                <Link href={`/roles/${project.targetRole}`} className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-blue-700">
                  See related role <ArrowRight className="h-4 w-4" />
                </Link>
              </Card>
            );
          })}
        </div>
        <FinalCTA title="Package the work clearly." copy="A strong portfolio explains the context, decisions, output, limits, and what you would improve next." primary={{ href: "/get-hired", label: "Open Hiring Guide" }} secondary={{ href: "/interview-prep", label: "Practice Interviews" }} />
      </Container>
    </Shell>
  );
}
