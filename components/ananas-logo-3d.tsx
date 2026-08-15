"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = {
  className?: string;
  ariaLabel?: string;
};

const colors = {
  lime: 0xc8ff3d,
  leaf: 0x48d17a,
  gold: 0xffc857,
};

export function AnanasLogo3D({ className = "", ariaLabel = "Animated Ananas pineapple infrastructure mark" }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 7.6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const root = new THREE.Group();
    root.rotation.x = -0.05;
    scene.add(root);

    const glowGeometry = new THREE.SphereGeometry(1.85, 24, 18);
    const glowMaterial = new THREE.MeshBasicMaterial({ color: colors.lime, transparent: true, opacity: 0.018, side: THREE.BackSide });
    root.add(new THREE.Mesh(glowGeometry, glowMaterial));

    const bodyGeometry = new THREE.SphereGeometry(1, 28, 22);
    bodyGeometry.scale(0.98, 1.35, 0.98);
    const bodyMaterial = new THREE.MeshBasicMaterial({
      color: colors.gold,
      wireframe: true,
      transparent: true,
      opacity: 0.48,
      blending: THREE.AdditiveBlending,
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = -0.18;
    root.add(body);

    const crown = new THREE.Group();
    const crownMaterial = new THREE.MeshBasicMaterial({
      color: colors.leaf,
      wireframe: true,
      transparent: true,
      opacity: 0.82,
      blending: THREE.AdditiveBlending,
    });
    for (let i = 0; i < 12; i += 1) {
      const outer = i >= 6;
      const geometry = new THREE.ConeGeometry(outer ? 0.15 : 0.12, outer ? 0.72 : 0.58, 4);
      const spike = new THREE.Mesh(geometry, crownMaterial);
      const angle = ((i % 6) / 6) * Math.PI * 2;
      const radius = outer ? 0.34 : 0.18;
      spike.position.set(Math.cos(angle) * radius, 1.27 + (outer ? 0.04 : 0.34), Math.sin(angle) * radius);
      spike.rotation.z = -Math.cos(angle) * (outer ? 0.48 : 0.2);
      spike.rotation.x = Math.sin(angle) * (outer ? 0.48 : 0.2);
      crown.add(spike);
    }
    root.add(crown);

    const visorMaterial = new THREE.MeshBasicMaterial({ color: colors.lime, wireframe: true, transparent: true, opacity: 0.94 });
    const leftLens = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.32, 0.08), visorMaterial);
    const rightLens = leftLens.clone();
    leftLens.position.set(-0.45, 0.18, 0.93);
    rightLens.position.set(0.45, 0.18, 0.93);
    root.add(leftLens, rightLens);

    const bridge = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-0.08, 0.18, 0.98), new THREE.Vector3(0.08, 0.18, 0.98)]),
      new THREE.LineBasicMaterial({ color: colors.lime, transparent: true, opacity: 0.95 }),
    );
    root.add(bridge);

    const waveGroup = new THREE.Group();
    const waveSpecs = [
      { color: colors.lime, speed: 0.48, ampY: 0.34, ampZ: 0.22, frequency: 1.9, phase: 0 },
      { color: colors.leaf, speed: 0.64, ampY: 0.43, ampZ: 0.26, frequency: 2.25, phase: Math.PI / 2.5 },
      { color: colors.gold, speed: 0.78, ampY: 0.3, ampZ: 0.18, frequency: 2.6, phase: Math.PI },
    ];

    const waves = waveSpecs.map((spec, waveIndex) => {
      const pointCount = 96;
      const positions = new Float32Array(pointCount * 3);
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const material = new THREE.LineBasicMaterial({
        color: spec.color,
        transparent: true,
        opacity: 0.36,
        blending: THREE.AdditiveBlending,
      });
      const line = new THREE.Line(geometry, material);
      line.position.y = -0.22 + waveIndex * 0.05;
      waveGroup.add(line);
      return { line, spec, positions, pointCount };
    });
    root.add(waveGroup);

    const resize = () => {
      const width = Math.max(1, mount.clientWidth);
      const height = Math.max(1, mount.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(mount);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clock = new THREE.Clock();
    let frame = 0;

    const drawWaves = (elapsed: number) => {
      waves.forEach(({ line, spec, positions, pointCount }, waveIndex) => {
        for (let i = 0; i < pointCount; i += 1) {
          const x = (i / (pointCount - 1)) * 6.6 - 3.3;
          const envelope = 0.58 + 0.42 * Math.cos((x / 3.3) * Math.PI * 0.5);
          const y = Math.sin(x * spec.frequency + elapsed * spec.speed + spec.phase) * spec.ampY * envelope;
          const z = Math.cos(x * spec.frequency * 0.55 + elapsed * spec.speed + waveIndex) * spec.ampZ;
          const offset = i * 3;
          positions[offset] = x;
          positions[offset + 1] = y;
          positions[offset + 2] = z;
        }
        line.geometry.attributes.position.needsUpdate = true;
      });
    };

    const renderFrame = () => {
      const elapsed = clock.getElapsedTime();
      drawWaves(reduceMotion ? 0.7 : elapsed);
      root.rotation.y = reduceMotion ? 0.14 : Math.sin(elapsed * 0.28) * 0.34;
      root.rotation.x = reduceMotion ? -0.05 : -0.05 + Math.cos(elapsed * 0.22) * 0.07;
      root.position.y = reduceMotion ? 0 : Math.sin(elapsed * 1.15) * 0.08;
      crown.rotation.y = reduceMotion ? 0 : elapsed * 0.035;
      renderer.render(scene, camera);
      if (!reduceMotion) frame = requestAnimationFrame(renderFrame);
    };
    renderFrame();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Line) {
          object.geometry?.dispose();
          const material = object.material;
          if (Array.isArray(material)) material.forEach((item) => item.dispose());
          else material?.dispose();
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} className={className} role="img" aria-label={ariaLabel} />;
}
