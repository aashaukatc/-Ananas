import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "🍍 Ananas — Conversational Work Engine",
  description:
    "A cloud-native, provider-portable conversational work engine for persistent projects, files, artifacts, governed tools, and specialized vertical products.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
