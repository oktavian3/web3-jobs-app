import { roles, type CareerLane, type Role } from "./roles";

export type InterviewCategory = "Role judgment" | "Tools" | "Evidence" | "Portfolio" | "Collaboration" | "Risk" | "Execution" | "Compensation";

export type InterviewQuestion = {
  lane: CareerLane;
  roleSlug: string;
  roleTitle: string;
  category: InterviewCategory;
  question: string;
  tests: string;
  weakPattern: string;
  answerFramework: string;
  strongStructure: string;
  sampleOutline: string[];
  followUps: string[];
  selfReview: string[];
};

const categoryOrder: InterviewCategory[] = ["Role judgment", "Tools", "Evidence", "Portfolio", "Collaboration", "Risk", "Execution", "Compensation"];

function firstOrFallback(items: string[], fallback: string) {
  return items[0] ?? fallback;
}

function secondOrFallback(items: string[], fallback: string) {
  return items[1] ?? firstOrFallback(items, fallback);
}

function roleQuestions(role: Role): InterviewQuestion[] {
  const output = firstOrFallback(role.expectedOutputs, "role-specific output");
  const tool = firstOrFallback(role.tools, "the main tool");
  const secondTool = secondOrFallback(role.tools, tool);
  const proof = firstOrFallback(role.proofOfWork, "portfolio artifact");
  const skill = firstOrFallback(role.mustHave, "role judgment");
  const dailyWork = firstOrFallback(role.dailyWork, "day-to-day work");

  const templates: Array<{
    category: InterviewCategory;
    question: string;
    tests: string;
    weakPattern: string;
    answerFramework: string;
    sampleOutline: string[];
    followUps: string[];
  }> = [
    {
      category: "Role judgment",
      question: `What does strong ${role.title} work look like beyond activity or output volume?`,
      tests: `Whether you understand ${role.title} outcomes, quality signals, and trade-offs.`,
      weakPattern: "Listing tasks without explaining how quality, risk, or impact is judged.",
      answerFramework: "Define the outcome, name two quality signals, give one concrete example, and explain a trade-off.",
      sampleOutline: [`Outcome: ${role.summary}`, `Quality signal: ${skill}`, `Example output: ${output}`, "Trade-off: speed versus accuracy or clarity."],
      followUps: ["How would you measure the result?", "What would make the work unacceptable?"],
    },
    {
      category: "Tools",
      question: `How would you use ${tool} and ${secondTool} in a ${role.title} workflow?`,
      tests: "Tool fluency, practical workflow thinking, and ability to avoid tool-name dropping.",
      weakPattern: "Saying you know the tools without describing an actual workflow or artifact.",
      answerFramework: "Name the workflow, explain each tool's job, show the artifact produced, and describe handoff.",
      sampleOutline: [`Workflow: ${dailyWork}`, `${tool}: capture or build the first artifact.`, `${secondTool}: review, coordinate, or publish the work.`, `Output: ${output}.`],
      followUps: ["What would you do if the team used a different tool?", "How would you document the workflow for someone else?"],
    },
    {
      category: "Evidence",
      question: `What evidence would you collect before making a ${role.title} recommendation?`,
      tests: "Source discipline, assumption handling, and ability to separate fact from interpretation.",
      weakPattern: "Jumping to an answer from vibes, popularity, or a single metric.",
      answerFramework: "List sources, state what each source proves, name limitations, then make a bounded recommendation.",
      sampleOutline: ["Primary sources first.", "Supporting metrics or examples second.", "Caveats and unknowns.", "Recommendation with confidence level."],
      followUps: ["What evidence would change your mind?", "How would you explain uncertainty to a non-expert?"],
    },
    {
      category: "Portfolio",
      question: `Walk me through your ${proof} as if I were evaluating you for ${role.title}.`,
      tests: "Case-study structure, ownership clarity, and ability to connect proof to role expectations.",
      weakPattern: "Showing the artifact without explaining context, decisions, constraints, or lessons.",
      answerFramework: "Use context, task, final output, decisions, limitations, and next iteration.",
      sampleOutline: ["Context and audience.", `Task: ${role.assignment}`, `Final artifact: ${proof}.`, "Decision notes and limitations."],
      followUps: ["What would you improve with one more week?", "Which part best proves you can do the role?"],
    },
    {
      category: "Collaboration",
      question: `How would you coordinate with another team while doing ${dailyWork.toLowerCase()}?`,
      tests: "Cross-functional communication, ownership, escalation, and async clarity.",
      weakPattern: "Assuming everyone already agrees or failing to define owner, timeline, and decision points.",
      answerFramework: "Name stakeholders, define the decision, clarify owner and timeline, then document the update loop.",
      sampleOutline: ["Stakeholders and decision owner.", "Inputs needed.", "Update rhythm.", `Final shared artifact: ${output}.`],
      followUps: ["What if a stakeholder disagrees?", "How would you keep the work visible asynchronously?"],
    },
    {
      category: "Risk",
      question: `What can go wrong in ${role.title} work, and how would you reduce that risk?`,
      tests: "Risk awareness, safety judgment, and practical mitigation.",
      weakPattern: "Ignoring scams, bad data, unclear ownership, user harm, or overclaiming.",
      answerFramework: "Name the risk, explain impact, choose a prevention step, and define an escalation or review trigger.",
      sampleOutline: [`Risk from role context: ${firstOrFallback(role.commonMistakes, "unclear assumptions")}.`, "Impact on users, team, or trust.", "Prevention step.", "Escalation trigger."],
      followUps: ["When would you stop the work?", "What would you document for the next person?"],
    },
    {
      category: "Execution",
      question: `You have one week to produce ${output}. How do you plan the work?`,
      tests: "Prioritization, scope control, quality control, and delivery discipline.",
      weakPattern: "Trying to do everything, skipping review, or not defining a usable final deliverable.",
      answerFramework: "Define scope, split milestones, reserve review time, and state the final handoff format.",
      sampleOutline: ["Day 1: scope and sources.", "Days 2-3: draft or build.", "Day 4: review and gaps.", "Day 5: package and handoff."],
      followUps: ["What would you cut if time shrank?", "How would you make the work reusable?"],
    },
    {
      category: "Compensation",
      question: `How would you evaluate a ${role.title} offer with mixed cash, token, contractor, or trial-task terms?`,
      tests: "Compensation literacy, boundary setting, and ability to separate salary from speculative or conditional value.",
      weakPattern: "Treating token value, bounty outcomes, or vague future upside as guaranteed salary.",
      answerFramework: "Separate cash, tokens, vesting, payment schedule, employment type, scope, and risk before deciding.",
      sampleOutline: ["Cash and payment schedule.", "Token terms and vesting.", "Contractor or employee obligations.", "Scope, timezone, and trial-task boundaries."],
      followUps: ["Which term would you clarify first?", "What would make the offer unsafe or unrealistic?"],
    },
  ];

  return templates.map((item) => ({
    lane: role.lane,
    roleSlug: role.slug,
    roleTitle: role.title,
    category: item.category,
    question: item.question,
    tests: item.tests,
    weakPattern: item.weakPattern,
    answerFramework: item.answerFramework,
    strongStructure: item.answerFramework,
    sampleOutline: item.sampleOutline,
    followUps: item.followUps,
    selfReview: [
      "Did I answer the actual question?",
      "Did I name a concrete artifact, source, decision, or constraint?",
      "Did I explain trade-offs and limitations?",
      "Did I avoid unsupported salary, token, or outcome claims?",
    ],
  }));
}

export const interviewQuestions: InterviewQuestion[] = roles.flatMap(roleQuestions);
export const interviewCategories = categoryOrder;
