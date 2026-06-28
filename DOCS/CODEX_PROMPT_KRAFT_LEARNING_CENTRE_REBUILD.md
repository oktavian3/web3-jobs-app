# Codex Implementation Prompt — KRAFT Learning Centre Rebuild

You are working inside the existing `web3-jobs-app` repository on a dedicated rebuild branch.

## Source of truth

Read this file completely before editing:

- `docs/KRAFT_LEARNING_CENTRE_REBUILD_SPEC.md`

Use the attached blue payment-software landing page image as the main visual reference for:

- framed page composition
- large blue gradient hero
- spacing and section rhythm
- rounded product UI cards
- focused feature previews
- polished SaaS-level responsive design

Do **not** copy the reference brand, payment content, logo, exact art, or wording.

## Critical product correction

KRAFT is **not a course platform**.

It is a flexible Web3 career learning centre. Users must be able to open Roles, Skill Check, Glossary, Get Hired, Job Boards, Roadmaps, Interview Prep, and Portfolio Resources directly.

Do not add:

- course enrollment
- lesson modules
- mandatory progression
- course completion
- certificates
- “Launch Course” positioning
- wallet connection
- authentication
- payments

## Required workflow

### Step 1 — Audit before editing

Inspect the repository and report:

1. current routes
2. current data sources
3. reusable components
4. duplicated or stale content
5. legacy links that must be preserved
6. current build warnings and errors
7. exact files you plan to edit, create, migrate, redirect, or retire

Do not change code until the audit and implementation plan are shown.

### Step 2 — Implement in phases

After the audit, implement the specification in this order:

1. global design system, layout shell, header, footer, and route aliases
2. complete new homepage
3. Roles directory and role detail pages
4. Glossary
5. Get Hired
6. Job Boards
7. Skill Check
8. Roadmaps, Interview Prep, and Portfolio Resources
9. content migration and cross-linking
10. responsive, accessibility, metadata, and build QA

Keep the build working after every phase.

## Homepage requirements

Replace the current “Career Matters” messaging.

Use this exact hero copy:

- Eyebrow: `Web3 Career Learning Centre`
- Headline: `Know the work before you chase the title.`
- Subcopy: `Explore real Web3 roles, test your fit, learn the language, build proof-of-work, and apply with context.`
- Primary CTA: `Find My Role`
- Secondary CTA: `Explore Roles`

Use the full homepage structure and copy from Section 6 of the specification.

The homepage hero should be a large blue gradient rounded panel with real KRAFT feature mockups, including:

- role match
- readiness result
- glossary term
- portfolio checklist

Do not use fake user activity, fake testimonials, fake partner logos, or unverified job counts.

## Content requirements

Create typed canonical data files for:

- roles
- glossary
- skill check
- job platforms
- hiring guides
- roadmaps
- interview questions
- portfolio projects

Use the appendices in the specification as the initial production content.

Visible counts must be calculated from data arrays. Never hard-code “50+ terms” while rendering a different amount.

Every core page must cross-link to a useful next step. Examples:

- glossary term → related roles
- role → proof project and interview questions
- skill result → matching lane and role pages
- get hired guide → portfolio and job platforms
- job platform → job-safety checklist

## Existing route preservation

Preserve or redirect existing URLs:

- `/bridge` → `/get-hired`
- `/resources` → `/job-boards`

Do not break external links or delete working content before migration is complete.

## Design constraints

- modern geometric sans-serif typography
- cool grey page background
- white surfaces
- black text
- strong KRAFT blue accent
- large rounded sections
- subtle borders and shadows
- consistent max-width container
- meaningful micro-interactions only
- no serif headline style from the current build
- no crypto neon, random floating cubes, excessive glow, or template-like AI decoration

Implement reduced-motion support.

## Engineering constraints

- keep Next.js App Router
- TypeScript data and components
- no new database
- no auth
- no wallet connection
- localStorage only for skill-check result, saved roles, and optional checklist state
- semantic HTML and keyboard support
- visible focus states
- responsive validation at 1440, 1280, 1024, 768, 390, and 360px
- migrate deprecated `middleware` to the supported Next.js `proxy` convention if the repository uses it and the change is safe
- run lint, type checking if available, and `npm run build`

## Final report

When finished, provide:

1. summary of product and UI changes
2. files created and edited
3. routes implemented and redirects added
4. content counts loaded from data
5. responsive widths checked
6. accessibility checks completed
7. build results
8. remaining limitations or intentionally deferred features

Do not redesign KRAFT as a course. Do not stop after producing a visual shell. The result must be a complete, connected learning-centre website with real content.
