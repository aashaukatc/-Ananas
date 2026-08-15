"use client";

import { useEffect, useState } from "react";

const nodes = [
  ["top", "Origin"],
  ["system", "System"],
  ["canvas", "Canvas"],
  ["capabilities", "Capability"],
  ["benchmark", "Evidence"],
  ["policy", "Policy"],
  ["founder", "Founder"],
  ["roadmap", "Roadmap"],
];

export function SpatialNavigator() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"));
    if (!sections.length) return;

    const update = () => {
      const focusLine = window.innerHeight * 0.46;
      let closest = 0;
      let distance = Number.POSITIVE_INFINITY;
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const current = Math.abs(rect.top + rect.height * 0.34 - focusLine);
        if (current < distance) {
          distance = current;
          closest = index;
        }
      });
      setActive(closest);
      document.documentElement.style.setProperty("--scene-index", String(closest));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <nav className="spatial-nav" aria-label="Spatial story navigation">
      <span className="spatial-progress" aria-hidden="true"><i style={{ transform: `scaleY(${(active + 1) / nodes.length})` }} /></span>
      <ol>
        {nodes.map(([id, label], index) => (
          <li key={id}>
            <a href={`#${id}`} aria-current={active === index ? "location" : undefined}>
              <i aria-hidden="true" /><span>{String(index).padStart(2, "0")}</span><strong>{label}</strong>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
