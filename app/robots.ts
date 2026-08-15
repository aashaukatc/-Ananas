import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://ananas-agent.aashaukat.chatgpt.site/sitemap.xml",
    host: "https://ananas-agent.aashaukat.chatgpt.site",
  };
}
