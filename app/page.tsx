import { AnanasGlyph } from "../components/ananas-glyph";
import { AnanasLogo3D } from "../components/ananas-logo-3d";

const metrics = [
  ["Workspace", "Codespaces", "Healthy"],
  ["Primary model", "NVIDIA Nemotron", "Auth pending"],
  ["Fallback", "OpenRouter", "Not configured"],
  ["Gateway", "LiteLLM", "Ready"],
];

const upstreams = [
  ["NVIDIA/skills", "Agent Skills", "Tier 1"],
  ["vercel-labs/skills", "Skills CLI", "Tier 1"],
  ["microsoft/skills", "Skills + MCP", "Tier 1"],
  ["NVIDIA/NeMo-Agent-Toolkit", "Multi-agent", "Tier 2"],
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="ananas-grid pointer-events-none absolute inset-x-0 top-0 h-[780px] opacity-70" />
      <header className="relative z-10 border-b border-[var(--ananas-border)] bg-[#050A08]/78 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-4 lg:px-10">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl border border-[#C8FF3D]/25 bg-[#C8FF3D]/[.035] shadow-[inset_0_0_24px_rgba(200,255,61,.04)]"><AnanasGlyph className="h-9 w-9" /></div>
            <div>
              <div className="text-lg font-bold tracking-[-0.02em]">Ananas</div>
              <div className="text-xs text-[var(--ananas-muted)]">autonomous engineering workspace</div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm text-[var(--ananas-muted)]">
            <span className="hidden md:inline">main</span>
            <span className="rounded-full border border-[#48D17A]/25 bg-[#48D17A]/[.06] px-3 py-1 text-[#48D17A]">● Codespace online</span>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto grid max-w-[1500px] gap-6 px-6 py-8 lg:grid-cols-[230px_1fr] lg:px-10">
        <aside className="hidden lg:block">
          <nav className="sticky top-6 space-y-1 text-sm">
            {['Overview','Tasks','Agents','Models','Skills','Benchmarks','Deployments','Settings'].map((item, i) => (
              <div key={item} className={`rounded-lg px-3 py-2.5 ${i===0?'bg-[#C8FF3D] font-semibold text-[#08100C]':'text-[var(--ananas-muted)] hover:bg-[#122019] hover:text-white'}`}>{item}</div>
            ))}
          </nav>
        </aside>

        <section className="min-w-0 space-y-8">
          <div className="grid min-h-[420px] items-center gap-6 overflow-hidden rounded-[28px] border border-[var(--ananas-border)] bg-[#08100C]/72 px-6 py-8 shadow-[0_28px_90px_rgba(0,0,0,.24)] md:px-10 xl:grid-cols-[1.05fr_.95fr]">
            <div className="relative z-10 max-w-3xl">
              <h1 className="text-4xl font-bold tracking-[-0.045em] md:text-5xl xl:text-6xl">Build from anywhere.<br/><span className="text-[#C8FF3D]">Route intelligence everywhere.</span></h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--ananas-muted)] md:text-lg">GitHub-anchored development with remote inference, provider failover, reproducible benchmarks and portable agent skills.</p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <button className="rounded-xl bg-[#C8FF3D] px-5 py-3 text-sm font-bold text-[#08100C] shadow-[0_0_42px_rgba(200,255,61,.12)]">New autonomous task</button>
                <span className="text-xs uppercase tracking-[0.14em] text-[var(--ananas-muted)]">Codespaces → LiteLLM → Nemotron</span>
              </div>
            </div>
            <div className="relative min-h-[320px] md:min-h-[390px]">
              <div className="pointer-events-none absolute inset-10 rounded-full bg-[#C8FF3D]/[.025] blur-3xl" />
              <AnanasLogo3D className="absolute inset-0" />
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-center text-[10px] uppercase tracking-[0.26em] text-[var(--ananas-muted)]">living infrastructure mark</div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {metrics.map(([label,value,status]) => (
              <div key={label} className="rounded-2xl border border-[var(--ananas-border)] bg-[var(--ananas-surface)]/80 p-5 backdrop-blur">
                <div className="text-xs uppercase tracking-[0.14em] text-[var(--ananas-muted)]">{label}</div>
                <div className="mt-3 text-lg font-semibold">{value}</div>
                <div className="mt-2 text-xs text-[#48D17A]">{status}</div>
              </div>
            ))}
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.35fr_.65fr]">
            <div className="rounded-2xl border border-[var(--ananas-border)] bg-[var(--ananas-surface)]/80 p-6">
              <div className="mb-6 flex items-center justify-between"><h2 className="font-semibold">Task stream</h2><span className="text-xs text-[var(--ananas-muted)]">live workspace</span></div>
              <div className="space-y-3">
                {[
                  ['Provider validation','Verify NVIDIA Build API authentication','blocked'],
                  ['Skills bridge','Map portable Agent Skills into Continue rules + MCP','ready'],
                  ['Benchmark runner','Nemotron vs frontier brownfield evaluation','queued'],
                ].map(([title,desc,state]) => (
                  <div key={title} className="rounded-xl border border-[var(--ananas-border)] bg-[#0E1A14] p-4">
                    <div className="flex items-center justify-between gap-4"><div className="font-medium">{title}</div><span className={`text-xs ${state==='blocked'?'text-[#FFC857]':'text-[#48D17A]'}`}>{state}</span></div>
                    <p className="mt-1 text-sm text-[var(--ananas-muted)]">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--ananas-border)] bg-[var(--ananas-surface)]/80 p-6">
              <h2 className="font-semibold">Routing policy</h2>
              <div className="mt-5 space-y-4 text-sm">
                <div><div className="text-[var(--ananas-muted)]">Primary</div><div className="mt-1 font-medium">NVIDIA Nemotron</div></div>
                <div className="h-px bg-[var(--ananas-border)]" />
                <div><div className="text-[var(--ananas-muted)]">Fallback</div><div className="mt-1 font-medium">OpenRouter</div></div>
                <div className="h-px bg-[var(--ananas-border)]" />
                <div><div className="text-[var(--ananas-muted)]">Control plane</div><div className="mt-1 font-medium">LiteLLM localhost gateway</div></div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--ananas-border)] bg-[var(--ananas-surface)]/80 p-6">
            <div className="mb-5"><h2 className="font-semibold">Upstream capability registry</h2><p className="mt-1 text-sm text-[var(--ananas-muted)]">Consume upstream. Pin versions. Contribute improvements back.</p></div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px] text-left text-sm">
                <thead className="text-xs uppercase tracking-[0.12em] text-[var(--ananas-muted)]"><tr><th className="pb-3">Repository</th><th>Role</th><th>Policy</th></tr></thead>
                <tbody>{upstreams.map(([repo,role,tier]) => <tr key={repo} className="border-t border-[var(--ananas-border)]"><td className="py-4 font-medium">{repo}</td><td className="text-[var(--ananas-muted)]">{role}</td><td className="text-[#C8FF3D]">{tier}</td></tr>)}</tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
