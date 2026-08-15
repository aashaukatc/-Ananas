"use client";

import { useState } from "react";

type Mode = "reason" | "execute";

const modes: Record<Mode, {
  label: string;
  kicker: string;
  prompt: string;
  response: string;
  steps: string[];
}> = {
  reason: {
    label: "Reason",
    kicker: "Open-ended / context weighted",
    prompt: "Build a defensible 90-day research plan from these 46 source documents.",
    response: "I’ll preserve dissenting evidence, group the material by decision impact, and expose assumptions before producing the plan.",
    steps: ["Map source claims", "Surface contradictions", "Build decision path"],
  },
  execute: {
    label: "Execute",
    kicker: "Structured / tool directed",
    prompt: "Find the race condition, patch it, run the tests, and return the smallest safe diff.",
    response: "The shared cache mutates outside the lock. I’ll isolate the write, add a concurrency fixture, then verify idempotency.",
    steps: ["Inspect call graph", "Apply bounded patch", "Verify test matrix"],
  },
};

export function ContextCanvas() {
  const [mode, setMode] = useState<Mode>("reason");
  const active = modes[mode];

  return (
    <div className="canvas-shell">
      <div className="canvas-topbar">
        <div className="window-dots" aria-hidden="true"><i /><i /><i /></div>
        <div className="canvas-tabs" role="tablist" aria-label="Routing mode">
          {(Object.keys(modes) as Mode[]).map((item) => (
            <button
              key={item}
              role="tab"
              aria-selected={mode === item}
              className={mode === item ? "is-active" : ""}
              onClick={() => setMode(item)}
            >
              {modes[item].label}
            </button>
          ))}
        </div>
        <span className="canvas-state"><i /> Secure sandbox</span>
      </div>

      <div className="canvas-workspace">
        <section className="canvas-conversation" aria-label="Context conversation">
          <div className="panel-label"><span>01</span> Context stream</div>
          <div className="route-chip">{active.kicker}</div>
          <div className="message message-user">
            <span>You</span>
            <p>{active.prompt}</p>
          </div>
          <div className="message message-ananas">
            <span>Ananas / {active.label}</span>
            <p>{active.response}</p>
          </div>
          <ol className="execution-steps">
            {active.steps.map((step, index) => <li key={step}><span>0{index + 1}</span>{step}<i /></li>)}
          </ol>
        </section>

        <section className="canvas-artifact" aria-label="Live artifact preview">
          <div className="artifact-header">
            <div className="panel-label"><span>02</span> Live artifact</div>
            <span>Vector output / editable</span>
          </div>
          <div className={`artifact-visual artifact-${mode}`}>
            <div className="artifact-orbit orbit-a" />
            <div className="artifact-orbit orbit-b" />
            <div className="artifact-core"><span>{mode === "reason" ? "CTX" : "RUN"}</span><small>{mode === "reason" ? "synthesis" : "verified"}</small></div>
            <svg viewBox="0 0 600 330" aria-hidden="true">
              <path className="vector-line line-one" d="M24 252 C128 252 136 72 252 72 S380 252 576 252" />
              <path className="vector-line line-two" d="M24 112 C146 112 162 276 286 276 S422 112 576 112" />
              <path className="vector-line line-three" d="M24 188 C158 188 186 146 292 146 S414 188 576 188" />
              {[76, 180, 300, 426, 536].map((x, index) => <circle key={x} cx={x} cy={index % 2 ? 112 : 252} r="5" />)}
            </svg>
          </div>
          <div className="artifact-footer">
            <span>Context policy <strong>Preserved</strong></span>
            <span>Mode <strong>{active.label}</strong></span>
            <span>Output <strong>SVG + text</strong></span>
          </div>
        </section>
      </div>
    </div>
  );
}
