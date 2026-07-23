# KRAFT Implementation Specification

**Audience:** Coding agent implementing the approved Phase 3 content package.  
**Constraint:** This document specifies routes, schemas, components, migration, and QA. It does not authorize visual redesign beyond what content needs to remain usable.

## 1. Source-of-truth documents

The coding agent must read all 11 Phase 3 files before editing:

1. `KRAFT_MASTER_TAXONOMY.md`
2. `KRAFT_CONTENT_ARCHITECTURE.md`
3. `KRAFT_FINAL_ROLE_CONTENT.md`
4. `KRAFT_FINAL_PAGE_COPY.md`
5. `KRAFT_GLOSSARY_CONTENT_MODEL.md`
6. `KRAFT_SKILL_CHECK_SPEC.md`
7. `KRAFT_X_MATCHER_SPEC.md`
8. `KRAFT_SALARY_AND_EVIDENCE_REGISTER.md`
9. `KRAFT_FACT_CHECK_QUEUE.md`
10. `KRAFT_UI_CONTENT_SPEC.md`
11. `KRAFT_IMPLEMENTATION_SPEC.md`

When files conflict, use this precedence:

1. Final approved taxonomy and explicit user decisions.
2. Fact-check and safety restrictions.
3. Final role and page copy.
4. UI content and architecture recommendations.
5. Older repository content.

Do not import unsupported claims from legacy pages merely because they already exist.

## 2. Product boundaries

- KRAFT remains a Web3 career learning centre, not a course platform, recruitment agency, job guarantee, salary calculator, psychometric test, or hiring system.
- No authentication, wallet connection, payment, or database is required for the first implementation unless separately approved.
- Skill Check is core.
- X Profile Role Matcher is experimental, secondary, and stateless by default.
- `/posts` remains hidden until real editorial content exists.
- Do not fabricate jobs, testimonials, employers, learner activity, salaries, success rates, or partner logos.

## 3. Route actions

### Core pages

| Route | Action | Requirement |
|---|---|---|
| `/` | Update | Homepage copy and hierarchy from final page copy |
| `/roles` | Update | Canonical directory for 42 roles; search alternative and legacy titles |
| `/roles/[slug]` | Update dynamic route | Render complete role content and evidence fields |
| `/roadmaps` | Update | Roadmap index |
| `/roadmaps/[slug]` | Create or update | Roadmap detail pages |
| `/skill-check` | Update | Core stateless assessment |
| `/skill-check/results` | Create | Dedicated results state; allow query/session state without exposing private answers |
| `/glossary` | Update | Searchable glossary index |
| `/glossary/[slug]` | Create or update | Glossary term detail |
| `/learn-web3` | Create or update | Curated learning paths and resources |
| `/get-hired` | Update | Full hiring guide with anchored sections |
| `/job-boards` | Update | Curated jobs and platform directory in approved order |
| `/portfolio` | Update | Portfolio brief index |
| `/portfolio/[slug]` | Create | Complete project brief detail |
| `/interview-prep` | Update | Lane → role → category → question flow |
| `/faq` | Update | Categorized searchable FAQ |
| `/about` | Create | Publish only after identity facts are approved |
| `/privacy` | Create | Privacy / Data Use page reflecting actual implementation |
| `/methodology` | Create | Research and assessment methodology |
| `/salary-methodology` | Create | Four-tier salary evidence model |
| `/disclaimers` | Update | Safety, salary, external link, methodology, and non-advice boundaries |
| `/experiments/x-role-matcher` | Feature-flagged create | Experimental stateless public-evidence matcher; do not place in primary nav |
| `/posts` | Hide | Remove from navigation and sitemap until approved editorial inventory exists |

### Navigation and system states

- Navigation and footer are global components, not standalone public routes unless the repository already requires preview routes.
- Empty and error states are reusable content records for directory, job, portfolio, assessment, matcher, and fetch failures.
- A custom 404 route must provide a safe path to Roles, Skill Check, and Homepage.

## 4. Canonical role routes

| Route | Action | Content |
|---|---|---|
| `/roles/community-moderator` | Create or update | Canonical role detail for Community Moderator |
| `/roles/community-manager` | Create or update | Canonical role detail for Community Manager |
| `/roles/ambassador-manager` | Create or update | Canonical role detail for Ambassador Manager |
| `/roles/ecosystem-partnerships-manager` | Create or update | Canonical role detail for Ecosystem Partnerships Manager |
| `/roles/creator-ambassador-partner` | Create or update | Canonical role detail for Creator & Ambassador Partner |
| `/roles/partnerships-manager` | Create or update | Canonical role detail for Partnerships Manager |
| `/roles/growth-manager` | Create or update | Canonical role detail for Growth Manager |
| `/roles/content-creator` | Create or update | Canonical role detail for Content Creator |
| `/roles/research-writer` | Create or update | Canonical role detail for Research Writer |
| `/roles/social-media-manager` | Create or update | Canonical role detail for Social Media Manager |
| `/roles/crypto-journalist` | Create or update | Canonical role detail for Crypto Journalist |
| `/roles/product-marketing-manager` | Create or update | Canonical role detail for Product Marketing Manager |
| `/roles/product-manager` | Create or update | Canonical role detail for Product Manager |
| `/roles/product-operations` | Create or update | Canonical role detail for Product Operations |
| `/roles/technical-writer` | Create or update | Canonical role detail for Technical Writer |
| `/roles/operations-assistant` | Create or update | Canonical role detail for Operations Assistant |
| `/roles/operations-associate` | Create or update | Canonical role detail for Operations Associate |
| `/roles/customer-support-specialist` | Create or update | Canonical role detail for Customer Support Specialist |
| `/roles/defi-analyst` | Create or update | Canonical role detail for DeFi Analyst |
| `/roles/protocol-researcher` | Create or update | Canonical role detail for Protocol Researcher |
| `/roles/onchain-data-analyst` | Create or update | Canonical role detail for Onchain Data Analyst |
| `/roles/tokenomics-analyst` | Create or update | Canonical role detail for Tokenomics Analyst |
| `/roles/tokenomics-designer` | Create or update | Canonical role detail for Tokenomics Designer |
| `/roles/ecosystem-researcher` | Create or update | Canonical role detail for Ecosystem Researcher |
| `/roles/smart-contract-developer` | Create or update | Canonical role detail for Smart Contract Developer |
| `/roles/frontend-web3-developer` | Create or update | Canonical role detail for Frontend Web3 Developer |
| `/roles/developer-relations` | Create or update | Canonical role detail for Developer Relations |
| `/roles/smart-contract-auditor` | Create or update | Canonical role detail for Smart Contract Auditor |
| `/roles/node-operator-validator` | Create or update | Canonical role detail for Node Operator / Validator |
| `/roles/protocol-engineer` | Create or update | Canonical role detail for Protocol Engineer |
| `/roles/backend-engineer` | Create or update | Canonical role detail for Backend Engineer |
| `/roles/zk-engineer-cryptography-researcher` | Create or update | Canonical role detail for ZK Engineer / Cryptography Researcher |
| `/roles/governance-coordinator` | Create or update | Canonical role detail for Governance Coordinator |
| `/roles/web3-legal-compliance` | Create or update | Canonical role detail for Web3 Legal / Compliance |
| `/roles/web3-hr-talent-acquisition` | Create or update | Canonical role detail for Web3 HR / Talent Acquisition |
| `/roles/grant-writer` | Create or update | Canonical role detail for Grant Writer |
| `/roles/web3-educator-curriculum-builder` | Create or update | Canonical role detail for Web3 Educator / Curriculum Builder |
| `/roles/web3-product-designer` | Create or update | Canonical role detail for Web3 Product Designer |
| `/roles/brand-designer` | Create or update | Canonical role detail for Brand Designer |
| `/roles/motion-designer` | Create or update | Canonical role detail for Motion Designer |
| `/roles/nft-generative-artist` | Create or update | Canonical role detail for NFT Artist / Generative Artist |
| `/roles/market-maker` | Create or update | Canonical role detail for Market Maker |

## 5. Legacy redirects

Preserve external links. Use permanent redirects after the canonical destination is working.

| Legacy route | Destination | Rule |
|---|---|---|
| `/bridge` | `/get-hired` | Permanent |
| `/resources` | `/job-boards` | Permanent |
| `/roles/ui-ux-designer` | `/roles/web3-product-designer` | Permanent |
| `/roles/web3-ui-ux-designer` | `/roles/web3-product-designer` | Permanent |
| `/roles/on-chain-analyst` | `/roles/onchain-data-analyst` | Permanent |
| `/roles/blockchain-data-analyst` | `/roles/onchain-data-analyst` | Permanent |
| `/roles/brand-motion-designer` | `/roles/brand-designer` | Permanent; route does not silently choose Motion Designer |
| `/roles/ecosystem-bd` | `/roles/ecosystem-partnerships-manager` | Permanent |
| `/roles/dao-governance-coordinator` | `/roles/governance-coordinator` | Permanent |
| `/roles/ambassador-kol` | `/roles/creator-ambassador-partner` | Permanent |
| `/roles/airdrop-researcher-alpha-hunter` | `/roles/ecosystem-researcher` | Permanent |
| `/roles/web3-virtual-assistant` | `/roles/operations-assistant` | Permanent |
| `/roles/crypto-journalist-writer` | `/roles/crypto-journalist` | Permanent |
| `/roles/zk-engineer-cryptographer` | `/roles/zk-engineer-cryptography-researcher` | Permanent |

Additional migration rules:

- Also redirect legacy portfolio slugs to the matching canonical `/portfolio/[slug]` when the project brief has been migrated.
- Preserve query parameters only when they remain meaningful and safe.
- Do not create redirect chains. Legacy URLs should resolve to the final canonical route in one hop.
- Add canonical metadata to destination pages.
- Generate a redirect audit report showing source, destination, status, and loop result.

### Brand / Motion legacy route warning

`/roles/brand-motion-designer` cannot represent two canonical roles. The approved default redirect is Brand Designer because the old title begins with brand and the legacy page combined identity and campaign work. Add a visible related-role link to Motion Designer on the destination. Any project brief clearly centered on animation should redirect to Motion Designer instead.

## 6. Content storage model

Use structured local data, MDX/frontmatter, or a CMS only if every required field remains queryable and validated. Do not flatten role content into one unstructured HTML blob.

### Role record fields

| Group | Required fields |
|---|---|
| Identity | slug, canonicalTitle, alternativeTitles, lane, summary, fullExplanation |
| Organization | whyRoleExists, organizationalContext, teamOwnership, reportingLine, employmentModels |
| Scope | decisionRights, scopeBoundaries, doesNotOwn, exceptions |
| Work | responsibilities, dailyWork, weeklyWork, monthlyWork, reactiveWork |
| Outputs | deliverables, artifacts, successSignals, kpis, kpiCaveats |
| Capability | tools, workflows, hardSkills, softSkills, prerequisiteKnowledge |
| Leveling | entryExpectations, midExpectations, seniorExpectations |
| Proof | proofExamples, portfolioStandards, weakProof, mistakes, misconceptions |
| Hiring | interviewThemes, exampleQuestions, interviewerTests |
| Compensation | compensationContext, evidenceIds, evidenceTier, confidence, riskContext |
| Career | progression, adjacentRoleSlugs, fit, nonFit, practicalNextSteps |
| Trust | claimLabels, sourceIds, lastReviewed, factCheckIds, methodologyVersion |

### Tool record fields

- Name.
- Official URL.
- Why the role uses it.
- Practical example.
- Expected proficiency.
- Source status and last checked date.

A tool logo without this context is not sufficient.

### Salary evidence fields

Implement the complete record model from `KRAFT_SALARY_AND_EVIDENCE_REGISTER.md`. Numeric display must be derived from evidence records, never typed independently into role copy.

### Page content fields

- Route.
- Objective.
- Primary user.
- Information hierarchy.
- Headline and supporting copy.
- Body sections.
- Primary and secondary CTA.
- Labels and helper text.
- Trust notes.
- Mobile priority.
- Claims requiring verification.
- Source IDs and last reviewed date.

### Glossary fields

- Slug and canonical term.
- Alternative terms.
- Category.
- Simple definition.
- Long definition.
- Why it matters at work.
- Practical example.
- Do-not-confuse-with notes.
- Related roles and terms.
- Source and version notes.
- Review date.

### Skill Check fields

- Question ID.
- Prompt.
- Answer options.
- Dimension weights.
- Role-signal weights.
- Limitation flags.
- Confidence rules.
- Result rationale template.
- Recommended proof task.
- Methodology version.

Do not store employability, aptitude, intelligence, personality, hiring suitability, or compensation-value scores.

### X Matcher fields

Use the fields and stateless restrictions in `KRAFT_X_MATCHER_SPEC.md`. Raw profile data must not become persistent content records.

## 7. Role detail render order

Render the 21-section order from `KRAFT_UI_CONTENT_SPEC.md`. The page may use a sticky table of contents, but the main content must remain in document order for accessibility and indexing.

Required reusable sections:

- Role snapshot.
- Organizational context.
- Employment model block.
- Scope and boundary comparison.
- Work cadence timeline.
- Deliverables and artifacts.
- Success and KPI caveats.
- Tools and workflows.
- Skills and prerequisites.
- Level expectations table.
- Proof and portfolio rubric.
- Mistakes and misconceptions.
- Interview question blocks.
- Salary evidence and risk context.
- Career progression and role fit.
- Sources and fact-check status.

## 8. Page-specific implementation requirements

### Homepage

- Generate all content counts from real data collections.
- Show three entry paths: Roles, Skill Check, and Proof-of-Work.
- Explain how role guides, roadmaps, portfolio, interview prep, and job search connect.
- Include methodology and safety cues without turning the hero into a disclaimer wall.

### Roles Directory

- Search canonical, alternative, and legacy titles.
- Filters must use structured fields, not text matching alone.
- Each card links to one canonical role route.
- Compensation display is confidence only; no salary range on directory cards.
- Include compare links for known overlaps.

### Roadmaps

- Create a real detail route for each approved roadmap record.
- Do not promise a job in 30, 90, or 180 days.
- Store milestone, proof artifact, review criteria, and decision point separately.

### Skill Check

- Keep progress and results in the browser session unless storage is separately approved.
- The results route explains why roles were suggested, what could change the result, and what proof to build.
- Do not use pseudo-scientific percentage precision.

### X Profile Role Matcher

- Keep behind a feature flag.
- Do not include in the primary navigation.
- Require a pre-analysis limitation and privacy acknowledgement.
- Insufficient evidence is a valid result.
- All forbidden-claim tests in the matcher spec are release blockers.

### Glossary

- Term links from role pages resolve to real glossary slugs.
- Technical terms include source/version metadata when relevant.
- Search matches synonyms.

### Learn Web3

- Resources require official URL, level, prerequisite, expected output, next proof task, and review date.
- Avoid a loose blog-feed structure.

### Get Hired

- Implement anchored sections or persistent local navigation.
- Include ATS-safe CV guidance, creative portfolio guidance, outreach, trial tasks, interview, compensation, safety, and templates.
- External application advice cannot imply guaranteed results.

### Job Boards

Required section order:

1. Hero and safety note.
2. New Jobs Curated by KRAFT.
3. Selected by KRAFT.
4. Ecosystem Job Boards.
5. General Web3 Job Boards.
6. Application safety checklist and final CTA.

Curated job records require title, company, lane, roleSlug, location, remote model, seniority, employment type, compensation text, source, apply URL, published date, added date, KRAFT note, verification date, and status.

No fake jobs. An empty curated list uses the approved empty state.

### Portfolio

- Create `/portfolio/[slug]`.
- Primary card CTA: Open Project Brief.
- Secondary CTA: See Related Role.
- Every brief includes scenario, constraints, deliverables, execution plan, rubric, tool guidance, evidence capture, case-study packaging, weak patterns, and checklist.

### Interview Prep

- Implement lane → role → category → question selection.
- Maintain 8–12 questions per role when content is fully migrated.
- Each question stores what it tests, weak patterns, answer framework, sample outline, follow-ups, and self-score.
- Do not reuse one generic answer block for every role.

### About and trust pages

- Do not publish placeholder identities, editorial teams, update cadence, or contact details.
- Privacy copy must match the real implementation and processors.
- Methodology must expose evidence labels and assessment limitations.
- Salary Methodology must link to evidence records and explain why some pages have no number.

## 9. Reusable component inventory

Build or update components for:

1. PageIntro.
2. LocalTableOfContents.
3. RoleSnapshot.
4. MetadataList.
5. EmploymentModelBlock.
6. BoundaryComparison.
7. WorkCadenceTimeline.
8. DeliverablesList.
9. KPIWithCaveat.
10. ToolWorkflowTable.
11. LevelExpectationsTable.
12. ProofRubric.
13. InterviewQuestionAccordion.
14. EvidenceBadge.
15. SalaryEvidenceBlock.
16. SourceRegister.
17. ReviewStatus.
18. RelatedRoleLinks.
19. RoadmapTimeline.
20. PortfolioBriefChecklist.
21. DirectoryFilters.
22. AssessmentQuestion.
23. ResultRationale.
24. TrustNote.
25. EmptyState.
26. ErrorState.
27. ExternalLinkNotice.
28. ResponsiveDataTable.

Components may be visually combined, but required semantic fields must remain accessible.

## 10. Tables, diagrams, timelines, accordions, comparison blocks, and prose

### Tables required

- Role boundary matrix.
- Level expectations.
- Tool workflow.
- Salary evidence.
- Source register.
- Roadmap milestones where comparison is useful.

### Diagrams required

- Homepage connected-system flow.
- Role relationship or overlap diagrams where two or more roles are commonly confused.
- Skill Check methodology overview.

Diagrams need text alternatives and may not contain claims absent from source data.

### Timelines required

- Daily / weekly / reactive role cadence.
- Roadmap detail stages.
- Application process in Get Hired.

### Accordions appropriate for

- Interview question guidance.
- FAQ answers.
- Secondary source detail.
- Optional role exceptions.

### Accordions not appropriate for

- Role summary.
- Scope boundaries.
- Salary confidence and evidence tier.
- Privacy warning.
- Assessment limitations.
- Safety-critical job-scam copy.

### Prose required for

- Nuanced role explanation.
- Boundaries and exceptions.
- KPI limitations.
- Compensation limitations.
- Career fit and non-fit.
- Methodology and privacy.

## 11. Source-linked data

These fields must retain source IDs or URLs:

- Salary and compensation evidence.
- Current job listings.
- Official tool links.
- Learning resources.
- Technical glossary definitions where version-sensitive.
- Legal, privacy, regulatory, validator, and protocol-specific claims.
- Market examples and company-specific role examples.
- Job-board descriptions and verification dates.

A citation can be hidden behind a source control, but the data relationship may not be removed.

## 12. Confidence-labeled fields

Require confidence for:

- Compensation.
- X Matcher role suggestions.
- Sparse-title taxonomy notes.
- Claims based on adjacent roles.
- Tool or resource status when not recently checked.
- Market-pattern statements that are not universal.

Do not use confidence labels as decoration. Each label must reflect a stored methodology reason.

## 13. Layout-sensitive copy

Preserve exact canonical titles, evidence labels, warning language, no-range salary state, experimental-tool framing, and safety copy. Do not split slash titles across separate links or silently remove qualifiers.

## 14. What must not be fabricated

- Salary ranges.
- Active jobs.
- Company or protocol examples.
- User counts, learner counts, completion rates, or hiring outcomes.
- Testimonials.
- Partner logos or endorsements.
- Skill Check validity claims.
- X Matcher accuracy claims.
- Update dates that do not represent a real review.
- Source excerpts for pages that were not accessed.
- Portfolio outcomes or metrics.
- Team identities or contact details.

## 15. Sitemap and indexing

Include public canonical pages in the sitemap after content is ready. Exclude:

- `/posts` while hidden.
- Feature-flagged X Matcher until approved for public launch.
- Internal preview and editorial QA routes.
- Expired curated job detail routes if they are not intentionally archived.

Canonicalize legacy redirects to the final route.

## 16. Accessibility and responsive checks

Validate at 390, 768, 1024, and 1440 pixels.

Required checks:

- One H1 per page.
- Logical heading order.
- Keyboard access to filters, accordions, assessment options, and local navigation.
- Visible focus.
- Confidence and state not conveyed by color alone.
- Mobile table alternatives preserve every field.
- External links have descriptive labels and safe rel attributes.
- Reduced-motion support for any optional transition.
- No content hidden solely because a desktop sidebar is unavailable.
- Long role copy remains readable and does not overflow.

## 17. Data integrity checks

- Exactly 42 canonical role records.
- Every role slug is unique.
- Every alternative title maps to one or more canonical roles intentionally.
- Every related-role slug exists.
- Every glossary relation resolves.
- Every portfolio brief points to an existing role.
- Every interview set points to an existing role.
- Every salary evidence ID resolves or is flagged missing.
- All generated counts equal collection lengths.
- No legacy route returns an unexpected 404.
- No redirect loop or chain.
- No empty required section on a role page.
- No direct salary number without evidence and confidence.

## 18. Required QA commands and reports

Use the repository's actual package manager and scripts. At minimum, the coding agent must run the equivalent of:

- Type check.
- Lint.
- Production build.
- Route audit.
- Internal-link check.
- External-link verification report.
- Content-schema validation.
- Redirect test.
- Accessibility smoke test.
- Responsive review at the four required widths.

Create a completion report containing:

1. Files created and changed.
2. Routes created, updated, hidden, and redirected.
3. Role count and role slugs.
4. Page count and page routes.
5. Content records migrated.
6. Salary evidence records and unresolved IDs.
7. Fact-check items still open.
8. Commands and results.
9. Responsive and keyboard checks.
10. Known limitations.
11. Screenshots or logs proving critical states without exposing user data.

## 19. Release gates

Do not declare implementation complete unless:

- All 42 canonical role routes render.
- Required non-role pages render.
- All P0 fact-check items are resolved or the affected feature is disabled.
- X Matcher remains disabled until privacy and platform-policy approval.
- No unsupported salary number is public.
- About contains real approved identity information or remains unpublished.
- `/posts` is hidden.
- Legacy redirects work in one hop.
- Job Boards shows no fake jobs.
- Mobile navigation remains usable without an icon-only hamburger dependency.
- Build, type check, lint, route audit, and content validation pass.

## 20. Final coding-agent stop condition

After implementing and validating the approved package, stop and return the completion report. Do not independently change the taxonomy, enable storage, publish the X Matcher, add wallet login, or create decorative redesign work without a new approval.

AWAITING FINAL CONTENT CONFIRMATION
