# KRAFT Learning Centre Rebuild Specification
**Status:** Source of truth for the new KRAFT website rebuild  
**Product type:** Web3 career learning centre — not a course platform  
**Primary route:** `usekraft.xyz`  
**Reference direction:** Use the supplied blue payment-software landing page for layout rhythm, polish, card composition, spacing, and product-preview presentation. Do not copy its branding, payment content, logo, or exact artwork.
## 1. Non-negotiable Product Direction
KRAFT remains an open, flexible Web3 career learning centre. Users can enter any section directly. The rebuild must improve design, content depth, navigation, and connections between existing tools without introducing mandatory lessons, course enrollment, course completion, certificates, or a linear module system.
- Keep the website model: Home, Roles, Skill Check, Glossary, Get Hired, Job Boards, Roadmaps, Interview Prep, and Portfolio Resources.
- Do not rename the primary CTA to “Launch Course.” Use action CTAs such as “Find My Role,” “Start Skill Check,” and “Explore Roles.”
- Do not add authentication, wallet connection, payments, or a database for the MVP.
- Do not remove working content. Migrate it into the new design and expand it.
- Do not publish unverified job counts, fake user activity, fake testimonials, or unsupported partner logos.

## 2. Product Positioning
**One-line positioning:** KRAFT is a Web3 career learning centre that helps people understand real roles, test their fit, build proof-of-work, prepare for interviews, and find better places to apply.
**Core promise:** Know the work before you chase the title.
**Audience:** Web3 beginners, existing community contributors, creators, students, career switchers, junior developers, and crypto users who want a practical path into work.
**What makes KRAFT different:** It connects role education, skill assessment, glossary knowledge, proof-of-work, hiring guidance, and job-platform discovery in one place.
## 3. Information Architecture and Routes
| Route | Purpose | Primary CTA |
| --- | --- | --- |
| `/` | Product landing page and entry point | Find My Role / Start Skill Check |
| `/roles` | Browse career lanes and role cards | View Role |
| `/roles/[slug]` | Detailed role guide | Build Proof-of-Work |
| `/skill-check` | Career-fit and readiness assessment | See My Results |
| `/glossary` | Searchable Web3 and career terminology | Explore Related Role |
| `/get-hired` | Practical hiring and application guide | Build My Application Plan |
| `/job-boards` | Curated job-platform directory | Visit Platform |
| `/roadmaps` | Role-specific practical roadmaps | Open Roadmap |
| `/interview-prep` | Role-specific interview bank | Practice Questions |
| `/portfolio` | Proof-of-work tasks and templates | Choose a Project |
| `/disclaimers` | Data, salary, job safety, and third-party disclaimers | — |

Preserve legacy URLs with redirects or aliases: `/bridge` → `/get-hired`; `/resources` → `/job-boards`. Do not break existing external links.
## 4. Global Navigation
Desktop header: KRAFT logo on the left, compact navigation in the center, and one dark primary CTA on the right. Mobile: logo, menu button, and a full-height or popover menu. The header should be visually light and aligned to the same content width as every section.
- Primary nav: Roles, Skill Check, Glossary, Get Hired.
- Primary CTA: Job Boards ↗ or Find My Role. Use one CTA, not several competing buttons.
- Secondary pages such as Roadmaps, Interview Prep, and Portfolio can live under a “Tools” menu or inside relevant page cross-links.
- Active route state must be visible.
- Header may be sticky with subtle blur, but it must not dominate the page.

## 5. Visual Direction
Use the supplied reference as the design system reference. Reproduce its hierarchy and polish, not its identity.
- Light grey outer page background with a large white website canvas or consistently framed sections.
- Large rounded hero block using a KRAFT blue gradient, subtle grid, and layered UI mockups.
- Modern geometric sans-serif typography. Remove the current editorial serif headline treatment.
- Large whitespace between sections; each section should have one clear visual idea.
- Product UI cards should demonstrate real KRAFT features: role matching, readiness score, glossary, portfolio checklist, and job-platform comparison.
- Use black, white, neutral grey, and one strong blue accent. Purple may appear only as a secondary state or result highlight.
- Use soft blur, glass, border, and shadow effects sparingly. No crypto neon, random particles, generic blockchain cubes, or excessive glow.
- Animations must explain state: result reveal, progress change, filter transition, accordion open, or card focus. Decorative motion should remain subtle.
- Do not use fake brand logos as “trusted by” social proof. Replace that section with verified product coverage metrics or audience entry points.

### 5.1 Recommended Design Tokens
| Token | Recommendation |
| --- | --- |
| Page background | #DDE2E7 or similar cool light grey |
| Canvas / surface | #FFFFFF |
| Primary text | #111318 |
| Muted text | #667085 |
| Primary blue | #146BFF |
| Deep blue | #0847D8 |
| Soft blue | #E9F2FF |
| Border | #E5E9EF |
| Radius | 16px cards; 24–32px major sections; full pill for tags/buttons |
| Content width | 1180–1240px; hero may use the full framed canvas |
| Section spacing | 96–140px desktop; 64–88px mobile |
| Body font | Manrope, Inter, or Geist |

## 6. Homepage Specification — Exact Content and Layout
### 6.1 Header
Logo: KRAFT. Navigation: Roles, Skill Check, Glossary, Get Hired. CTA: **Job Boards ↗**. Do not show “Career Matters.”
### 6.2 Hero
Design: a large blue gradient rounded panel matching the reference’s hero scale. Center the copy and show layered KRAFT product cards below it. Cards should preview a role match, readiness score, glossary term, and proof-of-work checklist.
**Eyebrow:** Web3 Career Learning Centre
**Headline:** Know the work before you chase the title.
**Subcopy:** Explore real Web3 roles, test your fit, learn the language, build proof-of-work, and apply with context.
**Primary CTA:** Find My Role
**Secondary CTA:** Explore Roles
**Hero product cards:**
- Role Match — “Community & Growth: 82% fit”
- Readiness — “You are 58% ready. Focus on reporting and crisis handling.”
- Glossary — “TVL: useful, but not proof of real users.”
- Portfolio — “3 of 5 proof-of-work tasks complete.”

### 6.3 Product Coverage Strip
Replace “Trusted by 10,000 users” and logo marquees with product coverage that KRAFT controls.
**Headline:** One place to understand Web3 work.
Display four factual counters generated from the data files, not hard-coded marketing claims:
- 18 detailed role guides
- 120 practical glossary terms
- 6 career lanes
- 12 curated job platforms

Counts must be derived from arrays at build time so they never conflict with the actual content.
### 6.4 Start Where You Are
Reference mapping: use the three-card arrangement from the supplied design, with the center card highlighted.
**Eyebrow:** Built for different starting points
**Headline:** Start with the question you actually have.
Cards:
| Card | Copy | CTA |
| --- | --- | --- |
| New to Web3 | Understand the industry, basic terms, and which roles do not require coding. | Learn the Basics |
| Exploring a Career | Compare roles, test your fit, and see what the work looks like day to day. | Find My Role |
| Ready to Apply | Build proof-of-work, practice interviews, and use better job sources. | Get Hired |

### 6.5 Connected Learning Centre
**Eyebrow:** Everything connects
**Headline:** Learn one thing, then know what to do next.
**Subcopy:** KRAFT connects role guides, terminology, practical tasks, interview preparation, and job platforms instead of leaving each resource as an isolated page.
Use a large centered UI preview with tabs: Role Guide, Skill Check, Glossary, Hiring Prep. The active preview can change on click; no auto-rotating carousel that users cannot control.
### 6.6 Career Lanes
**Headline:** Explore Web3 work by career lane.
Show six cards: Community & Growth, Content & Marketing, Product & Operations, Research & Data, Technical, Creative. Each card includes 2–3 example roles, a difficulty indicator, and a “View Lane” CTA.
### 6.7 Skill Check Feature
**Eyebrow:** Ten minutes, practical result
**Headline:** Get a role match, not a personality label.
**Copy:** Answer focused questions about how you work. KRAFT returns your strongest career lanes, current readiness, missing skills, and the next proof-of-work task to build.
Visual: a result card with ranked lanes and a readiness ring. CTA: **Start Skill Check**.
### 6.8 Role Guide Feature
**Headline:** See what the role actually expects.
Use a split layout like the reference’s “Collect All Payments” section. Left: copy and benefit chips. Right: a detailed role-card mockup.
Benefit chips: Daily Work, Skills, Tools, Portfolio, Interview, Salary Context.
CTA: **Explore Role Guides**.
### 6.9 Glossary Feature
**Headline:** Learn terms in the context of work.
**Copy:** Definitions include why the term matters, common misunderstandings, related roles, and the next useful concept.
Visual: search field plus three term cards. Suggested preview terms: TVL, Token Unlock, Multisig.
CTA: **Open Glossary**.
### 6.10 Get Hired Feature
**Headline:** Build proof before you send applications.
Visual: a portfolio checklist with three completed items and two remaining items.
Checklist preview: role-specific project, documented result, portfolio case study, tailored application, interview preparation.
CTA: **Open Hiring Guide**.
### 6.11 Job Board Feature
**Headline:** Find the right place to search, not another endless feed.
**Copy:** Compare curated Web3 job platforms by role type, remote coverage, seniority, and application style.
Visual: platform comparison cards. Do not claim live job counts unless fetched and timestamped reliably.
CTA: **Browse Job Platforms**.
### 6.12 Final CTA
Use a large blue rounded block similar to the reference’s final payment CTA.
**Headline:** Stop applying blind.
**Subcopy:** Find your role, build proof-of-work, and prepare with context before sending another application.
**Primary CTA:** Find My Role
**Secondary CTA:** Browse Job Boards
### 6.13 Footer
Columns: Explore (Roles, Glossary, Roadmaps), Tools (Skill Check, Interview Prep, Portfolio), Apply (Get Hired, Job Boards, Disclaimers), KRAFT (About, Telegram, X). Only include real account links. Remove generic platform home links.
## 7. Page Specifications
### 7.1 Roles Directory
- Hero copy: “Web3 roles, without the vague job-description language.”
- Filters: Career lane, No-code / Technical, Entry-friendly / Mid / Advanced, Writing / Community / Data / Product / Design.
- Cards show title, lane, difficulty, one-sentence summary, core skills, and “View Role.”
- Add compare mode for up to three roles after the core rebuild is stable.
- Every empty state must offer Clear Filters and View All Roles.

### 7.2 Role Detail
Every role page must use the same structure: What the role actually does; Daily work; Expected outputs; Must-have skills; Nice-to-have skills; Tools; Proof-of-work; Practical assignment; Interview questions; Common mistakes; Salary context; Related glossary; Recommended job platforms; Next action.
Salary must be labeled as an estimate, include scope and region context, and never present one global number as universal.
### 7.3 Skill Check
- 20 questions, one at a time or in short groups, with a visible progress bar.
- Results: top three lanes, a fit explanation, a readiness score, missing foundations, and one recommended task.
- Do not tell users they are permanently “not suited” for a role. Results describe current preferences and evidence.
- Save results locally so users can return without an account.
- Include “Retake” and “Explore this lane.”

Question seed and scoring fields are defined in Appendix C.
### 7.4 Glossary
- Search with autocomplete, category pills, and alphabetical browsing.
- Accordion or detail drawer fields: Simple meaning, Why it matters, Common trap, Used in roles, Related terms.
- Cross-link role pages and relevant hiring guides.
- Optional learning mode after launch: flashcards and quizzes. Do not block the core rebuild on gamification.
- Counts must be generated from data.

### 7.5 Get Hired
Replace broad motivational advice with practical sections: Positioning; Proof-of-work; Portfolio; CV and profile; Targeted applications; Outreach; Trial tasks; Interviews; Compensation; Scam checks; Follow-up.
Each section must include: what to do, a checklist, one example, and a related KRAFT tool.
### 7.6 Job Boards
- Rename the page heading to “Web3 Job Platforms” or “Curated Web3 Job Boards.”
- Explain that KRAFT compares external platforms; it does not host every listed job.
- Cards include Best for, Common role types, Remote support, Salary visibility, Application style, Last reviewed, and Visit Platform.
- Remove unverified “72,000 active jobs” style marketing unless a reliable live source and timestamp are present.
- Add job-safety checklist above outbound links.

### 7.7 Roadmaps
Roadmaps are optional practical guides, not course modules. Users can open any roadmap directly. Each roadmap should include five phases, suggested outputs, related glossary terms, and a realistic note that timelines vary.
### 7.8 Interview Prep
Provide role-lane question banks with: question, what the interviewer is testing, weak-answer pattern, strong-answer structure, and self-review checklist. AI scoring is not required for MVP.
### 7.9 Portfolio Resources
Provide project briefs and templates. Every brief includes Context, Task, Deliverable, Constraints, Evaluation rubric, and How to present it as a case study.
## 8. Content Quality Rules
- Use direct, practical English. Avoid “unlock your potential,” “level up,” and generic empowerment language.
- Explain actual work instead of repeating job descriptions.
- Separate verified facts, examples, estimates, and opinions.
- Never imply KRAFT guarantees employment.
- Never request a seed phrase, private key, wallet approval, or payment to apply.
- Use examples from real workflows but do not invent companies, user counts, testimonials, or outcomes.
- Write for readers who know basic crypto but may not understand professional Web3 work.
- Every page must end with a useful next step, not a generic “Learn More.”

## 9. Data and Component Architecture
Use typed static data for the first production version. Suggested files:
- `data/roles.ts`
- `data/glossary.ts`
- `data/skillCheck.ts`
- `data/jobBoards.ts`
- `data/hiringGuides.ts`
- `data/roadmaps.ts`
- `data/interviewQuestions.ts`
- `data/portfolioProjects.ts`

Reusable components: `Container`, `Header`, `HeroPanel`, `SectionHeading`, `FeaturePreview`, `MetricStrip`, `CareerLaneCard`, `RoleCard`, `RoleDetailSection`, `FilterBar`, `SearchInput`, `GlossaryAccordion`, `ReadinessResult`, `Checklist`, `JobBoardCard`, `RelatedContent`, `FinalCTA`, `Footer`.
All visible counts must be calculated from data arrays. Search and filters must use the same canonical data, not duplicated page-level copies.
## 10. Technical Requirements
- Use the existing Next.js App Router project and preserve working functionality.
- Inspect the repository before changing routes or data structures.
- Fix the deprecated middleware convention by migrating to the current Next.js proxy convention when safe.
- Keep the build green after each phase: lint, type check, and `npm run build`.
- No authentication, wallet connection, payment, or database in this rebuild.
- Use localStorage only for skill-check results, saved roles, and optional checklist state.
- Meet basic accessibility: semantic headings, keyboard navigation, visible focus, labels, sufficient contrast, reduced-motion support.
- Optimize image sizes and avoid heavy full-screen animation.
- Responsive targets: 1440, 1280, 1024, 768, 390, and 360px widths.
- Preserve SEO value with route redirects, metadata, canonical URLs, and descriptive page titles.

## 11. Implementation Phases
| Phase | Scope | Release gate |
| --- | --- | --- |
| 0 — Audit | Map routes, data, components, broken links, legacy redirects, and reusable content. | No code changes until audit is reported. |
| 1 — Foundation | Design tokens, global shell, header, footer, typography, reusable cards, route aliases. | Build passes; existing pages still work. |
| 2 — Homepage | Implement the complete new homepage from Section 6. | Desktop and mobile reviewed locally. |
| 3 — Core directories | Rebuild Roles, Glossary, Get Hired, and Job Boards with new components. | Search, filters, and cross-links work. |
| 4 — Interactive tools | Rebuild Skill Check; add Roadmaps, Interview Prep, and Portfolio. | Results and local persistence work. |
| 5 — Content expansion | Populate all content appendices, remove placeholders, verify links and claims. | No empty or fake states. |
| 6 — QA and release | Accessibility, responsive QA, route checks, metadata, performance, Vercel Preview. | Merge only after preview approval. |

## 12. Acceptance Criteria
- KRAFT is clearly presented as a Web3 career learning centre, not a course platform or generic job board.
- The homepage no longer uses “Career Matters” or generic empowerment copy.
- The visual system clearly follows the supplied reference’s framed canvas, blue hero, product-preview cards, whitespace, and rounded structure without copying the reference brand.
- All existing core features remain accessible.
- Roles, glossary terms, guides, and platform cards load from typed data and contain no placeholder zeros.
- Every core page links to at least one useful next step in another KRAFT area.
- No unverified user counts, job counts, testimonials, or partner logos are shown.
- Legacy links `/bridge` and `/resources` still resolve correctly.
- `npm run build` succeeds.
- The final implementation works at the required responsive widths and supports keyboard navigation.

# Appendix A — Initial Role Content
Use the following as production seed content. Keep the wording editable in typed data files.
## Community Moderator
**Lane:** Community & Growth  
**Level:** Entry-friendly  
**Summary:** Keeps community spaces safe, useful, and organized while handling routine member questions and escalation.
**Core responsibilities**
- Moderate Discord and Telegram conversations
- Remove scams, impersonators, spam, and unsafe links
- Answer recurring user questions using approved information
- Escalate product, payment, or security issues to the right team

**Skills**
- Clear written communication
- Calm conflict handling
- Basic wallet and security knowledge
- Documentation and escalation discipline

**Tools**
- Discord
- Telegram
- Notion
- Google Sheets

**Proof-of-work**
- Moderation SOP
- Scam-response flow
- Sample FAQ and escalation log

**Interview prompts**
- How would you respond to a scam link posted during a busy announcement?
- When should a moderator answer directly, and when should they escalate?

**Common beginner mistakes**
- Treating moderation as deleting messages only
- Giving unverified answers just to reply quickly

## Community Manager
**Lane:** Community & Growth  
**Level:** Entry to mid  
**Summary:** Owns community health, communication, programming, feedback collection, and reporting across community channels.
**Core responsibilities**
- Plan weekly community programming
- Write announcements and operational updates
- Track sentiment, recurring issues, and engagement quality
- Coordinate moderators, ambassadors, and campaign contributors

**Skills**
- Community strategy
- Crisis communication
- Reporting and metrics
- Campaign planning

**Tools**
- Discord
- Telegram
- Notion
- Typeform / Google Forms

**Proof-of-work**
- 30-day community plan
- Sample weekly report
- Crisis communication response

**Interview prompts**
- How do you measure community health beyond message count?
- How would you handle users angry about a delayed airdrop?

**Common beginner mistakes**
- Using chat volume as the only success metric
- Running activities without documenting goals or results

## Ambassador Program Manager
**Lane:** Community & Growth  
**Level:** Mid  
**Summary:** Designs contributor systems that turn community participation into useful, measurable output rather than spam.
**Core responsibilities**
- Define ambassador tiers, tasks, and rewards
- Review contribution quality and prevent farming
- Coordinate campaigns and regional leads
- Report contributor output and program ROI

**Skills**
- Program design
- Quality control
- Contributor communication
- Incentive design

**Tools**
- Notion
- Airtable
- Zealy / Galxe
- Discord

**Proof-of-work**
- Ambassador program blueprint
- Contribution rubric
- Monthly leaderboard and review template

**Interview prompts**
- How would you stop an ambassador program becoming a spam farm?
- What contributions deserve rewards besides social posts?

**Common beginner mistakes**
- Rewarding volume without quality checks
- Launching a program without clear exit or removal rules

## Web3 Content Creator
**Lane:** Content & Marketing  
**Level:** Entry-friendly  
**Summary:** Turns technical or market information into useful content for a specific audience and distribution channel.
**Core responsibilities**
- Research protocols, products, narratives, and campaigns
- Write short posts, long posts, explainers, or videos
- Adapt messaging to platform and audience
- Report reach, engagement quality, and conversion signals

**Skills**
- Research
- Writing and storytelling
- Audience judgment
- Content analytics

**Tools**
- X
- Notion
- Canva / Figma
- Analytics tools

**Proof-of-work**
- Three educational posts
- One protocol breakdown
- One campaign-style content sample

**Interview prompts**
- How do you verify project claims before publishing?
- How do you make sponsored content useful without hiding the sponsorship?

**Common beginner mistakes**
- Copying narratives without adding a point of view
- Optimizing only for impressions

## Crypto Research Writer
**Lane:** Content & Marketing  
**Level:** Entry to mid  
**Summary:** Reads primary sources, checks claims, and produces structured analysis that helps readers understand protocols, markets, or ecosystems.
**Core responsibilities**
- Read documentation, governance proposals, dashboards, and announcements
- Separate facts, interpretation, and speculation
- Build comparisons and explain risks
- Maintain sources and update outdated claims

**Skills**
- Source evaluation
- Analytical writing
- Basic tokenomics
- Data interpretation

**Tools**
- Notion
- DefiLlama
- Dune
- Block explorers

**Proof-of-work**
- Protocol research memo
- Tokenomics review
- Comparative ecosystem analysis

**Interview prompts**
- How would you verify a protocol traction claim?
- What makes a research piece useful instead of promotional?

**Common beginner mistakes**
- Using secondary threads as the only source
- Presenting assumptions as facts

## Social Media Manager
**Lane:** Content & Marketing  
**Level:** Entry to mid  
**Summary:** Runs a brand’s social publishing system, community-facing voice, campaign calendar, and performance reporting.
**Core responsibilities**
- Build content calendars and publishing workflows
- Write posts, replies, announcements, and campaign copy
- Coordinate design and approvals
- Measure content performance and audience response

**Skills**
- Brand voice
- Platform-native writing
- Planning
- Analytics and reporting

**Tools**
- X
- Notion
- Typefully / scheduling tools
- Canva / Figma

**Proof-of-work**
- Two-week content calendar
- Brand voice guide
- Campaign performance report

**Interview prompts**
- How would you balance educational, product, and campaign content?
- What would you change if impressions increased but qualified engagement fell?

**Common beginner mistakes**
- Posting the same format every day
- Reporting vanity metrics without learning from them

## Web3 Product Manager
**Lane:** Product & Operations  
**Level:** Mid  
**Summary:** Turns user and business problems into product priorities while coordinating design, engineering, growth, and operations.
**Core responsibilities**
- Define user problems and product requirements
- Prioritize features and trade-offs
- Coordinate execution across teams
- Review product data and user feedback

**Skills**
- Product thinking
- Prioritization
- Technical communication
- User research

**Tools**
- Linear / Jira
- Notion
- Figma
- Analytics tools

**Proof-of-work**
- Product requirement document
- Feature prioritization exercise
- User journey audit

**Interview prompts**
- How would you prioritize wallet onboarding improvements?
- How do you decide whether a token feature solves a real user problem?

**Common beginner mistakes**
- Adding blockchain features without user value
- Writing requirements without acceptance criteria

## Product Operations
**Lane:** Product & Operations  
**Level:** Entry to mid  
**Summary:** Builds the processes, feedback loops, documentation, and coordination systems that help product teams ship consistently.
**Core responsibilities**
- Maintain launch and QA checklists
- Collect and categorize user feedback
- Coordinate support, product, and engineering handoffs
- Track incidents and operational follow-ups

**Skills**
- Process design
- Documentation
- Cross-team communication
- Attention to detail

**Tools**
- Notion
- Linear / Jira
- Slack
- Google Sheets

**Proof-of-work**
- Launch checklist
- Feedback taxonomy
- Incident review template

**Interview prompts**
- How would you turn support complaints into useful product input?
- What should be included in a product launch checklist?

**Common beginner mistakes**
- Creating process that adds work without reducing confusion
- Losing context between support and engineering

## Ecosystem / BD Associate
**Lane:** Product & Operations  
**Level:** Entry to mid  
**Summary:** Finds and supports partnerships, integrations, builders, and growth opportunities across an ecosystem.
**Core responsibilities**
- Research potential partners and projects
- Qualify leads and prepare outreach
- Coordinate integrations, campaigns, or ecosystem support
- Maintain pipeline and partnership reporting

**Skills**
- Research
- Relationship building
- Commercial judgment
- Clear follow-up

**Tools**
- Notion / CRM
- Telegram
- X
- Google Sheets

**Proof-of-work**
- Ecosystem map
- Partner qualification framework
- Sample partnership proposal

**Interview prompts**
- How would you qualify whether a partnership is worth pursuing?
- What makes ecosystem growth different from collecting logos?

**Common beginner mistakes**
- Treating every introduction as a partnership
- Tracking announcements instead of outcomes

## DeFi Analyst
**Lane:** Research & Data  
**Level:** Mid  
**Summary:** Evaluates DeFi protocols using product mechanics, on-chain activity, token incentives, revenue, and risk.
**Core responsibilities**
- Analyze protocol mechanics and risk
- Compare TVL, volume, fees, revenue, and incentives
- Review tokenomics and liquidity conditions
- Write dashboards, reports, or investment-style memos

**Skills**
- DeFi mechanics
- Data interpretation
- Risk analysis
- Clear analytical writing

**Tools**
- DefiLlama
- Dune
- Token Terminal
- Block explorers

**Proof-of-work**
- Protocol analysis
- Risk matrix
- Dashboard with written conclusions

**Interview prompts**
- Why can TVL be misleading?
- How would you compare two lending protocols with similar TVL?

**Common beginner mistakes**
- Treating APY as return without risk
- Ignoring incentive-driven activity

## On-chain Analyst
**Lane:** Research & Data  
**Level:** Mid to advanced  
**Summary:** Uses blockchain data to understand wallet behavior, capital flows, user activity, and protocol performance.
**Core responsibilities**
- Define measurable on-chain questions
- Query and clean blockchain data
- Track wallets, cohorts, flows, and behavioral patterns
- Explain findings and limitations

**Skills**
- SQL
- Blockchain data models
- Statistical judgment
- Data storytelling

**Tools**
- Dune
- Flipside
- Arkham
- Etherscan-style explorers

**Proof-of-work**
- Dune dashboard
- Wallet-flow investigation
- Cohort retention analysis

**Interview prompts**
- How do you avoid double-counting on-chain users?
- What would you check before labeling a wallet smart money?

**Common beginner mistakes**
- Assuming addresses equal unique users
- Presenting wallet labels as certainty

## Tokenomics / Governance Analyst
**Lane:** Research & Data  
**Level:** Mid  
**Summary:** Studies token supply, incentives, voting systems, treasury decisions, and governance outcomes.
**Core responsibilities**
- Model supply, unlocks, emissions, and dilution
- Review governance proposals and voting behavior
- Analyze treasury allocation and incentives
- Identify stakeholder conflicts and governance risk

**Skills**
- Token supply modeling
- Governance analysis
- Spreadsheet modeling
- Risk communication

**Tools**
- Google Sheets
- Token unlock trackers
- Snapshot
- Governance forums

**Proof-of-work**
- Unlock analysis
- Governance proposal review
- Token incentive model

**Interview prompts**
- What makes an unlock schedule risky?
- How would you judge whether governance is meaningfully decentralized?

**Common beginner mistakes**
- Looking at FDV without supply schedule
- Treating vote participation as governance quality

## Smart Contract Developer
**Lane:** Technical  
**Level:** Technical  
**Summary:** Designs, implements, tests, and deploys smart contracts while managing security and upgrade risk.
**Core responsibilities**
- Write and test smart contracts
- Review protocol logic and edge cases
- Deploy to testnets and mainnets
- Coordinate audits and remediation

**Skills**
- Solidity or relevant chain language
- Testing
- Security mindset
- Protocol design

**Tools**
- Foundry / Hardhat
- Remix
- GitHub
- Tenderly

**Proof-of-work**
- Tested contract repository
- Deployment documentation
- Security-focused code review

**Interview prompts**
- How would you protect a contract against reentrancy?
- When should a contract be upgradeable?

**Common beginner mistakes**
- Optimizing gas before correctness
- Deploying without thorough tests and access-control review

## Frontend Web3 Developer
**Lane:** Technical  
**Level:** Technical  
**Summary:** Builds user interfaces that connect wallets, contracts, APIs, and transaction states into usable products.
**Core responsibilities**
- Implement wallet connection and transaction flows
- Handle loading, rejection, pending, and failure states
- Integrate contract reads and writes
- Improve accessibility and responsive behavior

**Skills**
- React / Next.js
- Wallet and contract integration
- State management
- UX judgment

**Tools**
- Next.js
- wagmi / viem
- Wallet SDKs
- Figma

**Proof-of-work**
- Wallet-enabled app
- Transaction state demo
- Responsive dApp interface

**Interview prompts**
- How would you explain a failed transaction to a normal user?
- What states must a wallet transaction UI handle?

**Common beginner mistakes**
- Showing raw blockchain errors to users
- Treating wallet connection as the whole product

## Developer Relations
**Lane:** Technical  
**Level:** Mid technical  
**Summary:** Helps developers succeed with a protocol or platform through documentation, examples, support, education, and feedback.
**Core responsibilities**
- Build sample apps and technical tutorials
- Answer developer questions and debug integrations
- Run workshops, hackathons, and office hours
- Bring developer feedback into the product team

**Skills**
- Technical communication
- Coding
- Teaching
- Developer empathy

**Tools**
- GitHub
- Docs platform
- Discord
- SDKs and APIs

**Proof-of-work**
- Technical tutorial
- Sample integration repo
- Workshop outline

**Interview prompts**
- How would you debug a developer’s failing integration?
- How do you measure DevRel beyond event attendance?

**Common beginner mistakes**
- Focusing only on public speaking
- Publishing examples that are not maintained

## Web3 UI/UX Designer
**Lane:** Creative  
**Level:** Entry to mid  
**Summary:** Designs clear product experiences around wallets, transactions, permissions, risk, and complex financial states.
**Core responsibilities**
- Map user flows and edge cases
- Design responsive interfaces and components
- Test onboarding, transaction, and recovery flows
- Work with product and engineering on implementation

**Skills**
- Interaction design
- User research
- Design systems
- Web3 transaction literacy

**Tools**
- Figma
- FigJam
- Prototyping tools
- Analytics / testing tools

**Proof-of-work**
- Wallet onboarding case study
- Transaction flow redesign
- Design-system component set

**Interview prompts**
- How would you reduce fear during a high-value transaction?
- What information should appear before a user signs?

**Common beginner mistakes**
- Copying exchange dashboards without user research
- Hiding risk information to make screens look clean

## Brand / Motion Designer
**Lane:** Creative  
**Level:** Entry to mid  
**Summary:** Builds a recognizable visual system and campaign assets that explain products without relying on generic crypto imagery.
**Core responsibilities**
- Create brand systems and campaign concepts
- Design social, event, and product marketing assets
- Build motion templates and product animations
- Maintain consistency across teams and channels

**Skills**
- Visual hierarchy
- Brand systems
- Motion basics
- Creative concepting

**Tools**
- Figma
- Illustrator
- After Effects
- Blender / 3D tools

**Proof-of-work**
- Mini brand system
- Campaign asset set
- Short product animation

**Interview prompts**
- How would you make a protocol recognizable without using blockchain cubes?
- How do you maintain consistency across fast campaign requests?

**Common beginner mistakes**
- Using visual trends without a brand rationale
- Prioritizing effects over readability

## Technical Writer
**Lane:** Content & Marketing  
**Level:** Mid technical  
**Summary:** Creates documentation and tutorials that help developers or advanced users understand and implement a product correctly.
**Core responsibilities**
- Write and maintain technical documentation
- Create tutorials and integration guides
- Test code samples and workflows
- Organize information architecture and version changes

**Skills**
- Technical comprehension
- Structured writing
- Information architecture
- Basic coding

**Tools**
- Docs platforms
- GitHub
- Markdown
- API tools

**Proof-of-work**
- Quick-start guide
- API tutorial
- Documentation information architecture

**Interview prompts**
- How do you verify that a tutorial actually works?
- How would you restructure documentation users cannot navigate?

**Common beginner mistakes**
- Writing from assumptions without testing
- Documenting features but not user tasks

# Appendix B — Glossary Seed (120 Terms)
Each production entry should also contain `slug`, `relatedTerms`, and `relatedRoles`. The text below supplies category, simple meaning, and initial role relevance.
## Foundations
**Blockchain** — A shared database where transactions are grouped into blocks and verified by a network rather than one central operator.  
*Relevant to:* All roles
**Decentralization** — The distribution of control, infrastructure, or decision-making across multiple independent participants.  
*Relevant to:* Product, research, content
**Consensus** — The process a blockchain uses to agree on valid transactions and the current state of the network.  
*Relevant to:* Technical, research
**Node** — A computer that runs blockchain software and participates in reading, validating, or sharing network data.  
*Relevant to:* Technical, DevRel
**Validator** — A network participant that helps confirm blocks or transactions, usually by staking assets and following protocol rules.  
*Relevant to:* Research, technical
**Protocol** — A set of rules and smart contracts that defines how a blockchain product or financial system works.  
*Relevant to:* All roles
**dApp** — An application whose core actions interact with smart contracts or blockchain data.  
*Relevant to:* Product, design, technical
**Smart Contract** — Code deployed on a blockchain that executes predefined rules when users or other contracts call it.  
*Relevant to:* All roles
**Permissionless** — A system people can use or build on without needing approval from a central operator.  
*Relevant to:* Product, research, content
**Trustless** — A design where users rely on verifiable rules and cryptography instead of trusting one intermediary.  
*Relevant to:* Research, product
## Wallet & Security
**Wallet** — Software or hardware that manages keys and lets a user sign blockchain actions.  
*Relevant to:* All roles
**Public Key** — A cryptographic identifier that can be shared and is used to derive or verify an address.  
*Relevant to:* Technical, security
**Private Key** — A secret cryptographic key that controls the ability to sign transactions for an address.  
*Relevant to:* All roles
**Seed Phrase** — A human-readable backup that can regenerate a wallet’s private keys; anyone who has it can control the wallet.  
*Relevant to:* All roles
**Signing** — Approving a message or transaction with a wallet’s private key.  
*Relevant to:* All roles
**Multisig** — A wallet that requires multiple approved signers before an action can execute.  
*Relevant to:* Operations, governance, technical
**Hardware Wallet** — A physical device that keeps private keys isolated from normal internet-connected devices.  
*Relevant to:* All roles
**Phishing** — A social-engineering attack that tricks users into revealing credentials or approving malicious actions.  
*Relevant to:* Community, operations, all users
**Approval** — Permission granted to a smart contract to spend or manage a token on a user’s behalf.  
*Relevant to:* Product, design, security
**Revoke** — The act of removing a previously granted token or contract permission.  
*Relevant to:* Community, product, security
## Transactions & Networks
**Gas Fee** — The fee paid to process computation or storage on a blockchain.  
*Relevant to:* All roles
**Transaction Hash** — A unique identifier used to find and verify a blockchain transaction.  
*Relevant to:* All roles
**Block Explorer** — A website or tool for inspecting addresses, transactions, blocks, tokens, and contract activity.  
*Relevant to:* All roles
**Nonce** — A sequence value that helps order transactions from an account and prevents duplicate execution.  
*Relevant to:* Technical
**Confirmation** — A signal that a transaction has been included in a block and has gained additional blocks after it.  
*Relevant to:* Product, support, technical
**Finality** — The point at which a blockchain transaction is considered irreversible under the network’s rules.  
*Relevant to:* Technical, research
**Mainnet** — The live production network where transactions use real assets and have real consequences.  
*Relevant to:* All roles
**Testnet** — A testing network used to trial applications and transactions without normal production risk.  
*Relevant to:* Technical, product, DevRel
**Faucet** — A service that distributes testnet tokens so developers and users can test transactions.  
*Relevant to:* Technical, DevRel
**RPC** — An endpoint applications use to read blockchain data and submit transactions to nodes.  
*Relevant to:* Technical, product
## Scaling & Infrastructure
**Layer 1 (L1)** — A base blockchain that provides its own consensus and settlement, such as Ethereum or Solana.  
*Relevant to:* All roles
**Layer 2 (L2)** — A network built on top of a base chain to increase capacity or reduce cost while relying on the base chain for part of its security.  
*Relevant to:* Research, technical, product
**Rollup** — A scaling system that executes transactions away from the base chain and posts compressed data or proofs back to it.  
*Relevant to:* Technical, research
**Optimistic Rollup** — A rollup that treats transactions as valid unless challenged during a dispute window.  
*Relevant to:* Technical, research
**ZK Rollup** — A rollup that submits cryptographic proofs showing that batches of transactions were executed correctly.  
*Relevant to:* Technical, research
**Sequencer** — A component that orders transactions for many rollups before they are finalized.  
*Relevant to:* Technical, research
**Prover** — A system that generates cryptographic proofs for zero-knowledge applications or rollups.  
*Relevant to:* Technical
**Data Availability** — The assurance that transaction data needed to verify or reconstruct a chain’s state is accessible.  
*Relevant to:* Technical, research
**Bridge** — A system for moving assets or messages between different blockchains or networks.  
*Relevant to:* All roles
**Interoperability** — The ability of different blockchains, applications, or assets to communicate and work together.  
*Relevant to:* Product, research, BD
## DeFi Mechanics
**DeFi** — Financial applications built with smart contracts, including trading, lending, borrowing, and asset management.  
*Relevant to:* All roles
**DEX** — A decentralized exchange where users trade through smart contracts rather than a centralized order custodian.  
*Relevant to:* Research, product, content
**AMM** — An automated market maker that prices trades using a formula and pooled liquidity.  
*Relevant to:* Research, content
**Liquidity Pool** — A pool of tokens supplied to enable trading, lending, or other protocol activity.  
*Relevant to:* Research, content
**Liquidity Provider** — A user or entity that deposits assets into a liquidity pool in exchange for fees or incentives.  
*Relevant to:* Research, content
**LP Token** — A token or accounting position representing a user’s share of a liquidity pool.  
*Relevant to:* Research
**Slippage** — The difference between the expected trade price and the price received when a transaction executes.  
*Relevant to:* Product, research, content
**Impermanent Loss** — The value difference a liquidity provider may experience compared with simply holding the deposited assets.  
*Relevant to:* Research, content
**Lending Market** — A protocol where users supply assets to earn yield and borrowers take overcollateralized loans.  
*Relevant to:* Research, product
**Collateral** — Assets pledged to secure a loan or financial position.  
*Relevant to:* Research, content
## DeFi Risk & Yield
**Liquidation** — The forced sale or seizure of collateral when a position no longer meets required safety thresholds.  
*Relevant to:* Research, product, content
**Leverage** — Using borrowed capital or derivatives to increase exposure beyond the value of owned capital.  
*Relevant to:* Research, content
**Yield Farming** — Moving or depositing assets across protocols to earn fees, token incentives, or other yield.  
*Relevant to:* Research, content
**APY** — Annual percentage yield including the effect of compounding, usually shown as an estimate rather than a guarantee.  
*Relevant to:* Research, content
**APR** — Annual percentage rate before compounding, often used for lending, borrowing, or incentive rates.  
*Relevant to:* Research, content
**Oracle** — A service that supplies external information, such as asset prices, to smart contracts.  
*Relevant to:* Technical, research
**Peg** — A target value that an asset is designed to maintain relative to another asset or currency.  
*Relevant to:* Research, content
**Depeg** — A meaningful loss of an asset’s intended peg.  
*Relevant to:* Research, community, content
**Restaking** — Reusing staked assets or their economic security to support additional services or protocols.  
*Relevant to:* Research, technical
**Smart Contract Risk** — The possibility that code bugs, design flaws, permissions, or integrations cause loss or unexpected behavior.  
*Relevant to:* All roles
## Tokens & Markets
**Tokenomics** — The design of a token’s supply, distribution, utility, incentives, and economic behavior.  
*Relevant to:* Research, product, content
**Market Cap** — The current token price multiplied by circulating supply.  
*Relevant to:* Research, content
**FDV** — Fully diluted valuation: token price multiplied by the maximum or fully diluted supply.  
*Relevant to:* Research, content
**Circulating Supply** — The amount of a token currently available in the market and counted as circulating.  
*Relevant to:* Research, content
**Total Supply** — The amount of tokens that currently exist, excluding tokens that may have been permanently burned.  
*Relevant to:* Research
**Max Supply** — The maximum number of tokens the protocol allows to exist, when a cap is defined.  
*Relevant to:* Research
**Vesting** — A schedule that gradually releases tokens or equity to contributors, investors, or team members.  
*Relevant to:* Research, hiring
**Cliff** — A period during which no vested allocation can be claimed before the first release.  
*Relevant to:* Research, hiring
**Token Unlock** — The scheduled release of previously restricted tokens into transferable supply.  
*Relevant to:* Research, content
**Emissions** — New token supply distributed over time through rewards, incentives, or protocol rules.  
*Relevant to:* Research, governance
## On-chain Analytics
**TVL** — Total value locked: the estimated value of assets deposited in a protocol or set of smart contracts.  
*Relevant to:* Research, content, BD
**Trading Volume** — The value of assets traded during a period; it can indicate usage but may include incentives or wash activity.  
*Relevant to:* Research, growth
**Active Address** — An address that performed a defined on-chain action during a selected period.  
*Relevant to:* Research, growth
**Protocol Fees** — Amounts users pay when using a protocol, before deciding how those fees are distributed.  
*Relevant to:* Research, product
**Protocol Revenue** — The portion of fees retained by a protocol or directed to stakeholders after costs or incentives.  
*Relevant to:* Research
**Net Flow** — The difference between assets entering and leaving a protocol, chain, or wallet group.  
*Relevant to:* Research
**Whale** — A wallet or entity holding or moving a comparatively large amount of assets.  
*Relevant to:* Research, content
**Smart Money** — An informal label for wallets believed to have strong timing or performance; the label should be treated as a hypothesis.  
*Relevant to:* Research, content
**Cohort** — A group of users or addresses grouped by a shared starting period or behavior for analysis.  
*Relevant to:* Research, product
**Retention** — The share of users or addresses that return and perform a defined action after their first activity.  
*Relevant to:* Research, product, growth
## Governance & Ecosystem
**DAO** — A blockchain-based organization that coordinates decisions, assets, or contributors through shared rules and governance.  
*Relevant to:* Operations, community, research
**Governance Proposal** — A formal suggestion for changing protocol rules, spending treasury funds, or making ecosystem decisions.  
*Relevant to:* Research, community
**Quorum** — The minimum participation required for a governance vote to be valid.  
*Relevant to:* Research, governance
**Delegation** — Assigning voting power to another address or representative without transferring ownership of the tokens.  
*Relevant to:* Governance, community
**Treasury** — Assets controlled by a protocol, DAO, foundation, or company for operations and ecosystem goals.  
*Relevant to:* Research, operations
**Grant** — Funding given to a builder, researcher, community, or project for agreed ecosystem work.  
*Relevant to:* Ecosystem, operations
**Public Goods** — Resources that benefit a broad ecosystem and are difficult to restrict to paying users only.  
*Relevant to:* Ecosystem, research
**Contributor** — A person who provides ongoing or task-based work without necessarily being a traditional employee.  
*Relevant to:* All career roles
**Bounty** — A defined task with a reward for an accepted result.  
*Relevant to:* Entry-level, contributor roles
**Ecosystem** — The projects, users, developers, partners, infrastructure, and communities built around a chain or protocol.  
*Relevant to:* BD, growth, research
## NFT, Consumer & Social
**NFT** — A token representing a distinct on-chain item, right, credential, or collectible.  
*Relevant to:* Content, product, design
**Mint** — The process of creating or issuing a new token or NFT on-chain.  
*Relevant to:* Content, community, product
**Floor Price** — The lowest listed sale price for an item in an NFT collection at a given time.  
*Relevant to:* Content, research
**Royalty** — A payment designed to go to a creator or rights holder when an asset is sold.  
*Relevant to:* Product, content
**Soulbound Token** — A non-transferable or identity-linked token used for credentials, reputation, or membership.  
*Relevant to:* Product, community
**Account Abstraction** — A wallet architecture that enables programmable account behavior such as recovery, batching, or sponsored gas.  
*Relevant to:* Product, technical, design
**Social Graph** — A representation of relationships, follows, interactions, or reputation between users.  
*Relevant to:* Product, growth
**Points Program** — An off-chain or on-chain system that tracks user activity and may influence rewards or access.  
*Relevant to:* Growth, community, research
**Airdrop** — A distribution of tokens or assets to selected users, contributors, or addresses.  
*Relevant to:* Community, growth, content
**Snapshot** — A recorded state of balances or activity at a specific time, often used for governance or reward eligibility.  
*Relevant to:* Governance, community, research
## Career & Hiring
**Proof of Work** — A public sample showing how a person thinks and executes, such as a report, design, dashboard, campaign, or repository.  
*Relevant to:* All roles
**Portfolio** — A selected collection of work samples and case studies that demonstrates relevant ability.  
*Relevant to:* All roles
**Trial Task** — A limited evaluation assignment used during hiring; scope and expected time should be clear.  
*Relevant to:* All roles
**Deliverable** — A specific output expected from a role, project, campaign, or agreement.  
*Relevant to:* All roles
**KPI** — A key performance indicator used to measure progress toward a defined outcome.  
*Relevant to:* Growth, community, product
**Retainer** — A recurring payment arrangement for ongoing availability or a defined monthly scope.  
*Relevant to:* Freelance and contributor roles
**Token Compensation** — Payment partly or fully made in tokens, creating price, vesting, liquidity, and legal risk.  
*Relevant to:* All roles
**Async Work** — Work coordinated without requiring everyone to be online at the same time.  
*Relevant to:* Remote roles
**Contractor** — A worker engaged under a service agreement rather than as a standard employee.  
*Relevant to:* All roles
**Applicant Tracking System** — Software used to collect, filter, and manage job applications.  
*Relevant to:* Job seekers, hiring teams
## Growth & Operations
**Community Health** — The quality, usefulness, safety, retention, and sentiment of a community rather than raw message volume.  
*Relevant to:* Community, growth
**Activation** — The moment a new user completes an action that indicates they experienced initial product value.  
*Relevant to:* Product, growth
**Conversion** — The percentage of users who complete a target action, such as joining, signing up, depositing, or applying.  
*Relevant to:* Growth, product
**Funnel** — A sequence of steps users pass through from awareness to a desired action.  
*Relevant to:* Growth, product
**Campaign** — A coordinated set of activities designed to achieve a specific communication or growth goal.  
*Relevant to:* Content, growth, community
**KOL** — A key opinion leader or creator whose audience and credibility can influence awareness or action.  
*Relevant to:* Marketing, creator management
**Business Development** — Work focused on partnerships, integrations, customers, distribution, or commercial opportunities.  
*Relevant to:* BD, ecosystem
**Developer Relations** — Work that helps developers understand, adopt, and succeed with a technical product.  
*Relevant to:* DevRel, technical
**CRM** — A system for tracking relationships, outreach, opportunities, and follow-up.  
*Relevant to:* BD, partnerships
**Postmortem** — A structured review of an incident or failed outcome to document causes, impact, and improvements.  
*Relevant to:* Operations, product, security
# Appendix C — Skill Check Seed
Use a 1–5 agreement scale. Scores add weight to lane keys. The result should rank lanes and interpret evidence rather than label personality permanently.
| # | Question | Primary signal | Weight |
| --- | --- | --- | --- |
| 1 | I enjoy explaining complex topics in simple language. | content | 2 |
| 2 | I stay calm when users are angry or confused. | community | 2 |
| 3 | I enjoy analyzing numbers, dashboards, or patterns. | research | 2 |
| 4 | I like turning vague problems into structured plans. | product | 2 |
| 5 | I enjoy building or debugging technical systems. | technical | 2 |
| 6 | I care about visual clarity and user experience. | creative | 2 |
| 7 | I prefer public-facing work and regular communication. | community | 1 |
| 8 | I can spend hours reading documentation or primary sources. | research | 1 |
| 9 | I enjoy writing posts, articles, scripts, or campaign copy. | content | 2 |
| 10 | I like coordinating people, timelines, and operational details. | product | 1 |
| 11 | I am comfortable learning code and technical concepts deeply. | technical | 2 |
| 12 | I notice when interfaces are confusing or inconsistent. | creative | 2 |
| 13 | I enjoy networking, outreach, and finding partnership opportunities. | growth | 2 |
| 14 | I can document work and report outcomes clearly. | operations | 2 |
| 15 | I would rather build proof than rely only on a certificate. | all | 1 |
| 16 | I understand basic wallet safety and never share seed phrases. | foundation | 1 |
| 17 | I can distinguish facts, opinions, and speculation. | research | 2 |
| 18 | I am willing to receive feedback and revise my work. | all | 1 |
| 19 | I prefer flexible, async work over heavily supervised work. | operations | 1 |
| 20 | I can show at least one relevant work sample today. | readiness | 2 |

Recommended scoring keys: `community`, `growth`, `content`, `research`, `product`, `operations`, `technical`, `creative`, `foundation`, and `readiness`. Combine closely related keys when producing the six public career lanes.
# Appendix D — Roadmap Seeds
## Community & Growth
**Phase 1:** Learn wallet safety, protocol basics, and community operations
**Phase 2:** Create a moderation SOP and FAQ
**Phase 3:** Plan a two-week community activation
**Phase 4:** Write a weekly report and crisis response
**Phase 5:** Apply to contributor or junior community roles
## Content & Marketing
**Phase 1:** Choose a clear topic lane and audience
**Phase 2:** Study primary-source research workflow
**Phase 3:** Publish three educational samples
**Phase 4:** Build one campaign brief and analytics report
**Phase 5:** Create a compact portfolio and start targeted outreach
## Product & Operations
**Phase 1:** Learn product, wallet, and transaction fundamentals
**Phase 2:** Audit one Web3 user journey
**Phase 3:** Write a small PRD and prioritization rationale
**Phase 4:** Build a launch checklist or feedback taxonomy
**Phase 5:** Apply with a case-study-led portfolio
## Research & Data
**Phase 1:** Learn DeFi metrics and on-chain data limitations
**Phase 2:** Analyze one protocol using primary sources
**Phase 3:** Build one dashboard or spreadsheet model
**Phase 4:** Write a risk-aware research memo
**Phase 5:** Publish methodology and apply to analyst roles
## Technical
**Phase 1:** Choose a chain and development stack
**Phase 2:** Build and test a small contract or integration
**Phase 3:** Document failure states and security assumptions
**Phase 4:** Deploy a working testnet project
**Phase 5:** Publish the repository and technical write-up
## Creative
**Phase 1:** Study wallet, transaction, and risk UX patterns
**Phase 2:** Redesign one real Web3 flow
**Phase 3:** Build a small component system
**Phase 4:** Create a case study with decisions and trade-offs
**Phase 5:** Publish a focused portfolio and contact product teams
# Appendix E — Interview Question Bank
## Community & Growth
- How do you measure community health beyond total members and message count?
- How would you handle misinformation during a token or product incident?
- What should be included in a weekly community report?
- How would you redesign an ambassador program producing low-quality spam?
- When should community feedback become a product escalation?

## Content & Marketing
- How do you verify technical or market claims before publishing?
- How would you explain a complex protocol to an audience that already knows basic crypto?
- How do you judge whether content performed well beyond impressions?
- How would you approach sponsored content without losing audience trust?
- What would you do when a campaign brief asks for claims you cannot verify?

## Product & Operations
- How would you prioritize three urgent feature requests from different teams?
- What information belongs in a product requirement document?
- How would you improve a confusing wallet onboarding flow?
- How do you turn support tickets into structured product feedback?
- What should happen after a failed launch or major incident?

## Research & Data
- Why can TVL growth be misleading?
- How would you separate organic activity from incentive farming?
- What limitations should be disclosed in an on-chain dashboard?
- How would you evaluate a token unlock schedule?
- Which primary sources would you use to research a protocol?

## Technical
- How would you test a contract before production deployment?
- What transaction states should a frontend communicate to users?
- How do you approach access control and upgradeability?
- How would you debug a developer integration problem?
- What makes documentation examples production-useful?

## Creative
- How would you design a safer transaction confirmation screen?
- How do you create a distinctive Web3 identity without generic crypto visuals?
- What belongs in a useful product design case study?
- How would you handle a design request that reduces clarity for visual impact?
- How do you maintain consistency when campaigns move quickly?

# Appendix F — Curated Job Platform Seed
Verify platform availability, official URLs, and current positioning before production. Do not publish job-count estimates without a timestamped data source.
| Platform | Best for | KRAFT note |
| --- | --- | --- |
| Web3.career | Broad Web3 roles across technical and non-technical categories. | Useful filters and a large category range. Verify job freshness and company legitimacy. |
| CryptoJobsList | Remote crypto and Web3 roles, including entry and mid-level listings. | Good for broad browsing; compare listings with company channels before applying. |
| Cryptocurrency Jobs | Curated crypto-company openings across functions. | Useful for focused browsing; verify the current availability of each listing. |
| Remote3 | Remote-first Web3 jobs and company listings. | Good for remote search; review location and timezone requirements. |
| UseWeb3 Jobs | Developer and ecosystem-oriented opportunities. | Best for technical candidates and builders. |
| Wellfound | Startup roles, including crypto and blockchain companies. | Useful for startup context, funding stage, and company profiles. |
| LinkedIn | General professional network with many Web3 companies and recruiters. | Strong for company verification and outreach, but scam impersonation still exists. |
| Gitcoin | Grants, bounties, and ecosystem contribution opportunities. | Better for proof-of-work and contributor paths than traditional employment only. |
| LaborX | Freelance and contract roles with crypto payment options. | Review scope, escrow, payment terms, and counterparty reputation carefully. |
| DeFi Jobs | Roles focused on decentralized finance teams and protocols. | Useful for specialist research, growth, product, and engineering roles. |
| Crypto Careers | Crypto-focused job discovery and company browsing. | Use as an additional source, not the only application channel. |
| Company Career Pages | Openings published directly by protocols, exchanges, infrastructure companies, and foundations. | Often the most reliable source; verify through the company’s official domain and social channels. |

# Appendix G — Get Hired Content Outline
| Section | Core guidance | Related tool |
| --- | --- | --- |
| 1. Pick a target role | Choose one primary role and one adjacent role. Use KRAFT role pages to compare daily work, skills, and proof requirements. | Target-role worksheet. |
| 2. Build proof-of-work | Create two to four role-relevant outputs before sending large numbers of applications. | Portfolio checklist and project briefs. |
| 3. Package the work | Turn raw output into a case study with context, decisions, result, limitations, and links. | Case-study template. |
| 4. Fix profile and CV | Make the role target, relevant work, and measurable contribution visible within seconds. | CV and profile checklist. |
| 5. Apply selectively | Prioritize roles where the work, level, timezone, and compensation model are realistic. | Application tracker. |
| 6. Write useful outreach | Mention a real reason for contacting the team and attach relevant proof, not a generic “gm, any role?” message. | Outreach examples. |
| 7. Handle trial tasks | Confirm scope, time expectation, ownership, payment, and evaluation criteria before starting. | Trial-task safety checklist. |
| 8. Prepare interviews | Use structured examples: situation, decision, execution, result, and lesson. | Role-specific question bank. |
| 9. Review compensation | Compare cash, token, vesting, contractor terms, timezone, equipment, and payment reliability. | Compensation review sheet. |
| 10. Check for scams | Verify domains, team identities, contracts, and links. Never share a seed phrase or pay to apply. | Job-safety checklist. |

# Appendix H — Portfolio Project Seeds
| Target role | Brief | Deliverable |
| --- | --- | --- |
| Community Moderator | Create a moderation SOP for scams, spam, harassment, and escalation. | SOP document + escalation flow + example responses. |
| Community Manager | Design a 30-day community plan for a protocol with low-quality engagement. | Goals, calendar, metrics, report template. |
| Ambassador Manager | Redesign an ambassador program that rewards useful output. | Program tiers, rubric, anti-spam rules, review process. |
| Content Creator | Create a three-post educational series about one protocol feature. | Research notes, posts, visual, performance hypothesis. |
| Research Writer | Analyze one protocol using primary sources and disclose limitations. | 1,000–1,500 word memo with sources. |
| Social Media Manager | Build a two-week content calendar for a product launch. | Calendar, copy samples, asset list, reporting plan. |
| Product Manager | Write a PRD for improving a wallet onboarding problem. | Problem, users, scope, flows, acceptance criteria. |
| Product Operations | Create a launch and incident-response checklist. | Ownership matrix, checklist, escalation, postmortem. |
| Ecosystem / BD | Map and qualify 20 potential ecosystem partners. | Research sheet, scoring, three tailored outreach messages. |
| DeFi Analyst | Compare two protocols with similar TVL. | Metric table, risk analysis, written conclusion. |
| On-chain Analyst | Build a dashboard that measures real user retention. | Query logic, dashboard, caveats, interpretation. |
| Tokenomics Analyst | Model supply and unlock pressure for one token. | Spreadsheet, chart, assumptions, risk summary. |
| Smart Contract Developer | Build and test a small escrow or multisig-related contract. | Repository, tests, deployment, threat notes. |
| Frontend Web3 Developer | Build a transaction UI with pending, rejection, failure, and success states. | Working app, responsive UI, documented states. |
| DevRel | Create a quick-start tutorial and sample integration. | Tutorial, repository, troubleshooting section. |
| UI/UX Designer | Redesign a risky token approval flow. | User flow, wireframes, final UI, rationale, accessibility notes. |
| Brand / Motion Designer | Create a distinctive mini campaign system without generic crypto clichés. | Key visual, social templates, 10-second motion sample. |
| Technical Writer | Rewrite a confusing quick-start guide and test every step. | New information architecture, guide, verified code examples. |

