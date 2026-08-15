import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ananas-agent.aashaukat.chatgpt.site"),
  title: "ANANAS — Autonomous Engineering Without Hardware Borders",
  description: "Ananas is a GitHub-anchored, cloud-native autonomous software engineering workspace using Codespaces, Continue, LiteLLM, NVIDIA Nemotron, OpenRouter, and Google Cloud—without requiring a local GPU.",
  keywords: [
    "autonomous software engineering",
    "cloud-native AI workspace",
    "GitHub Codespaces AI",
    "LiteLLM routing",
    "NVIDIA Nemotron",
    "OpenRouter fallback",
    "Continue AI coding",
    "provider-portable AI",
  ],
  authors: [{ name: "Aftab Shaukat" }],
  creator: "Aftab Shaukat",
  publisher: "Ananas",
  category: "Developer Tools",
  alternates: { canonical: "/" },
  openGraph: {
    title: "ANANAS — Sweet logic. Sharp execution.",
    description: "Cloud-native autonomous software engineering with browser-first workspaces, remote AI inference, benchmark-gated models, and provider-portable routing.",
    type: "website",
    url: "/",
    siteName: "Ananas",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "ANANAS — Autonomous Engineering Without Hardware Borders",
    description: "GitHub-anchored, compute-decoupled, provider-portable autonomous engineering.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
