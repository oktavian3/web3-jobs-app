// Canonical career journey for Get Hired: 13 stages from newbie to first Web3 role,
// plus three starting paths. This is product journey copy grounded in the approved
// Get Hired page copy (KRAFT_PUBLIC_PAGE_COPY §11), the hiring playbook, and shared
// safety/employment blocks (SB-05, SB-06, SB-09). It never promises employment.

export type JourneyStage = {
  id: number;
  slug: string;
  title: string;
  objective: string;
  whatToDo: string[];
  expectedOutput: string;
  commonMistake: string;
  completionSignal: string;
  link: { label: string; href: string };
};

export type HiringPath = {
  id: "A" | "B" | "C";
  title: string;
  whoItIsFor: string;
  steps: string[];
  note: string;
};

export const journeyStages: JourneyStage[] = [
  {
    id: 1,
    slug: "understand-web3-teams",
    title: "Understand how Web3 teams work",
    objective: "Build an accurate mental model of how Web3 teams operate before choosing a role.",
    whatToDo: [
      "Learn wallets, transactions, and safety basics.",
      "See how protocols, DAOs, and companies are structured and ship work.",
      "Notice how contributor, contractor, freelance, and full-time work differ.",
    ],
    expectedOutput: "A short written summary of how a Web3 team ships work and where roles sit.",
    commonMistake: "Chasing a title or token price before understanding the actual work.",
    completionSignal: "You can explain what different Web3 teams do and how work gets shipped.",
    link: { label: "Learn the basics", href: "/learn-web3" },
  },
  {
    id: 2,
    slug: "choose-target-role",
    title: "Choose one realistic target role",
    objective: "Pick a single role that matches your interests, current evidence, and the work you want to do.",
    whatToDo: [
      "Compare roles by the actual work, not the title.",
      "Read the scope and boundary notes on the role guide.",
      "Use the Skill Check if several paths look plausible.",
    ],
    expectedOutput: "One target role with a note on why it fits and what it does not cover.",
    commonMistake: "Keeping every option open instead of committing to one target.",
    completionSignal: "You can name one role and describe its scope and boundaries.",
    link: { label: "Browse the role directory", href: "/roles" },
  },
  {
    id: 3,
    slug: "learn-foundations",
    title: "Learn the minimum foundations for that role",
    objective: "Learn only the prerequisites the target role actually needs next.",
    whatToDo: [
      "Open the role guide's skills and prerequisite knowledge.",
      "Use role-linked learning resources.",
      "Skip material you can already prove.",
    ],
    expectedOutput: "Notes or small exercises covering the role's prerequisite knowledge.",
    commonMistake: "Collecting courses and certificates instead of building toward the role's evidence.",
    completionSignal: "You can complete a scoped task in the role's area with review.",
    link: { label: "Find role-linked learning", href: "/learn-web3" },
  },
  {
    id: 4,
    slug: "study-outputs",
    title: "Study the actual outputs expected from the role",
    objective: "Understand the deliverables and quality signals the role is judged on.",
    whatToDo: [
      "Read the role's deliverables, success signals, and proof standards.",
      "Find real examples of the artifact the role produces.",
      "Note what a strong version looks like versus weak evidence.",
    ],
    expectedOutput: "A clear list of the artifacts you will need to produce.",
    commonMistake: "Confusing activity with the deliverables reviewers actually inspect.",
    completionSignal: "You know what a strong version of the role's main artifact looks like.",
    link: { label: "See the role guide", href: "/roles" },
  },
  {
    id: 5,
    slug: "build-proof",
    title: "Build a simulated proof-of-work project",
    objective: "Produce one role-relevant artifact using a realistic, clearly simulated scenario.",
    whatToDo: [
      "Pick the role's portfolio brief.",
      "Work from public sources and label the work as simulated.",
      "Follow the brief's rubric and name your assumptions.",
    ],
    expectedOutput: "One completed, clearly-labeled simulated project matching the role's deliverables.",
    commonMistake: "Presenting simulated work as real client or protocol experience.",
    completionSignal: "Your artifact meets the brief's rubric and names its assumptions.",
    link: { label: "Open a portfolio brief", href: "/portfolio" },
  },
  {
    id: 6,
    slug: "get-experience",
    title: "Get experience through contribution",
    objective: "Gain real experience through volunteering, contributing, freelance work, internships, or self-initiated projects.",
    whatToDo: [
      "Find contributor, bounty, or small freelance opportunities.",
      "Keep scope, ownership, and payment terms clear before starting.",
      "Document what you personally did.",
    ],
    expectedOutput: "At least one piece of real, attributable work with clear ownership.",
    commonMistake: "Treating volunteering as mandatory, or accepting unpaid production disguised as a trial.",
    completionSignal: "You have real work you can describe honestly, kept distinct from simulated projects.",
    link: { label: "Find contributor sources", href: "/job-boards" },
  },
  {
    id: 7,
    slug: "portfolio-case-study",
    title: "Turn the work into a clear portfolio case study",
    objective: "Package your strongest work as a case study that shows decisions, not just output.",
    whatToDo: [
      "Use context, task, decisions, constraints, output, and limitations.",
      "Distinguish simulated work from real contributor or professional work.",
      "Redact private user, company, security, or compensation data.",
    ],
    expectedOutput: "One case study a reviewer can evaluate in a few minutes.",
    commonMistake: "Showing the artifact with no context, ownership, or limitations.",
    completionSignal: "A reviewer can understand what you owned and why it matters.",
    link: { label: "Package a case study", href: "/portfolio" },
  },
  {
    id: 8,
    slug: "improve-positioning",
    title: "Improve profile, CV, and role positioning",
    objective: "Make your profile, CV, and positioning answer the target role quickly.",
    whatToDo: [
      "Use an ATS-safe CV for portals and a visual version for networking.",
      "Lead with the target role and your strongest proof.",
      "Keep creative work in a portfolio, not buried in the CV.",
    ],
    expectedOutput: "A role-targeted CV and profile that lead with evidence.",
    commonMistake: "Generic “Web3 enthusiast” positioning with no proof near the top.",
    completionSignal: "Someone can tell your target role and evidence within seconds.",
    link: { label: "Open the profile playbook", href: "/get-hired#profile" },
  },
  {
    id: 9,
    slug: "build-target-list",
    title: "Build a target list of projects and teams",
    objective: "Assemble a focused list of teams whose work and scope match your evidence.",
    whatToDo: [
      "Use job boards and ecosystem directories to discover teams.",
      "Verify each opening on the company's official domain.",
      "Note why each team fits your target role and level.",
    ],
    expectedOutput: "A short, qualified list of teams and roles worth pursuing.",
    commonMistake: "Mass-listing companies with no fit check or verification.",
    completionSignal: "Each target has a clear reason and a verified official source.",
    link: { label: "Discover teams and boards", href: "/job-boards" },
  },
  {
    id: 10,
    slug: "targeted-outreach",
    title: "Use targeted outreach and relevant applications",
    objective: "Apply and reach out selectively where level, work type, and proof match.",
    whatToDo: [
      "Tailor the opening, evidence, and questions to the role.",
      "Contact a relevant person with one clear reason and one proof link.",
      "Avoid mass DMs and rewriting your whole identity per listing.",
    ],
    expectedOutput: "Tailored applications and outreach tied to specific roles.",
    commonMistake: "Spraying generic messages or applications with no relevance.",
    completionSignal: "Your applications reference the role and attach relevant proof.",
    link: { label: "Review application guidance", href: "/get-hired#applications" },
  },
  {
    id: 11,
    slug: "prepare-interviews",
    title: "Prepare for interviews and trial tasks",
    objective: "Practice role-specific questions and confirm trial-task scope before starting.",
    whatToDo: [
      "Practice the target role's interview questions with real examples.",
      "Prepare to show trade-offs, limitations, and what you owned.",
      "Confirm trial scope, time, ownership, and payment before you begin.",
    ],
    expectedOutput: "Prepared answers built from real work and clear trial-task boundaries.",
    commonMistake: "Memorizing scripts, or accepting an unbounded unpaid trial.",
    completionSignal: "You can answer role questions with evidence and have clarified any trial scope.",
    link: { label: "Practice interviews", href: "/interview-prep" },
  },
  {
    id: 12,
    slug: "review-offer",
    title: "Review the offer, scope, payment terms, and safety risks",
    objective: "Evaluate an offer by separating cash, tokens, scope, and risk before deciding.",
    whatToDo: [
      "Separate cash, token, vesting, and employment type.",
      "Confirm the payment schedule and contractor-versus-employee terms.",
      "Verify domains and never share a seed phrase or pay to apply.",
    ],
    expectedOutput: "A clear breakdown of the offer's real terms and any risks.",
    commonMistake: "Treating token or bonus value as guaranteed salary, or skipping safety checks.",
    completionSignal: "You understand exactly what you are agreeing to and confirmed it is safe.",
    link: { label: "Read safety and offer notes", href: "/disclaimers" },
  },
  {
    id: 13,
    slug: "onboard-first-role",
    title: "Onboard into the first role and document the work",
    objective: "Start well by learning the team's systems and documenting your work from day one.",
    whatToDo: [
      "Learn the team's tools, norms, and decision rights.",
      "Keep a running record of what you own and ship.",
      "Turn early work into future evidence and references.",
    ],
    expectedOutput: "A working rhythm and a running record of your contributions.",
    commonMistake: "Not documenting decisions, which makes future evidence and reviews harder.",
    completionSignal: "You are shipping scoped work and can show what you did.",
    link: { label: "Revisit your role guide", href: "/roles" },
  },
];

export const hiringPaths: HiringPath[] = [
  {
    id: "A",
    title: "No previous experience",
    whoItIsFor: "New to Web3 with no prior related work.",
    steps: [
      "Build a clearly-labeled simulated proof-of-work project.",
      "Get real experience through volunteer or contributor work.",
      "Turn the work into a portfolio case study.",
      "Apply to entry-level roles that match your evidence.",
    ],
    note: "Volunteering and contributor work are a common beginner path, not a requirement. A clearly-labeled simulated project still counts as evidence.",
  },
  {
    id: "B",
    title: "Transferable Web2 skill",
    whoItIsFor: "You already have a professional skill from non-Web3 work.",
    steps: [
      "Translate your existing skill into a Web3 context.",
      "Build one Web3-specific proof artifact.",
      "Send targeted applications that lead with the skill you already have.",
    ],
    note: "Lead with the skill you already have and add one Web3-specific artifact, rather than restarting from zero.",
  },
  {
    id: "C",
    title: "Existing Web3 experience",
    whoItIsFor: "You have some Web3 experience and want to specialize or move up.",
    steps: [
      "Improve the evidence behind your existing work.",
      "Show measurable outcomes and clear ownership.",
      "Apply to a more specialized or senior role.",
    ],
    note: "Replace activity claims with outcomes and ownership, and target depth over breadth.",
  },
];
