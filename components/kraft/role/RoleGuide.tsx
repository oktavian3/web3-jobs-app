import type { Role, CompensationConfidence, EvidenceTier } from "@/data/roles";
import type { RoleContent } from "@/data/roleContent";
import { compensationEvidenceLegend, compensationVariables, noReliableRange } from "@/data/sharedBlocks";
import RoleTableOfContents, { type TocItem } from "./RoleTableOfContents";
import {
  Section,
  Prose,
  RoleSnapshot,
  OrganizationalContext,
  ResponsibilityList,
  WorkCadenceTimeline,
  OutputAndDeliverables,
  SuccessSignals,
  ToolWorkflowTable,
  SkillRequirements,
  LevelExpectationsTable,
  ProofOfWorkBlock,
  CommonMistakes,
  BoundaryComparison,
  InterviewPreparation,
  SalaryEvidenceBlock,
  CareerProgression,
  NextSteps,
  RelatedRoles,
  SourceAndReviewStatus,
  type RelatedRole,
} from "./sections";

export type RoleSalaryView = {
  confidence: CompensationConfidence;
  tier: EvidenceTier;
  hasReliableRange: boolean;
  range?: { min: number; max: number; currency: string; period: string };
  geography?: string;
  employmentModel?: string;
  sourceLabel?: string;
  sourceUrl?: string;
};

const TOC: TocItem[] = [
  { id: "what-it-does", label: "What it does" },
  { id: "where-it-sits", label: "Where it sits" },
  { id: "responsibilities", label: "Responsibilities" },
  { id: "cadence", label: "Daily & reactive work" },
  { id: "deliverables", label: "Deliverables" },
  { id: "success", label: "How success is judged" },
  { id: "tools", label: "Tools in practice" },
  { id: "skills", label: "Skills & prerequisites" },
  { id: "levels", label: "Expectations by level" },
  { id: "proof", label: "Proof of work" },
  { id: "mistakes", label: "Mistakes & misconceptions" },
  { id: "boundaries", label: "Scope boundaries" },
  { id: "interview", label: "Interview focus" },
  { id: "compensation", label: "Compensation & risks" },
  { id: "career", label: "Career path & fit" },
  { id: "next-steps", label: "Practical next steps" },
  { id: "related", label: "Related roles" },
];

export default function RoleGuide({
  role,
  content,
  salary,
  relatedRoles,
  proofHref,
  interviewHref,
}: {
  role: Role;
  content: RoleContent;
  salary: RoleSalaryView;
  relatedRoles: RelatedRole[];
  proofHref: string;
  interviewHref: string;
}) {
  return (
    <div className="grid gap-10 lg:grid-cols-[248px_minmax(0,1fr)]">
      <aside className="lg:pr-2">
        <RoleTableOfContents items={TOC} />
      </aside>

      <div className="min-w-0">
        <div id="snapshot" className="mb-12">
          <RoleSnapshot
            lane={role.lane}
            level={role.level}
            mode={role.mode}
            altTitles={role.alternativeTitles}
            confidence={role.compensationConfidence}
            proofHref={proofHref}
            interviewHref={interviewHref}
          />
        </div>

        <Section id="what-it-does" title="What this role actually does" first>
          <Prose paragraphs={content.whatItDoes} />
        </Section>

        <Section id="where-it-sits" title="Where the role sits">
          <OrganizationalContext paragraphs={content.whereItSits} />
        </Section>

        <Section id="responsibilities" title="Core responsibilities">
          <ResponsibilityList items={content.responsibilities} />
        </Section>

        <Section id="cadence" title="Daily, weekly, and reactive work">
          <WorkCadenceTimeline cadence={content.cadence} />
        </Section>

        <Section id="deliverables" title="Deliverables">
          <OutputAndDeliverables items={content.deliverables} />
        </Section>

        <Section id="success" title="How success is judged">
          <SuccessSignals signals={content.successSignals} caveat={content.successCaveat} />
        </Section>

        <Section id="tools" title="Tools in practice">
          <ToolWorkflowTable tools={content.tools} />
        </Section>

        <Section id="skills" title="Skills and prerequisite knowledge">
          <SkillRequirements
            hardSkills={content.hardSkills}
            workingSkills={content.workingSkills}
            prerequisite={content.prerequisiteKnowledge}
          />
        </Section>

        <Section id="levels" title="Expectations by level">
          <LevelExpectationsTable levels={content.levels} />
        </Section>

        <Section id="proof" title="Proof of work and portfolio">
          <ProofOfWorkBlock
            intro={content.proofIntro}
            strongExamples={content.strongExamples}
            weakEvidence={content.weakEvidence}
          />
        </Section>

        <Section id="mistakes" title="Common mistakes and misconceptions">
          <CommonMistakes mistakes={content.commonMistakes} misconception={content.commonMisconception} />
        </Section>

        <Section id="boundaries" title="Scope boundaries">
          <BoundaryComparison owns={content.usuallyOwns} doesNotOwn={content.usuallyDoesNotOwn} />
        </Section>

        <Section id="interview" title="Interview focus">
          <InterviewPreparation intro={content.interviewIntro} questions={content.exampleQuestions} />
        </Section>

        <Section id="compensation" title="Compensation and role risks">
          <SalaryEvidenceBlock
            confidence={salary.confidence}
            tier={salary.tier}
            intro={content.compensationIntro}
            roleRisks={content.roleRisks}
            hasReliableRange={salary.hasReliableRange}
            range={salary.range}
            geography={salary.geography}
            employmentModel={salary.employmentModel}
            sourceLabel={salary.sourceLabel}
            sourceUrl={salary.sourceUrl}
            noRangeText={noReliableRange.body}
            variablesText={compensationVariables.body}
            legend={compensationEvidenceLegend}
            methodologyHref="/salary-methodology"
          />
        </Section>

        <Section id="career" title="Career path and role fit">
          <CareerProgression progression={content.progression} fit={content.fit} nonFit={content.nonFit} />
        </Section>

        <Section id="next-steps" title="Practical next steps">
          <NextSteps items={content.nextSteps} />
        </Section>

        <Section id="related" title="Related roles">
          <RelatedRoles roles={relatedRoles} />
        </Section>

        <SourceAndReviewStatus />
      </div>
    </div>
  );
}
