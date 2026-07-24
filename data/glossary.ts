import { roles, type CareerLane } from "./roles";

export type GlossaryTerm = {
  slug: string;
  term: string;
  category: string;
  simpleMeaning: string;
  whyItMatters: string;
  commonTrap: string;
  usedInRoles: CareerLane[];
  relatedTerms: string[];
};

const categories = {
  basics: "Basics & Wallet Safety",
  contracts: "Smart Contracts & Development",
  defi: "DeFi & Markets",
  data: "Research & Data",
  governance: "Governance & Ecosystem",
  consumer: "NFT, Consumer & Social",
  career: "Career & Hiring",
  growth: "Growth & Operations",
} as const;

const laneByKey: Record<string, CareerLane[]> = {
  all: ["Community & Growth", "Content & Marketing", "Product & Operations", "Research & Data", "Technical & Security", "Creative", "Governance, Legal & People", "Trading & Finance Adjacent"],
  community: ["Community & Growth"],
  content: ["Content & Marketing"],
  product: ["Product & Operations"],
  research: ["Research & Data"],
  technical: ["Technical & Security"],
  creative: ["Creative"],
  governance: ["Governance, Legal & People"],
  finance: ["Trading & Finance Adjacent"],
  growth: ["Community & Growth", "Content & Marketing"],
  operations: ["Product & Operations", "Community & Growth"],
  mixed: ["Product & Operations", "Research & Data", "Technical & Security"],
};

const seeds: Array<{
  term: string;
  category: keyof typeof categories;
  meaning: string;
  matters: string;
  trap: string;
  roles: keyof typeof laneByKey;
  related: string[];
}> = [
  ["Wallet", "basics", "Software or hardware used to control blockchain accounts and sign actions.", "Most Web3 products start with wallet decisions, permissions, and recovery.", "A wallet is not a bank account and support teams usually cannot reverse mistakes.", "all", ["Seed Phrase", "Private Key", "Transaction"]],
  ["Seed Phrase", "basics", "A recovery phrase that can control all assets in a wallet.", "Job seekers must recognize that legitimate employers never ask for it.", "Sharing it once can permanently lose funds.", "all", ["Private Key", "Phishing", "Wallet"]],
  ["Private Key", "basics", "A secret value that authorizes control over a blockchain account.", "Security, support, and moderation roles need to know why it must stay private.", "Treating it like a password that can be reset.", "all", ["Seed Phrase", "Wallet", "Multisig"]],
  ["Public Address", "basics", "The visible account identifier used for sending assets or checking activity.", "Researchers and support teams often inspect addresses while preserving privacy.", "Assuming one address always equals one person.", "research", ["Active Address", "Wallet", "Cohort"]],
  ["Transaction", "basics", "A signed action submitted to a blockchain.", "Product, support, and frontend work must explain pending, failed, and confirmed states.", "Showing only success and ignoring rejection or failure.", "mixed", ["Gas", "Block Explorer", "Finality"]],
  ["Gas", "basics", "The fee paid to include or execute a blockchain transaction.", "UX, support, and content teams need to explain why actions cost money.", "Calling gas a platform fee controlled by the app.", "technical", ["Transaction", "Layer 2", "MEV"]],
  ["Block Explorer", "basics", "A website for inspecting public blockchain data such as transactions and addresses.", "Useful for verification, support, and basic research.", "Assuming explorer labels are always complete or verified.", "all", ["Transaction", "Public Address", "Contract Address"]],
  ["Mainnet", "basics", "The live production blockchain network where real assets and risk exist.", "Developers and product teams must separate production work from testing.", "Testing risky flows with real funds too early.", "technical", ["Testnet", "Deployment", "Smart Contract"]],
  ["Testnet", "basics", "A testing network that mimics blockchain behavior without mainnet asset risk.", "Proof projects often use testnets to demonstrate working flows safely.", "Assuming testnet performance reflects mainnet costs and liquidity.", "technical", ["Mainnet", "Deployment", "Faucet"]],
  ["Faucet", "basics", "A service that gives testnet tokens for development and demos.", "Helps builders test wallet and contract flows.", "Confusing testnet tokens with valuable assets.", "technical", ["Testnet", "Gas", "Transaction"]],
  ["Phishing", "basics", "A deception attempt that tricks users into revealing secrets or signing harmful actions.", "Community, support, and UX roles must prevent and respond to it.", "Only watching for fake websites while ignoring fake staff accounts and DMs.", "all", ["Seed Phrase", "Token Approval", "Scam Check"]],
  ["Token Approval", "basics", "Permission granted for a contract to move a user's tokens within defined limits.", "Designers and frontends must make approval risk understandable.", "Presenting approvals as harmless login prompts.", "mixed", ["Wallet", "Smart Contract", "Revoke"]],
  ["Revoke", "basics", "Removing a previously granted token approval.", "Useful for safety guides, support, and incident response.", "Thinking revoke recovers funds already moved.", "community", ["Token Approval", "Wallet", "Phishing"]],
  ["Custodial Wallet", "basics", "A wallet controlled by a third party such as an exchange or platform.", "Support and content teams must explain control and recovery trade-offs.", "Assuming convenience removes counterparty risk.", "all", ["Self-Custody", "Private Key", "Exchange"]],
  ["Self-Custody", "basics", "Holding direct control over wallet keys without a custodian.", "Central to Web3 product, education, and safety work.", "Ignoring the user burden of backup and mistake prevention.", "all", ["Seed Phrase", "Wallet", "Hardware Wallet"]],
  ["Hardware Wallet", "basics", "A physical device used to keep signing keys isolated.", "Relevant for security, treasury, and advanced user education.", "Assuming hardware alone prevents all social engineering.", "technical", ["Private Key", "Multisig", "Self-Custody"]],
  ["Bridge", "basics", "A tool for moving assets or messages between chains.", "Users often face bridge risk, delays, and confusing states.", "Treating all bridges as equally safe and fast.", "product", ["Layer 2", "Transaction", "Finality"]],
  ["Layer 1", "basics", "A base blockchain network such as Ethereum or Solana.", "Role research often compares ecosystems and constraints by chain.", "Assuming every Layer 1 has the same security and UX trade-offs.", "research", ["Layer 2", "Validator", "Gas"]],
  ["Layer 2", "basics", "A scaling network that settles to or depends on a base chain.", "Product, growth, and research teams need to understand cost and bridge trade-offs.", "Calling every cheaper chain a Layer 2.", "mixed", ["Layer 1", "Bridge", "Rollup"]],
  ["Finality", "basics", "The point at which a transaction is considered irreversible enough for practical use.", "UX and support teams must set expectations around pending and confirmed states.", "Treating one confirmation as equal across every chain.", "technical", ["Transaction", "Block Explorer", "Reorg"]],
  ["Reorg", "basics", "A chain reorganization where recent blocks are replaced by another valid history.", "Advanced support and engineering roles need to know why confirmations matter.", "Explaining it as a normal app bug.", "technical", ["Finality", "Validator", "Block Explorer"]],
  ["Smart Contract", "contracts", "Code deployed to a blockchain that executes according to defined rules.", "Many Web3 roles interact with contract behavior, risks, or user-facing effects.", "Assuming code is safe because it is public.", "technical", ["Audit", "Contract Address", "Token Approval"]],
  ["Contract Address", "contracts", "The public address where a smart contract is deployed.", "Useful for verification, integrations, and research.", "Using unverified addresses from random posts.", "technical", ["Smart Contract", "Block Explorer", "Deployment"]],
  ["ABI", "contracts", "A description of how software can call a smart contract.", "Frontend and DevRel work often depends on correct ABI use.", "Treating ABI mismatches as wallet errors.", "technical", ["Smart Contract", "SDK", "API"]],
  ["Deployment", "contracts", "Publishing code or configuration to a live or test environment.", "Engineering and product teams need deployment checklists.", "Deploying without rollback, ownership, or verification steps.", "technical", ["Mainnet", "Testnet", "Smart Contract"]],
  ["Audit", "contracts", "A structured security review of code, systems, or assumptions.", "Security claims, hiring, and protocol trust often mention audits.", "Treating an audit as a guarantee that no bugs remain.", "technical", ["Bug Bounty", "Exploit", "Smart Contract"]],
  ["Bug Bounty", "contracts", "A program that rewards responsible vulnerability reports.", "Proof-of-work and security roles can start through bounties.", "Submitting vague reports without reproducible impact.", "technical", ["Audit", "Exploit", "Disclosure"]],
  ["Exploit", "contracts", "An attack that uses a weakness to cause loss or unintended behavior.", "Community, product, and technical teams need incident vocabulary.", "Calling every loss a hack before facts are known.", "all", ["Postmortem", "Audit", "Phishing"]],
  ["Oracle", "contracts", "A service that brings external data into smart contracts.", "Product and research roles need to understand oracle dependencies.", "Assuming oracle data is neutral and always fresh.", "mixed", ["Smart Contract", "Liquidation", "DeFi"]],
  ["Multisig", "contracts", "A wallet requiring multiple approvals before an action executes.", "Treasury, governance, and operational safety often depend on multisigs.", "Assuming multisig means decentralized governance by itself.", "operations", ["Treasury", "Signer", "Private Key"]],
  ["Signer", "contracts", "An account authorized to approve a transaction or multisig action.", "Operations roles need signer policies and escalation plans.", "Adding signers without clear responsibility and backup.", "operations", ["Multisig", "Treasury", "Access Control"]],
  ["Access Control", "contracts", "Rules that decide who can perform privileged actions.", "Smart contracts, admin panels, and operations all depend on clear permissions.", "Leaving powerful admin roles undocumented.", "technical", ["Owner", "Multisig", "Upgradeability"]],
  ["Owner", "contracts", "An account or role with privileged control over a contract or system.", "Researchers and users often evaluate who can change protocol behavior.", "Assuming owner control is harmless because the team is known.", "research", ["Access Control", "Multisig", "Upgradeability"]],
  ["Upgradeability", "contracts", "A design that allows contract logic to be changed after deployment.", "It affects user trust, security, and product iteration.", "Ignoring who can upgrade and under what process.", "technical", ["Proxy Contract", "Access Control", "Audit"]],
  ["Proxy Contract", "contracts", "A contract pattern that forwards calls to upgradeable logic.", "Important for technical research and audits.", "Thinking verified proxy code tells the whole implementation story.", "technical", ["Upgradeability", "Smart Contract", "Implementation"]],
  ["SDK", "contracts", "A software development kit that helps developers integrate a product.", "DevRel and frontend roles often create or support SDK workflows.", "Shipping examples that only work in ideal setups.", "technical", ["API", "DevRel", "Documentation"]],
  ["API", "contracts", "A defined interface for software systems to communicate.", "Product, technical writing, and engineering roles need clear API expectations.", "Confusing API availability with product reliability.", "technical", ["SDK", "Documentation", "Rate Limit"]],
  ["Rate Limit", "contracts", "A restriction on how often a system can be called.", "Developers, support, and product teams need to explain integration failures.", "Treating rate limits as random downtime.", "technical", ["API", "SDK", "Reliability"]],
  ["TVL", "defi", "Total value locked in a protocol or set of smart contracts.", "Useful context for protocol size, but not proof of real users or revenue.", "Using TVL as a complete measure of product health.", "research", ["Protocol Revenue", "Net Flow", "Active Address"]],
  ["Liquidity", "defi", "Available assets that allow trades, borrowing, or withdrawals.", "DeFi roles evaluate liquidity depth and withdrawal risk.", "Ignoring who provides liquidity and why.", "research", ["Pool", "Slippage", "Market Maker"]],
  ["Liquidity Pool", "defi", "A smart contract pool of assets used for trading or lending.", "Researchers and product teams need to understand pool incentives and risk.", "Assuming pool deposits are risk-free savings.", "research", ["Liquidity", "Impermanent Loss", "Yield"]],
  ["Yield", "defi", "Return earned from lending, staking, liquidity provision, or incentives.", "Content and research roles must separate source, sustainability, and risk.", "Calling high yield safe without explaining subsidies.", "research", ["APR", "APY", "Token Incentives"]],
  ["APR", "defi", "Annual percentage rate without compounding.", "Useful when comparing DeFi opportunities and compensation claims.", "Comparing APR and APY as if they are identical.", "research", ["APY", "Yield", "Token Incentives"]],
  ["APY", "defi", "Annual percentage yield with compounding included.", "Helps explain return assumptions in DeFi products.", "Publishing APY without assumptions or risk notes.", "research", ["APR", "Yield", "Compounding"]],
  ["Slippage", "defi", "The difference between expected and executed trade price.", "Product and support roles need to explain why trades execute differently.", "Blaming all slippage on platform fees.", "product", ["Liquidity", "DEX", "MEV"]],
  ["DEX", "defi", "A decentralized exchange for trading assets through smart contracts.", "Many roles deal with DEX behavior, integrations, or research.", "Assuming every DEX has the same liquidity model.", "mixed", ["AMM", "Liquidity Pool", "Slippage"]],
  ["AMM", "defi", "An automated market maker that prices trades through pool formulas.", "DeFi analysis and product education often rely on AMM basics.", "Ignoring arbitrage and liquidity provider risk.", "research", ["DEX", "Liquidity Pool", "Impermanent Loss"]],
  ["Impermanent Loss", "defi", "Loss relative to holding assets when liquidity pool prices move.", "Important for explaining liquidity provision honestly.", "Presenting LP yield without this risk.", "research", ["Liquidity Pool", "Yield", "AMM"]],
  ["Liquidation", "defi", "Forced closing or sale of collateral when loan conditions are breached.", "Support, product, and research teams need clear risk language.", "Explaining liquidation after the user has already lost funds.", "product", ["Collateral", "Oracle", "Leverage"]],
  ["Collateral", "defi", "Assets pledged to support borrowing or other obligations.", "DeFi products and education depend on collateral risk clarity.", "Assuming collateral value is stable.", "research", ["Liquidation", "Oracle", "Loan-to-Value"]],
  ["Loan-to-Value", "defi", "A ratio comparing borrowed value to collateral value.", "Useful for lending protocols, risk dashboards, and user education.", "Showing ratios without explaining liquidation thresholds.", "research", ["Collateral", "Liquidation", "Oracle"]],
  ["Stablecoin", "defi", "A token designed to track a reference value such as one US dollar.", "Users and analysts must evaluate backing, redemption, and depeg risk.", "Assuming all stablecoins carry the same risk.", "research", ["Depeg", "Collateral", "Reserve"]],
  ["Depeg", "defi", "When a pegged asset trades away from its target value.", "Important for risk, support, and product communication.", "Calling every short deviation a permanent failure.", "research", ["Stablecoin", "Liquidity", "Reserve"]],
  ["Token Unlock", "defi", "A scheduled release of tokens that were previously locked.", "Analysts and applicants should understand supply pressure and incentives.", "Assuming unlocks always cause immediate selling.", "research", ["Vesting", "Circulating Supply", "Token Compensation"]],
  ["Vesting", "defi", "A schedule that gradually releases tokens or equity over time.", "Relevant to compensation and tokenomics analysis.", "Treating vested tokens as guaranteed cash.", "all", ["Token Unlock", "Token Compensation", "Liquidity"]],
  ["Circulating Supply", "defi", "Tokens currently available in the market under a chosen definition.", "Market analysis needs supply definitions.", "Using supply figures without checking source methodology.", "research", ["Total Supply", "Token Unlock", "Market Cap"]],
  ["Total Supply", "defi", "All existing tokens, including locked or non-circulating tokens.", "Useful for tokenomics and dilution analysis.", "Using total supply as if all tokens can sell today.", "research", ["Circulating Supply", "FDV", "Token Unlock"]],
  ["FDV", "defi", "Fully diluted valuation based on total supply and token price.", "Helps compare token value but can mislead without unlock context.", "Treating FDV as current market value.", "research", ["Market Cap", "Total Supply", "Token Unlock"]],
  ["Market Cap", "defi", "Token price multiplied by circulating supply.", "Common market size metric for research and content.", "Ignoring liquidity and supply definitions.", "research", ["FDV", "Circulating Supply", "Liquidity"]],
  ["Protocol Fees", "data", "Amounts users pay when using a protocol before distribution decisions.", "Analysts use fees to assess real demand.", "Treating fees and revenue as identical.", "research", ["Protocol Revenue", "TVL", "Trading Volume"]],
  ["Protocol Revenue", "data", "The portion of fees retained by a protocol or directed to stakeholders.", "Shows a different signal than raw usage or incentives.", "Comparing revenue without checking accounting definitions.", "research", ["Protocol Fees", "Treasury", "Tokenomics"]],
  ["Trading Volume", "data", "The value of assets traded during a period.", "Useful for market activity but may include incentives or wash activity.", "Assuming volume equals organic demand.", "research", ["TVL", "Wash Trading", "Liquidity"]],
  ["Active Address", "data", "An address that performed a defined on-chain action during a period.", "Useful for activity analysis when definitions are clear.", "Equating addresses with unique humans.", "research", ["Cohort", "Retention", "Public Address"]],
  ["Net Flow", "data", "The difference between assets entering and leaving a protocol, chain, or wallet group.", "Helps analyze user behavior and risk.", "Ignoring timing, asset type, and known entities.", "research", ["TVL", "Whale", "Exchange Flow"]],
  ["Whale", "data", "A wallet or entity holding or moving a comparatively large amount of assets.", "Large wallets can affect markets, governance, and narratives.", "Assuming every large wallet is informed or coordinated.", "research", ["Smart Money", "Net Flow", "Public Address"]],
  ["Smart Money", "data", "An informal label for wallets believed to have strong timing or performance.", "Useful as a hypothesis, not a conclusion.", "Treating a label as proof of skill.", "research", ["Whale", "Cohort", "Net Flow"]],
  ["Cohort", "data", "A group of users or addresses grouped by shared timing or behavior.", "Cohorts make retention and activation analysis clearer.", "Grouping users without explaining criteria.", "research", ["Retention", "Active Address", "Activation"]],
  ["Retention", "data", "The share of users or addresses returning after a first activity.", "Shows whether activity persists after incentives or launches.", "Counting any later transaction as meaningful retention.", "research", ["Cohort", "Activation", "Churn"]],
  ["Wash Trading", "data", "Artificial trading activity intended to inflate volume or rewards.", "Researchers and marketers must avoid misleading activity claims.", "Assuming high volume always means high demand.", "research", ["Trading Volume", "Incentives", "Sybil"]],
  ["Sybil", "data", "One person or entity controlling many accounts to appear as many users.", "Airdrops, research, and community programs must manage sybil risk.", "Counting wallets as people without filtering.", "research", ["Active Address", "Airdrop", "Cohort"]],
  ["Incentive Farming", "data", "Activity driven mainly by rewards rather than organic product value.", "Growth and research teams need to separate durable usage from mercenary usage.", "Calling all incentivized activity fake.", "growth", ["Retention", "Airdrop", "Points Program"]],
  ["Data Caveat", "data", "A limitation or assumption that changes how a metric should be interpreted.", "Good dashboards and research explain what data cannot prove.", "Hiding caveats to make a chart look stronger.", "research", ["Methodology", "Metric", "Dashboard"]],
  ["Methodology", "data", "The steps and definitions used to produce an analysis.", "Makes research reproducible and credible.", "Publishing conclusions without definitions.", "research", ["Data Caveat", "Dashboard", "Primary Source"]],
  ["Dashboard", "data", "A visual interface for metrics, often built from queries or datasets.", "Useful proof-of-work for analysts and operators.", "Making charts without decisions or caveats.", "research", ["Dune", "Metric", "Methodology"]],
  ["Primary Source", "data", "Original material such as docs, contracts, governance posts, data, or official announcements.", "Strong content and research start from primary sources.", "Relying only on summaries or influencer posts.", "content", ["Methodology", "Research Memo", "Data Caveat"]],
  ["DAO", "governance", "A blockchain-based organization coordinating decisions, assets, or contributors.", "Community, research, and operations roles often work around DAO processes.", "Assuming token voting means every contributor has equal power.", "operations", ["Governance Proposal", "Treasury", "Contributor"]],
  ["Governance Proposal", "governance", "A formal suggestion to change protocol rules, spend funds, or make ecosystem decisions.", "Researchers and community teams need to summarize proposals clearly.", "Reading only the title and not the execution details.", "research", ["DAO", "Quorum", "Snapshot"]],
  ["Quorum", "governance", "The minimum participation required for a vote to be valid.", "Governance analysis depends on participation quality and thresholds.", "Treating quorum as proof of broad community support.", "research", ["Governance Proposal", "Delegation", "Voting Power"]],
  ["Delegation", "governance", "Assigning voting power to another address or representative without transferring ownership.", "Important for governance campaigns and ecosystem politics.", "Assuming delegates always vote as token holders expect.", "community", ["Voting Power", "Governance Proposal", "DAO"]],
  ["Treasury", "governance", "Assets controlled by a protocol, DAO, foundation, or company.", "Operations, governance, and research roles evaluate treasury health and spending.", "Treating treasury value as fully liquid operating budget.", "research", ["Multisig", "Grant", "Protocol Revenue"]],
  ["Grant", "governance", "Funding for builders, researchers, communities, or projects with agreed work.", "Entry contributors often build proof through grants.", "Applying with vague promises instead of scoped deliverables.", "growth", ["Bounty", "Contributor", "Public Goods"]],
  ["Public Goods", "governance", "Resources that benefit a broad ecosystem and are hard to restrict to paying users.", "Explains many grant and ecosystem funding programs.", "Using the label to avoid defining impact.", "growth", ["Grant", "Ecosystem", "DAO"]],
  ["Contributor", "governance", "A person providing ongoing or task-based work without necessarily being a standard employee.", "Many Web3 paths begin as contributor work.", "Assuming contributor status guarantees future employment.", "all", ["Bounty", "Grant", "Contractor"]],
  ["Bounty", "governance", "A defined task with a reward for an accepted result.", "Useful for proof-of-work and entry paths.", "Starting without acceptance criteria or ownership terms.", "all", ["Grant", "Trial Task", "Contributor"]],
  ["Ecosystem", "governance", "Projects, users, developers, partners, infrastructure, and communities around a chain or protocol.", "BD, growth, and research roles map ecosystems constantly.", "Using ecosystem as vague branding instead of a stakeholder map.", "growth", ["Business Development", "Grant", "Public Goods"]],
  ["Foundation", "governance", "An organization that supports ecosystem, protocol, or community development.", "Applicants should understand how foundation roles differ from startups.", "Assuming foundations control every ecosystem project.", "growth", ["Ecosystem", "Grant", "Treasury"]],
  ["Working Group", "governance", "A focused group responsible for an ongoing DAO or ecosystem function.", "Common structure for operations, governance, and contributor work.", "No charter, owner, or budget clarity.", "operations", ["DAO", "Contributor", "Deliverable"]],
  ["Snapshot", "consumer", "A recorded state of balances or activity at a specific time.", "Used for governance, airdrops, and eligibility decisions.", "Assuming activity after the snapshot still qualifies.", "community", ["Airdrop", "Governance Proposal", "Active Address"]],
  ["NFT", "consumer", "A token representing a distinct on-chain item, right, credential, or collectible.", "Consumer, creative, and product roles often work around NFT flows.", "Equating NFTs only with art collectibles.", "creative", ["Mint", "Royalty", "Floor Price"]],
  ["Mint", "consumer", "The process of creating or issuing a new token or NFT on-chain.", "Launches, support, and product flows often involve mint states.", "Not explaining gas, failed transactions, or eligibility clearly.", "product", ["NFT", "Transaction", "Gas"]],
  ["Floor Price", "consumer", "The lowest listed sale price for an NFT collection item at a time.", "Useful market signal but narrow.", "Treating floor price as guaranteed liquidity.", "research", ["NFT", "Liquidity", "Trading Volume"]],
  ["Royalty", "consumer", "A payment designed to go to a creator or rights holder when an asset is sold.", "Creative and product roles need to understand royalty enforcement limits.", "Assuming every marketplace enforces royalties the same way.", "creative", ["NFT", "Marketplace", "Creator"]],
  ["Soulbound Token", "consumer", "A non-transferable or identity-linked token used for credentials, reputation, or membership.", "Relevant to community, credentials, and product design.", "Assuming non-transferable means private or secure.", "product", ["NFT", "Identity", "Credential"]],
  ["Account Abstraction", "consumer", "Wallet architecture enabling programmable account behavior such as recovery or sponsored gas.", "Product and UX roles use it to reduce wallet friction.", "Presenting it as magic that removes all risk.", "product", ["Wallet", "Gas", "Recovery"]],
  ["Social Graph", "consumer", "A representation of relationships, follows, interactions, or reputation between users.", "Consumer crypto and growth work often discuss social graphs.", "Treating follows as proof of trust.", "growth", ["Community Health", "Reputation", "Identity"]],
  ["Points Program", "consumer", "A system tracking user activity that may influence rewards or access.", "Growth teams use points, but users may game them.", "Implying points guarantee future tokens.", "growth", ["Airdrop", "Incentive Farming", "Sybil"]],
  ["Airdrop", "consumer", "A distribution of tokens or assets to selected users, contributors, or addresses.", "Community and growth teams must handle expectations and scams.", "Promising eligibility without official confirmation.", "growth", ["Snapshot", "Sybil", "Token Unlock"]],
  ["Marketplace", "consumer", "A platform where users list, buy, or sell digital assets or services.", "Product and creative teams need platform-specific constraints.", "Assuming platform listings prove asset value.", "creative", ["NFT", "Floor Price", "Royalty"]],
  ["Reputation", "consumer", "Signals that suggest reliability, contribution, or credibility.", "Hiring, communities, and contributor programs use reputation signals.", "Treating one badge or follower count as complete proof.", "all", ["Contributor", "Portfolio", "Proof of Work"]],
  ["Proof of Work", "career", "A public sample showing how a person thinks and executes.", "KRAFT uses proof-of-work to connect learning with hiring evidence.", "Replacing real work samples with certificates only.", "all", ["Portfolio", "Deliverable", "Case Study"]],
  ["Portfolio", "career", "A selected collection of work samples and case studies.", "Hiring teams need evidence they can inspect quickly.", "Dumping links without context or decisions.", "all", ["Proof of Work", "Case Study", "Deliverable"]],
  ["Case Study", "career", "A structured explanation of context, decision, execution, result, and limits.", "Makes proof easier for recruiters and teams to evaluate.", "Only showing final visuals or outputs without reasoning.", "all", ["Portfolio", "Deliverable", "Proof of Work"]],
  ["Trial Task", "career", "A limited evaluation assignment used during hiring.", "Applicants must confirm scope, timing, ownership, and evaluation.", "Doing unlimited unpaid work without written scope.", "all", ["Deliverable", "Scam Check", "Contractor"]],
  ["Deliverable", "career", "A specific output expected from a role, project, campaign, or agreement.", "Clear deliverables prevent vague applications and vague trial tasks.", "Agreeing to work without output definitions.", "all", ["Trial Task", "Retainer", "Scope"]],
  ["KPI", "career", "A key performance indicator measuring progress toward an outcome.", "Community, growth, product, and operations roles report KPIs.", "Choosing metrics that are easy but not useful.", "operations", ["Community Health", "Conversion", "Retention"]],
  ["Retainer", "career", "A recurring payment arrangement for ongoing availability or monthly scope.", "Freelancers and contributors often negotiate retainers.", "Not defining hours, outputs, and response expectations.", "all", ["Contractor", "Scope", "Token Compensation"]],
  ["Token Compensation", "career", "Payment partly or fully made in tokens.", "Applicants must evaluate price, vesting, liquidity, tax, and legal risk.", "Treating quoted token value as guaranteed salary.", "all", ["Vesting", "Token Unlock", "Liquidity"]],
  ["Async Work", "career", "Work coordinated without everyone online at the same time.", "Many Web3 teams are distributed and async-heavy.", "Assuming async means no documentation or deadlines.", "all", ["Remote Work", "Documentation", "Timezone"]],
  ["Contractor", "career", "A worker engaged under a service agreement rather than standard employment.", "Many Web3 roles start as contract work.", "Ignoring taxes, benefits, payment terms, and termination clauses.", "all", ["Retainer", "Trial Task", "Scope"]],
  ["Applicant Tracking System", "career", "Software used to collect, filter, and manage job applications.", "Applicants should write clearly enough for both humans and systems.", "Keyword stuffing without evidence.", "all", ["CV", "Portfolio", "Application"]],
  ["Scam Check", "career", "A repeatable review of domains, identities, links, payment requests, and secrets.", "Every job seeker needs a safety habit before applying or interviewing.", "Trusting urgency, DMs, or unofficial links.", "all", ["Phishing", "Seed Phrase", "Trial Task"]],
  ["CV", "career", "A concise work-history document focused on relevance and evidence.", "Useful when paired with proof-of-work and a clear role target.", "Listing generic crypto interest without outputs.", "all", ["Portfolio", "Application", "ATS"]],
  ["Application", "career", "A targeted response to a role or opportunity.", "Better applications connect evidence to the team's actual work.", "Sending the same generic note everywhere.", "all", ["Outreach", "Portfolio", "Job Platform"]],
  ["Outreach", "career", "A direct message or email that starts a professional conversation.", "Useful when it references real context and proof.", "Sending 'gm any role?' without a reason.", "all", ["Application", "Business Development", "Follow-up"]],
  ["Follow-up", "career", "A professional reminder or update after applying or speaking with a team.", "Good follow-up can clarify interest without pressuring.", "Following up too often with no new information.", "all", ["Application", "Outreach", "Interview"]],
  ["Interview", "career", "A hiring conversation used to evaluate judgment, skill, and fit.", "Preparation should use concrete examples and role-specific trade-offs.", "Memorizing slogans instead of examples.", "all", ["STAR", "Trial Task", "Portfolio"]],
  ["STAR", "career", "A structure: situation, task, action, result.", "Helps candidates answer behavioral questions with evidence.", "Forcing every answer into a robotic script.", "all", ["Interview", "Case Study", "Result"]],
  ["Scope", "career", "The agreed boundaries of a task, project, or role.", "Protects applicants and teams from mismatched expectations.", "Starting work before scope is written.", "all", ["Deliverable", "Trial Task", "Retainer"]],
  ["Community Health", "growth", "Quality, usefulness, safety, retention, and sentiment of a community.", "Better than raw member count for community roles.", "Reporting only total members and messages.", "community", ["KPI", "Retention", "Sentiment"]],
  ["Activation", "growth", "The moment a new user experiences initial product value.", "Product and growth teams use it to evaluate onboarding.", "Defining activation as signup only.", "product", ["Conversion", "Funnel", "Retention"]],
  ["Conversion", "growth", "The percentage of users completing a target action.", "Growth and product roles use conversion to spot friction.", "Optimizing conversion without checking user quality or safety.", "growth", ["Funnel", "Activation", "KPI"]],
  ["Funnel", "growth", "A sequence of steps from awareness to a desired action.", "Useful for campaigns, onboarding, and applications.", "Treating funnels as fixed instead of diagnostic.", "growth", ["Conversion", "Activation", "Campaign"]],
  ["Campaign", "growth", "A coordinated set of activities designed for a defined outcome.", "Marketing, community, and growth roles ship campaigns.", "Running posts without goals, audience, or reporting.", "growth", ["KPI", "Content Calendar", "Conversion"]],
  ["KOL", "growth", "A key opinion leader or creator whose audience can influence awareness or action.", "Marketing roles manage creator relationships and disclosure.", "Buying reach without audience or trust fit.", "growth", ["Campaign", "Sponsored Content", "Reputation"]],
  ["Business Development", "growth", "Work focused on partnerships, integrations, customers, distribution, or commercial opportunities.", "BD roles need research, qualification, and follow-up.", "Confusing networking with pipeline progress.", "growth", ["CRM", "Ecosystem", "Outreach"]],
  ["Developer Relations", "growth", "Work that helps developers understand, adopt, and succeed with a technical product.", "DevRel connects docs, examples, events, and product feedback.", "Treating DevRel as only posting tutorials.", "technical", ["SDK", "API", "Documentation"]],
  ["CRM", "growth", "A system for tracking relationships, outreach, opportunities, and follow-up.", "BD and partnerships need clean relationship data.", "Keeping important context only in private DMs.", "growth", ["Business Development", "Outreach", "Follow-up"]],
  ["Postmortem", "growth", "A structured review of an incident or failed outcome.", "Good teams document causes, impact, and improvements.", "Using it to blame people instead of improve systems.", "operations", ["Incident", "Community Health", "Launch Checklist"]],
  ["Content Calendar", "growth", "A planned schedule of posts, assets, channels, and objectives.", "Social and marketing roles use calendars to coordinate work.", "Posting dates without strategy or owner.", "content", ["Campaign", "KPI", "Asset Brief"]],
  ["Asset Brief", "growth", "A short instruction document for creative or content assets.", "Helps designers, writers, and social teams move quickly with clarity.", "Requesting assets with no format, deadline, or message.", "creative", ["Campaign", "Deliverable", "Content Calendar"]],
  ["Launch Checklist", "growth", "A list of required checks before releasing a product, feature, or campaign.", "Product ops and community teams use it to reduce avoidable failures.", "Checking boxes without owners or rollback plans.", "operations", ["Postmortem", "Incident", "Owner"]],
  ["Incident", "growth", "An unexpected event that threatens users, funds, trust, or operations.", "Support, community, product, and engineering need calm incident handling.", "Communicating before facts and owners are clear.", "operations", ["Postmortem", "Scam Check", "Escalation"]],
  ["Escalation", "growth", "Moving an issue to the person or team with authority to resolve it.", "Moderators and support teams need clear escalation paths.", "Escalating everything or nothing.", "community", ["Incident", "Community Health", "Support Ticket"]],
  ["Support Ticket", "growth", "A tracked user issue or request.", "Product ops turns tickets into structured feedback.", "Treating tickets as isolated complaints only.", "operations", ["Escalation", "Feedback Taxonomy", "Postmortem"]],
  ["Feedback Taxonomy", "growth", "A classification system for user feedback.", "Helps product teams see patterns instead of anecdotes.", "Making categories too broad to inform decisions.", "product", ["Support Ticket", "KPI", "Product Requirement"]],
  ["Product Requirement", "growth", "A written statement of product problem, scope, behavior, and acceptance criteria.", "Product roles need requirements that guide build decisions.", "Writing solutions before the problem is clear.", "product", ["PRD", "Acceptance Criteria", "User Journey"]],
  ["User Journey", "growth", "The steps a user takes to complete a task or reach value.", "Designers and PMs use journeys to find friction.", "Mapping ideal paths while ignoring failure states.", "product", ["Activation", "Product Requirement", "Transaction"]],
  ["Acceptance Criteria", "growth", "Specific conditions that define whether work is complete.", "Reduces ambiguity between product, design, and engineering.", "Using vague criteria such as 'make it better.'", "product", ["Product Requirement", "Deliverable", "QA"]],
].map(([term, category, meaning, matters, trap, roles, related]) => ({
  term,
  category,
  meaning,
  matters,
  trap,
  roles,
  related,
})) as never;

export const glossaryTerms: GlossaryTerm[] = seeds.slice(0, 120).map((seed) => ({
  slug: seed.term.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
  term: seed.term,
  category: categories[seed.category],
  simpleMeaning: seed.meaning,
  whyItMatters: seed.matters,
  commonTrap: seed.trap,
  usedInRoles: laneByKey[seed.roles],
  relatedTerms: seed.related,
}));

export function getGlossaryTermBySlug(slug: string) {
  return glossaryTerms.find((term) => term.slug === slug);
}

// Related canonical roles are derived from the term's associated lanes — a
// structured lookup against the canonical role list, never an invented mapping.
export function getRelatedRolesForTerm(term: GlossaryTerm, count = 3) {
  return roles.filter((role) => term.usedInRoles.includes(role.lane)).slice(0, count);
}

// Resolve a related-term label (free text in the approved data) to its own
// glossary detail page when one exists, so "Related terms" can link out.
export function findTermByLabel(label: string) {
  return glossaryTerms.find((term) => term.term.toLowerCase() === label.toLowerCase());
}
