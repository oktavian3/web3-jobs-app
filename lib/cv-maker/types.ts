export interface Contact {
  name: string;
  title: string; // target role
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  portfolioUrl?: string;
}

export interface ExperienceEntry {
  id: string;
  title: string;
  company: string;
  location: string;
  start: string;
  end: string; // "Present" allowed
  bullets: string[]; // one achievement per line, no bullet char stored
}

export interface EducationEntry {
  id: string;
  degree: string;
  school: string;
  location: string;
  start: string;
  end: string;
}

export interface CertificationEntry {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
}

export interface ProjectEntry {
  id: string;
  name: string;
  description: string;
  link?: string;
}

export interface LanguageEntry {
  id: string;
  language: string;
  proficiency: string; // e.g. "Native", "Professional", "Conversational"
}

export interface AwardEntry {
  id: string;
  title: string;
  issuer: string;
  date: string;
}

export interface CVData {
  contact: Contact;
  summary: string;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: string; // comma-separated, stored as raw string
  certifications: CertificationEntry[];
  projects: ProjectEntry[];
  languages: LanguageEntry[];
  awards: AwardEntry[];
}

// Every list section in CVData, keyed by field name — used to build one
// generic add/remove/update updater instead of six near-identical ones.
export type ListSectionKey = "experience" | "education" | "certifications" | "projects" | "languages" | "awards";

function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function createEmptyContact(): Contact {
  return { name: "", title: "", email: "", phone: "", location: "", linkedin: "", portfolioUrl: "" };
}

export function createExperienceEntry(): ExperienceEntry {
  return { id: newId(), title: "", company: "", location: "", start: "", end: "", bullets: [""] };
}

export function createEducationEntry(): EducationEntry {
  return { id: newId(), degree: "", school: "", location: "", start: "", end: "" };
}

export function createCertificationEntry(): CertificationEntry {
  return { id: newId(), name: "", issuer: "", date: "", credentialUrl: "" };
}

export function createProjectEntry(): ProjectEntry {
  return { id: newId(), name: "", description: "", link: "" };
}

export function createLanguageEntry(): LanguageEntry {
  return { id: newId(), language: "", proficiency: "Professional" };
}

export function createAwardEntry(): AwardEntry {
  return { id: newId(), title: "", issuer: "", date: "" };
}

export function createEmptyCVData(): CVData {
  return {
    contact: createEmptyContact(),
    summary: "",
    experience: [],
    education: [],
    skills: "",
    certifications: [],
    projects: [],
    languages: [],
    awards: [],
  };
}

/**
 * Flattened text used by the JD-match checker: summary + skills + every
 * experience title/company/bullet + every project description. Per the spec,
 * this is what gets tokenized and compared against a pasted job description.
 */
export function buildCvText(data: CVData): string {
  const experienceText = data.experience
    .map((entry) => [entry.title, entry.company, ...entry.bullets].join(" "))
    .join(" ");
  const projectText = data.projects.map((entry) => entry.description).join(" ");
  return [data.summary, data.skills, experienceText, projectText].join(" ");
}
