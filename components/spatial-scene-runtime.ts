import * as THREE from "three";

const stages = [
  { x: 2.8, y: -0.1, z: 0, scale: 1.08, camera: 8.4, hue: 0 },
  { x: 2.65, y: 0.15, z: -0.3, scale: 0.92, camera: 9.1, hue: 0.14 },
  { x: 2.15, y: -0.08, z: 0.25, scale: 1.15, camera: 7.8, hue: 0.27 },
  { x: 0, y: 0.15, z: -0.8, scale: 0.72, camera: 10.5, hue: 0.42 },
  { x: -2.8, y: -0.15, z: 0.05, scale: 1.02, camera: 8.7, hue: 0.58 },
  { x: 2.75, y: 0.2, z: -0.4, scale: 0.88, camera: 9.4, hue: 0.72 },
  { x: 2.85, y: 0, z: -0.2, scale: 0.94, camera: 8.9, hue: 0.86 },
  { x: 0, y: -0.05, z: -1.1, scale: 0.72, camera: 10.8, hue: 1 },
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export function mountSpatialScene(mount: HTMLDivElement) {

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const probe = document.createElement("canvas");
    if (!probe.getContext("webgl2") && !probe.getContext("webgl")) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030605, 0.048);
    const camera = new THREE.PerspectiveCamera(39, 1, 0.1, 100);
    camera.position.set(0, 0, 8.4);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.55));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.domElement.setAttribute("aria-hidden", "true");
    mount.appendChild(renderer.domElement);
    mount.classList.add("scene-ready");

    const root = new THREE.Group();
    scene.add(root);

    const ambient = new THREE.AmbientLight(0x426153, 1.15);
    const cursorLight = new THREE.PointLight(0xc8ff3d, 38, 15, 1.75);
    cursorLight.position.set(3.5, 2.5, 4.5);
    const goldLight = new THREE.PointLight(0xffc857, 22, 13, 1.9);
    goldLight.position.set(-3.5, -2.2, 2.2);
    scene.add(ambient, cursorLight, goldLight);

    const intelligence = new THREE.Group();
    root.add(intelligence);

    const bodyGeometry = new THREE.SphereGeometry(1.28, 34, 24);
    bodyGeometry.scale(0.9, 1.34, 0.9);
    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffc857,
      emissive: 0x6b3f05,
      emissiveIntensity: 0.62,
      roughness: 0.28,
      metalness: 0.46,
      transparent: true,
      opacity: 0.48,
      wireframe: true,
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = -0.22;
    intelligence.add(body);

    const coreMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uPointer: { value: new THREE.Vector2(0, 0) },
      },
      vertexShader: `
        varying vec3 vNormalView;
        varying vec3 vPositionView;
        void main() {
          vNormalView = normalize(normalMatrix * normal);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vPositionView = mvPosition.xyz;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uProgress;
        uniform vec2 uPointer;
        varying vec3 vNormalView;
        varying vec3 vPositionView;
        void main() {
          vec3 viewDir = normalize(-vPositionView);
          float fresnel = pow(1.0 - abs(dot(viewDir, normalize(vNormalView))), 2.2);
          float scan = 0.55 + 0.45 * sin((vPositionView.y + uProgress * 3.0) * 8.0 - uTime * 1.25);
          float pointerGlow = 0.75 + 0.25 * (uPointer.x - uPointer.y);
          vec3 lime = vec3(0.784, 1.0, 0.239);
          vec3 leaf = vec3(0.282, 0.82, 0.478);
          vec3 color = mix(leaf, lime, fresnel * pointerGlow);
          float alpha = fresnel * 0.68 + scan * 0.055;
          gl_FragColor = vec4(color, alpha);
        }
      `,
    });
    const core = new THREE.Mesh(new THREE.SphereGeometry(1.18, 42, 30), coreMaterial);
    core.scale.set(0.88, 1.31, 0.88);
    core.position.y = -0.22;
    intelligence.add(core);

    const crown = new THREE.Group();
    const crownMaterial = new THREE.MeshStandardMaterial({
      color: 0x48d17a,
      emissive: 0x0d6d36,
      emissiveIntensity: 0.9,
      roughness: 0.4,
      metalness: 0.34,
      wireframe: true,
      transparent: true,
      opacity: 0.86,
    });
    for (let index = 0; index < 14; index += 1) {
      const outside = index > 6;
      const spike = new THREE.Mesh(
        new THREE.ConeGeometry(outside ? 0.2 : 0.145, outside ? 1.08 : 0.8, 5),
        crownMaterial,
      );
      const angle = ((index % 7) / 7) * Math.PI * 2;
      const radius = outside ? 0.44 : 0.22;
      spike.position.set(Math.cos(angle) * radius, outside ? 1.52 : 1.82, Math.sin(angle) * radius);
      spike.rotation.z = -Math.cos(angle) * (outside ? 0.55 : 0.24);
      spike.rotation.x = Math.sin(angle) * (outside ? 0.55 : 0.24);
      crown.add(spike);
    }
    intelligence.add(crown);

    const visorMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xc8ff3d,
      emissive: 0x72ad0d,
      emissiveIntensity: 1.6,
      transmission: 0.2,
      roughness: 0.2,
      metalness: 0.55,
      transparent: true,
      opacity: 0.9,
    });
    const lensGeometry = new THREE.BoxGeometry(0.94, 0.32, 0.075);
    const lensLeft = new THREE.Mesh(lensGeometry, visorMaterial);
    const lensRight = lensLeft.clone();
    lensLeft.position.set(-0.53, 0.02, 1.14);
    lensRight.position.set(0.53, 0.02, 1.14);
    intelligence.add(lensLeft, lensRight);

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xc8ff3d,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
    });
    const rings: THREE.Mesh[] = [];
    [2.05, 2.72, 3.42].forEach((radius, index) => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, index === 1 ? 0.01 : 0.006, 8, 180), ringMaterial.clone());
      ring.rotation.set(0.78 + index * 0.34, index * 0.22, -0.36 + index * 0.5);
      root.add(ring);
      rings.push(ring);
    });

    const nodePositions = [
      [-3.2, 1.65, 0.2], [-2.95, -1.25, 0.55], [-1.1, 2.55, -0.7],
      [1.05, 2.55, -0.6], [2.95, 1.25, 0.45], [3.15, -1.45, 0.1],
      [1.05, -2.7, -0.6], [-1.15, -2.65, -0.7],
    ].map(([x, y, z]) => new THREE.Vector3(x, y, z));
    const nodes = nodePositions.map((position, index) => {
      const node = new THREE.Mesh(
        new THREE.IcosahedronGeometry(index % 3 === 0 ? 0.12 : 0.075, 1),
        new THREE.MeshStandardMaterial({
          color: index % 3 === 0 ? 0xffc857 : 0xc8ff3d,
          emissive: index % 3 === 0 ? 0x8f590b : 0x5d870f,
          emissiveIntensity: 1.35,
          roughness: 0.25,
          metalness: 0.5,
        }),
      );
      node.position.copy(position);
      root.add(node);
      return node;
    });

    const linePoints: THREE.Vector3[] = [];
    nodePositions.forEach((point, index) => {
      linePoints.push(point, nodePositions[(index + 1) % nodePositions.length]);
      if (index % 2 === 0) linePoints.push(point, new THREE.Vector3(0, 0, 0));
    });
    const network = new THREE.LineSegments(
      new THREE.BufferGeometry().setFromPoints(linePoints),
      new THREE.LineBasicMaterial({ color: 0x8eb9a0, transparent: true, opacity: 0.16, blending: THREE.AdditiveBlending }),
    );
    root.add(network);

    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 180;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let index = 0; index < particleCount; index += 1) {
      const radius = 3.6 + ((index * 47) % 100) / 45;
      const angle = index * 2.399963;
      particlePositions[index * 3] = Math.cos(angle) * radius;
      particlePositions[index * 3 + 1] = (((index * 31) % 100) / 100 - 0.5) * 7.6;
      particlePositions[index * 3 + 2] = Math.sin(angle) * radius * 0.55 - 1.2;
    }
    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particles = new THREE.Points(
      particlesGeometry,
      new THREE.PointsMaterial({ color: 0xc8ff3d, size: 0.018, transparent: true, opacity: 0.4, sizeAttenuation: true }),
    );
    scene.add(particles);

    const clock = new THREE.Clock();
    const pointer = new THREE.Vector2(0, 0);
    let pageProgress = 0;
    let raf = 0;
    let isVisible = true;

    const resize = () => {
      const width = Math.max(1, mount.clientWidth);
      const height = Math.max(1, mount.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const onPointer = (event: PointerEvent) => {
      pointer.set((event.clientX / window.innerWidth - 0.5) * 2, -(event.clientY / window.innerHeight - 0.5) * 2);
    };

    const onScroll = () => {
      const maximum = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      pageProgress = Math.min(1, Math.max(0, window.scrollY / maximum));
    };

    const onVisibility = () => { isVisible = !document.hidden; };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    resize();
    onScroll();

    const render = () => {
      if (isVisible) {
        const elapsed = reduceMotion ? 1.25 : clock.getElapsedTime();
        const rawStage = pageProgress * (stages.length - 1);
        const stageIndex = Math.min(stages.length - 2, Math.floor(rawStage));
        const stageMix = rawStage - stageIndex;
        const from = stages[stageIndex];
        const to = stages[stageIndex + 1];
        const mobile = window.innerWidth < 820;
        const targetX = mobile ? lerp(from.x, to.x, stageMix) * 0.34 : lerp(from.x, to.x, stageMix);
        const targetY = lerp(from.y, to.y, stageMix);
        const targetZ = lerp(from.z, to.z, stageMix);
        const targetScale = lerp(from.scale, to.scale, stageMix) * (mobile ? 0.7 : 1);
        const targetCamera = lerp(from.camera, to.camera, stageMix);

        root.position.x += (targetX + pointer.x * 0.12 - root.position.x) * 0.035;
        root.position.y += (targetY + pointer.y * 0.08 - root.position.y) * 0.035;
        root.position.z += (targetZ - root.position.z) * 0.035;
        const currentScale = root.scale.x + (targetScale - root.scale.x) * 0.035;
        root.scale.setScalar(currentScale);
        camera.position.z += (targetCamera - camera.position.z) * 0.035;
        camera.position.x += (pointer.x * 0.18 - camera.position.x) * 0.028;
        camera.position.y += (pointer.y * 0.12 - camera.position.y) * 0.028;
        camera.lookAt(0, 0, 0);

        intelligence.rotation.y = reduceMotion ? -0.24 : -0.24 + elapsed * 0.08 + pageProgress * Math.PI * 1.45;
        intelligence.rotation.x = -0.06 + pointer.y * 0.035 + Math.sin(elapsed * 0.5) * 0.025;
        intelligence.position.y = reduceMotion ? 0 : Math.sin(elapsed * 0.72) * 0.07;
        crown.rotation.y = reduceMotion ? 0.1 : elapsed * 0.055;
        rings.forEach((ring, index) => {
          ring.rotation.z += reduceMotion ? 0 : (index % 2 ? -1 : 1) * (0.0008 + index * 0.0004);
          (ring.material as THREE.MeshBasicMaterial).opacity = 0.12 + Math.sin(elapsed * 0.42 + index) * 0.05 + pageProgress * 0.08;
        });
        nodes.forEach((node, index) => node.scale.setScalar(0.82 + Math.sin(elapsed * 1.1 + index * 0.8) * 0.2));
        network.rotation.z = reduceMotion ? 0 : Math.sin(elapsed * 0.12) * 0.08;
        particles.rotation.y = reduceMotion ? 0.2 : elapsed * 0.018 + pageProgress * 0.5;
        particles.rotation.z = pageProgress * -0.25;

        cursorLight.position.x += (pointer.x * 4.8 - cursorLight.position.x) * 0.055;
        cursorLight.position.y += (pointer.y * 3.2 - cursorLight.position.y) * 0.055;
        const hue = lerp(from.hue, to.hue, stageMix);
        cursorLight.color.setHSL(0.22 + hue * 0.04, 0.92, 0.58);
        coreMaterial.uniforms.uTime.value = elapsed;
        coreMaterial.uniforms.uProgress.value = pageProgress;
        coreMaterial.uniforms.uPointer.value.copy(pointer);
        renderer.render(scene, camera);
      }
      if (!reduceMotion) raf = requestAnimationFrame(render);
    };
    render();

  return () => {
    cancelAnimationFrame(raf);
    resizeObserver.disconnect();
    window.removeEventListener("pointermove", onPointer);
    window.removeEventListener("scroll", onScroll);
    document.removeEventListener("visibilitychange", onVisibility);
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh || object instanceof THREE.Line || object instanceof THREE.LineSegments || object instanceof THREE.Points) {
        object.geometry?.dispose();
        const material = object.material;
        if (Array.isArray(material)) material.forEach((item) => item.dispose());
        else material?.dispose();
      }
    });
    renderer.dispose();
    renderer.domElement.remove();
    mount.classList.remove("scene-ready");
  };
}
