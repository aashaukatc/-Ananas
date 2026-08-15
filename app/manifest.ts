import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ananas — Autonomous Engineering Workspace",
    short_name: "Ananas",
    description: "GitHub-anchored, cloud-native autonomous software engineering without local GPU requirements.",
    start_url: "/",
    display: "standalone",
    background_color: "#030605",
    theme_color: "#C8FF3D",
    icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
