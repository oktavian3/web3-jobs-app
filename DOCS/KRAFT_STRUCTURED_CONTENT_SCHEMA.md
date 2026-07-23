# KRAFT Structured Content Schema

This file contains structured records and implementation notes. None of the field names, status values, route actions, or QA instructions in this file should be rendered as public prose.

## 1. Layer boundaries

| Layer | Source file | May appear publicly | Purpose |
|---|---|---|---|
| Public role copy | `KRAFT_PUBLIC_ROLE_COPY.md` | Yes | Long-form role explanations and role-specific hiring content |
| Public page copy | `KRAFT_PUBLIC_PAGE_COPY.md` | Yes | Headlines, body copy, CTAs, labels, empty and error messages |
| Structured data | This file | Only through formatted fields | Slugs, titles, lanes, alternative titles, tools, related roles, confidence and source links |
| Shared blocks | `KRAFT_SHARED_CONTENT_BLOCKS.md` | Yes, where specified | Reusable methodology, evidence, safety and privacy language |
| Implementation notes | This file and QA report | No | Section order, component behavior, mobile priority, evidence and release checks |

## 2. Role record model

- **Identity:** canonical title; slug; lane; alternative titles; concise summary.
- **Organisation:** team location; reporting line; collaboration set; employment models.
- **Scope:** decision rights; owned work; excluded work; exceptions.
- **Work:** responsibilities; daily cadence; weekly or monthly cadence; reactive work.
- **Outputs:** deliverables; success signals; KPI caveat.
- **Capability:** tools with use cases; hard skills; working skills; prerequisite knowledge.
- **Leveling:** entry; mid; senior expectations.
- **Proof:** strong proof; portfolio standard; weak proof; mistakes; misconceptions.
- **Hiring:** interview focus; example questions; interviewer test.
- **Compensation:** context; evidence tier; confidence; evidence record IDs; risks.
- **Career:** progression; related role slugs; fit; non-fit; practical next steps.
- **Trust:** source IDs; claim labels; fact-check IDs; last reviewed; methodology version.

**Storage rule:** Public prose remains in the public-copy file. Structured fields remain individually queryable and must not be flattened into one content blob.

## 3. Canonical role registry

| # | Canonical title | Slug | Lane | Alternative market titles | Tool tags | Related roles | Compensation confidence |
|---:|---|---|---|---|---|---|---|
| 1 | Community Moderator | ``/roles/community-moderator`` | Community & Growth | Discord Moderator, Telegram Moderator, Community Support Moderator | Discord; Telegram; Notion; Google Sheets; Zendesk or Linear | Community Manager; Customer Support Specialist; Operations Associate | Low to medium |
| 2 | Community Manager | ``/roles/community-manager`` | Community & Growth | Community Lead, Regional Community Manager, Community & Social Lead | Discord; Telegram; Notion; Typeform; Dune or product analytics; event tools | Community Moderator; Ambassador Manager; Growth Manager; Ecosystem Partnerships Manager | Medium |
| 3 | Ambassador Manager | ``/roles/ambassador-manager`` | Community & Growth | Community Programs Manager, Ambassador Program Lead, Advocacy Program Manager | Notion; Airtable; Discord; CharmVerse or contribution tooling; Google Sheets; form tools | Community Manager; Creator & Ambassador Partner; Operations Associate; Growth Manager | Low |
| 4 | Ecosystem Partnerships Manager | ``/roles/ecosystem-partnerships-manager`` | Community & Growth | Ecosystem Manager, Ecosystem Development Manager, Strategic Ecosystem Partnerships | HubSpot or Airtable; Notion; LinkedIn; Telegram; Dune or ecosystem analytics; technical docs | Partnerships Manager; Growth Manager; Developer Relations; Governance Coordinator | Medium |
| 5 | Creator & Ambassador Partner | ``/roles/creator-ambassador-partner`` | Community & Growth | Creator Partnerships Manager, KOL Manager, Influencer and Ambassador Partnerships | Airtable or CRM; Notion; X and social analytics; contract workflow; Google Sheets; messaging platforms | Ambassador Manager; Social Media Manager; Product Marketing Manager; Partnerships Manager | Low to medium |
| 6 | Partnerships Manager | ``/roles/partnerships-manager`` | Community & Growth | Strategic Partnerships Manager, Business Development Manager, Commercial Partnerships Manager | HubSpot or Salesforce; Notion; LinkedIn; Google Sheets; contract workflow; product documentation | Ecosystem Partnerships Manager; Product Marketing Manager; Growth Manager | Medium |
| 7 | Growth Manager | ``/roles/growth-manager`` | Community & Growth | Web3 Growth Manager, Growth Lead, User Growth Manager | Product analytics; Dune; Amplitude or Mixpanel; SQL or spreadsheets; CRM and lifecycle tools; experiment documentation | Product Manager; Product Marketing Manager; Onchain Data Analyst; Community Manager | Medium |
| 8 | Content Creator | ``/roles/content-creator`` | Content & Marketing | Video Content Creator, Content Producer, Social Content Creator | Notion; Figma or Canva; editing software; X, YouTube, TikTok, or other target platforms; analytics tools | Social Media Manager; Research Writer; Creator & Ambassador Partner; Product Marketing Manager | Low to medium |
| 9 | Research Writer | ``/roles/research-writer`` | Content & Marketing | Research Analyst Writer, Protocol Research Writer, Editorial Researcher | Docs or Notion; Dune; DefiLlama; block explorers; Google Sheets; citation and archiving tools | Protocol Researcher; DeFi Analyst; Crypto Journalist; Technical Writer | Low to medium |
| 10 | Social Media Manager | ``/roles/social-media-manager`` | Content & Marketing | Social Lead, Social Media Strategist, Community and Social Manager | X and platform-native tools; Buffer or scheduling tools; Notion; Figma; analytics dashboards; link tracking | Content Creator; Community Manager; Product Marketing Manager; Brand Designer | Medium |
| 11 | Crypto Journalist | ``/roles/crypto-journalist`` | Content & Marketing | Crypto Reporter, Blockchain Journalist, Digital Assets Correspondent | Document and archive tools; encrypted communication; block explorers; data dashboards; transcription tools; CMS | Research Writer; Content Creator; Web3 Legal / Compliance; DeFi Analyst | Low to medium |
| 12 | Product Marketing Manager | ``/roles/product-marketing-manager`` | Content & Marketing | Product Marketing Lead, Go-to-Market Manager, Developer Product Marketing Manager | Notion; Figma; product analytics; Dune; CRM; research and survey tools | Product Manager; Growth Manager; Social Media Manager; Developer Relations; Partnerships Manager | Medium |
| 13 | Product Manager | ``/roles/product-manager`` | Product & Operations | Web3 Product Manager, Protocol Product Manager, Product Lead | Linear or Jira; Notion; Figma; analytics tools; Dune; customer research tools | Product Operations; Web3 Product Designer; Protocol Engineer; Product Marketing Manager | Medium |
| 14 | Product Operations | ``/roles/product-operations`` | Product & Operations | Product Ops Manager, Product Operations Specialist, Launch Operations | Notion; Linear or Jira; Zendesk; Google Sheets; Slack; analytics dashboards | Product Manager; Operations Associate; Customer Support Specialist; Technical Writer | Medium |
| 15 | Technical Writer | ``/roles/technical-writer`` | Product & Operations | Documentation Engineer, Developer Documentation Writer, API Technical Writer | Docs-as-code or CMS; GitHub; Markdown or MDX; OpenAPI tooling; diagram tools; analytics and search logs | Developer Relations; Product Operations; Backend Engineer; Web3 Educator / Curriculum Builder | Medium |
| 16 | Operations Assistant | ``/roles/operations-assistant`` | Product & Operations | Web3 Operations Assistant, Executive Operations Assistant, Remote Operations Assistant | Google Workspace; Notion; Airtable; calendar tools; Slack, Telegram, or Discord; password-management workflow | Operations Associate; Product Operations; Customer Support Specialist; Grant Writer | Low |
| 17 | Operations Associate | ``/roles/operations-associate`` | Product & Operations | Business Operations Associate, Programme Operations Associate, Ecosystem Operations Associate | Notion; Airtable; Google Sheets; Linear or Asana; CRM; finance and vendor tools | Operations Assistant; Product Operations; Governance Coordinator; Grant Writer | Medium |
| 18 | Customer Support Specialist | ``/roles/customer-support-specialist`` | Product & Operations | Customer Experience Specialist, User Support Specialist, Technical Support Specialist | Zendesk or Intercom; block explorers; internal admin tools; Notion; Linear or Jira; status and incident tools | Community Moderator; Product Operations; Technical Writer; Operations Associate | Medium |
| 19 | DeFi Analyst | ``/roles/defi-analyst`` | Research & Data | DeFi Research Analyst, Protocol Analyst, Crypto Markets Analyst | DefiLlama; Dune; block explorers; governance forums; Google Sheets or Python; risk and market data tools | Protocol Researcher; Onchain Data Analyst; Tokenomics Analyst; Market Maker | Low to medium |
| 20 | Protocol Researcher | ``/roles/protocol-researcher`` | Research & Data | Protocol Research Analyst, Mechanism Researcher, Crypto Protocol Researcher | GitHub; protocol docs; governance forums; Dune or data tools; Python or notebooks; diagramming tools | DeFi Analyst; Tokenomics Designer; Protocol Engineer; ZK Engineer / Cryptography Researcher | Low to medium |
| 21 | Onchain Data Analyst | ``/roles/onchain-data-analyst`` | Research & Data | Blockchain Data Analyst, On-chain Analyst, Web3 Data Analyst | Dune; Flipside; SQL; Python; block explorers; data warehouses or notebooks | DeFi Analyst; Tokenomics Analyst; Growth Manager; Ecosystem Researcher | Low to medium |
| 22 | Tokenomics Analyst | ``/roles/tokenomics-analyst`` | Research & Data | Token Economics Analyst, Token Research Analyst, Tokenomics Researcher | Spreadsheets; Python; Dune; block explorers; Token Terminal or similar data; governance and disclosure sources | Onchain Data Analyst; DeFi Analyst; Tokenomics Designer; Market Maker | Low |
| 23 | Tokenomics Designer | ``/roles/tokenomics-designer`` | Research & Data | Token Economist, Mechanism Designer, Crypto Economic Designer | Spreadsheets; Python or simulation tools; notebooks; governance modelling; protocol docs; diagramming tools | Tokenomics Analyst; Protocol Researcher; Protocol Engineer; Governance Coordinator | Low |
| 24 | Ecosystem Researcher | ``/roles/ecosystem-researcher`` | Research & Data | Ecosystem Intelligence Analyst, Opportunity Researcher, Web3 Ecosystem Analyst | Official docs and forums; X lists; Dune; block explorers; spreadsheets; web archiving tools | DeFi Analyst; Onchain Data Analyst; Grant Writer; Ecosystem Partnerships Manager | Low |
| 25 | Smart Contract Developer | ``/roles/smart-contract-developer`` | Technical & Security | Solidity Engineer, Smart Contract Engineer, Blockchain Engineer | Solidity or relevant chain language; Foundry or Hardhat; OpenZeppelin; GitHub; static analysis; block explorers | Protocol Engineer; Smart Contract Auditor; Frontend Web3 Developer; Tokenomics Designer | Medium |
| 26 | Frontend Web3 Developer | ``/roles/frontend-web3-developer`` | Technical & Security | Web3 Frontend Engineer, dApp Engineer, React Web3 Developer | React; TypeScript; Next.js; wagmi or viem; testing tools; Figma and browser tooling | Web3 Product Designer; Smart Contract Developer; Backend Engineer; Product Manager | Medium |
| 27 | Developer Relations | ``/roles/developer-relations`` | Technical & Security | Developer Advocate, Developer Experience Engineer, Technical Community Lead | GitHub; Docs; Discord; CodeSandbox or StackBlitz; analytics; event and livestream tools | Technical Writer; Web3 Educator / Curriculum Builder; Frontend Web3 Developer; Ecosystem Partnerships Manager | Medium |
| 28 | Smart Contract Auditor | ``/roles/smart-contract-auditor`` | Technical & Security | Blockchain Security Auditor, Smart Contract Security Researcher, Web3 Security Engineer | Foundry or Hardhat; Slither; Echidna or fuzzing tools; GitHub; debuggers; formal methods where relevant | Smart Contract Developer; Protocol Engineer; ZK Engineer / Cryptography Researcher; Node Operator / Validator | Medium |
| 29 | Node Operator / Validator | ``/roles/node-operator-validator`` | Technical & Security | Validator Engineer, Blockchain Infrastructure Engineer, Protocol Infrastructure Operator | Linux; Docker or orchestration; Prometheus; Grafana; cloud or bare-metal tooling; chain-specific clients | Backend Engineer; Protocol Engineer; Smart Contract Auditor; Governance Coordinator | Low to medium |
| 30 | Protocol Engineer | ``/roles/protocol-engineer`` | Technical & Security | Core Protocol Engineer, Blockchain Protocol Engineer, Distributed Systems Engineer | Rust, Go, C++, or protocol language; GitHub; testing and simulation frameworks; profilers; network tooling; formal specifications | Backend Engineer; ZK Engineer / Cryptography Researcher; Node Operator / Validator; Protocol Researcher | Medium |
| 31 | Backend Engineer | ``/roles/backend-engineer`` | Technical & Security | Web3 Backend Engineer, Platform Engineer, Blockchain Backend Developer | Go, Rust, TypeScript, Python, or similar; databases; queues; cloud infrastructure; RPC and indexing tools; observability stack | Protocol Engineer; Frontend Web3 Developer; Node Operator / Validator; Onchain Data Analyst | Medium |
| 32 | ZK Engineer / Cryptography Researcher | ``/roles/zk-engineer-cryptography-researcher`` | Technical & Security | ZK Engineer, Zero-Knowledge Engineer, Cryptography Researcher, Applied Cryptographer | Rust, C++, Python, or relevant languages; proof-system frameworks; formal tools; GitHub; paper and benchmark tooling; specialized hardware where relevant | Protocol Engineer; Smart Contract Auditor; Protocol Researcher; Smart Contract Developer | Low |
| 33 | Governance Coordinator | ``/roles/governance-coordinator`` | Governance, Legal & People | DAO Governance Coordinator, Governance Operations Manager, Governance Program Manager | Governance forums; Snapshot or chain voting tools; Notion; Discord; block explorers; budget and tracking tools | Grant Writer; Tokenomics Designer; Operations Associate; Web3 Legal / Compliance | Low to medium |
| 34 | Web3 Legal / Compliance | ``/roles/web3-legal-compliance`` | Governance, Legal & People | Crypto Counsel, Digital Assets Compliance Manager, Web3 Regulatory Counsel | Legal research platforms; contract workflow; case management; compliance tools; Notion; risk registers | Governance Coordinator; Web3 HR / Talent Acquisition; Product Manager; Customer Support Specialist | Medium |
| 35 | Web3 HR / Talent Acquisition | ``/roles/web3-hr-talent-acquisition`` | Governance, Legal & People | Crypto Recruiter, Web3 Talent Partner, People Operations and Talent | ATS such as Greenhouse; LinkedIn; Notion; Airtable; scheduling tools; compensation and HR systems | Operations Associate; Web3 Legal / Compliance; Community Manager; Developer Relations | Medium |
| 36 | Grant Writer | ``/roles/grant-writer`` | Governance, Legal & People | Grant Consultant, Ecosystem Grants Specialist, Proposal Writer | Notion or Google Docs; spreadsheets; grant portals; governance forums; CharmVerse or Gitcoin where relevant; project management tools | Governance Coordinator; Ecosystem Researcher; Operations Associate; Ecosystem Partnerships Manager | Low |
| 37 | Web3 Educator / Curriculum Builder | ``/roles/web3-educator-curriculum-builder`` | Governance, Legal & People | Developer Educator, Curriculum Designer, Community Education Lead | Docs or LMS; GitHub and sandboxes for developer track; presentation tools; forms and assessment tools; analytics; community platforms | Developer Relations; Technical Writer; Community Manager; Content Creator | Low |
| 38 | Web3 Product Designer | ``/roles/web3-product-designer`` | Creative | Product Designer, Web3 UX Designer, dApp Product Designer | Figma; FigJam; prototyping and research tools; analytics; Dune where relevant; handoff and issue tools | Product Manager; Frontend Web3 Developer; Brand Designer; Customer Support Specialist | Medium |
| 39 | Brand Designer | ``/roles/brand-designer`` | Creative | Visual Brand Designer, Brand Systems Designer, Marketing Designer | Figma; Adobe tools or equivalents; asset management; presentation tools; collaboration and review tools | Motion Designer; Product Marketing Manager; Social Media Manager; Web3 Product Designer | Medium |
| 40 | Motion Designer | ``/roles/motion-designer`` | Creative | Motion Graphics Designer, Brand Motion Designer, 3D Motion Designer | After Effects or equivalent; Figma; 3D tools where relevant; editing and encoding tools; asset management | Brand Designer; Content Creator; Web3 Product Designer; Social Media Manager | Medium |
| 41 | NFT Artist / Generative Artist | ``/roles/nft-generative-artist`` | Creative | Generative Artist, Digital Artist, Creative Coder | Creative coding tools; design or 3D software; smart contract or mint platforms; IPFS or storage tools; portfolio and documentation tools | Brand Designer; Motion Designer; Smart Contract Developer; Creator & Ambassador Partner | Very low for salary; model-specific context only |
| 42 | Market Maker | ``/roles/market-maker`` | Trading & Finance Adjacent | Quant Trader, Algorithmic Trader, Liquidity Provider | Python or C++; exchange APIs; market data; risk systems; Grafana; spreadsheets and databases | DeFi Analyst; Tokenomics Analyst; Backend Engineer; Protocol Researcher | Low to medium |

## 4. Page record model

- Route or global-state key.
- Page objective and primary user.
- Headline, supporting copy, body sections, CTAs, labels and helper text.
- Information hierarchy and required evidence.
- Related routes and navigation placement.
- Trust and methodology requirements.
- Desktop and mobile content priorities.
- Claims requiring verification, source IDs and last-reviewed date.
- Empty, loading, error and unavailable states where relevant.

## 5. Page and state registry

| Page or state | Route / key | Action | Objective | Mobile priority | Verification focus |
|---|---|---|---|---|---|
| Homepage | `/` | Update | Explain what KRAFT is, show how the system connects, and route users to a useful starting point without forcing a linear course journey. | Keep the headline, starting paths, role examples, and primary trust note above secondary feature explanations. | Role count must be generated from taxonomy data. Any job, salary, update-frequency, or usage statistic requires a live source. |
| Roles Directory | `/roles` | Update | Help users browse, filter, and compare the full 42-role taxonomy by actual work rather than title familiarity. | Prioritize search, lane, role title, summary, entry expectation, and boundary link. Move advanced filters into an accessible sheet. | Alternative titles and salary confidence must come from structured role records. |
| Role Detail template | `/roles/[slug]` | Update dynamic route | Explain one role deeply enough that users understand the work, boundaries, evidence, interviews, compensation context, and next steps. | Snapshot, boundary, responsibilities, proof, and confidence must remain visible. Do not hide essential scope inside accordions. | Every numeric compensation value and market claim requires a source-linked record. |
| Career Roadmaps index | `/roadmaps` | Update | Help users choose a realistic sequence based on starting point, not a generic promise of becoming job-ready in a fixed number of days. | Show starting point, target roles, prerequisites, and first proof milestone. | Any estimate of hours or duration must be an editorial planning estimate, not a hiring claim. |
| Career Roadmap detail | `/roadmaps/[slug]` | Create or update | Sequence learning and proof for a specific path while explaining trade-offs, checkpoints, and alternative role outcomes. | Show current stage, next deliverable, checkpoint, and target role link. | No job-readiness or time-to-hire claim without validated longitudinal evidence. |
| Skill Check | `/skill-check` | Update | Collect self-reported evidence and work preferences to narrow possible role fit without pretending to measure aptitude or employability. | Keep caveats and privacy statement visible before Start. | Do not call the tool validated, diagnostic, psychometric, predictive, or definitive. |
| Skill Check results | `/skill-check/results` | Create | Explain possible role matches, evidence, uncertainty, gaps, and practical next steps. | Top role, confidence, why, caveat, and next action first. | Never claim aptitude, employability, personality, hiring suitability, or compensation value. |
| Glossary index | `/glossary` | Update | Reduce vocabulary friction across role guides, job descriptions, interviews, and protocol documentation. | Search and category first, then short definition and related role. | Protocol-specific definitions require version and source review. |
| Glossary term detail | `/glossary/[slug]` | Create or update | Explain one term in plain language without stripping the context needed for real work. | Meaning, why it matters, and example first. | Avoid universal definitions when chains or protocols implement the concept differently. |
| Learn Web3 | `/learn-web3` | Create or update | Curate role-linked resources with prerequisites, learning outcomes, exercises, and a required next output. | Role, prerequisite, expected outcome, and next output. | Estimated effort is a planning estimate, not a mastery or hiring timeline. |
| Get Hired | `/get-hired` | Update | Give users a practical, role-specific application system from research and proof packaging through interviews, offers, and safety. | Role target, proof, application steps, safety, and interview link. | Do not claim ATS success rates, hiring timelines, or conversion benchmarks without evidence. |
| Job Boards | `/job-boards` | Update | Help users choose external job sources, verify listings, and search with role, location, and safety context. | Active listing essentials and verification state first. | Job counts and active status require live data. KRAFT must not imply it hosts third-party roles. |
| Portfolio index | `/portfolio` | Update | Help users choose a proof-of-work project that matches the role, prerequisites, available data, and realistic effort. | Role, effort, prerequisite, deliverables, and primary CTA. | Effort is an editorial estimate and should not be presented as universal. |
| Portfolio brief detail | `/portfolio/[slug]` | Create | Provide a realistic project scenario with constraints, execution plan, deliverables, evaluation, and case-study packaging. | Task, constraints, deliverables, and next step first. | Any example metric or company context must be clearly fictional or sourced. |
| Interview Prep | `/interview-prep` | Update | Help users practice role-specific questions and understand what interviewers are testing. | Question, what it tests, and answer framework first. | Do not claim company-specific interview knowledge without a source and date. |
| FAQ | `/faq` | Update | Answer short product, role, methodology, salary, privacy, safety, and navigation questions without duplicating long guides. | Search first, then category and concise answer. | Every answer that changes with product behavior must be kept in sync with implementation. |
| About | `/about` | Create after facts approved | Explain why KRAFT exists, who it serves, and the editorial principles behind the product. | Mission, audience, editorial approach, trust link. | Any founder, team, partner, or update-cadence claim requires confirmation. |
| Privacy / Data Use | `/privacy` | Create | Explain data behavior in plain language, especially for Skill Check and the experimental X Profile Role Matcher. | Stateless status and prohibited inferences first. | Requires legal and implementation review before publication. |
| Methodology | `/methodology` | Create | Explain how KRAFT researches roles, labels claims, handles title inconsistency, updates content, and records uncertainty. | Claim labels and limitations first. | Update cadence and reviewer identity require operational confirmation. |
| Salary Methodology | `/salary-methodology` | Create | Explain when KRAFT may show numeric compensation, which evidence tiers are used, and why some role pages have no range. | Evidence tier and confidence before any number. | All active numeric values require quarterly verification. |
| Disclaimers | `/disclaimers` | Update | State clear boundaries for employment, salary, education, external links, safety, financial, legal, and data claims. | Employment, wallet safety, and experimental feature boundary first. | Requires legal review before final publication. |
| Navigation | `Global component` | Reusable global content | Keep core learning and hiring routes obvious without duplicating destinations or hiding essential links. | Four core routes plus accessible More. | No claim requirements beyond route accuracy. |
| Footer | `Global component` | Reusable global content | Provide a compact sitemap, trust routes, product boundary, and update context. | Trust links remain visible, not buried behind interaction. | Version and review date must be data-driven. |
| Empty states | `Reusable states` | Reusable global content | Explain why content is empty and provide a useful next route without fabricating inventory. | One clear primary action and one alternative. | Counts and inventory state must come from live data. |
| Error states | `Reusable states` | Reusable global content | Explain what failed, protect user data, and provide a safe recovery route. | Recovery action first. | State persistence behavior must match implementation.   ---  AWAITING FINAL CONTENT CONFIRMATION |
| X Profile Role Matcher | `/experiments/x-role-matcher` | Feature-flagged create | Secondary experimental match based on visible public evidence | Result confidence, evidence used, missing signals, privacy and reset | Data-access method, statelessness, terms compliance and red-team review |
| Posts | `/posts` | Hide | No public editorial page until real inventory exists | Exclude from navigation and sitemap | Human decision on future route behavior |

## 6. Page interface-label registry

| Page or state | Labels |
|---|---|
| Homepage | Explore 42 roles; Compare role boundaries; Build proof-of-work; Prepare for interviews; Review salary evidence |
| Roles Directory | All roles; Community & Growth; Content & Marketing; Product & Operations; Research & Data; Technical & Security; Governance, Legal & People; Creative; Trading & Finance Adjacent |
| Role Detail template | Role snapshot; Scope and boundaries; Responsibilities; Daily work; Deliverables; Skills; Level expectations; Portfolio; Interview prep; Compensation; Risks; Next steps |
| Career Roadmaps index | Starting point; Target lane; Prerequisites; Proof milestones; Role transitions |
| Career Roadmap detail | Prerequisites; 30 days; 90 days; 180 days; Proof checkpoints; Alternative paths |
| Skill Check | About 8–12 minutes; No definitive assessment; Stateless by default; You can revise answers |
| Skill Check results | Possible fit; Confidence; Visible evidence; Missing evidence; What could change the result |
| Glossary index | Search terms; Browse categories; Related roles; Commonly confused with |
| Glossary term detail | Meaning; Why it matters; Example; Commonly confused with; Related roles; Related terms |
| Learn Web3 | Role; Level; Prerequisite; Expected outcome; Next output; Last checked |
| Get Hired | Role target; CV and ATS; Portfolio; Applications; Outreach; Trial tasks; Interviews; Compensation; Safety; Tracking |
| Job Boards | Verified on; Published; Employment type; Location; Remote model; Source; Status |
| Portfolio index | Role; Effort; Prerequisites; Individual or team; Code or no-code; Deliverables |
| Portfolio brief detail | Context; Task; Constraints; Deliverables; Rubric; Tools; Packaging; Checklist |
| Interview Prep | Lane; Role; Category; What it tests; Weak patterns; Answer framework; Follow-ups; Self-score |
| FAQ | Getting started; Roles; Portfolio; Applications; Interviews; Compensation; Safety; Methodology; Privacy |
| About | Why KRAFT exists; Who it serves; Editorial approach; Product boundaries |
| Privacy / Data Use | Data processed; Data stored; Public profile data; Inferences not made; External services; User controls |
| Methodology | Sources; Claim labels; Taxonomy; Review cadence; Corrections; Limitations |
| Salary Methodology | Evidence tier; Confidence; Market; Seniority; Employment type; Components; Last reviewed |
| Disclaimers | Employment; Compensation; Third parties; Safety; Financial and legal; Experimental features |
| Navigation | Learn; Assess; Prepare; Apply; Trust; Experimental |
| Footer | Explore; Prepare; Apply; Trust |
| Empty states | No results; No verified listings; No stored progress; No clear match |
| Error states | Retry; Reset; Return; Report issue |

## 7. Role detail section order

1. Role title and concise summary.
2. What this role actually does.
3. Where the role sits.
4. Core responsibilities.
5. Daily, weekly and reactive work.
6. Deliverables.
7. Success signals and role-specific KPI caveat.
8. Tools in practice.
9. Skills and prerequisite knowledge.
10. Expectations by level.
11. Proof of work and portfolio.
12. Common mistakes and misconceptions.
13. Scope boundaries.
14. Interview focus and example questions.
15. Compensation and role risks.
16. Career path and role fit.
17. Practical next steps.

## 8. Reusable presentation patterns

- **Long-form prose:** opening explanation, organisational context, scope boundaries, compensation context and role fit.
- **Tables:** level expectations, role comparisons, salary evidence records and roadmap checkpoints.
- **Timelines:** daily/weekly/reactive cadence and roadmap stages.
- **Accordions:** interview question groups, long FAQ sets, source notes and secondary examples. Do not hide the role summary, boundaries, prerequisites or compensation confidence.
- **Comparison blocks:** adjacent roles, approved taxonomy boundaries, evidence tiers and Skill Check alternatives.
- **Source-linked records:** salary numbers, current job listings, tool links, market claims, protocol-specific mechanics and glossary definitions.

## 9. Confidence-labeled fields

| Field | Allowed values | Public behavior |
|---|---|---|
| Compensation evidence tier | Direct; Adjacent; Broad market; Unverified | Visible beside compensation context |
| Compensation confidence | High; Medium; Low; Very low | Visible before any numeric value |
| Matcher confidence | Low; Medium; High | Always paired with evidence used and missing signals |
| Claim status | Verified fact; Common industry pattern; Recommendation; Exception; Needs human verification | Editorial preview; unresolved claims excluded or explicitly qualified |
| Source status | Active; Expired; Archived; Unavailable; Superseded | Controls whether evidence can support public claims |

## 10. Legacy redirects

| Legacy route | Canonical destination | Note |
|---|---|---|
| `/bridge` | `/get-hired` | Permanent, one hop. |
| `/resources` | `/job-boards` | Permanent, one hop. |
| `/roles/ui-ux-designer` | `/roles/web3-product-designer` | Permanent, one hop. |
| `/roles/web3-ui-ux-designer` | `/roles/web3-product-designer` | Permanent, one hop. |
| `/roles/on-chain-analyst` | `/roles/onchain-data-analyst` | Permanent, one hop. |
| `/roles/blockchain-data-analyst` | `/roles/onchain-data-analyst` | Permanent, one hop. |
| `/roles/brand-motion-designer` | `/roles/brand-designer` | Permanent default to Brand Designer; show Motion Designer as a visible related role. |
| `/roles/ecosystem-bd` | `/roles/ecosystem-partnerships-manager` | Permanent, one hop. |
| `/roles/dao-governance-coordinator` | `/roles/governance-coordinator` | Permanent, one hop. |
| `/roles/ambassador-kol` | `/roles/creator-ambassador-partner` | Permanent, one hop. |
| `/roles/airdrop-researcher-alpha-hunter` | `/roles/ecosystem-researcher` | Permanent, one hop. |
| `/roles/web3-virtual-assistant` | `/roles/operations-assistant` | Permanent, one hop. |
| `/roles/crypto-journalist-writer` | `/roles/crypto-journalist` | Permanent, one hop. |
| `/roles/zk-engineer-cryptographer` | `/roles/zk-engineer-cryptography-researcher` | Permanent, one hop. |

## 11. Evidence record requirements

Every numeric compensation record requires role mapping, source title, publisher, canonical URL, publication and review dates, status, geography, seniority, employment type, currency, period, minimum and maximum as published, statistic type, compensation components, sample size where relevant, methodology note, confidence and limitation.

Tool records require name, official URL, role-specific use case, expected proficiency, source status and last-checked date. Tool logos without these fields are decorative and insufficient.

## 12. Layout-sensitive content

- Do not truncate role summaries, boundary explanations, prerequisite knowledge, compensation caveats or experimental-feature limitations.
- Long role pages require a table of contents or sticky section navigation, not copy deletion.
- On mobile, keep the summary, scope boundary, proof expectations and evidence confidence above secondary examples.
- Comparison tables must have a stacked or horizontal-scroll alternative with row labels preserved.
- Role and page counts must come from live structured records.

## 13. Content that must never be fabricated

- Salary ranges, current job openings, employer names, partner logos, learner counts, hiring outcomes, testimonials or update cadence.
- Stored-profile controls when the product is stateless.
- Definitive career fit, employability, aptitude, intelligence, personality type, hiring suitability or compensation value.
- Chain-specific validator economics or legal conclusions without current primary evidence.
- Creator revenue, trading performance or token value as guaranteed compensation.

## 14. Required implementation QA

1. Confirm 42 canonical role records and no duplicate slugs.
2. Confirm every public role section resolves to role-specific copy rather than a universal paragraph.
3. Validate all alternative titles, related-role references and redirects.
4. Search public output for brackets, array literals, JSON fragments, internal field names and placeholder copy.
5. Confirm every tool has a practical use case.
6. Confirm numeric compensation values resolve to active evidence records.
7. Confirm X Matcher and Skill Check use only approved non-deterministic language.
8. Confirm `/posts` is absent from navigation and sitemap.
9. Verify mobile access to boundaries, proof standards, confidence and safety copy.
10. Run link, redirect, accessibility and content-completeness audits before release.
