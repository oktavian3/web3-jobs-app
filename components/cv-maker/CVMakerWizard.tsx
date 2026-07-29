"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import {
  createEmptyCVData,
  type AwardEntry,
  type CVData,
  type CertificationEntry,
  type Contact,
  type EducationEntry,
  type ExperienceEntry,
  type LanguageEntry,
  type ListSectionKey,
  type ProjectEntry,
} from "@/lib/cv-maker/types";
import { clearDraft, debounce, loadDraft, saveDraft } from "@/lib/cv-maker/storage";
import CVPreview from "./CVPreview";
import ContactStep from "./steps/ContactStep";
import SummaryStep from "./steps/SummaryStep";
import ExperienceStep from "./steps/ExperienceStep";
import EducationStep from "./steps/EducationStep";
import SkillsStep from "./steps/SkillsStep";
import CertificationsStep from "./steps/CertificationsStep";
import ProjectsStep from "./steps/ProjectsStep";
import LanguagesStep from "./steps/LanguagesStep";
import AwardsStep from "./steps/AwardsStep";
import JDMatchStep from "./steps/JDMatchStep";
import DownloadStep from "./steps/DownloadStep";

type StepId =
  | "contact"
  | "summary"
  | "experience"
  | "education"
  | "skills"
  | "certifications"
  | "projects"
  | "languages"
  | "awards"
  | "jd-match"
  | "download";

const STEPS: { id: StepId; label: string }[] = [
  { id: "contact", label: "Contact" },
  { id: "summary", label: "Summary" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Certifications" },
  { id: "projects", label: "Projects" },
  { id: "languages", label: "Languages" },
  { id: "awards", label: "Awards" },
  { id: "jd-match", label: "JD Match" },
  { id: "download", label: "Download" },
];

export default function CVMakerWizard() {
  // Lazy initial state — loadDraft() touches window/localStorage, which must
  // not run during server render. useState's initializer function runs once
  // on the client after mount-time hydration reconciles, so this is safe.
  // Read once and derive both `data` and `justRestored` from that single
  // read — each initializer below still only runs once, on mount.
  const [initialDraft] = useState(() => loadDraft());
  const [data, setData] = useState<CVData>(() => initialDraft ?? createEmptyCVData());
  const [jobDescription, setJobDescription] = useState("");
  const [activeStepId, setActiveStepId] = useState<StepId>("contact");
  const [justRestored, setJustRestored] = useState(() => Boolean(initialDraft));

  // Skip the effect run that fires on mount (and the one right after "Start
  // over" resets `data`) — otherwise an untouched visit writes an empty draft
  // to localStorage, and the next visit shows "Restored your draft" for a
  // draft that has nothing in it.
  const skipNextSave = useRef(true);
  const saveRef = useRef(debounce((next: CVData) => saveDraft(next), 500));
  useEffect(() => {
    if (skipNextSave.current) {
      skipNextSave.current = false;
      return;
    }
    saveRef.current(data);
  }, [data]);
  useEffect(() => {
    const debounced = saveRef.current;
    return () => debounced.cancel();
  }, []);

  const updateContact = (patch: Partial<Contact>) => setData((d) => ({ ...d, contact: { ...d.contact, ...patch } }));
  const updateSummary = (summary: string) => setData((d) => ({ ...d, summary }));
  const updateSkills = (skills: string) => setData((d) => ({ ...d, skills }));
  const updateList = <K extends ListSectionKey>(key: K) => (list: CVData[K]) =>
    setData((d) => ({ ...d, [key]: list }));

  const resetDraft = () => {
    if (typeof window !== "undefined" && !window.confirm("Clear everything and start over? This can't be undone.")) return;
    clearDraft();
    skipNextSave.current = true;
    setData(createEmptyCVData());
    setJobDescription("");
    setActiveStepId("contact");
  };

  const activeIndex = STEPS.findIndex((step) => step.id === activeStepId);
  const goPrev = () => setActiveStepId(STEPS[Math.max(0, activeIndex - 1)].id);
  const goNext = () => setActiveStepId(STEPS[Math.min(STEPS.length - 1, activeIndex + 1)].id);

  const activeStep = useMemo(() => {
    switch (activeStepId) {
      case "contact":
        return <ContactStep contact={data.contact} onChange={updateContact} />;
      case "summary":
        return <SummaryStep summary={data.summary} onChange={updateSummary} />;
      case "experience":
        return <ExperienceStep entries={data.experience} onChange={updateList<"experience">("experience") as (v: ExperienceEntry[]) => void} />;
      case "education":
        return <EducationStep entries={data.education} onChange={updateList<"education">("education") as (v: EducationEntry[]) => void} />;
      case "skills":
        return <SkillsStep skills={data.skills} onChange={updateSkills} />;
      case "certifications":
        return (
          <CertificationsStep
            entries={data.certifications}
            onChange={updateList<"certifications">("certifications") as (v: CertificationEntry[]) => void}
          />
        );
      case "projects":
        return <ProjectsStep entries={data.projects} onChange={updateList<"projects">("projects") as (v: ProjectEntry[]) => void} />;
      case "languages":
        return <LanguagesStep entries={data.languages} onChange={updateList<"languages">("languages") as (v: LanguageEntry[]) => void} />;
      case "awards":
        return <AwardsStep entries={data.awards} onChange={updateList<"awards">("awards") as (v: AwardEntry[]) => void} />;
      case "jd-match":
        return <JDMatchStep data={data} jobDescription={jobDescription} onJobDescriptionChange={setJobDescription} />;
      case "download":
        return <DownloadStep data={data} onDownload={() => window.print()} />;
      default:
        return null;
    }
  }, [activeStepId, data, jobDescription]);

  return (
    <div>
      {justRestored && (
        <div className="no-print mb-6 flex items-center justify-between gap-3 rounded-2xl border border-blue-100 bg-highlight px-4 py-3 text-sm font-bold text-blue-900">
          <span>Restored your last draft from this browser.</span>
          <button type="button" onClick={() => setJustRestored(false)} className="text-blue-700 underline underline-offset-2">
            Dismiss
          </button>
        </div>
      )}

      {/* Step pills */}
      <div className="no-print -mx-1 flex gap-2 overflow-x-auto px-1 pb-2" role="tablist" aria-label="CV Maker steps">
        {STEPS.map((step, index) => (
          <button
            key={step.id}
            type="button"
            role="tab"
            aria-selected={step.id === activeStepId}
            onClick={() => setActiveStepId(step.id)}
            className={`shrink-0 rounded-full px-3.5 py-2 text-xs font-extrabold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
              step.id === activeStepId
                ? "bg-ink text-white"
                : "border border-border bg-elevated text-muted hover:bg-highlight hover:text-ink"
            }`}
          >
            {index + 1}. {step.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
        {/* Form column */}
        <div className="no-print card-surface p-5 sm:p-6">
          {activeStep}

          <div className="mt-8 flex items-center justify-between border-t border-border pt-5">
            <button
              type="button"
              onClick={goPrev}
              disabled={activeIndex === 0}
              className="btn-secondary disabled:cursor-not-allowed disabled:opacity-45"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
            </button>
            <button
              type="button"
              onClick={resetDraft}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-muted hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Start over
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={activeIndex === STEPS.length - 1}
              className="btn-primary disabled:cursor-not-allowed disabled:opacity-45"
            >
              Next <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Live preview column */}
        <div className="lg:sticky lg:top-24">
          <p className="no-print mb-3 text-xs font-extrabold uppercase tracking-[0.1em] text-muted">Live preview</p>
          {/* cv-preview-frame's own overflow/height must be reset in the print
              stylesheet — #cv-preview becomes position:absolute when printing
              (see globals.css), and an overflow:auto ancestor would otherwise
              still clip it if the document is taller than this on-screen box. */}
          <div className="cv-preview-frame max-h-[calc(100vh-8rem)] overflow-y-auto rounded-[28px] bg-soft p-3 sm:p-5 lg:max-h-[calc(100vh-10rem)]">
            <CVPreview data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
