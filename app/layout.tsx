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
  title: {
    default: "Ananas — Autonomous Engineering Workspace",
    template: "%s · Ananas",
  },
  description: "A calm, GitHub-anchored workspace for autonomous software engineering: reason, execute, inspect artifacts, and preserve evidence without requiring a local GPU.",
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
    title: "Ananas — More than a chat tab",
    description: "A cloud-native operating workspace for complex software work, inspectable artifacts, benchmark-gated models, and provider-portable routing.",
    type: "website",
    url: "/",
    siteName: "Ananas",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Ananas — Autonomous Engineering Workspace",
    description: "Reason, execute, inspect, and preserve evidence in one GitHub-anchored workspace.",
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
