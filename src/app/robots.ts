import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

// Explizit erlaubte KI-Suchbots (GEO) zusätzlich zum Wildcard-Regeleintrag,
// damit Crawler-Zugriff für Generative-Engine-Optimierung dokumentiert und
// eindeutig nachweisbar ist.
const AI_BOTS = [
  "GPTBot",
  "ChatGPT-User",
  "ClaudeBot",
  "anthropic-ai",
  "PerplexityBot",
  "Google-Extended",
  "Bingbot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_BOTS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
