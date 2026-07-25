import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Keep hidden, admin, API, and disabled-experiment routes out of crawling.
        disallow: ["/admin", "/api/", "/experiments/", "/posts"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
