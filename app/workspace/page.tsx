import type { Metadata } from "next";
import { WorkspaceShell } from "@/components/workspace-shell";
import { chatGPTSignOutPath, requireChatGPTUser } from "../chatgpt-auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Workspace",
  description: "The protected Ananas autonomous engineering workspace.",
  robots: { index: false, follow: false },
};

export default async function WorkspacePage() {
  const user = await requireChatGPTUser("/workspace");

  return (
    <WorkspaceShell
      user={{ displayName: user.displayName, email: user.email }}
      signOutHref={chatGPTSignOutPath("/")}
    />
  );
}
