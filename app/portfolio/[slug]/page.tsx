import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, ClipboardList, Hammer, PackageCheck, Wrench } from "lucide-react";
import { getPortfolioProjectBySlug, portfolioProjects } from "@/data/portfolioProjects";
import { getRoleBySlug } from "@/data/roles";
import { Shell, Container, Card, SectionHeading, FinalCTA } from "@/components/kraft/Primitives";

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getPortfolioProjectBySlug(slug);
  return { title: project ? `${project.title} | KRAFT Portfolio` : "Portfolio Brief" };
}

function ListCard({ items }: { items: string[] }) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <div key={item} className="flex gap-3 rounded-2xl border border-blue-100 bg-soft p-4">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
          <p className="text-sm font-bold leading-6 text-ink">{item}</p>
        </div>
      ))}
    </div>
  );
}

export default async function PortfolioDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getPortfolioProjectBySlug(slug);
  if (!project) notFound();

  const role = getRoleBySlug(project.targetRole);
  const sectionIconClass = "grid h-11 w-11 place-items-center rounded-2xl bg-blue-600 text-white shadow-blue";

  return (
    <Shell>
      <Container className="space-y-10 py-12 sm:py-16">
        <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm font-extrabold text-blue-700">
          <ArrowLeft className="h-4 w-4" /> Back to portfolio
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="tag">{role?.lane ?? "KRAFT"}</span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink sm:text-6xl">{project.title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">{project.context}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tools.slice(0, 6).map((tool) => <span key={tool} className="tag">{tool}</span>)}
            </div>
          </div>
          <Card className="p-6">
            <h2 className="text-xl font-extrabold text-ink">Project brief</h2>
            <p className="mt-3 text-sm leading-6 text-muted">{project.task}</p>
            <div className="mt-5 rounded-2xl bg-soft p-4">
              <h3 className="text-sm font-extrabold text-ink">Expected deliverable</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{project.deliverable}</p>
            </div>
            {role ? (
              <Link href={`/roles/${role.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-blue-700">
                Open related role <ArrowRight className="h-4 w-4" />
              </Link>
            ) : null}
          </Card>
        </div>

        <section className="grid gap-5 lg:grid-cols-2">
          <Card className="p-5 sm:p-7">
            <div className="flex items-center gap-3">
              <span className={sectionIconClass}><ClipboardList className="h-5 w-5" /></span>
              <h2 className="text-2xl font-extrabold tracking-tight text-ink">Execution Plan</h2>
            </div>
            <div className="mt-5"><ListCard items={project.executionPlan} /></div>
          </Card>
          <Card className="p-5 sm:p-7">
            <div className="flex items-center gap-3">
              <span className={sectionIconClass}><Hammer className="h-5 w-5" /></span>
              <h2 className="text-2xl font-extrabold tracking-tight text-ink">Rubric</h2>
            </div>
            <div className="mt-5"><ListCard items={project.rubric} /></div>
          </Card>
        </section>

        <section className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <Card className="p-5 sm:p-7">
            <div className="flex items-center gap-3">
              <span className={sectionIconClass}><Wrench className="h-5 w-5" /></span>
              <h2 className="text-2xl font-extrabold tracking-tight text-ink">Tools</h2>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">{project.tools.map((tool) => <span key={tool} className="tag">{tool}</span>)}</div>
          </Card>
          <Card className="p-5 sm:p-7">
            <div className="flex items-center gap-3">
              <span className={sectionIconClass}><PackageCheck className="h-5 w-5" /></span>
              <h2 className="text-2xl font-extrabold tracking-tight text-ink">Case-study Packaging</h2>
            </div>
            <div className="mt-5"><ListCard items={project.caseStudyPackaging} /></div>
          </Card>
        </section>

        <section>
          <SectionHeading eyebrow="Final check" title="Checklist before publishing." copy={project.presentation} />
          <Card className="mt-8 p-5 sm:p-7">
            <ListCard items={[...project.constraints, ...project.checklist]} />
          </Card>
        </section>

        <FinalCTA title="Use the brief as evidence." copy="A strong proof piece makes your application easier to evaluate because it shows role judgment, not only interest." primary={{ href: "/get-hired", label: "Open Hiring Guide" }} secondary={{ href: "/interview-prep", label: "Practice Interviews" }} />
      </Container>
    </Shell>
  );
}
