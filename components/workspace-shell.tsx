"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { AnanasMark } from "./ananas-mark";

type View = "chat" | "projects" | "agents" | "artifacts" | "benchmarks";
type Utility = "tools" | "settings" | "account" | null;
type Mode = "auto" | "reason" | "execute";

type Message = {
  id: number;
  role: "user" | "assistant";
  text: string;
  artifact?: { title: string; meta: string; steps: string[] };
};

type WorkspaceShellProps = {
  user: { displayName: string; email: string };
  signOutHref: string;
};

const navItems: Array<{ id: View; label: string; icon: IconName }> = [
  { id: "chat", label: "Threads", icon: "chat" },
  { id: "projects", label: "Projects", icon: "folder" },
  { id: "agents", label: "Agents", icon: "spark" },
  { id: "artifacts", label: "Artifacts", icon: "artifact" },
  { id: "benchmarks", label: "Benchmarks", icon: "chart" },
];

const history = [
  { title: "Provider fallback policy", age: "Today", prompt: "Design a safe NVIDIA to OpenRouter failover policy with explicit retry boundaries." },
  { title: "Benchmark fixture plan", age: "Today", prompt: "Turn the brownfield benchmark specification into an executable fixture plan." },
  { title: "Codespace health check", age: "Yesterday", prompt: "Audit the Codespace bootstrap path and identify the smallest reliable health-check surface." },
  { title: "GCP service boundary", age: "Aug 14", prompt: "Review the localhost service boundary for code-server and LiteLLM." },
];

const starterPrompts = [
  { icon: "code" as IconName, label: "Build", prompt: "Plan and implement a bounded feature from this repository." },
  { icon: "bug" as IconName, label: "Debug", prompt: "Trace a production defect and propose the smallest safe patch." },
  { icon: "search" as IconName, label: "Analyze", prompt: "Compare architecture options and expose the trade-offs." },
  { icon: "document" as IconName, label: "Document", prompt: "Turn the current implementation into a clear operating guide." },
];

const viewCopy: Record<Exclude<View, "chat">, { eyebrow: string; title: string; body: string }> = {
  projects: { eyebrow: "WORKSPACES", title: "Projects", body: "Organize repositories, operating context, and active outcomes." },
  agents: { eyebrow: "AUTOMATION", title: "Agents", body: "Reusable operating profiles for research, coding, review, and release work." },
  artifacts: { eyebrow: "OUTPUT", title: "Artifacts", body: "Plans, patches, reports, and diagrams created across your threads." },
  benchmarks: { eyebrow: "EVIDENCE", title: "Benchmarks", body: "Promote models using correctness, autonomy, latency, and cost—not marketing." },
};

export function WorkspaceShell({ user, signOutHref }: WorkspaceShellProps) {
  const [view, setView] = useState<View>("chat");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<Mode>("auto");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [utility, setUtility] = useState<Utility>(null);
  const [attachment, setAttachment] = useState<string | null>(null);
  const [attachOpen, setAttachOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  const initials = useMemo(() => {
    const source = user.displayName.includes("@") ? user.email.split("@")[0] : user.displayName;
    return source.split(/[\s._-]+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "AN";
  }, [user.displayName, user.email]);

  const newThread = () => {
    setView("chat");
    setMessages([]);
    setInput("");
    setAttachment(null);
    setUtility(null);
  };

  const openHistory = (item: typeof history[number]) => {
    setView("chat");
    setMessages([
      { id: 1, role: "user", text: item.prompt },
      {
        id: 2,
        role: "assistant",
        text: "I separated the decision into policy, failure handling, and evidence gates. The working artifact keeps each assumption visible before implementation.",
        artifact: { title: item.title, meta: "Plan · 4 checkpoints", steps: ["Map the current boundary", "Define the smallest safe change", "Add verification evidence"] },
      },
    ]);
    setUtility(null);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = input.trim();
    if (!value || busy) return;

    const userMessage: Message = { id: Date.now(), role: "user", text: value };
    setMessages((current) => [...current, userMessage]);
    setInput("");
    setAttachOpen(false);
    setBusy(true);

    window.setTimeout(() => {
      const route = mode === "auto" ? "a reasoning pass followed by bounded execution" : mode === "reason" ? "a context-weighted reasoning pass" : "a structured execution pass";
      setMessages((current) => [...current, {
        id: Date.now() + 1,
        role: "assistant",
        text: `I would route this through ${route}. The interface is ready; live model execution is the next backend milestone, so this response demonstrates the intended task structure without claiming an inference run.`,
        artifact: { title: "Proposed operating plan", meta: `${mode.toUpperCase()} · UI prototype`, steps: ["Inspect available context", "Confirm the change boundary", "Execute with verification"] },
      }]);
      setBusy(false);
      setAttachment(null);
    }, 520);
  };

  return (
    <div className={`app-shell ${sidebarOpen ? "sidebar-is-open" : "sidebar-is-closed"}`}>
      <aside className="app-sidebar" aria-label="Workspace navigation">
        <div className="sidebar-head">
          <Link className="app-brand" href="/" aria-label="Ananas home"><span><AnanasMark decorative /></span><strong>ananas</strong></Link>
          <button className="icon-button sidebar-toggle" type="button" onClick={() => setSidebarOpen((open) => !open)} aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}><Icon name="panel" /></button>
        </div>

        <button className="new-thread-button" type="button" onClick={newThread}><Icon name="plus" /><span>New thread</span><kbd>⌘ K</kbd></button>

        <nav className="app-nav" aria-label="Workspace sections">
          {navItems.map((item) => (
            <button className={view === item.id ? "is-active" : ""} type="button" key={item.id} onClick={() => { setView(item.id); setUtility(null); }}>
              <Icon name={item.icon} /><span>{item.label}</span>{item.id === "agents" && <small>3</small>}
            </button>
          ))}
        </nav>

        <div className="thread-history">
          <div className="sidebar-label"><span>Recent</span><button type="button" aria-label="Search threads"><Icon name="search" /></button></div>
          {history.map((item) => <button type="button" key={item.title} onClick={() => openHistory(item)}><span>{item.title}</span><small>{item.age}</small></button>)}
        </div>

        <div className="sidebar-bottom">
          <div className="usage-card">
            <div><span>Context budget</span><strong>18%</strong></div>
            <i><b /></i>
            <small>184k of 1M target</small>
          </div>
          <button type="button" className={utility === "tools" ? "is-active" : ""} onClick={() => setUtility(utility === "tools" ? null : "tools")}><Icon name="plug" /><span>Tools & connections</span><small>4</small></button>
          <button type="button" className={utility === "settings" ? "is-active" : ""} onClick={() => setUtility(utility === "settings" ? null : "settings")}><Icon name="settings" /><span>Settings</span></button>
          <button type="button" className={`account-button ${utility === "account" ? "is-active" : ""}`} onClick={() => setUtility(utility === "account" ? null : "account")}>
            <span className="account-avatar">{initials}</span><span className="account-copy"><strong>{user.displayName}</strong><small>{user.email}</small></span><Icon name="more" />
          </button>
        </div>
      </aside>

      <main className="workspace-main">
        <header className="workspace-topbar">
          <button className="icon-button mobile-menu" type="button" onClick={() => setSidebarOpen((open) => !open)} aria-label="Toggle menu"><Icon name="menu" /></button>
          <div className="workspace-breadcrumb"><span>Ananas</span><Icon name="chevron" /><strong>{view === "chat" ? "New thread" : viewCopy[view].title}</strong></div>
          <div className="topbar-actions">
            <span className="prototype-pill"><i /> Interface prototype</span>
            <a className="icon-button" href="https://github.com/aashaukatc/-Ananas" target="_blank" rel="noreferrer" aria-label="Open GitHub repository"><Icon name="github" /></a>
          </div>
        </header>

        {view === "chat" ? (
          <section className={`chat-surface ${messages.length ? "has-messages" : "is-empty"}`} aria-label="Ananas conversation">
            {messages.length === 0 ? (
              <div className="empty-state">
                <div className="empty-mark"><AnanasMark decorative /></div>
                <span className="empty-eyebrow">ANANAS / READY</span>
                <h1>What are we building today{user.displayName && !user.displayName.includes("@") ? `, ${user.displayName.split(" ")[0]}` : ""}?</h1>
                <p>Bring a repository, a difficult decision, or an operating problem. Keep the reasoning, work, and evidence together.</p>
                <div className="starter-grid">
                  {starterPrompts.map((prompt) => <button type="button" key={prompt.label} onClick={() => setInput(prompt.prompt)}><Icon name={prompt.icon} /><span><strong>{prompt.label}</strong><small>{prompt.prompt}</small></span><Icon name="arrow" /></button>)}
                </div>
              </div>
            ) : (
              <div className="message-stream">
                {messages.map((message) => (
                  <article className={`workspace-message message-${message.role}`} key={message.id}>
                    <div className="message-avatar">{message.role === "assistant" ? <AnanasMark decorative /> : initials}</div>
                    <div className="message-body"><span>{message.role === "assistant" ? "Ananas" : "You"}</span><p>{message.text}</p>
                      {message.artifact && <div className="message-artifact"><div><Icon name="artifact" /><span><strong>{message.artifact.title}</strong><small>{message.artifact.meta}</small></span><button type="button" aria-label="Open artifact"><Icon name="arrow" /></button></div><ol>{message.artifact.steps.map((step, index) => <li key={step}><span>0{index + 1}</span>{step}<i /></li>)}</ol></div>}
                    </div>
                  </article>
                ))}
                {busy && <div className="thinking-row"><span><i /><i /><i /></span>Ananas is structuring the task</div>}
              </div>
            )}

            <form className="composer" onSubmit={submit}>
              {attachment && <div className="attachment-chip"><Icon name="document" /><span>{attachment}</span><button type="button" onClick={() => setAttachment(null)} aria-label="Remove attachment">×</button></div>}
              {attachOpen && <div className="attach-menu"><button type="button" onClick={() => { setAttachment("Repository context"); setAttachOpen(false); }}><Icon name="github" />Repository</button><button type="button" onClick={() => { setAttachment("Document context"); setAttachOpen(false); }}><Icon name="document" />Document</button><button type="button" onClick={() => { setAttachment("Code selection"); setAttachOpen(false); }}><Icon name="code" />Code selection</button></div>}
              <textarea value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); event.currentTarget.form?.requestSubmit(); } }} placeholder="Ask Ananas to build, debug, analyze, or explain…" rows={2} aria-label="Message Ananas" />
              <div className="composer-bottom">
                <div className="composer-tools"><button className="icon-button" type="button" onClick={() => setAttachOpen((open) => !open)} aria-label="Add context"><Icon name="plus" /></button><div className="mode-switch" aria-label="Operating mode">{(["auto", "reason", "execute"] as Mode[]).map((item) => <button type="button" className={mode === item ? "is-active" : ""} key={item} onClick={() => setMode(item)}>{item}</button>)}</div></div>
                <button className="send-button" type="submit" disabled={!input.trim() || busy} aria-label="Send message"><Icon name="arrowUp" /></button>
              </div>
              <small className="composer-note">Ananas can make mistakes. Verify important code, costs, and security decisions.</small>
            </form>
          </section>
        ) : <WorkspaceView view={view} />}
      </main>

      {utility && <UtilityPanel utility={utility} user={user} initials={initials} signOutHref={signOutHref} close={() => setUtility(null)} />}
      {sidebarOpen && <button className="mobile-scrim" type="button" onClick={() => setSidebarOpen(false)} aria-label="Close navigation" />}
    </div>
  );
}

function WorkspaceView({ view }: { view: Exclude<View, "chat"> }) {
  const copy = viewCopy[view];
  return (
    <section className="workspace-view">
      <div className="view-heading"><span>{copy.eyebrow}</span><h1>{copy.title}</h1><p>{copy.body}</p></div>
      {view === "projects" && <div className="project-grid"><ViewCard icon="folder" title="Ananas core" meta="GitHub · main" status="Active" /><ViewCard icon="folder" title="Benchmark platform" meta="Planning · 4 files" status="Draft" /><button className="create-card" type="button"><Icon name="plus" /><span>Create project</span></button></div>}
      {view === "agents" && <div className="agent-list"><ViewCard icon="code" title="Engineering operator" meta="Inspect → plan → modify → verify" status="Ready" /><ViewCard icon="search" title="Research analyst" meta="Evidence mapping and synthesis" status="Ready" /><ViewCard icon="shield" title="Security reviewer" meta="Threats, boundaries, and validation" status="Ready" /></div>}
      {view === "artifacts" && <div className="artifact-table"><div className="table-head"><span>Name</span><span>Type</span><span>Updated</span><span>Status</span></div>{["Provider fallback policy", "Benchmark execution plan", "Codespace audit", "GCP service map"].map((name, index) => <button type="button" key={name}><span><Icon name="artifact" />{name}</span><span>{index % 2 ? "Report" : "Plan"}</span><span>{index < 2 ? "Today" : "Yesterday"}</span><strong>Verified</strong></button>)}</div>}
      {view === "benchmarks" && <div className="benchmark-dashboard"><article><span>ADOPTION GATE</span><strong>90<small>%</small></strong><p>Minimum frontier-baseline correctness</p></article><article><span>CURRENT STATE</span><strong className="metric-word">Protocol</strong><p>Defined · executable fixture planned</p></article><article><span>PRIMARY DECISION</span><strong className="metric-word">Evidence</strong><p>Successful tasks per dollar</p></article></div>}
    </section>
  );
}

function ViewCard({ icon, title, meta, status }: { icon: IconName; title: string; meta: string; status: string }) {
  return <button className="view-card" type="button"><span className="view-card-icon"><Icon name={icon} /></span><span><strong>{title}</strong><small>{meta}</small></span><em>{status}</em><Icon name="more" /></button>;
}

function UtilityPanel({ utility, user, initials, signOutHref, close }: { utility: Exclude<Utility, null>; user: WorkspaceShellProps["user"]; initials: string; signOutHref: string; close: () => void }) {
  return (
    <aside className="utility-panel" aria-label={`${utility} panel`}>
      <div className="utility-head"><div><span>WORKSPACE</span><h2>{utility === "tools" ? "Tools & connections" : utility === "settings" ? "Settings" : "Account"}</h2></div><button className="icon-button" type="button" onClick={close} aria-label="Close panel">×</button></div>
      {utility === "tools" && <div className="connection-list"><Connection icon="github" title="GitHub" body="Source, issues, pull requests" status="Connected" /><Connection icon="code" title="Codespaces" body="Primary browser workspace" status="Ready" /><Connection icon="spark" title="NVIDIA Nemotron" body="Primary model route" status="Configure" /><Connection icon="plug" title="OpenRouter" body="Fallback model route" status="Configure" /></div>}
      {utility === "settings" && <div className="settings-list"><label><span><strong>Compact navigation</strong><small>Reduce spacing in the left rail</small></span><input type="checkbox" /></label><label><span><strong>Show route details</strong><small>Display model and fallback signals</small></span><input type="checkbox" defaultChecked /></label><label><span><strong>Reduced motion</strong><small>Limit interface animation</small></span><input type="checkbox" /></label><div className="setting-select"><span><strong>Default operating mode</strong><small>Used for each new thread</small></span><button type="button">Auto <Icon name="chevron" /></button></div></div>}
      {utility === "account" && <div className="account-panel-content"><div className="account-hero"><span>{initials}</span><div><strong>{user.displayName}</strong><small>{user.email}</small></div></div><div className="account-detail"><span>Workspace plan</span><strong>Founder access</strong></div><div className="account-detail"><span>Authentication</span><strong>ChatGPT</strong></div><a className="signout-link" href={signOutHref}><Icon name="logout" />Sign out</a></div>}
    </aside>
  );
}

function Connection({ icon, title, body, status }: { icon: IconName; title: string; body: string; status: string }) {
  return <button type="button"><span className="connection-icon"><Icon name={icon} /></span><span><strong>{title}</strong><small>{body}</small></span><em className={status === "Connected" || status === "Ready" ? "connected" : ""}>{status}</em></button>;
}

type IconName = "chat" | "folder" | "spark" | "artifact" | "chart" | "plus" | "search" | "plug" | "settings" | "more" | "panel" | "menu" | "chevron" | "github" | "arrow" | "arrowUp" | "code" | "bug" | "document" | "shield" | "logout";

function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, React.ReactNode> = {
    chat: <><path d="M4 5.5h16v11H9l-5 3v-14Z"/><path d="M8 10h8M8 13h5"/></>,
    folder: <path d="M3.5 6.5h6l2-2h9v14h-17v-12Z"/>,
    spark: <><path d="m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3Z"/><path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z"/></>,
    artifact: <><path d="M6 3.5h9l3 3v14H6v-17Z"/><path d="M14.5 3.5V7H18M9 11h6M9 14h6M9 17h4"/></>,
    chart: <><path d="M4 20V5M4 20h16"/><path d="m7 16 4-5 3 2 5-7"/></>,
    plus: <path d="M12 5v14M5 12h14"/>, search: <><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/></>,
    plug: <><path d="M8 3v5M16 3v5M6 8h12v3a6 6 0 0 1-12 0V8ZM12 17v4"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19 13.5v-3l-2.1-.7-.6-1.4 1-2-2.2-2.1-1.9 1-.7-.3L12 3H9l-.7 2.1-1.4.6-2-1-2.1 2.2 1 1.9-.6 1.4L1 11v3l2.1.7.6 1.4-1 2 2.2 2.1 1.9-1 1.4.6L9 22h3l.7-2.1 1.4-.6 2 1 2.1-2.2-1-1.9.6-1.4 2.2-.8Z"/></>,
    more: <><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></>,
    panel: <><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/></>, menu: <path d="M4 7h16M4 12h16M4 17h16"/>, chevron: <path d="m9 6 6 6-6 6"/>,
    github: <><path d="M12 2.8a9.2 9.2 0 0 0-2.9 17.9v-2.2c-2.4.5-2.9-1-2.9-1-.4-1-1-1.3-1-1.3-.8-.6.1-.6.1-.6.9.1 1.4.9 1.4.9.8 1.4 2.1 1 2.6.8.1-.6.3-1 .6-1.2-1.9-.2-3.9-1-3.9-4.1 0-.9.3-1.7.9-2.3-.1-.2-.4-1.1.1-2.3 0 0 .7-.2 2.5.9A8.4 8.4 0 0 1 12 6.4c.8 0 1.6.1 2.3.3 1.8-1.2 2.5-.9 2.5-.9.5 1.2.2 2.1.1 2.3.6.6.9 1.4.9 2.3 0 3.2-2 3.9-3.9 4.1.3.3.6.8.6 1.6v4.6A9.2 9.2 0 0 0 12 2.8Z"/></>,
    arrow: <><path d="M5 12h14"/><path d="m14 7 5 5-5 5"/></>, arrowUp: <><path d="M12 19V5"/><path d="m7 10 5-5 5 5"/></>,
    code: <path d="m9 7-5 5 5 5M15 7l5 5-5 5"/>, bug: <><path d="M7 9h10v7a5 5 0 0 1-10 0V9Z"/><path d="M9 9V7a3 3 0 0 1 6 0v2M3 12h4M17 12h4M4 18l3-2M20 18l-3-2"/></>,
    document: <><path d="M6 3.5h9l3 3v14H6v-17Z"/><path d="M14.5 3.5V7H18M9 11h6M9 14h6"/></>,
    shield: <><path d="M12 3 5 6v5c0 4.8 2.8 8.1 7 10 4.2-1.9 7-5.2 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></>,
    logout: <><path d="M10 4H5v16h5M14 8l4 4-4 4M8 12h10"/></>,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}
