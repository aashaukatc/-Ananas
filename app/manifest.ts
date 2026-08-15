import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ananas — Autonomous Engineering Workspace",
    short_name: "Ananas",
    description: "A calm, GitHub-anchored operating workspace for autonomous software engineering.",
    start_url: "/",
    display: "standalone",
    background_color: "#101117",
    theme_color: "#7157FF",
    icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
