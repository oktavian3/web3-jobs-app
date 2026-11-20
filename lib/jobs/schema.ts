import { z } from "zod";
import { careerLanes } from "@/data/roles";

export const LANES = careerLanes.map((l) => l.lane) as [string, ...string[]];
export const WORK_TYPES = ["Remote", "Hybrid", "On-site"] as const;
export const EMPLOYMENT_TYPES = ["Full-time", "Part-time", "Contract", "Freelance", "Contributor", "Internship", "Ambassador"] as const;
export const SENIORITIES = ["Entry-level", "Mid", "Senior", "Lead", "Not specified"] as const;

const optionalUrl = z
  .string()
  .trim()
  .max(500)
  .refine((v) => v === "" || /^https:\/\//i.test(v), "Use a full https:// URL")
  .optional()
  .default("");

/** Form + API validation for admin-posted jobs. */
export const jobInputSchema = z.object({
  title: z.string().trim().min(2, "Title is required").max(140),
  company: z.string().trim().min(1, "Company is required").max(100),
  company_logo_url: optionalUrl,
  lane: z.enum(LANES, { message: "Pick a career lane" }),
  work_type: z.enum(WORK_TYPES),
  employment_type: z.enum(EMPLOYMENT_TYPES).optional().nullable(),
  location: z.string().trim().max(120).optional().default(""),
  seniority: z.enum(SENIORITIES).default("Not specified"),
  salary: z.string().trim().max(80).optional().default(""),
  apply_url: z
    .string()
    .trim()
    .min(1, "Apply URL is required")
    .max(500)
    .refine((v) => /^https:\/\//i.test(v), "Use a full https:// URL"),
  description: z.string().trim().max(8000).optional().default(""),
  role_slug: z.string().trim().max(80).optional().default(""),
  tags: z.array(z.string().trim().min(1).max(32)).max(10).default([]),
  is_published: z.boolean().default(false),
  posted_at: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD"),
});

export type JobInput = z.infer<typeof jobInputSchema>;

export type JobRecord = JobInput & {
  id: string;
  created_at: string;
  updated_at: string;
};
