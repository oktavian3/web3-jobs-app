import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { getPortfolioProjectBySlug, portfolioProjects } from "@/data/portfolioProjects";
import { getRoleBySlug } from "@/data/roles";
import { Shell, Container } from "@/components/kraft/Primitives";
import CareerNext from "@/components/kraft/career/CareerNext";

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getPortfolioProjectBySlug(slug);
  return {
    title: project ? `${project.roleTitle} portfolio brief` : "Portfolio Brief",
    description: project ? `A simulated proof-of-work brief for the ${project.roleTitle} role.` : undefined,
  };
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2.5 text-sm leading-6 text-ink">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Block({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="text-xl font-extrabold tracking-tight text-ink sm:text-2xl">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Divider({ children }: { children: React.ReactNode }) {
  return <div className="border-t border-border pt-8">{children}</div>;
}

export default async function PortfolioDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getPortfolioProjectBySlug(slug);
  if (!project) notFound();

  const role = getRoleBySlug(project.targetRole);

  return (
    <Shell>
      <Container className="space-y-12 py-12 sm:py-16">
        <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm font-extrabold text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to portfolio
        </Link>

        <header className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="tag">{project.lane}</span>
            <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-amber-900">Simulated project</span>
          </div>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">{project.roleTitle} portfolio brief</h1>
          <p className="mt-5 text-lg leading-8 text-muted">{project.scenario}</p>
        </header>

        <div className="card-surface card-surface--featured p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="tag">{project.deliverables.length} deliverables</span>
            {project.tools.length > 0 && <span className="tag">{project.tools.length} tools referenced</span>}
            {project.interviewQuestions.length > 0 && <span className="tag">{project.interviewQuestions.length} linked interview questions</span>}
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            {role && (
              <Link href={`/interview-prep?role=${role.slug}`} className="btn-primary group">
                Practice interview questions
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
            {role && <Link href={`/roles/${role.slug}`} className="btn-secondary">Open the {role.title} role guide</Link>}
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <Block id="objective" title="Objective">
            <p className="text-base leading-7 text-muted">{project.objective}</p>
          </Block>
          <Block id="deliverables" title="Expected deliverables">
            <div className="flex flex-wrap gap-2">
              {project.deliverables.map((item) => (
                <span key={item} className="rounded-xl border border-border bg-soft px-3 py-2 text-sm font-bold text-ink">{item}</span>
              ))}
            </div>
          </Block>
        </div>

        <Divider>
          <div className="grid gap-10 lg:grid-cols-2">
            <Block id="workflow" title="Recommended workflow">
              <ol className="space-y-2">
                {project.workflow.map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-6 text-ink">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-extrabold text-white" aria-hidden="true">{i + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </Block>
            <Block id="constraints" title="Constraints and safety">
              <Bullets items={project.constraints} />
            </Block>
          </div>
        </Divider>

        {project.tools.length > 0 && (
          <Divider>
            <Block id="tools" title="Tools in practice">
              <dl className="divide-y divide-border overflow-hidden rounded-2xl border border-border">
                {project.tools.map((tool) => (
                  <div key={tool.name} className="grid gap-1 p-4 sm:grid-cols-[minmax(9rem,12rem)_1fr] sm:gap-4">
                    <dt className="text-sm font-extrabold text-ink">{tool.name}</dt>
                    <dd className="text-sm leading-6 text-muted">{tool.useCase}.</dd>
                  </div>
                ))}
              </dl>
            </Block>
          </Divider>
        )}

        <Divider>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-emerald-200 bg-emerald-50/60 p-4 sm:p-5">
              <h2 className="text-sm font-extrabold uppercase tracking-[0.1em] text-muted">What a strong submission shows</h2>
              <ul className="mt-3 space-y-2.5">
                {project.strongSubmission.map((item, i) => (
                  <li key={i} className="flex gap-2.5 text-sm leading-6 text-ink">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-surface card-surface--informational p-4 sm:p-5">
              <h2 className="text-sm font-extrabold uppercase tracking-[0.1em] text-muted">Weak submission patterns</h2>
              <ul className="mt-3 space-y-2.5">
                {project.weakPatterns.map((item, i) => (
                  <li key={i} className="flex gap-2.5 text-sm leading-6 text-ink">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Divider>

        <Divider>
          <div className="grid gap-10 lg:grid-cols-2">
            <section id="rubric" className="scroll-mt-28">
              <div className="card-surface card-surface--evidence p-5 sm:p-6">
                <h2 className="text-xl font-extrabold tracking-tight text-ink sm:text-2xl">Review rubric</h2>
                <div className="mt-4"><Bullets items={project.rubric} /></div>
              </div>
            </section>
            <Block id="case-study" title="Present it as a case study">
              <Bullets items={project.caseStudy} />
            </Block>
          </div>
        </Divider>

        {project.interviewQuestions.length > 0 && (
          <Divider>
            <Block id="interview" title="Interview questions this project helps you answer">
              <ol className="divide-y divide-border border-y border-border">
                {project.interviewQuestions.map((q, i) => (
                  <li key={i} className="flex gap-3 py-4">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-extrabold text-white" aria-hidden="true">{i + 1}</span>
                    <p className="text-base leading-7 text-ink">{q}</p>
                  </li>
                ))}
              </ol>
            </Block>
          </Divider>
        )}

        <CareerNext
          heading="Turn this into an application"
          items={[
            { title: "Practice interviews", href: "/interview-prep", why: `Rehearse the ${project.roleTitle} questions above with the answer framework.` },
            { title: "Package and apply", href: "/get-hired", why: "Use the Get Hired journey to turn this brief into a case study and targeted application." },
            ...(role ? [{ title: "Related role guide", href: `/roles/${role.slug}`, why: `See the full ${role.title} scope, proof standards, and boundaries.` }] : []),
          ]}
        />
      </Container>
    </Shell>
  );
}
