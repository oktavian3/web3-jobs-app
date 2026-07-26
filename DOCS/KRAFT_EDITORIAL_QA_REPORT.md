# KRAFT Editorial QA Report

## 1. Audit outcome

The Phase 3 package contained strong role boundaries, concrete responsibility lists, useful interview questions, and an appropriately strict salary model. The main editorial failure was separation: role-specific research had been wrapped in universal prose, structured fields had leaked into public copy, and implementation instructions were mixed with user-facing text.

The revised package keeps all 42 canonical roles and all 25 approved pages or global states. It does not change the taxonomy, redo the research, write code, or compress the role guides into generic cards.

## 2. Files produced

1. `KRAFT_PUBLIC_ROLE_COPY.md` — long-form public copy for all 42 roles.
2. `KRAFT_PUBLIC_PAGE_COPY.md` — public headlines, supporting copy, body copy and CTAs for all approved pages and global states.
3. `KRAFT_STRUCTURED_CONTENT_SCHEMA.md` — canonical records, routes, labels, confidence fields, redirects and implementation notes.
4. `KRAFT_SHARED_CONTENT_BLOCKS.md` — reusable public methodology, evidence, privacy and safety language.
5. `KRAFT_EDITORIAL_QA_REPORT.md` — this audit and remaining verification queue.

## 3. Repeated blocks removed

The original role file repeated several blocks on every role page. They have been removed from role prose, replaced with role-specific language, or moved into shared blocks.

| Original repeated block | Original count | Editorial treatment |
|---|---:|---|
| “A deliverable is credible when…” paragraph | 42 | Removed. Deliverables are now concrete role artifacts. General portfolio ownership guidance moved to SB-06. |
| Universal KPI caveat block | 42 | Removed. Each role now has a short caveat tied to its own success signals; the full methodology lives in SB-07. |
| “Used only where it supports a defined workflow…” tool description | Every tool entry | Replaced with practical use cases such as explorer verification, contract testing, campaign tracking, incident handling, documentation review, or onchain querying. |
| Universal tool-credibility sentence | 42 | Removed from public role copy. Tool evidence policy is represented by structured tool records and portfolio guidance. |
| Universal portfolio-standard paragraph | 42 | Removed. Each role now names inspectable artifacts and role-specific strong and weak proof. Shared confidentiality language moved to SB-06. |
| Universal interview-theme list | 42 | Removed. Interview focus now uses the role’s hard skills, reactive work, and scope boundaries. |
| Universal “what interviewers are testing” paragraph | 42 | Removed. Role-specific example questions remain, with a concise role-specific test statement. |
| Universal salary evidence directive | 42 | Removed from public prose. Evidence rules live in the structured schema and SB-02 to SB-04. |
| “Can explain the basic purpose…” entry-level formula | 42 | Replaced with role-specific tasks and artifacts. |
| “Owns recurring work across…” mid-level formula | 42 | Rewritten using each role’s actual decision rights, workflow and reactive work. |
| “Sets standards and direction…” senior formula | 42 | Rewritten around role-specific standards, high-risk cases and operating systems. |
| Generic mistake and misconception trio | 42 | Replaced with role-boundary mistakes and concrete weak evidence. |
| Lane-level organisational boilerplate | Repeated across lane groups | Reduced to a concise placement paragraph. The role-specific collaboration set remains structured. |

## 4. Malformed data and layer leaks fixed

- Converted **42 prerequisite list literals** such as `['Know common wallet scams...']` into normal sentences.
- Removed **13 bracket placeholder tokens** from public page copy, including role, roadmap, glossary and portfolio placeholders.
- Removed schema terms such as canonical slug, lane, source record, field names and route actions from role-page prose.
- Removed instructions such as “the page must show,” “provide,” “list,” and “show” from public page copy.
- Moved interface labels, slugs, alternative titles, related roles and confidence values into the structured schema.
- Removed JSON-like, array-like and placeholder formatting from both public-copy files.
- Separated role and page specifications from final public text.
- Removed duplicated public confidence text from role prose; confidence is now rendered from the role record.
- Replaced empty or abstract “who this role fits” blocks with the existing role-specific prose.
- Preserved special models for ZK tracks, education tracks, creator compensation, validator economics and market-making compensation.

## 5. Roles that still need factual review

The editorial rewrite is complete, but the existing research package already identified factual or market-evidence gaps. These are not copy defects and should not be filled by editorial invention.

### Publication-sensitive role review

- **Web3 Legal / Compliance:** qualified legal review is required; jurisdiction-specific wording must remain limited.
- **Node Operator / Validator:** chain-specific hardware, delegation, rewards and slashing examples require current official documentation.
- **Ambassador Manager:** current official title usage remains sparse.
- **Grant Writer:** public evidence for standalone full-time employment remains limited; freelance, fractional and contract models need current examples.
- **Web3 Educator / Curriculum Builder:** both Developer Education and User / Community Education tracks need current first-party hiring examples.
- **NFT Artist / Generative Artist:** royalty enforcement, primary-sale mechanics and creator contracts require current platform or contract evidence.
- **Market Maker:** title mapping and base, bonus, PnL-linked and risk-limit components need current listing evidence.
- **ZK Engineer / Cryptography Researcher:** the two tracks need separate current first-party hiring examples.
- **Web3 Product Designer:** previously observed senior US listings must remain examples, not a market range.
- **Product Manager, Smart Contract Developer, Community Manager and Social Media Manager:** any numeric compensation example must be refreshed before publication.

### Content-quality review

- **Community Moderator:** direct shift, contractor and regional compensation evidence is weak.
- **Creator & Ambassador Partner:** retainers, campaign fees, commissions, token packages and rights terms are often private.
- **Ecosystem Researcher:** market titles remain inconsistent and the work is frequently bundled into other roles.
- **Onchain Data Analyst:** boundary with analytics engineering and protocol economics needs more current company examples.
- **Tokenomics Analyst and Tokenomics Designer:** approved boundary remains valid, but current listing titles are inconsistent.
- **DeFi Analyst and Protocol Researcher:** small teams may combine the functions; current boundary examples should be added.
- **Operations Assistant, Operations Associate and Product Operations:** early-stage teams often collapse the functions.
- **Partnerships Manager and Ecosystem Partnerships Manager:** BD, sales, growth and ecosystem title overlap needs current deal-type examples.
- **All 42 roles:** reporting lines and employment patterns should receive at least one current official example where practical.

## 6. Sections that remain intentionally shared

These sections remain shared because repeating policy as bespoke role opinion would create inconsistency:

- Compensation evidence tiers and numeric display rules.
- Employment-model distinctions.
- Portfolio ownership and confidentiality.
- Metric-definition and attribution principles.
- Claim labels and source status.
- Job-board safety.
- Skill Check and X Matcher limitations.
- Stateless-session language, subject to deployed privacy review.
- Creator, validator and market-maker compensation models.
- Legal and compliance boundary language.
- Corrections and review-date policy.

Shared language lives in `KRAFT_SHARED_CONTENT_BLOCKS.md`. Role pages use it only when the context requires the block.

## 7. Before and after examples

### Example 1 — opening explanation

**Before**

> Community Moderator exists because Web3 teams need clear ownership over channel safety; rule enforcement; routine support triage; incident logging; escalation quality. The role operates in an environment where public infrastructure, token incentives, irreversible transactions, distributed teams, and rapidly changing market conditions can alter the work.

**After**

> Most days, the practitioner has to review handoff notes, scan Discord and Telegram, answer routine questions, remove obvious abuse, and document anything that crosses an escalation threshold. Its decision rights usually cover channel safety, rule enforcement, and routine support triage, while community strategy and partnerships remain outside the default remit.

The revision replaces abstract category language with the actual shift and the authority boundary.

### Example 2 — tool use

**Before**

> Discord — used only where it supports a defined workflow, decision, or deliverable.

**After**

> Discord: Monitor reports, apply channel rules, answer from approved sources, and leave a clean handoff for the next shift.

The tool now explains the work rather than defending the existence of the tool list.

### Example 3 — entry-level expectation

**Before**

> Can explain the basic purpose of Community Moderator and the boundaries between it and adjacent roles.

**After**

> At entry level, a candidate should be able to complete a scoped assignment with review. That includes the ability to monitor public channels and remove scams, impersonation, spam, harassment, and coordinated disruption, to answer recurring questions from approved sources, and to produce reviewable artifacts such as a moderation log and an escalation ticket.

The revision states what an entry-level candidate must actually do and show.

### Example 4 — malformed prerequisite data

**Before**

> ['Know common wallet scams, project rules, escalation contacts, and the difference between confirmed information and rumor.']

**After**

> Know common wallet scams, project rules, escalation contacts, and the difference between confirmed information and rumor.

### Example 5 — page specification leaking into copy

**Before**

> Show responsibilities, realistic daily and weekly cadence, reactive work, deliverables, and decision rights.

**After**

> The work in practice: responsibilities, daily and weekly cadence, reactive work, deliverables, and scope boundaries.

### Example 6 — salary policy in role prose

**Before**

> The page must show the evidence tier: direct role-specific evidence, adjacent-role evidence, broad Web3 market evidence, or unverified estimate.

**After**

The role page retains its role-specific compensation context. Evidence tier and confidence are rendered from structured records, while the reusable explanation lives in SB-02.

## 8. Automated editorial checks completed

- Canonical role headings: **42**
- Approved page and global-state headings: **25**
- Array literals in public files: **0**
- Bracket placeholders in public files: **0**
- JSON fragments in public files: **0**
- Generic tool phrase from the original: **0**
- Universal deliverable boilerplate from the original: **0**
- “The page must show” directives in public files: **0**
- Empty role-fit sections: **0**
- Senior-level role-title mismatches: **0**
- Taxonomy changes: **0**

## 9. Remaining human decisions

- Public operator, editor, contributor and contact details for About.
- Real analytics, hosting, API, model, log and retention behavior for Privacy.
- Final update cadence and named editorial owner.
- Current evidence refresh for every numeric compensation example.
- Official job-board destinations and verification dates.
- Exact X data-access method and terms compliance.
- Whether matcher inputs or results may ever be stored or shared.
- Final behavior for `/posts`.
- Legal review of compensation, token, tax and compliance wording.

## 10. Publication recommendation

The revised package is suitable for implementation once the P0 and P1 factual gates from the existing fact-check queue are resolved. The public-copy files should be treated as editorial source text; structured fields and shared blocks should be rendered through the schema rather than pasted into prose.

**AWAITING EDITORIAL CONFIRMATION**
