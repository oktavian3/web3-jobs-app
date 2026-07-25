import type { Metadata } from "next";
import { careerLanes } from "@/data/roles";
import { interviewSets, interviewFramework } from "@/data/interviewPrep";
import { Shell, Container } from "@/components/kraft/Primitives";
import PageHeader from "@/components/kraft/PageHeader";
import CareerNext from "@/components/kraft/career/CareerNext";
import InterviewPrepExplorer, { type ExplorerSet } from "@/components/kraft/InterviewPrepExplorer";

export const metadata: Metadata = {
  title: "Interview Prep",
  description:
    "Practice role-specific Web3 interview questions with a framework to reason with — not scripts to memorize. Choose a lane, a role, and a question category.",
};

// Compact, client-safe records (keeps the large role-content JSON on the server).
const sets: ExplorerSet[] = interviewSets.map((set) => ({
  slug: set.slug,
  roleTitle: set.roleTitle,
  lane: set.lane,
  whatItTests: set.whatItTests,
  questions: set.questions,
  weakPatterns: set.weakPatterns,
  questionCount: set.questionCount,
}));

const lanes = careerLanes.map((lane) => lane.lane);

export default async function InterviewPrepPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const { role } = await searchParams;
  const initialSlug = role && interviewSets.some((set) => set.slug === role) ? role : undefined;

  return (
    <Shell>
      <Container className="space-y-10 py-12 sm:py-16">
        <PageHeader
          eyebrow="Interview prep"
          title="Practice the work behind the question."
          copy="Choose a lane and role to see its real interview questions, what each tests, and a framework for strong answers. These are practice prompts and general guidance — not memorized scripts, and not every company interviews the same way."
        />

        <InterviewPrepExplorer sets={sets} lanes={lanes} framework={interviewFramework} initialSlug={initialSlug} />

        <CareerNext
          heading="Prepare with evidence"
          items={[
            { title: "Build proof-of-work", href: "/portfolio", why: "Answers land better when backed by a real artifact — each role has a matching portfolio brief." },
            { title: "Re-read the role guide", href: "/roles", why: "The role guide's boundaries and proof standards are exactly what these questions test." },
            { title: "Get Hired journey", href: "/get-hired", why: "Interview practice is stage 11 — see how it fits before and after applications." },
          ]}
        />
      </Container>
    </Shell>
  );
}
