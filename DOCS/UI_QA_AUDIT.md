# KRAFT UI/UX QA Audit

Audit date: 2026-06-29  
Local target: http://127.0.0.1:3000  
Viewports audited: 1440px, 1024px, 768px, 390px

## Scope

KRAFT is being audited as a Web3 career learning centre, not a course platform. The audit covered the live local application, current routes, reusable KRAFT components, data files, interactive states, internal links, role slugs, console output, and responsive behavior.

Routes audited:

- `/`
- `/roles`
- all 37 `/roles/[slug]` routes linked from `/roles`
- `/skill-check`
- `/glossary`
- `/roadmaps`
- `/interview-prep`
- `/portfolio`
- `/get-hired`
- `/bridge`
- `/resources`
- `/learn-web3`
- `/job-boards`
- `/disclaimers`
- `/faq`

## Initial Automated Results

| Check | Result |
| --- | --- |
| Role route count | 37 role detail routes found from `/roles` |
| Role routes at 1440, 1024, 768, 390 | 148 checks, all returned 200 |
| Role route console errors | None observed |
| Role route document overflow | None observed |
| Non-role route status checks | All audited routes returned 200 |
| Non-role route document overflow | None observed |
| Empty `href` / `href="#"` sample | None observed in audited route samples |
| Current `/roles/research-writer` tool behavior | Tools render as inert text chips |

Note: the automated contrast heuristic over-reports some white text on gradient panels because computed CSS backgrounds are transparent at text-node level. Findings below only record issues confirmed by DOM/component inspection or visible behavior, not every heuristic sample.

## Findings Table

| Route | Section/component | Problem | Severity | Expected behavior | File responsible | Fix applied | Validation result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | Start cards / "Exploring a Career" | Featured card mixes inherited text color with variant styling and can render light text on a light surface during visual changes. | High | Use one consistent readable card variant with clear heading, body, CTA, hover, focus-visible, and mobile-safe text. | `app/page.tsx` | Pending | Pending |
| `/` | Hero preview cards | Role Match, Readiness, Glossary, and Portfolio look like static data cards and are not labeled as preview. | High | Animate as product preview, make each card a real link, pause cycling on hover/focus, support reduced motion. | `app/page.tsx`, new component | Pending | Pending |
| `/` | Hero preview cards | Cards appear interactive visually but have no action. | High | Every preview card should navigate to a meaningful internal destination. | `app/page.tsx` | Pending | Pending |
| `/` | Homepage job preview | "Selected by KRAFT" exists only on homepage and is not the required full Job Boards section. | Medium | Keep homepage preview but source it from structured selections. | `app/page.tsx`, `data/jobBoards.ts` or new data | Pending | Pending |
| `/job-boards` | Job Boards content | Page only lists external platforms; missing separate "Selected by KRAFT" recommendation section. | High | Add recommendation cards by use case: overall, remote, developers, non-technical, startup, entry browsing. | `app/job-boards/page.tsx`, data file | Pending | Pending |
| `/job-boards` | Curated jobs | Page has no manually maintained individual job section and current `curatedJobPicks` are search directions, not jobs. | High | Add active-only manual curated job data structure, empty state, sort by `addedAt`, safe external links. | `data/curatedJobs.ts`, `app/job-boards/page.tsx` | Pending | Pending |
| `/learn-web3` | Learning categories | Missing dedicated Creator category and featured source card. | High | Add "Creator" category and link to internal Indonesian guide plus original X source. | `data/learningResources.ts`, `app/learn-web3/page.tsx` | Pending | Pending |
| New route | Creator guide | Missing internal Indonesian guide for Web3 creator path. | High | Add data-driven guide at `/learn/creator` with required 14 sections and featured source CTA. | new route/data | Pending | Pending |
| `/roles/[slug]` | Tools section | Role tools render as non-clickable tags and provide no usage detail. | High | Tool chips with known metadata should open detail drawer/popover; unknown tools should remain non-clickable text. | `components/kraft/RoleDetailInteractive.tsx`, new tool data | Pending | Pending |
| `/roles/[slug]` | Salary Context | Role data uses unverified free-text compensation context; no source-backed ranges. | High | Replace exact/range-like claims with structured salary context and no verified benchmark message when no source exists. | `data/roles.ts`, `app/roles/[slug]/page.tsx`, `components/kraft/RoleDetailInteractive.tsx` | Pending | Pending |
| `/roles/[slug]` | Tabs and expandable content | Tabs work, but transitions are basic and tool cards are absent. | Medium | Add purposeful transition on active tab content and expandable tool drawer without layout shift. | `components/kraft/RoleDetailInteractive.tsx` | Pending | Pending |
| `/skill-check` | Quiz transition | Quiz advances, but transition is minimal and not clearly animated as a product interaction. | Low | Keep readable quiz flow; add subtle transform/opacity transition that respects reduced motion. | `app/skill-check/page.tsx` | Pending | Pending |
| Multiple | Interactive card focus | Several custom interactive cards rely on hover classes but do not always include explicit focus-visible affordances. | Medium | Links/cards/buttons should have visible focus ring and cursor/transition where clickable. | `app/page.tsx`, `components/kraft/Cards.tsx`, `app/job-boards/page.tsx` | Pending | Pending |
| `/` | Hero hamburger/menu | No separate floating hero hamburger was found in current code; mobile menu exists only in header. | Low | Keep menu inside header only. Do not add floating hero menu. | `components/Navbar.tsx`, `app/page.tsx` | No code change expected | Current code passes source inspection |
| All audited routes | Responsive layout | No document-level overflow observed at 1440, 1024, 768, or 390 in audited samples. | Low | Preserve no-overflow behavior after fixes. | Global/layout files | Pending revalidation | Initial pass passes |
| All audited routes | Internal route status | All audited route status checks returned 200; all 37 role routes passed across widths. | Low | Preserve route health after new routes/data additions. | App routes/data | Pending revalidation | Initial pass passes |

## Fix Plan

1. Fix the "Exploring a Career" card variant and sibling focus/hover behavior.
2. Add a dedicated animated hero product preview component with real links.
3. Add Creator learning data and an internal Indonesian guide route.
4. Replace `curatedJobPicks` with a manual curated-job schema and add selected-platform recommendations.
5. Upgrade Job Boards page with separate "Selected by KRAFT" and "New Jobs Curated by KRAFT" sections.
6. Add tool metadata and a role tool detail interaction.
7. Replace salary-context rendering with structured, non-invented compensation guidance.
8. Add a route/link audit script for repeatable validation.
9. Re-run lint, build, route/link audit, role route audit, browser console checks, responsive checks, and reduced-motion checks.

## Post-Fix Validation

| Route | Section/component | Problem | Severity | Expected behavior | File responsible | Fix applied | Validation result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | Start cards / "Exploring a Career" | Featured card risked unreadable inherited white text on a light surface. | High | Consistent readable card variant with clear CTA and focus/hover behavior. | `app/page.tsx` | Replaced mixed featured styling with light blue/white card, dark heading/body, blue CTA, focus-within border, hover lift, arrow motion. | Browser checked at 1440, 1024, 768, 390: 200, no overflow, no console errors. |
| `/` | Hero preview cards | Preview cards were static and non-actionable. | High | Animated, labeled product preview with real links and reduced-motion support. | `components/kraft/HeroProductPreview.tsx`, `app/page.tsx` | Added client preview with cycling role match/glossary/portfolio/readiness states, pause on hover/focus, internal links to Skill Check, Roadmaps, Glossary, Portfolio. | Browser verified 4 preview links and reduced-motion fallback (`revealAnimation: none`). |
| `/job-boards` | Selected by KRAFT | Required recommendation section was missing from Job Boards page. | High | Separate section recommending platforms by search need. | `data/curatedJobs.ts`, `app/job-boards/page.tsx` | Added `selectedJobPlatforms` data and visible "Selected by KRAFT platforms" cards with why selected, role categories, remote strength, salary visibility, and safe visit links. | Browser verified label and section presence. |
| `/job-boards` | New Jobs Curated by KRAFT | No manual curated-job section or schema. | High | Manual active-only job data, sorted by added date, honest empty state, no fake jobs. | `data/curatedJobs.ts`, `app/job-boards/page.tsx` | Added `CuratedJob` schema, `getActiveCuratedJobs`, `curatedJobsLastUpdated`, public empty state, and safe external apply link rendering for future active jobs. | Browser verified "New Jobs Curated by KRAFT" and empty state; route audit passed. |
| `/learn-web3` | Creator resource | Missing Creator category and source card. | High | Creator category with internal guide and original X source. | `data/learningResources.ts`, `app/learn-web3/page.tsx` | Added Creator category with `/learn/creator`, original SatyaXBT source, and creator role link. | Browser clicked Creator tab and verified `/learn/creator` link/source card appears. |
| `/learn/creator` | Creator guide | Missing Indonesian internal guide. | High | Data-driven Bahasa Indonesia guide with required sections and featured source CTA. | `data/creatorGuide.ts`, `app/learn/creator/page.tsx` | Added guide route with 14 sections, 30-day checklist, featured source card, and "Read the original post" external CTA. | Browser verified 200, title, CTA, no overflow. Build includes `/learn/creator`. |
| `/roles/[slug]` | Tools section | Tool chips were inert text and gave no details. | High | Known tools open detail drawer; unknown tools stay non-clickable text. | `data/tools.ts`, `components/kraft/RoleDetailInteractive.tsx` | Added tool metadata and detail panel with purpose, role usage, practical example, official site, and related learn resource where available. | Browser verified `/roles/research-writer`: 4 tool buttons, Dune drawer opens, official link present. |
| `/roles/[slug]` | Salary Context | Free-text salary context lacked verified benchmark structure. | High | No invented ranges; show structured compensation context and no-benchmark message. | `data/salaryContext.ts`, `components/kraft/RoleDetailInteractive.tsx` | Added `getSalaryContext(role)` and replaced display with seniority notes, employment types, pay factors, token risks, and no verified benchmark message. | Browser verified no-benchmark message on `/roles/research-writer`. |
| `/roles/[slug]` | Route health | Role detail routes must not 404. | High | Every role card links to a working detail page. | `data/roles.ts`, `app/roles/[slug]/page.tsx` | Preserved async Next 16 params fix and role static params. | Browser verified all 37 role routes returned 200; route audit checked 127 internal routes with no failures. |
| `/` `/roles` `/skill-check` `/learn-web3` `/learn/creator` `/job-boards` | Responsive layout | Must remain usable at required widths. | Medium | No document-level horizontal overflow at 1440, 1024, 768, 390. | Page/component files | Preserved constrained grids and mobile-friendly scroll strips. | Browser checked target pages at all four widths: no document overflow or console errors. |
| Header mobile | Mobile menu | Menu should exist only in real header, not hero overlay. | Low | Header menu opens on mobile; no floating hero hamburger. | `components/Navbar.tsx`, `app/page.tsx` | No floating hero menu found or added; header mobile menu preserved. | Browser clicked header menu at 390px and verified mobile nav content. |

## Commands Run

| Command/check | Result |
| --- | --- |
| `npx tsc --noEmit` | Passed |
| `npm run lint` | Passed |
| `npm run build` | Passed; 61 static pages generated, including `/learn/creator` and 37 role detail paths |
| `npm run audit:routes` | Passed; 127 routes checked, no failures, no empty `href` / `href="#"` routes |
| Browser role route audit | Passed; 37 role routes, no failures |
| Browser responsive audit | Passed on sampled target routes at 1440, 1024, 768, 390 |
| Browser interaction audit | Hero preview links, role tool drawer, skill-check controls, Creator tab/link, mobile menu, reduced motion verified |

## Remaining Limitations

- `data/curatedJobs.ts` intentionally contains no active job listings yet. The public UI shows an empty state instead of fake jobs.
- Salary context has no verified numeric ranges because no source URL, market, employment type, and review date are available per role.
- Tool metadata covers common KRAFT tools. Any role tool without verified metadata remains non-clickable text by design.
- The automated contrast heuristic is useful for catching suspicious text but still over-reports text on complex gradient panels; final contrast decisions used component inspection plus browser review.
