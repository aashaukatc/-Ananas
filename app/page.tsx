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
    <main className="min-h-screen">
      <header className="border-b border-[var(--ananas-border)] bg-[#0B1511]/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-4 lg:px-10">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl border border-[#C8FF3D]/40 bg-[#C8FF3D]/10 text-xl">🍍</div>
            <div>
              <div className="text-lg font-bold tracking-tight">Ananas</div>
              <div className="text-xs text-[var(--ananas-muted)]">autonomous engineering workspace</div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm text-[var(--ananas-muted)]">
            <span className="hidden md:inline">main</span>
            <span className="rounded-full border border-[#48D17A]/30 bg-[#48D17A]/10 px-3 py-1 text-[#48D17A]">● Codespace online</span>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1500px] gap-6 px-6 py-8 lg:grid-cols-[230px_1fr] lg:px-10">
        <aside className="hidden lg:block">
          <nav className="sticky top-6 space-y-1 text-sm">
            {['Overview','Tasks','Agents','Models','Skills','Benchmarks','Deployments','Settings'].map((item, i) => (
              <div key={item} className={`rounded-lg px-3 py-2.5 ${i===0?'bg-[#C8FF3D] font-semibold text-[#08100C]':'text-[var(--ananas-muted)] hover:bg-[#122019] hover:text-white'}`}>{item}</div>
            ))}
          </nav>
        </aside>

        <section className="min-w-0 space-y-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-[-0.03em] md:text-4xl">Build from anywhere. Route intelligence everywhere.</h1>
              <p className="mt-3 max-w-3xl text-[var(--ananas-muted)]">GitHub-anchored development with remote inference, provider failover, reproducible benchmarks and portable agent skills.</p>
            </div>
            <button className="rounded-xl bg-[#C8FF3D] px-5 py-3 text-sm font-bold text-[#08100C] shadow-[0_0_40px_rgba(200,255,61,.12)]">New autonomous task</button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {metrics.map(([label,value,status]) => (
              <div key={label} className="rounded-2xl border border-[var(--ananas-border)] bg-[var(--ananas-surface)] p-5">
                <div className="text-xs uppercase tracking-[0.14em] text-[var(--ananas-muted)]">{label}</div>
                <div className="mt-3 text-lg font-semibold">{value}</div>
                <div className="mt-2 text-xs text-[#48D17A]">{status}</div>
              </div>
            ))}
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.35fr_.65fr]">
            <div className="rounded-2xl border border-[var(--ananas-border)] bg-[var(--ananas-surface)] p-6">
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

            <div className="rounded-2xl border border-[var(--ananas-border)] bg-[var(--ananas-surface)] p-6">
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

          <div className="rounded-2xl border border-[var(--ananas-border)] bg-[var(--ananas-surface)] p-6">
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
