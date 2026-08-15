"use client";

import { useEffect, useRef } from "react";
import { AnanasMark } from "./ananas-mark";

export function SpatialScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let cancelled = false;
    let dispose: (() => void) | undefined;

    const timer = window.setTimeout(() => {
      void import("./spatial-scene-runtime").then(({ mountSpatialScene }) => {
        if (!cancelled) dispose = mountSpatialScene(mount);
      });
    }, 120);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      dispose?.();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="spatial-canvas"
      role="img"
      aria-label="A luminous three-dimensional Ananas intelligence graph that moves through the product architecture as the page scrolls"
    >
      <div className="spatial-fallback" aria-hidden="true">
        <i />
        <i />
        <AnanasMark decorative />
      </div>
    </div>
  );
}
