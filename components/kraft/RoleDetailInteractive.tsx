"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight, BookOpen, BriefcaseBusiness, CheckCircle2, ChevronDown, FileCheck2, Layers, MessageSquareText, Search, Target, X } from "lucide-react";
import type { Role } from "@/data/roles";
import type { GlossaryTerm } from "@/data/glossary";
import type { JobBoard } from "@/data/jobBoards";
import type { PortfolioProject } from "@/data/portfolioProjects";
import { getSalaryContext } from "@/data/salaryContext";
import { getToolInfo, type ToolInfo } from "@/data/tools";
import { Card, PrimaryLink, SecondaryLink } from "@/components/kraft/Primitives";

type LearningResource = {
  title: string;
  description: string;
  url: string;
  type: string;
};

type RoleDetailInteractiveProps = {
  role: Role;
  project?: PortfolioProject;
  relatedTerms: GlossaryTerm[];
  relatedBoards: JobBoard[];
  relatedRoles: Role[];
  questions: string[];
  learnResources: LearningResource[];
};

const tabSections = {
  Overview: ["overview", "daily-work", "outputs"],
  Skills: ["skills", "tools", "learning"],
  Proof: ["proof", "assignment", "mistakes"],
  Prep: ["interview", "salary", "glossary"],
  Apply: ["platforms", "related-roles", "next-steps"],
} as const;

const sectionMeta = [
  { id: "overview", label: "Overview", tab: "Overview" },
  { id: "daily-work", label: "Daily Work", tab: "Overview" },
  { id: "outputs", label: "Outputs", tab: "Overview" },
  { id: "skills", label: "Must-have Skills", tab: "Skills" },
  { id: "tools", label: "Tools", tab: "Skills" },
  { id: "learning", label: "Learning Resources", tab: "Skills" },
  { id: "proof", label: "Proof-of-work", tab: "Proof" },
  { id: "assignment", label: "Practical Assignment", tab: "Proof" },
  { id: "mistakes", label: "Common Mistakes", tab: "Proof" },
  { id: "interview", label: "Interview Questions", tab: "Prep" },
  { id: "salary", label: "Salary Context", tab: "Prep" },
  { id: "glossary", label: "Related Glossary", tab: "Prep" },
  { id: "platforms", label: "Job Platforms", tab: "Apply" },
  { id: "related-roles", label: "Related Roles", tab: "Apply" },
  { id: "next-steps", label: "Next Steps", tab: "Apply" },
] as const;

type TabName = keyof typeof tabSections;

function BulletList({ items }: { items: string[] }) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <div key={item} className="flex gap-3 rounded-2xl border border-blue-100 bg-soft p-4">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
          <span className="text-sm font-bold leading-6 text-ink">{item}</span>
        </div>
      ))}
    </div>
  );
}

function SectionCard({
  id,
  title,
  icon,
  children,
}: {
  id: string;
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <Card className="reveal-card p-5 sm:p-7">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-600 text-white shadow-blue">{icon}</span>
          <h2 className="text-2xl font-extrabold tracking-tight text-ink">{title}</h2>
        </div>
        <div className="mt-5">{children}</div>
      </Card>
    </section>
  );
}

function ResourceLink({ href, children }: { href: string; children: ReactNode }) {
  const className = "group rounded-2xl border border-blue-100 bg-soft p-4 transition hover:-translate-y-0.5 hover:border-blue-300 hover:bg-white";
  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export default function RoleDetailInteractive({
  role,
  project,
  relatedTerms,
  relatedBoards,
  relatedRoles,
  questions,
  learnResources,
}: RoleDetailInteractiveProps) {
  const [activeTab, setActiveTab] = useState<TabName>("Overview");
  const [activeSection, setActiveSection] = useState<string>(sectionMeta[0].id);
  const [progress, setProgress] = useState(0);
  const [selectedTool, setSelectedTool] = useState<ToolInfo | null>(null);
  const visibleSections = useMemo(() => new Set(tabSections[activeTab]), [activeTab]);
  const salaryContext = getSalaryContext(role);
  const projectHref = project ? `/portfolio/${project.slug}` : "/portfolio";

  useEffect(() => {
    const onScroll = () => {
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(documentHeight > 0 ? Math.min(100, Math.round((window.scrollY / documentHeight) * 100)) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const nodes = sectionMeta.map((section) => document.getElementById(section.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (!visible) return;
        const id = visible.target.id;
        const section = sectionMeta.find((item) => item.id === id);
        if (section) {
          setActiveSection(id);
          setActiveTab(section.tab);
        }
      },
      { rootMargin: "-30% 0px -58% 0px", threshold: 0.01 }
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="grid min-w-0 gap-8 lg:grid-cols-[260px_1fr]">
      <aside className="hidden lg:sticky lg:top-24 lg:block lg:h-[calc(100vh-7rem)]">
        <Card className="p-4">
          <div className="h-2 overflow-hidden rounded-full bg-blue-50">
            <div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-3 text-xs font-extrabold uppercase tracking-[0.14em] text-blue-700">Role guide progress</p>
          <nav className="mt-4 grid gap-1">
            {sectionMeta.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`rounded-xl px-3 py-2 text-sm font-bold transition ${
                  activeSection === section.id ? "bg-blue-600 text-white shadow-blue" : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                {section.label}
              </a>
            ))}
          </nav>
        </Card>
      </aside>

      <div className="min-w-0">
        <div className="sticky top-0 z-20 rounded-3xl border border-blue-100 bg-white/86 px-4 py-3 backdrop-blur lg:top-20">
          <div className="flex gap-2 overflow-x-auto">
            {(Object.keys(tabSections) as TabName[]).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setActiveTab(tab);
                  document.getElementById(tabSections[tab][0])?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-extrabold transition ${
                  activeTab === tab ? "bg-blue-600 text-white shadow-blue" : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-5">
          <div className="rounded-[28px] border border-blue-100 bg-[linear-gradient(145deg,#ffffff,#edf6ff)] p-5 shadow-blue sm:p-7">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="mini-stat"><dt>Lane</dt><dd>{role.lane}</dd></div>
              <div className="mini-stat"><dt>Level</dt><dd>{role.level}</dd></div>
              <div className="mini-stat"><dt>Mode</dt><dd>{role.mode}</dd></div>
            </div>
          </div>

          <SectionCard id="overview" title="1. Role Overview" icon={<Target className="h-5 w-5" />}>
            <p className="text-base leading-8 text-muted">{role.summary}</p>
            <div className="mt-5 flex flex-wrap gap-2">{role.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}</div>
          </SectionCard>

          <SectionCard id="daily-work" title="2. Daily Work" icon={<Layers className="h-5 w-5" />}>
            <details className="group rounded-2xl border border-blue-100 bg-soft p-4" open={visibleSections.has("daily-work")}>
              <summary className="flex cursor-pointer items-center justify-between gap-3 text-sm font-extrabold text-ink">
                What you will actually do most weeks
                <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
              </summary>
              <div className="mt-4"><BulletList items={role.dailyWork} /></div>
            </details>
          </SectionCard>

          <SectionCard id="outputs" title="3. Expected Outputs" icon={<FileCheck2 className="h-5 w-5" />}>
            <BulletList items={role.expectedOutputs} />
          </SectionCard>

          <SectionCard id="skills" title="4. Must-have And Nice-to-have Skills" icon={<Target className="h-5 w-5" />}>
            <div className="grid gap-5 md:grid-cols-2">
              <div><h3 className="font-extrabold text-ink">Must-have</h3><div className="mt-3 flex flex-wrap gap-2">{role.mustHave.map((item) => <span key={item} className="tag">{item}</span>)}</div></div>
              <div><h3 className="font-extrabold text-ink">Nice-to-have</h3><div className="mt-3 flex flex-wrap gap-2">{role.niceToHave.map((item) => <span key={item} className="tag">{item}</span>)}</div></div>
            </div>
          </SectionCard>

          <SectionCard id="tools" title="5. Tools To Recognize" icon={<Search className="h-5 w-5" />}>
            <div className="flex flex-wrap gap-2">
              {role.tools.map((tool) => {
                const info = getToolInfo(tool);
                if (!info) {
                  return <span key={tool} className="tag">{tool}</span>;
                }
                return (
                  <button
                    key={tool}
                    type="button"
                    data-tool-name={tool}
                    onClick={() => setSelectedTool(info)}
                    className="interactive-card cursor-pointer rounded-full border border-blue-100 bg-[linear-gradient(180deg,#ffffff,#eef6ff)] px-3 py-2 text-xs font-extrabold text-blue-800 transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-soft"
                  >
                    {tool}
                  </button>
                );
              })}
            </div>
            {selectedTool ? (
              <div className="mt-5 rounded-3xl border border-blue-200 bg-[linear-gradient(145deg,#ffffff,#eff7ff)] p-5 shadow-blue">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="tag">{selectedTool.category}</span>
                    <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-ink">{selectedTool.name}</h3>
                  </div>
                  <button type="button" onClick={() => setSelectedTool(null)} className="icon-button" aria-label="Close tool detail">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  <div className="mini-stat"><dt>Purpose</dt><dd>{selectedTool.purpose}</dd></div>
                  <div className="mini-stat"><dt>Role usage</dt><dd>{selectedTool.roleUsage}</dd></div>
                  <div className="mini-stat"><dt>Example</dt><dd>{selectedTool.practicalExample}</dd></div>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  {selectedTool.officialUrl ? (
                    <a href={selectedTool.officialUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-extrabold text-blue-700">
                      Visit Official Site <ArrowUpRight className="h-4 w-4" />
                    </a>
                  ) : null}
                  {selectedTool.learnResourceUrl ? (
                    <Link href={selectedTool.learnResourceUrl} className="inline-flex items-center gap-2 text-sm font-extrabold text-blue-700">
                      Related Learn Resource <ArrowRight className="h-4 w-4" />
                    </Link>
                  ) : null}
                </div>
              </div>
            ) : null}
          </SectionCard>

          <SectionCard id="learning" title="6. Suggested Learning" icon={<BookOpen className="h-5 w-5" />}>
            <div className="grid gap-3 md:grid-cols-2">
              {learnResources.map((resource) => (
                <ResourceLink key={resource.title} href={resource.url}>
                  <span className="tag">{resource.type}</span>
                  <h3 className="mt-3 font-extrabold text-ink">{resource.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{resource.description}</p>
                </ResourceLink>
              ))}
            </div>
          </SectionCard>

          <SectionCard id="proof" title="7. Proof-of-work Ideas" icon={<FileCheck2 className="h-5 w-5" />}>
            <BulletList items={role.proofOfWork} />
          </SectionCard>

          <SectionCard id="assignment" title="8. Practical Assignment" icon={<Target className="h-5 w-5" />}>
            <div className="rounded-2xl border border-blue-100 bg-soft p-5">
              <h3 className="text-xl font-extrabold text-ink">{project?.task ?? role.assignment}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{project?.deliverable ?? "Package the output as a concise case study with assumptions, screenshots, and links."}</p>
              <Link href={projectHref} className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-blue-700">Open project brief <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </SectionCard>

          <SectionCard id="mistakes" title="9. Common Mistakes" icon={<CheckCircle2 className="h-5 w-5" />}>
            <BulletList items={role.commonMistakes} />
          </SectionCard>

          <SectionCard id="interview" title="10. Interview Questions" icon={<MessageSquareText className="h-5 w-5" />}>
            <div className="grid gap-3">{questions.slice(0, 7).map((question) => <p key={question} className="rounded-2xl border border-blue-100 bg-soft p-4 text-sm font-bold leading-6 text-ink">{question}</p>)}</div>
          </SectionCard>

          <SectionCard id="salary" title="11. Salary Context" icon={<BriefcaseBusiness className="h-5 w-5" />}>
            <p className="leading-7 text-muted">{salaryContext.summary}</p>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <div className="mini-stat"><dt>Confidence</dt><dd>{salaryContext.salaryConfidence}</dd></div>
              <div className="mini-stat"><dt>Last reviewed</dt><dd>{salaryContext.lastReviewed}</dd></div>
              <div className="mini-stat"><dt>Evidence count</dt><dd>{salaryContext.salaryEvidence.length}</dd></div>
            </div>
            {salaryContext.salaryEvidence.length ? (
              <div className="mt-5 grid gap-3">
                {salaryContext.salaryEvidence.map((evidence) => {
                  const source = salaryContext.sources.find((item) => item.id === evidence.sourceId);
                  return (
                    <div key={`${evidence.sourceId}-${evidence.tier}`} className="rounded-2xl border border-blue-100 bg-soft p-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="tag">{evidence.tier}</span>
                        <span className="tag">{source?.market ?? "Market varies"}</span>
                        <span className="tag">{source?.employmentType ?? "Employment type varies"}</span>
                      </div>
                      <p className="mt-3 text-sm font-bold leading-6 text-ink">{evidence.summary}</p>
                      {evidence.displayAmount ? <p className="mt-2 text-sm leading-6 text-muted">{evidence.displayAmount}</p> : null}
                      {source ? (
                        <a href={source.url} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm font-extrabold text-blue-700">
                          {source.id}: {source.label} <ArrowUpRight className="h-4 w-4" />
                        </a>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ) : null}
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <div className="mini-stat"><dt>Entry</dt><dd>{salaryContext.seniorityNotes.entry}</dd></div>
              <div className="mini-stat"><dt>Mid</dt><dd>{salaryContext.seniorityNotes.mid}</dd></div>
              <div className="mini-stat"><dt>Senior</dt><dd>{salaryContext.seniorityNotes.senior}</dd></div>
            </div>
            <div className="mt-5 grid gap-5 md:grid-cols-3">
              <div>
                <h3 className="font-extrabold text-ink">Employment types</h3>
                <div className="mt-3 flex flex-wrap gap-2">{salaryContext.employmentTypes.map((item) => <span key={item} className="tag">{item}</span>)}</div>
              </div>
              <div>
                <h3 className="font-extrabold text-ink">Pay factors</h3>
                <div className="mt-3 flex flex-wrap gap-2">{salaryContext.payFactors.map((item) => <span key={item} className="tag">{item}</span>)}</div>
              </div>
              <div>
                <h3 className="font-extrabold text-ink">Token risks</h3>
                <div className="mt-3 grid gap-2">{salaryContext.tokenCompensationRisks.map((item) => <p key={item} className="rounded-2xl border border-blue-100 bg-soft p-3 text-xs font-bold leading-5 text-ink">{item}</p>)}</div>
              </div>
            </div>
          </SectionCard>

          <SectionCard id="glossary" title="12. Related Glossary" icon={<BookOpen className="h-5 w-5" />}>
            <div className="grid gap-3 md:grid-cols-2">
              {relatedTerms.map((term) => (
                <Link key={term.slug} href={`/glossary?term=${term.slug}`} className="rounded-2xl border border-blue-100 bg-soft p-4 transition hover:border-blue-300 hover:bg-white">
                  <h3 className="font-extrabold text-ink">{term.term}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{term.commonTrap}</p>
                </Link>
              ))}
            </div>
          </SectionCard>

          <SectionCard id="platforms" title="13. Recommended Job Platforms" icon={<BriefcaseBusiness className="h-5 w-5" />}>
            <div className="grid gap-3 md:grid-cols-3">
              {relatedBoards.map((board) => (
                <ResourceLink key={board.slug} href={board.url}>
                  <h3 className="font-extrabold text-ink">{board.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{board.bestFor}</p>
                  <p className="mt-3 text-xs font-bold uppercase tracking-[0.12em] text-blue-700">{board.remoteSupport} remote support</p>
                </ResourceLink>
              ))}
            </div>
          </SectionCard>

          <SectionCard id="related-roles" title="14. Related Roles" icon={<Layers className="h-5 w-5" />}>
            <div className="grid gap-3 md:grid-cols-3">
              {relatedRoles.map((item) => (
                <Link key={item.slug} href={`/roles/${item.slug}`} className="rounded-2xl border border-blue-100 bg-soft p-4 transition hover:-translate-y-0.5 hover:border-blue-300 hover:bg-white">
                  <span className="tag">{item.level}</span>
                  <h3 className="mt-3 font-extrabold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{item.summary}</p>
                </Link>
              ))}
            </div>
          </SectionCard>

          <SectionCard id="next-steps" title="15. Next Steps" icon={<ArrowRight className="h-5 w-5" />}>
            <p className="leading-7 text-muted">Turn this guide into action: build one role-specific proof piece, practice the questions, then use the recommended platforms with a targeted application.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href={projectHref}>Build Proof-of-Work</PrimaryLink>
              <SecondaryLink href="/interview-prep">Practice Interviews</SecondaryLink>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
