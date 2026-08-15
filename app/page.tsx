import { AnanasGlyph } from "../components/ananas-glyph";

const projects = [
  { name: "Ananas Core", active: true },
  { name: "DIRT RCM", active: false },
  { name: "Continuara", active: false },
  { name: "Research Lab", active: false },
];

const inScope = [
  "Persistent projects and files",
  "Artifacts beside conversation",
  "Governed tools and skills",
  "Provider-portable routing",
  "API + execution telemetry",
];

const deferred = [
  "Foundation-model training",
  "Native mobile apps",
  "Social login",
  "Billing / subscriptions",
  "Irreversible healthcare actions",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--ananas-night)] text-[var(--ananas-cream)]">
      <div className="grid min-h-screen lg:grid-cols-[248px_minmax(0,1fr)_390px]">
        <aside className="hidden border-r border-[var(--ananas-border)] bg-[var(--ananas-surface)]/70 p-5 lg:flex lg:flex-col">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl border border-[#C8FF3D]/20 bg-[#C8FF3D]/[.04]">
              <AnanasGlyph className="h-8 w-8" />
            </div>
            <div>
              <div className="font-semibold tracking-[-0.02em]">Ananas</div>
              <div className="text-xs text-[var(--ananas-muted)]">conversational work engine</div>
            </div>
          </div>

          <button className="mt-6 rounded-xl bg-[var(--ananas-lime)] px-4 py-3 text-left text-sm font-bold text-[#07100B]">
            + New project
          </button>

          <div className="mt-7 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ananas-muted)]">
            Projects
          </div>
          <nav className="mt-3 space-y-1.5">
            {projects.map((project) => (
              <div
                key={project.name}
                className={`rounded-xl px-3 py-2.5 text-sm ${
                  project.active
                    ? "border border-[#C8FF3D]/25 bg-[var(--ananas-surface-2)] font-semibold"
                    : "text-[var(--ananas-muted)] hover:bg-[var(--ananas-surface-2)] hover:text-white"
                }`}
              >
                {project.name}
              </div>
            ))}
          </nav>

          <div className="mt-8 border-t border-[var(--ananas-border)] pt-5">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ananas-muted)]">
              Project sources
            </div>
            <div className="mt-3 space-y-2 text-sm text-[var(--ananas-muted)]">
              <div>Files</div>
              <div>Skills & tools</div>
              <div>Connectors</div>
              <div>Activity</div>
            </div>
          </div>

          <div className="mt-auto rounded-xl border border-[var(--ananas-border)] bg-[#0B1511] p-3 text-xs leading-5 text-[var(--ananas-muted)]">
            GitHub is the durable source of truth. This screen is the Phase-1 product shell, not the old engineering Command Center.
          </div>
        </aside>

        <section className="flex min-h-screen min-w-0 flex-col">
          <header className="flex min-h-16 items-center justify-between border-b border-[var(--ananas-border)] px-4 sm:px-6">
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">Ananas Core / MVP architecture</div>
              <div className="mt-0.5 text-xs text-[var(--ananas-muted)]">Project conversation</div>
            </div>
            <div className="ml-4 flex items-center gap-2">
              <span className="hidden rounded-full border border-[#48D17A]/25 bg-[#48D17A]/[.06] px-3 py-1.5 text-xs text-[#48D17A] sm:inline">
                NVIDIA primary · OpenRouter fallback
              </span>
              <span className="rounded-full border border-[#FFC857]/25 bg-[#FFC857]/[.06] px-3 py-1.5 text-xs text-[#FFC857]">
                Prototype shell
              </span>
            </div>
          </header>

          <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-8 sm:px-6">
            <div className="ml-auto max-w-[88%] rounded-2xl border border-[var(--ananas-border)] bg-[var(--ananas-surface-2)] px-4 py-3 text-sm leading-6">
              Define the Phase-1 MVP, make the repository consistent end-to-end, and reuse mature upstream capability instead of rebuilding it.
            </div>

            <div className="mt-6 max-w-[94%] rounded-2xl border border-[var(--ananas-border)] bg-[var(--ananas-surface)] px-5 py-5">
              <div className="text-sm font-semibold">Phase-1 contract</div>
              <p className="mt-3 text-sm leading-6 text-[var(--ananas-cream)]">
                Ananas is a standalone conversational work engine. DIRT is the first specialized vertical pack—not a fork of the core and not the definition of Ananas itself.
              </p>
              <div className="my-4 h-px bg-[var(--ananas-border)]" />
              <ul className="space-y-2 text-sm leading-6">
                <li>• Persistent projects, files, and grounded context</li>
                <li>• Editable artifacts beside the conversation</li>
                <li>• Governed tools, skills, and sandboxed execution</li>
                <li>• LiteLLM routing with provider portability</li>
                <li>• API access, source lineage, and compute telemetry</li>
              </ul>
              <div className="mt-4 inline-flex rounded-full border border-[#48D17A]/25 bg-[#48D17A]/[.06] px-3 py-1 text-xs font-medium text-[#48D17A]">
                Scope grounded in 5 canonical upstream repositories
              </div>
            </div>

            <div className="mt-4 max-w-[94%] rounded-xl border border-[var(--ananas-border)] bg-[#09120D] px-4 py-3 text-xs leading-5 text-[var(--ananas-muted)]">
              <span className="font-semibold text-[#48D17A]">Execution trace</span>
              <span className="mx-2">·</span>
              project context loaded
              <span className="mx-2">·</span>
              upstream registry validated
              <span className="mx-2">·</span>
              artifact ready
            </div>

            <div className="mt-auto pt-8">
              <div className="rounded-2xl border border-[var(--ananas-border)] bg-[var(--ananas-surface)] p-4 shadow-[0_22px_70px_rgba(0,0,0,.22)]">
                <div className="min-h-16 text-sm text-[var(--ananas-muted)]">
                  Ask Ananas about this project, attach a file, invoke a tool, or create an artifact…
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-[var(--ananas-border)] pt-3">
                  <button className="rounded-lg border border-[var(--ananas-border)] px-3 py-2 text-xs text-[var(--ananas-muted)]">+ File</button>
                  <button className="rounded-lg border border-[var(--ananas-border)] px-3 py-2 text-xs text-[var(--ananas-muted)]">⌘ Tool</button>
                  <button className="rounded-lg border border-[var(--ananas-border)] px-3 py-2 text-xs text-[var(--ananas-muted)]">◇ Artifact</button>
                  <button className="ml-auto rounded-lg bg-[var(--ananas-lime)] px-4 py-2 text-xs font-bold text-[#07100B]">Send ↑</button>
                </div>
              </div>
              <p className="mt-3 text-center text-[11px] text-[var(--ananas-muted)]">
                UI scaffold only. Persistence, retrieval, tools, execution, and provider calls are tracked as MVP implementation work.
              </p>
            </div>
          </div>
        </section>

        <aside className="hidden border-l border-[var(--ananas-border)] bg-[var(--ananas-surface)]/70 p-5 xl:block">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ananas-lime)]">
            Artifact / Canvas
          </div>
          <h2 className="mt-2 text-xl font-bold tracking-[-0.025em]">MVP Scope Contract</h2>
          <p className="mt-1 text-xs text-[var(--ananas-muted)]">Persistent document · prototype state</p>

          <div className="my-5 h-px bg-[var(--ananas-border)]" />
          <div className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--ananas-muted)]">In scope</div>
          <div className="mt-3 space-y-2.5 text-sm">
            {inScope.map((item) => (
              <div key={item}>✓ {item}</div>
            ))}
          </div>

          <div className="my-5 h-px bg-[var(--ananas-border)]" />
          <div className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--ananas-muted)]">Explicitly deferred</div>
          <div className="mt-3 space-y-2.5 text-sm text-[var(--ananas-muted)]">
            {deferred.map((item) => (
              <div key={item}>— {item}</div>
            ))}
          </div>

          <div className="my-5 h-px bg-[var(--ananas-border)]" />
          <div className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--ananas-muted)]">Delivery gates</div>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full border border-[#48D17A]/25 bg-[#48D17A]/[.06] px-3 py-1.5 text-[#48D17A]">Scope · defined</span>
            <span className="rounded-full border border-[#FFC857]/25 bg-[#FFC857]/[.06] px-3 py-1.5 text-[#FFC857]">PoC · active</span>
            <span className="rounded-full border border-[#C8FF3D]/25 bg-[#C8FF3D]/[.06] px-3 py-1.5 text-[#C8FF3D]">Prototype · visual built</span>
            <span className="rounded-full border border-[var(--ananas-border)] px-3 py-1.5 text-[var(--ananas-muted)]">MVP · pending</span>
            <span className="rounded-full border border-[var(--ananas-border)] px-3 py-1.5 text-[var(--ananas-muted)]">Pilot/Beta · future</span>
          </div>
        </aside>
      </div>
    </main>
  );
}
