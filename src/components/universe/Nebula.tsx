"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getQualityTier } from "./visuals";

/**
 * Procedural soft-cloud texture, generated once per session and shared
 * by every nebula sprite. A large radial falloff is overlaid with
 * smaller billowy "puffs" (deterministic seed, stable between reloads).
 * Tinting happens per-sprite via material color, so one texture serves
 * every color region.
 */
let cloudTexture: THREE.CanvasTexture | null = null;

function getCloudTexture(): THREE.CanvasTexture {
  if (cloudTexture) return cloudTexture;

  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  // Base radial falloff
  const base = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );
  base.addColorStop(0, "rgba(255,255,255,0.75)");
  base.addColorStop(0.35, "rgba(255,255,255,0.35)");
  base.addColorStop(0.7, "rgba(255,255,255,0.1)");
  base.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, size, size);

  // Billowy internal structure — deterministic pseudo-random
  let seed = 1337;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };

  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < 26; i++) {
    const angle = rand() * Math.PI * 2;
    const dist = rand() * size * 0.3;
    const x = size / 2 + Math.cos(angle) * dist;
    const y = size / 2 + Math.sin(angle) * dist;
    const r = size * (0.05 + rand() * 0.16);
    const a = 0.04 + rand() * 0.09;

    const puff = ctx.createRadialGradient(x, y, 0, x, y, r);
    puff.addColorStop(0, `rgba(255,255,255,${a})`);
    puff.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = puff;
    ctx.fillRect(0, 0, size, size);
  }

  cloudTexture = new THREE.CanvasTexture(canvas);
  return cloudTexture;
}

type CloudLayer = {
  position: [number, number, number];
  scale: number;
  color: string;
  opacity: number;
  /** static sprite rotation for variety */
  spin: number;
  /** phase offset for the slow positional drift */
  phase: number;
};

/**
 * Color script: violet-purple cluster stage left, deep teal stage
 * right, a violet-magenta crown above, and very large dim washes far
 * behind everything to fake volumetric depth. Positions keep the same
 * regions the original spheres occupied.
 */
const CLOUD_LAYERS: CloudLayer[] = [
  // Left violet cluster
  { position: [-12, 4, -20], scale: 15, color: "#6a44c8", opacity: 0.18, spin: 0.4, phase: 0.0 },
  { position: [-10, 2, -19], scale: 10, color: "#2ab4d8", opacity: 0.13, spin: 2.1, phase: 1.3 },
  { position: [-14, 6.5, -22], scale: 9, color: "#a05fe8", opacity: 0.11, spin: 4.4, phase: 2.6 },

  // Right teal region
  { position: [10, -3, -18], scale: 12, color: "#1898c8", opacity: 0.16, spin: 1.2, phase: 0.8 },
  { position: [12, -1, -17], scale: 8, color: "#7b4fff", opacity: 0.1, spin: 3.6, phase: 2.0 },
  { position: [9, -5.5, -20], scale: 7, color: "#12a8b8", opacity: 0.09, spin: 5.1, phase: 3.4 },

  // Upper crown
  { position: [0, 8, -25], scale: 17, color: "#8a5fff", opacity: 0.13, spin: 0.9, phase: 1.7 },
  { position: [2.5, 6, -24], scale: 11, color: "#b060c0", opacity: 0.07, spin: 2.8, phase: 4.1 },
  { position: [-3, 9.5, -26], scale: 10, color: "#5e6cff", opacity: 0.09, spin: 5.8, phase: 0.5 },

  // Lower counterweight
  { position: [3, -8.5, -24], scale: 10, color: "#3a2a80", opacity: 0.09, spin: 1.9, phase: 2.9 },

  // Deep background washes — huge, dim, almost static
  { position: [0, 0, -32], scale: 30, color: "#251a55", opacity: 0.11, spin: 0.0, phase: 5.0 },
  { position: [5, 3, -30], scale: 22, color: "#152a58", opacity: 0.09, spin: 3.1, phase: 3.8 },
];

const DRIFT_AMPLITUDE = 0.45;

/** Low tier drops the faint accent layers (keeps composition anchors). */
function getActiveLayers(): CloudLayer[] {
  return getQualityTier() === "low"
    ? CLOUD_LAYERS.filter((layer) => layer.opacity >= 0.1)
    : CLOUD_LAYERS;
}

function disableSpriteRaycast(sprite: THREE.Sprite | null) {
  if (sprite) sprite.raycast = () => {};
}

export default function Nebula() {
  const groupRef = useRef<THREE.Group>(null);
  const breathRef = useRef<THREE.Group>(null);
  const spritesRef = useRef<(THREE.Sprite | null)[]>([]);
  const layersRef = useRef<CloudLayer[]>(getActiveLayers());

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    const t = clock.elapsedTime;
    groupRef.current.rotation.z = t * 0.008;

    if (breathRef.current) {
      const breath = 1 + Math.sin(t * 0.4) * 0.04;
      breathRef.current.scale.set(breath, breath, breath);
    }

    // Per-cloud slow drift — desynchronized, sub-unit amplitude
    const layers = layersRef.current;
    for (let i = 0; i < layers.length; i++) {
      const sprite = spritesRef.current[i];
      if (!sprite) continue;
      const layer = layers[i];
      sprite.position.x =
        layer.position[0] +
        Math.sin(t * 0.05 + layer.phase) * DRIFT_AMPLITUDE;
      sprite.position.y =
        layer.position[1] +
        Math.cos(t * 0.04 + layer.phase * 1.7) * DRIFT_AMPLITUDE * 0.7;
    }
  });

  return (
    <group ref={groupRef}>
      <group ref={breathRef}>
        {layersRef.current.map((layer, i) => (
          <sprite
            key={i}
            ref={(el) => {
              spritesRef.current[i] = el;
              disableSpriteRaycast(el);
            }}
            position={layer.position}
            scale={[layer.scale, layer.scale, 1]}
          >
            <spriteMaterial
              map={getCloudTexture()}
              color={layer.color}
              transparent
              opacity={layer.opacity}
              rotation={layer.spin}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              fog={false}
            />
          </sprite>
        ))}
      </group>
    </group>
  );
}
