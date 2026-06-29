# KRAFT Post-Launch Fix Validation

Date: 2026-06-29

## Files changed

- `app/job-boards/page.tsx`
- `data/jobBoards.ts`
- `app/portfolio/page.tsx`
- `app/portfolio/[slug]/page.tsx`
- `data/portfolioProjects.ts`
- `app/get-hired/page.tsx`
- `data/hiringGuides.ts`
- `app/faq/page.tsx`
- `components/kraft/FaqExplorer.tsx`
- `data/faq.ts`
- `app/interview-prep/page.tsx`
- `data/interviewQuestions.ts`
- `components/Navbar.tsx`
- `app/roles/[slug]/page.tsx`
- `components/kraft/RoleDetailInteractive.tsx`
- `data/roleResearch.ts`
- `data/salaryContext.ts`
- `data/tools.ts`

## Routes tested

- `/`
- `/job-boards`
- `/portfolio`
- `/portfolio/community-moderator`
- `/portfolio/web3-virtual-assistant`
- `/get-hired`
- `/faq`
- `/interview-prep`
- `/roles/research-writer`
- Generated route coverage includes all 37 `/roles/[slug]` routes and all 37 `/portfolio/[slug]` routes.

## Content migrated

- Job Boards now orders sections as manual curated jobs, Selected by KRAFT, ecosystem boards, then general directory.
- Ecosystem sources added: TON Jobs, Arbitrum Jobs, Optimism Jobs, Base Jobs, and Base Ecosystem.
- Portfolio briefs now exist for every current role slug and include execution plan, rubric, tools, case-study packaging, and checklist.
- Get Hired now has navigable sections for CV/ATS, profile, portfolio, applications, outreach, trials, interviews, compensation, safety, and templates.
- FAQ content moved to categorized searchable accordion data and removed unsupported salary ranges and vague hype claims.
- Interview Prep now supports lane -> role -> question category and generates eight structured questions per role.
- Mobile navigation no longer uses Menu/X hamburger toggle and remains visible at 390px.
- Role research data now includes structured salary evidence, source references, confidence, and last-reviewed fields.
- Tool metadata now provides official URLs for the role tools used across role pages.

## Manual verification

- `/job-boards`: manual curated jobs section appears before Selected by KRAFT; ecosystem links resolve to official TON, Arbitrum, Optimism, and Base URLs; empty curated jobs state remains honest.
- `/portfolio/community-moderator` and `/portfolio/web3-virtual-assistant`: detail pages render execution plan, rubric, tools, case-study packaging, and checklist.
- `/faq`: search works for `salary`; old unsupported salary range text is absent.
- `/interview-prep`: role and category selection works; selected prompts show follow-ups and self-score rubric.
- `/roles/research-writer`: salary evidence renders source IDs and no verified direct benchmark language for adjacent-only evidence.
- 390px viewport: small-screen navigation remains visible, no hamburger text/toggle appears, and checked pages had no page-level horizontal overflow.

## Command results

- `npx tsc --noEmit`: passed after each implementation phase and final phase.
- `npm run lint`: passed after each implementation phase and final phase.
- `npm run build`: passed after each implementation phase and final phase.
- `npm run audit:routes`: passed after each implementation phase and final phase.
- Final route audit: 164 routes checked, 0 failures, 0 empty href routes.

## Remaining limitations

- Manual curated jobs remain empty by design until real opportunities are added to `data/curatedJobs.ts`.
- Role salary evidence is evidence-aware, but it is not a live salary feed and should be refreshed when sources change.
- Base Jobs is a core-team careers page, not a complete Base ecosystem job aggregator; the Base Ecosystem directory is included for company discovery.
- Adjacent-only salary sources are shown as context without exact pay display on role pages.
