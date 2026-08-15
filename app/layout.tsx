import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "🍍 Ananas — Autonomous Software Engineering Workspace",
  description: "Cloud-native autonomous software engineering with Codespaces, Continue, NVIDIA Nemotron, LiteLLM, OpenRouter and Google Cloud.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
