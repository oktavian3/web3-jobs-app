import type { MetadataRoute } from "next";
import { roles } from "@/data/roles";
import { glossaryTerms } from "@/data/glossary";
import { roadmapDetails } from "@/data/roadmapDetail";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// Public canonical pages only. Intentionally excludes: /posts (hidden), /admin and
// admin APIs, /experiments/x-role-matcher (disabled experiment), legacy redirect URLs,
// retired routes, and /skill-check/results (session-only content with nothing to
// index when no assessment has been taken).
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/roles",
    "/roadmaps",
    "/skill-check",
    "/glossary",
    "/learn-web3",
    "/get-hired",
    "/job-boards",
    "/portfolio",
    "/interview-prep",
    "/faq",
    "/disclaimers",
    "/about",
    "/methodology",
    "/salary-methodology",
    "/privacy",
  ];
  const roleRoutes = roles.map((role) => `/roles/${role.slug}`);
  const portfolioRoutes = roles.map((role) => `/portfolio/${role.slug}`);
  const glossaryRoutes = glossaryTerms.map((term) => `/glossary/${term.slug}`);
  const roadmapRoutes = roadmapDetails.map((detail) => `/roadmaps/${detail.laneSlug}`);

  return [...staticRoutes, ...roleRoutes, ...portfolioRoutes, ...glossaryRoutes, ...roadmapRoutes].map((path) => ({
    url: `${baseUrl}${path}`,
  }));
}
