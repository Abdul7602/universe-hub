"use client";

import { useMemo, useRef } from "react";
import { Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { getQualityTier } from "./visuals";

const LOW_TIER = getQualityTier() === "low";
const HERO_STAR_COUNT = LOW_TIER ? 60 : 120;
const STAR_SCALE = LOW_TIER ? 0.5 : 1;

/**
 * Sparse "hero star" layer — large, slowly twinkling points scattered
 * on a shell between the mid and far star layers. Single buffered
 * <points> with a tiny shader: per-star phase + warm/cool color mix.
 */
const heroVertexShader = /* glsl */ `
  uniform float uTime;
  attribute float aPhase;
  attribute float aSize;
  attribute vec3 aColor;
  varying float vAlpha;
  varying vec3 vColor;

  void main() {
    vColor = aColor;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

    // Slow desynchronized twinkle, 0.1–0.4 Hz range
    float twinkle = sin(uTime * (0.6 + aPhase * 1.8) + aPhase * 6.2831);
    vAlpha = 0.45 + 0.4 * twinkle;

    gl_PointSize = aSize * (140.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const heroFragmentShader = /* glsl */ `
  varying float vAlpha;
  varying vec3 vColor;

  void main() {
    // Soft circular falloff with a bright core
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv) * 2.0;
    float core = smoothstep(0.4, 0.0, d);
    float halo = smoothstep(1.0, 0.2, d) * 0.35;
    float intensity = (core + halo) * vAlpha;
    if (intensity < 0.01) discard;
    gl_FragColor = vec4(vColor * intensity, intensity);
  }
`;

function createHeroStarGeometry(): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry();

  const positions = new Float32Array(HERO_STAR_COUNT * 3);
  const phases = new Float32Array(HERO_STAR_COUNT);
  const sizes = new Float32Array(HERO_STAR_COUNT);
  const colors = new Float32Array(HERO_STAR_COUNT * 3);

  const warm = new THREE.Color("#ffe2b8");
  const cool = new THREE.Color("#cfe6ff");
  const white = new THREE.Color("#ffffff");

  let seed = 9001;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };

  for (let i = 0; i < HERO_STAR_COUNT; i++) {
    // Random point on a shell, radius 42–68
    const r = 42 + rand() * 26;
    const theta = rand() * Math.PI * 2;
    const cosPhi = rand() * 2 - 1;
    const sinPhi = Math.sqrt(1 - cosPhi * cosPhi);

    positions[i * 3] = r * sinPhi * Math.cos(theta);
    positions[i * 3 + 1] = r * cosPhi;
    positions[i * 3 + 2] = r * sinPhi * Math.sin(theta);

    phases[i] = rand();
    sizes[i] = 1.2 + rand() * 2.4;

    const pick = rand();
    const color =
      pick < 0.3 ? warm : pick < 0.6 ? cool : white;
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );
  geometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
  geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));

  return geometry;
}

function HeroStars() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const geometry = useMemo(createHeroStarGeometry, []);
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.elapsedTime;
    }
  });

  return (
    <points geometry={geometry} raycast={() => {}}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={heroVertexShader}
        fragmentShader={heroFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function Starfield() {
  return (
    <group>
      {/* Distant star layer — dense, small, cool tint */}
      <Stars
        radius={120}
        depth={60}
        count={6000 * STAR_SCALE}
        factor={3}
        saturation={0.12}
        fade
        speed={0.25}
      />

      {/* Mid-depth layer — moderate brightness with subtle warmth */}
      <Stars
        radius={80}
        depth={40}
        count={2500 * STAR_SCALE}
        factor={4.5}
        saturation={0.3}
        fade
        speed={0.5}
      />

      {/* Near bright stars — sparse highlights for depth parallax */}
      <Stars
        radius={50}
        depth={25}
        count={350 * STAR_SCALE}
        factor={6.5}
        saturation={0.45}
        fade
        speed={1}
      />

      {/* Sparse twinkling hero stars */}
      <HeroStars />
    </group>
  );
}
