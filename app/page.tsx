import { AnanasMark } from "@/components/ananas-mark";
import { chatGPTSignInPath, getChatGPTUser } from "./chatgpt-auth";

export const dynamic = "force-dynamic";

const repoUrl = "https://github.com/aashaukatc/-Ananas";
const siteUrl = "https://ananas-agent.aashaukat.chatgpt.site";

const features = [
  {
    number: "01",
    title: "One context, every artifact",
    body: "Keep the conversation, repository, plan, patch, test result, and decision record in one inspectable workspace.",
    label: "Unified canvas",
  },
  {
    number: "02",
    title: "Route work by intent",
    body: "Use a context-heavy reasoning route for ambiguity and a structured execution route for bounded engineering tasks.",
    label: "Dual-engine flow",
  },
  {
    number: "03",
    title: "Change models, not product logic",
    body: "LiteLLM keeps NVIDIA Nemotron and OpenRouter behind a portable provider boundary with explicit fallback policy.",
    label: "Provider portable",
  },
];

const workflow = [
  ["01", "Bring the work", "Open a repository, describe the outcome, or attach the evidence that should govern the task."],
  ["02", "Choose the operating mode", "Reason through uncertain work or execute a bounded plan with tools, checkpoints, and visible artifacts."],
  ["03", "Keep the proof", "Review the plan, code, tests, cost signals, and final handoff without losing the original context."],
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Ananas",
      description: "A cloud-native autonomous engineering workspace for reasoning, execution, and inspectable artifacts.",
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/#software`,
      name: "Ananas",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Browser, Linux",
      url: siteUrl,
      codeRepository: repoUrl,
      description: "A GitHub-anchored autonomous engineering workspace using Codespaces, Continue, LiteLLM, NVIDIA Nemotron, OpenRouter, and Google Cloud.",
      license: "https://www.apache.org/licenses/LICENSE-2.0",
    },
  ],
};

export default async function Home() {
  const user = await getChatGPTUser();
  const workspaceHref = user ? "/workspace" : chatGPTSignInPath("/workspace");

  return (
    <div className="marketing-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <a className="skip-link" href="#main-content">Skip to content</a>

      <header className="marketing-header">
        <a className="brand" href="#top" aria-label="Ananas home">
          <span className="brand-icon"><AnanasMark decorative /></span>
          <span className="brand-word">ananas</span>
        </a>
        <nav className="marketing-nav" aria-label="Primary navigation">
          <a href="#product">Product</a>
          <a href="#workflow">How it works</a>
          <a href="#architecture">Architecture</a>
          <a href={repoUrl} target="_blank" rel="noreferrer">Open source <span>↗</span></a>
        </nav>
        <div className="header-actions">
          <a className="login-link" href={workspaceHref}>{user ? "Workspace" : "Log in"}</a>
          <a className="header-cta" href={workspaceHref}>{user ? "Open Ananas" : "Get started"}<span>↗</span></a>
        </div>
      </header>

      <main id="main-content">
        <section className="new-hero" id="top" aria-labelledby="hero-title">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-copy-new">
            <div className="eyebrow"><span className="live-dot" />Cloud-native autonomous engineering</div>
            <h1 id="hero-title">Your work deserves<br />more than a <em>chat tab.</em></h1>
            <p>Ananas is a focused operating environment for complex software work—reason, execute, inspect, and hand off without losing the context that made the answer correct.</p>
            <div className="hero-cta-row">
              <a className="primary-cta" href={workspaceHref}>{user ? "Continue to workspace" : "Log in to Ananas"}<span>→</span></a>
              <a className="text-cta" href="#product">Explore the product <span>↓</span></a>
            </div>
            <div className="hero-proof">
              <span>Browser first</span><i />
              <span>No local GPU</span><i />
              <span>GitHub anchored</span><i />
              <span>Apache 2.0</span>
            </div>
          </div>

          <div className="product-stage" aria-label="Preview of the Ananas engineering workspace">
            <div className="stage-glow" aria-hidden="true" />
            <div className="workspace-preview">
              <aside className="preview-rail">
                <span className="preview-logo"><AnanasMark decorative /></span>
                <i className="preview-new" />
                <div className="preview-nav-lines"><i /><i /><i /></div>
                <span className="preview-avatar">AS</span>
              </aside>
              <div className="preview-main">
                <div className="preview-topbar"><span>Ananas / workspace</span><div><i /><i /><i /></div></div>
                <div className="preview-thread">
                  <span className="preview-kicker">REASON → EXECUTE</span>
                  <h2>Build the smallest safe path<br />from intent to proof.</h2>
                  <div className="preview-message"><span>AN</span><p>I mapped the dependency boundary, isolated the risky change, and prepared a verification plan.</p></div>
                  <div className="preview-plan">
                    <div><span>01</span><strong>Inspect</strong><i /></div>
                    <div><span>02</span><strong>Modify</strong><i /></div>
                    <div><span>03</span><strong>Verify</strong><i /></div>
                  </div>
                </div>
                <div className="preview-composer"><span>Ask Ananas to build, debug, or explain…</span><i>↑</i></div>
              </div>
            </div>
            <div className="floating-card card-route"><small>MODEL ROUTE</small><strong>Nemotron</strong><span>Fallback ready</span></div>
            <div className="floating-card card-proof"><small>RUN STATUS</small><strong>03 / 03</strong><span>Checks passed</span></div>
          </div>
        </section>

        <section className="logo-strip" aria-label="Ananas technology stack">
          <span>Built around</span>
          <strong>GitHub</strong><i />
          <strong>Continue</strong><i />
          <strong>LiteLLM</strong><i />
          <strong>NVIDIA</strong><i />
          <strong>OpenRouter</strong><i />
          <strong>Google Cloud</strong>
        </section>

        <section className="product-section" id="product" aria-labelledby="product-title">
          <div className="section-intro">
            <span className="section-label">01 / PRODUCT</span>
            <h2 id="product-title">A calm interface for<br /><em>serious work.</em></h2>
            <p>The interface stays familiar enough to use immediately, then adds the planning, evidence, routing, and artifact controls that ordinary chat products leave outside the conversation.</p>
          </div>
          <div className="feature-grid-new">
            {features.map((feature) => (
              <article className="feature-card-new" key={feature.number}>
                <div className="feature-number">{feature.number}</div>
                <div className={`feature-visual feature-visual-${feature.number}`} aria-hidden="true"><i /><i /><i /></div>
                <span className="feature-label">{feature.label}</span>
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="workflow-section" id="workflow" aria-labelledby="workflow-title">
          <div className="workflow-heading">
            <span className="section-label">02 / OPERATING LOOP</span>
            <h2 id="workflow-title">Less prompting.<br /><em>More operating.</em></h2>
          </div>
          <div className="workflow-list">
            {workflow.map(([number, title, body]) => (
              <article key={number}>
                <span>{number}</span><h3>{title}</h3><p>{body}</p><i aria-hidden="true">↗</i>
              </article>
            ))}
          </div>
        </section>

        <section className="architecture-section" id="architecture" aria-labelledby="architecture-title">
          <div className="architecture-copy-new">
            <span className="section-label light">03 / ARCHITECTURE</span>
            <h2 id="architecture-title">The workspace and the intelligence are <em>decoupled.</em></h2>
            <p>Codespaces is the default development surface. Google Compute Engine is the persistent exception. LiteLLM keeps both independent from the model provider.</p>
            <a href={repoUrl} target="_blank" rel="noreferrer">Inspect the architecture <span>↗</span></a>
          </div>
          <div className="architecture-map-new" aria-label="Ananas architecture flow">
            <div className="map-column"><small>WORK</small><strong>Browser</strong><span>Any modern laptop</span></div>
            <i>→</i>
            <div className="map-stack"><div><small>PRIMARY</small><strong>Codespaces</strong></div><div><small>PERSISTENT</small><strong>Google Cloud</strong></div></div>
            <i>→</i>
            <div className="map-column map-control"><small>CONTROL</small><strong>LiteLLM</strong><span>Policy + fallback</span></div>
            <i>→</i>
            <div className="map-stack"><div><small>PRIMARY</small><strong>Nemotron</strong></div><div><small>FALLBACK</small><strong>OpenRouter</strong></div></div>
          </div>
        </section>

        <section className="security-section" id="security" aria-labelledby="security-title">
          <div>
            <span className="section-label">04 / OPERATING BOUNDARIES</span>
            <h2 id="security-title">Visible controls.<br /><em>No synthetic confidence.</em></h2>
          </div>
          <div className="security-points">
            <article><span>01</span><div><h3>Secrets stay out of Git</h3><p>Provider keys belong in protected environment variables and workspace secrets.</p></div></article>
            <article><span>02</span><div><h3>Services remain private</h3><p>Remote IDE and model gateway services stay localhost-bound behind SSH or IAP tunnels.</p></div></article>
            <article><span>03</span><div><h3>Models earn promotion</h3><p>Nemotron becomes primary only after reproducible correctness and cost evidence.</p></div></article>
          </div>
        </section>

        <section className="final-cta-section">
          <div className="cta-orb" aria-hidden="true"><AnanasMark decorative /></div>
          <span className="section-label light">READY WHEN YOU ARE</span>
          <h2>Move from conversation<br />to <em>controlled execution.</em></h2>
          <p>Open the workspace, choose an operating mode, and keep the plan, work, and proof in one place.</p>
          <a className="primary-cta light-cta" href={workspaceHref}>{user ? "Open your workspace" : "Log in and start"}<span>→</span></a>
        </section>
      </main>

      <footer className="site-footer-new">
        <div className="footer-top">
          <div className="footer-brand-block">
            <a className="brand brand-footer" href="#top"><span className="brand-icon"><AnanasMark decorative /></span><span className="brand-word">ananas</span></a>
            <p>Cloud-native autonomous engineering without hardware borders.</p>
          </div>
          <div className="footer-column"><strong>Product</strong><a href="#product">Workspace</a><a href="#workflow">Operating loop</a><a href="#architecture">Architecture</a><a href={workspaceHref}>Log in</a></div>
          <div className="footer-column"><strong>Resources</strong><a href={repoUrl} target="_blank" rel="noreferrer">GitHub</a><a href={`${repoUrl}/blob/main/docs/ROADMAP.md`} target="_blank" rel="noreferrer">Roadmap</a><a href={`${repoUrl}/blob/main/docs/ARCHITECTURE.md`} target="_blank" rel="noreferrer">Documentation</a></div>
          <div className="footer-column"><strong>Governance</strong><a href={`${repoUrl}/blob/main/SECURITY.md`} target="_blank" rel="noreferrer">Security</a><a href={`${repoUrl}/blob/main/CONTRIBUTING.md`} target="_blank" rel="noreferrer">Contributing</a><a href={`${repoUrl}/blob/main/LICENSE`} target="_blank" rel="noreferrer">Apache 2.0</a></div>
        </div>
        <div className="footer-bottom"><span>© 2026 Ananas. Open source, evidence first.</span><span>Designed for browsers. Built around GitHub.</span></div>
        <div className="footer-wordmark" aria-hidden="true">ANANAS</div>
      </footer>
    </div>
  );
}
