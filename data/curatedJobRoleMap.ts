// Editorial mapping from a curated job (by title) to the closest KRAFT role
// guide. Only used when the synced job has no roleSlug of its own. Edit freely:
// a missing entry just means the job shows no role-guide link.
export const curatedJobRoleMap: Record<string, string> = {
  "Growth Marketing Manager — Japan/Asia": "growth-manager",
  "Frontend Engineer": "frontend-web3-developer",
  "Brand Designer": "brand-designer",
  "Marketing Lead": "product-marketing-manager",
  "Business Operations": "operations-associate",
  "video editor": "motion-designer",
  "content creator": "content-creator",
  "Moderator": "community-moderator",
  "KOC&Community Manager": "community-manager",
  "Regional Lead": "community-manager",
  "HODL FM Ambassador Program": "creator-ambassador-partner",
  "Stellar Ambassador Program": "creator-ambassador-partner",
  "Ambassador": "creator-ambassador-partner",
};
