import { AnanasMark } from "@/components/ananas-mark";
import { ContextCanvas } from "@/components/context-canvas";
import { SpatialNavigator } from "@/components/spatial-navigator";
import { SpatialScene } from "@/components/spatial-scene";
import Image from "next/image";

const repoUrl = "https://github.com/aashaukatc/-Ananas";
const siteUrl = "https://ananas-agent.aashaukat.chatgpt.site";

const capabilities = [
  {
    number: "01",
    id: "context",
    title: "Unified Context Canvas",
    label: "MVP target",
    body: "Conversation, code, documents, and rendered artifacts share one decision thread. A secure execution surface keeps the work visible and inspectable—not trapped behind a chat response.",
    signal: "Artifacts + execution",
  },
  {
    number: "02",
    id: "routing",
    title: "Dual-Engine Prompting",
    label: "MVP target",
    body: "Ambiguous, open-ended work enters a context-heavy reasoning route. Strict functional work enters a structured execution route. LiteLLM keeps the provider boundary configurable.",
    signal: "Reason → Execute",
  },
  {
    number: "03",
    id: "memory",
    title: "1M-Token Hybrid Memory",
    label: "Capacity target",
    body: "Designed for whole repositories, research archives, portfolios, and manuscripts while preserving early constraints, dissenting evidence, and source boundaries.",
    signal: "Long-context target",
  },
  {
    number: "04",
    id: "media",
    title: "Dynamic Media Generation",
    label: "MVP target",
    body: "SVG charts, system maps, interface wireframes, and flow diagrams become editable working artifacts inside the same context—not flattened decoration added after the reasoning.",
    signal: "Vector-native output",
  },
];

const architecture = [
  ["01", "Browser", "Any modern laptop", "Entry plane"],
  ["02", "GitHub Codespaces", "VS Code + Continue", "Primary workspace"],
  ["03", "Google Compute Engine", "code-server + Continue", "Persistent exception"],
  ["04", "LiteLLM", "Retries + ordered failover", "Routing control"],
  ["05", "NVIDIA Nemotron", "Benchmark-gated", "Primary inference"],
  ["06", "OpenRouter", "Provider-portable", "Fallback route"],
];

const principles = [
  ["Codespaces first", "Use included development capacity before consuming persistent cloud infrastructure."],
  ["Compute decoupled", "The browser, Codespace, and GCP control plane do not need a local GPU."],
  ["Provider portable", "Model endpoints stay behind configuration and LiteLLM rather than leaking into product logic."],
  ["GitHub anchored", "Source, architecture, benchmark criteria, and operational decisions remain version controlled."],
];

const policies = [
  ["01", "Transparent by default", "Ananas does not simulate consciousness, emotion, or physical experience. Material uncertainty is exposed as a hallucination risk."],
  ["02", "Adaptive guardrails", "Harmful intent is removed; the safe, educational, or productive part of a request is clarified and completed when possible."],
  ["03", "Zero-retention target", "Enterprise data handling is designed around encryption, explicit opt-in training consent, and auditable retention controls."],
  ["04", "Localhost service boundary", "code-server and LiteLLM remain bound to localhost on GCP and are reached through SSH or IAP tunneling."],
];

const roadmap = [
  ["00", "Repository foundation", "Complete"],
  ["01", "Reliable AI coding workspace", "Active"],
  ["02", "Portable Agent Skills + MCP", "Planned"],
  ["03", "Executable benchmark platform", "Planned"],
  ["04", "Autonomous engineering loop", "Planned"],
  ["05", "GCP deployment layer", "Planned"],
  ["06", "Observability + cost intelligence", "Planned"],
  ["07", "Production security hardening", "Planned"],
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Ananas",
      description: "Cloud-native autonomous software engineering workspace with provider-portable remote AI inference.",
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/#software`,
      name: "Ananas",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Browser, Linux",
      url: siteUrl,
      codeRepository: repoUrl,
      description: "A GitHub-anchored, cloud-native autonomous engineering workspace using Codespaces, Continue, LiteLLM, NVIDIA Nemotron, OpenRouter, and Google Cloud.",
      license: "https://www.apache.org/licenses/LICENSE-2.0",
      author: { "@type": "Person", name: "Aftab Shaukat" },
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#founder`,
      name: "Aftab Shaukat",
      url: `${siteUrl}/#founder`,
      jobTitle: "Systems strategist and Ananas founder",
    },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SpatialScene />
      <SpatialNavigator />

      <main className="spatial-site">
        <a className="skip-link" href="#content">Skip to the Ananas story</a>

        <header className="site-header">
          <a className="brand-lockup" href="#top" aria-label="Ananas home">
            <span className="brand-mark"><AnanasMark decorative /></span>
            <span><strong>ANANAS</strong><small>autonomous engineering</small></span>
          </a>
          <nav aria-label="Primary navigation">
            <a href="#system">System</a>
            <a href="#canvas">Canvas</a>
            <a href="#benchmark">Evidence</a>
            <a href="#founder">Founder</a>
          </nav>
          <a className="source-pill" href={repoUrl} target="_blank" rel="noreferrer"><span>GitHub source</span><i aria-hidden="true">↗</i></a>
        </header>

        <section className="scene-section hero-scene" id="top" data-scene="0" aria-labelledby="hero-title">
          <div className="scene-copy hero-copy" id="content">
            <div className="system-kicker"><span>ANANAS / HYBRID AI MVP</span><i /><span>PHASE 1 ACTIVE</span></div>
            <h1 id="hero-title">Intelligence<br /><em>without hardware</em><br />borders.</h1>
            <p className="hero-intro">A cloud-native autonomous engineering workspace that separates where developers work from where AI inference runs—then reconnects both through one provider-portable control plane.</p>
            <div className="hero-actions">
              <a className="action action-primary" href="#system"><span>Enter the system</span><i aria-hidden="true">↓</i></a>
              <a className="action action-ghost" href={repoUrl} target="_blank" rel="noreferrer"><span>Read the repository</span><i aria-hidden="true">↗</i></a>
            </div>
          </div>

          <aside className="hero-telemetry glass-panel" aria-label="Ananas identity profile">
            <div className="panel-topline"><span><i /> Spatial node 00</span><span>Context-first</span></div>
            <dl>
              <div><dt>Name</dt><dd>Ananas</dd></div>
              <div><dt>Tagline</dt><dd>Sweet logic, sharp execution.</dd></div>
              <div><dt>Workspace</dt><dd>Browser-first / GPU-free</dd></div>
              <div><dt>Control plane</dt><dd>GitHub + LiteLLM</dd></div>
            </dl>
            <div className="telemetry-signal" aria-hidden="true"><span /><span /><span /><span /><span /><span /></div>
          </aside>
          <div className="scroll-cue" aria-hidden="true"><span>Scroll to route</span><i /></div>
        </section>

        <section className="scene-section system-scene" id="system" data-scene="1" aria-labelledby="system-title">
          <div className="section-heading scene-copy">
            <div className="section-code"><span>01</span><i /> Target architecture</div>
            <h2 id="system-title">One source of truth.<br /><em>Two workspaces.</em><br />Zero local GPUs.</h2>
            <p>Codespaces is the low-cost default. Google Compute Engine is the persistent exception. Both route remote inference through an explicit provider boundary.</p>
          </div>
          <div className="architecture-orbit" aria-label="Ananas architecture layers">
            {architecture.map(([number, title, description, role]) => (
              <article className="orbit-node glass-panel" key={number}>
                <span className="node-number">{number}</span><div><h3>{title}</h3><p>{description}</p></div><small>{role}</small>
              </article>
            ))}
          </div>
          <div className="principle-grid">
            {principles.map(([title, body]) => <article key={title}><i aria-hidden="true" /><h3>{title}</h3><p>{body}</p></article>)}
          </div>
        </section>

        <section className="scene-section canvas-scene" id="canvas" data-scene="2" aria-labelledby="canvas-title">
          <div className="canvas-intro scene-copy">
            <div className="section-code"><span>02</span><i /> Unified context canvas</div>
            <h2 id="canvas-title">Think in context.<br /><em>Execute in place.</em></h2>
            <p>Switch between the reasoning and execution routes. The interaction is a truthful product prototype: it demonstrates the intended workflow without pretending a live model session exists.</p>
          </div>
          <ContextCanvas />
          <p className="truth-note"><span>MVP interaction</span> The secure sandbox and hybrid routing behavior shown here are product targets, not a production inference claim.</p>
        </section>

        <section className="scene-section capability-scene" id="capabilities" data-scene="3" aria-labelledby="capabilities-title">
          <div className="section-heading compact scene-copy">
            <div className="section-code"><span>03</span><i /> Capability constellation</div>
            <h2 id="capabilities-title">Four moves.<br /><em>One memory.</em></h2>
            <p>The MVP stays narrow: concentrate investment where hybrid intelligence removes real workflow fragmentation.</p>
          </div>
          <div className="capability-constellation">
            {capabilities.map((capability) => (
              <article className="capability-node glass-panel" id={capability.id} key={capability.id}>
                <div className="capability-head"><span>{capability.number}</span><small>{capability.label}</small></div>
                <div className={`vector-glyph glyph-${capability.id}`} aria-hidden="true"><i /><i /><i /></div>
                <h3>{capability.title}</h3><p>{capability.body}</p><strong>{capability.signal}<i aria-hidden="true">↗</i></strong>
              </article>
            ))}
          </div>
        </section>

        <section className="scene-section benchmark-scene" id="benchmark" data-scene="4" aria-labelledby="benchmark-title">
          <div className="benchmark-number" aria-hidden="true"><strong>90</strong><span>%</span></div>
          <div className="benchmark-copy scene-copy">
            <div className="section-code"><span>04</span><i /> Model adoption gate</div>
            <h2 id="benchmark-title">Correctness<br /><em>before cheap tokens.</em></h2>
            <p>Nemotron remains primary only when it preserves at least 90% of the frontier-baseline correctness score while materially improving inference economics—or wins on successful tasks per dollar.</p>
            <div className="equation glass-panel" aria-label="Ananas model adoption formula"><span>promote(model)</span><strong>=</strong><span>correctness ≥ 0.90 × baseline</span><strong>∧</strong><span>economics improve</span></div>
            <ul className="benchmark-dimensions" aria-label="Benchmark dimensions"><li>Hidden-test correctness</li><li>Concurrency and data integrity</li><li>Autonomous completion</li><li>Latency and API cost</li><li>Successful tasks per dollar</li></ul>
          </div>
          <aside className="truth-ledger glass-panel">
            <div className="panel-topline"><span>Evidence ledger</span><span>Repository-backed</span></div>
            <div><span>Benchmark protocol</span><strong>Defined</strong></div>
            <div><span>Executable fixture</span><strong className="status-planned">Planned</strong></div>
            <div><span>Provider smoke tests</span><strong className="status-active">Active path</strong></div>
            <div><span>Published comparison</span><strong className="status-planned">Pending evidence</strong></div>
          </aside>
        </section>

        <section className="scene-section policy-scene" id="policy" data-scene="5" aria-labelledby="policy-title">
          <div className="section-heading scene-copy">
            <div className="section-code"><span>05</span><i /> Constitutional utility</div>
            <h2 id="policy-title">Useful enough<br />to move work.<br /><em>Honest enough to trust.</em></h2>
            <p>Safety is an operating boundary, not a personality performance. Productive intent is preserved while uncertainty, privacy, and service exposure remain explicit.</p>
          </div>
          <div className="policy-stack">
            {policies.map(([number, title, body]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p><i aria-hidden="true">↗</i></article>)}
          </div>
          <p className="truth-note policy-caveat"><span>Verification boundary</span> Enterprise retention and encryption claims remain product targets until implementation and independent controls prove them.</p>
        </section>

        <section className="scene-section founder-scene" id="founder" data-scene="6" aria-labelledby="founder-title">
          <figure className="founder-portrait">
            <div className="portrait-halo" aria-hidden="true" />
            <Image src="/aftab-shaukat-founder.webp" alt="Aftab Shaukat, founder and systems strategist behind Ananas" width={899} height={1350} sizes="(max-width: 820px) 86vw, 38vw" />
            <figcaption><span>Founder node / 06</span><strong>Aftab Shaukat</strong></figcaption>
          </figure>
          <div className="founder-copy scene-copy">
            <div className="section-code"><span>06</span><i /> Origin</div>
            <h2 id="founder-title">Built by an<br /><em>operator who sees systems.</em></h2>
            <p>Aftab Shaukat brings healthcare operations, revenue-cycle leadership, business analysis, solution architecture, and process optimization into one systems-first perspective. Ananas turns that operating instinct into an open, measurable engineering workspace.</p>
            <blockquote>“Stabilize first. Measure second. Automate third. Scale only after evidence.”</blockquote>
            <div className="founder-tags"><span>Operations</span><span>Architecture</span><span>Business analysis</span><span>Process design</span></div>
          </div>
        </section>

        <section className="scene-section roadmap-scene" id="roadmap" data-scene="7" aria-labelledby="roadmap-title">
          <div className="roadmap-copy scene-copy">
            <div className="section-code"><span>07</span><i /> Repository trajectory</div>
            <h2 id="roadmap-title">The vision is cinematic.<br /><em>The roadmap is executable.</em></h2>
            <p>Every phase is anchored to source, evidence, and an explicit operating boundary. The live repository remains the durable control plane.</p>
          </div>
          <ol className="roadmap-list">
            {roadmap.map(([number, title, status]) => <li key={number}><span>{number}</span><strong>{title}</strong><small className={status === "Active" ? "active" : status === "Complete" ? "complete" : "planned"}>{status}</small></li>)}
          </ol>
          <div className="final-callout glass-panel">
            <AnanasMark decorative /><div><span>ANANAS / OPEN SOURCE</span><h3>Sweet logic.<br />Sharp execution.</h3></div>
            <a href={repoUrl} target="_blank" rel="noreferrer"><span>Open the repository</span><i aria-hidden="true">↗</i></a>
          </div>
        </section>

        <footer className="site-footer">
          <a className="brand-lockup" href="#top" aria-label="Back to Ananas home"><span className="brand-mark"><AnanasMark decorative /></span><span><strong>ANANAS</strong><small>context-first intelligence</small></span></a>
          <p>GitHub-anchored. Provider-portable. Compute-decoupled.</p>
          <div><a href={repoUrl} target="_blank" rel="noreferrer">GitHub</a><a href="#top">Back to top ↑</a></div>
        </footer>
      </main>
    </>
  );
}
