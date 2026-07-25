import type { NextConfig } from "next";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));

// Permanent (308) one-hop redirects from legacy routes to canonical KRAFT routes.
// Source of truth: DOCS/KRAFT_MASTER_TAXONOMY.md (Legacy route migrations) and
// DOCS/KRAFT_STRUCTURED_CONTENT_SCHEMA.md §10. Each destination is a canonical route
// and is never itself a redirect source, so there are no chains or loops.
const legacyRedirects: { source: string; destination: string; permanent: true }[] = [
  // Section / page routes.
  { source: "/bridge", destination: "/get-hired", permanent: true },
  { source: "/resources", destination: "/job-boards", permanent: true },
  { source: "/jobs", destination: "/job-boards", permanent: true },
  // /learn/creator retired; Indonesian creator guide folded into Learn Web3.
  { source: "/learn/creator", destination: "/learn-web3", permanent: true },

  // Legacy role slugs → canonical role slugs.
  { source: "/roles/ui-ux-designer", destination: "/roles/web3-product-designer", permanent: true },
  { source: "/roles/web3-ui-ux-designer", destination: "/roles/web3-product-designer", permanent: true },
  { source: "/roles/on-chain-analyst", destination: "/roles/onchain-data-analyst", permanent: true },
  { source: "/roles/blockchain-data-analyst", destination: "/roles/onchain-data-analyst", permanent: true },
  { source: "/roles/brand-motion-designer", destination: "/roles/brand-designer", permanent: true },
  { source: "/roles/ecosystem-bd", destination: "/roles/ecosystem-partnerships-manager", permanent: true },
  { source: "/roles/dao-governance-coordinator", destination: "/roles/governance-coordinator", permanent: true },
  { source: "/roles/ambassador-kol", destination: "/roles/creator-ambassador-partner", permanent: true },
  { source: "/roles/airdrop-researcher-alpha-hunter", destination: "/roles/ecosystem-researcher", permanent: true },
  { source: "/roles/web3-virtual-assistant", destination: "/roles/operations-assistant", permanent: true },
  { source: "/roles/crypto-journalist-writer", destination: "/roles/crypto-journalist", permanent: true },
  { source: "/roles/zk-engineer-cryptographer", destination: "/roles/zk-engineer-cryptography-researcher", permanent: true },
  // Repository rename not present in the doc tables but required to avoid a dead legacy URL.
  { source: "/roles/devrel", destination: "/roles/developer-relations", permanent: true },

  // Legacy portfolio slugs → canonical portfolio slugs (portfolio follows the role taxonomy).
  { source: "/portfolio/ui-ux-designer", destination: "/portfolio/web3-product-designer", permanent: true },
  { source: "/portfolio/web3-ui-ux-designer", destination: "/portfolio/web3-product-designer", permanent: true },
  { source: "/portfolio/on-chain-analyst", destination: "/portfolio/onchain-data-analyst", permanent: true },
  { source: "/portfolio/blockchain-data-analyst", destination: "/portfolio/onchain-data-analyst", permanent: true },
  { source: "/portfolio/brand-motion-designer", destination: "/portfolio/brand-designer", permanent: true },
  { source: "/portfolio/ecosystem-bd", destination: "/portfolio/ecosystem-partnerships-manager", permanent: true },
  { source: "/portfolio/dao-governance-coordinator", destination: "/portfolio/governance-coordinator", permanent: true },
  { source: "/portfolio/ambassador-kol", destination: "/portfolio/creator-ambassador-partner", permanent: true },
  { source: "/portfolio/airdrop-researcher-alpha-hunter", destination: "/portfolio/ecosystem-researcher", permanent: true },
  { source: "/portfolio/web3-virtual-assistant", destination: "/portfolio/operations-assistant", permanent: true },
  { source: "/portfolio/crypto-journalist-writer", destination: "/portfolio/crypto-journalist", permanent: true },
  { source: "/portfolio/zk-engineer-cryptographer", destination: "/portfolio/zk-engineer-cryptography-researcher", permanent: true },
  { source: "/portfolio/devrel", destination: "/portfolio/developer-relations", permanent: true },
];

const nextConfig: NextConfig = {
  turbopack: {
    root,
  },
  async redirects() {
    return legacyRedirects;
  },
};

export default nextConfig;
