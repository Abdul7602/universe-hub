"use client";

import * as THREE from "three";

/**
 * Shared procedural visual helpers for the universe scene.
 * Everything here is generated once and cached at module level —
 * no per-frame or per-mount allocation.
 */

/* ------------------------------------------------------------------ */
/* Deterministic pseudo-random                                         */
/* ------------------------------------------------------------------ */

export function createSeededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}

/* ------------------------------------------------------------------ */
/* Radial glow textures                                                */
/* ------------------------------------------------------------------ */

export type GlowStop = [offset: number, color: string];

const glowCache = new Map<string, THREE.CanvasTexture>();

/**
 * Soft radial gradient texture. Stops use CSS rgba() strings so the
 * alpha falloff can be shaped precisely. Cached by key.
 */
export function getRadialGlowTexture(
  key: string,
  stops: GlowStop[],
  size = 256
): THREE.CanvasTexture {
  const cached = glowCache.get(key);
  if (cached) return cached;

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );
  for (const [offset, color] of stops) {
    gradient.addColorStop(offset, color);
  }
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  glowCache.set(key, texture);
  return texture;
}

/* ------------------------------------------------------------------ */
/* Fresnel rim material                                                */
/* ------------------------------------------------------------------ */

const fresnelVertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewDir = normalize(-mvPosition.xyz);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fresnelFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uPower;
  uniform float uIntensity;
  uniform float uOpacity;
  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    float fresnel = pow(
      1.0 - abs(dot(normalize(vNormal), normalize(vViewDir))),
      uPower
    );
    float alpha = fresnel * uOpacity;
    if (alpha < 0.003) discard;
    gl_FragColor = vec4(uColor * uIntensity * fresnel, alpha);
  }
`;

export type FresnelOptions = {
  color: string;
  /** Edge sharpness; higher = thinner rim. Typical 2–4. */
  power?: number;
  /** Color multiplier. Typical 1–2. */
  intensity?: number;
  /** Peak alpha at the rim. */
  opacity?: number;
  side?: THREE.Side;
};

/**
 * View-dependent rim glow — the cheap procedural stand-in for a bloom
 * pass. A few shader instructions, no textures.
 */
export function createFresnelMaterial(
  options: FresnelOptions
): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    vertexShader: fresnelVertexShader,
    fragmentShader: fresnelFragmentShader,
    uniforms: {
      uColor: { value: new THREE.Color(options.color) },
      uPower: { value: options.power ?? 2.5 },
      uIntensity: { value: options.intensity ?? 1.4 },
      uOpacity: { value: options.opacity ?? 0.6 },
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: options.side ?? THREE.FrontSide,
    fog: false,
  });
}

/* ------------------------------------------------------------------ */
/* Procedural surface textures (color + bump)                          */
/* ------------------------------------------------------------------ */

const surfaceCache = new Map<
  string,
  { map: THREE.CanvasTexture; bumpMap: THREE.CanvasTexture }
>();

/**
 * Cratered moon-like surface. Returns a subtle color map and a bump
 * map. Cheap: a few hundred canvas gradients, generated once.
 */
export function getCrateredSurface(
  key: string,
  baseColor: string,
  seed = 7,
  craterCount = 90
): { map: THREE.CanvasTexture; bumpMap: THREE.CanvasTexture } {
  const cached = surfaceCache.get(key);
  if (cached) return cached;

  const size = 512;
  const rand = createSeededRandom(seed);

  // Color map
  const colorCanvas = document.createElement("canvas");
  colorCanvas.width = size;
  colorCanvas.height = size;
  const cctx = colorCanvas.getContext("2d")!;
  cctx.fillStyle = baseColor;
  cctx.fillRect(0, 0, size, size);

  // Large soft tonal patches (maria)
  for (let i = 0; i < 14; i++) {
    const x = rand() * size;
    const y = rand() * size;
    const r = size * (0.08 + rand() * 0.18);
    const dark = rand() > 0.4;
    const g = cctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(
      0,
      dark ? "rgba(0,0,0,0.10)" : "rgba(255,255,255,0.05)"
    );
    g.addColorStop(1, "rgba(0,0,0,0)");
    cctx.fillStyle = g;
    cctx.fillRect(0, 0, size, size);
  }

  // Bump map — mid gray base, craters as rimmed depressions
  const bumpCanvas = document.createElement("canvas");
  bumpCanvas.width = size;
  bumpCanvas.height = size;
  const bctx = bumpCanvas.getContext("2d")!;
  bctx.fillStyle = "#808080";
  bctx.fillRect(0, 0, size, size);

  for (let i = 0; i < craterCount; i++) {
    const x = rand() * size;
    const y = rand() * size;
    const r = size * (0.006 + rand() * 0.03);

    // Depression
    const pit = bctx.createRadialGradient(x, y, 0, x, y, r);
    pit.addColorStop(0, "rgba(40,40,40,0.85)");
    pit.addColorStop(0.75, "rgba(80,80,80,0.4)");
    pit.addColorStop(1, "rgba(128,128,128,0)");
    bctx.fillStyle = pit;
    bctx.fillRect(x - r, y - r, r * 2, r * 2);

    // Bright rim
    const rim = bctx.createRadialGradient(x, y, r * 0.8, x, y, r * 1.15);
    rim.addColorStop(0, "rgba(200,200,200,0)");
    rim.addColorStop(0.5, "rgba(210,210,210,0.5)");
    rim.addColorStop(1, "rgba(128,128,128,0)");
    bctx.fillStyle = rim;
    bctx.fillRect(x - r * 1.3, y - r * 1.3, r * 2.6, r * 2.6);

    // Faint darkening on the color map too
    const shade = cctx.createRadialGradient(x, y, 0, x, y, r);
    shade.addColorStop(0, "rgba(0,0,0,0.12)");
    shade.addColorStop(1, "rgba(0,0,0,0)");
    cctx.fillStyle = shade;
    cctx.fillRect(x - r, y - r, r * 2, r * 2);
  }

  const map = new THREE.CanvasTexture(colorCanvas);
  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  map.colorSpace = THREE.SRGBColorSpace;

  const result = { map, bumpMap };
  surfaceCache.set(key, result);
  return result;
}

/**
 * Banded, mottled terrain for a stylized planet. Returns color + bump.
 */
export function getTerrainSurface(
  key: string,
  colors: { base: string; low: string; high: string },
  seed = 21
): { map: THREE.CanvasTexture; bumpMap: THREE.CanvasTexture } {
  const cached = surfaceCache.get(key);
  if (cached) return cached;

  const size = 512;
  const rand = createSeededRandom(seed);

  const colorCanvas = document.createElement("canvas");
  colorCanvas.width = size;
  colorCanvas.height = size;
  const cctx = colorCanvas.getContext("2d")!;
  cctx.fillStyle = colors.base;
  cctx.fillRect(0, 0, size, size);

  const bumpCanvas = document.createElement("canvas");
  bumpCanvas.width = size;
  bumpCanvas.height = size;
  const bctx = bumpCanvas.getContext("2d")!;
  bctx.fillStyle = "#808080";
  bctx.fillRect(0, 0, size, size);

  // Soft latitude bands
  for (let i = 0; i < 7; i++) {
    const y = (i / 7) * size + (rand() - 0.5) * 30;
    const h = size * (0.05 + rand() * 0.1);
    const g = cctx.createLinearGradient(0, y - h, 0, y + h);
    const tint = rand() > 0.5 ? colors.low : colors.high;
    g.addColorStop(0, "rgba(0,0,0,0)");
    g.addColorStop(0.5, hexToRgba(tint, 0.16 + rand() * 0.1));
    g.addColorStop(1, "rgba(0,0,0,0)");
    cctx.fillStyle = g;
    cctx.fillRect(0, y - h, size, h * 2);
  }

  // Mottled continents / height variation
  for (let i = 0; i < 60; i++) {
    const x = rand() * size;
    const y = rand() * size;
    const r = size * (0.02 + rand() * 0.09);
    const high = rand() > 0.5;

    const cg = cctx.createRadialGradient(x, y, 0, x, y, r);
    cg.addColorStop(
      0,
      hexToRgba(high ? colors.high : colors.low, 0.12 + rand() * 0.12)
    );
    cg.addColorStop(1, "rgba(0,0,0,0)");
    cctx.fillStyle = cg;
    cctx.fillRect(x - r, y - r, r * 2, r * 2);

    const bg = bctx.createRadialGradient(x, y, 0, x, y, r);
    bg.addColorStop(
      0,
      high
        ? `rgba(190,190,190,${0.25 + rand() * 0.3})`
        : `rgba(70,70,70,${0.25 + rand() * 0.3})`
    );
    bg.addColorStop(1, "rgba(128,128,128,0)");
    bctx.fillStyle = bg;
    bctx.fillRect(x - r, y - r, r * 2, r * 2);
  }

  const map = new THREE.CanvasTexture(colorCanvas);
  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  map.colorSpace = THREE.SRGBColorSpace;

  const result = { map, bumpMap };
  surfaceCache.set(key, result);
  return result;
}

/**
 * Wispy alpha-only cloud band texture for a planet's cloud shell.
 */
const cloudShellCache = new Map<string, THREE.CanvasTexture>();

export function getCloudShellTexture(
  key: string,
  seed = 33
): THREE.CanvasTexture {
  const cached = cloudShellCache.get(key);
  if (cached) return cached;

  const size = 512;
  const rand = createSeededRandom(seed);

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size / 2;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, size, size / 2);

  // Elongated wisps, denser near the equator band
  for (let i = 0; i < 90; i++) {
    const x = rand() * size;
    const y =
      size / 4 + (rand() - 0.5) * size * 0.42;
    const w = size * (0.05 + rand() * 0.2);
    const h = w * (0.12 + rand() * 0.2);
    const a = 0.05 + rand() * 0.12;

    ctx.save();
    ctx.translate(x, y);
    ctx.scale(1, h / w);
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, w);
    g.addColorStop(0, `rgba(255,255,255,${a})`);
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(-w, -w, w * 2, w * 2);
    ctx.restore();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  cloudShellCache.set(key, texture);
  return texture;
}

/**
 * Radial gradient ring texture (transparent center hole, soft band).
 * For planetary rings via ringGeometry UVs — sampled along U.
 */
const ringCache = new Map<string, THREE.CanvasTexture>();

export function getRingTexture(
  key: string,
  color: string,
  seed = 55
): THREE.CanvasTexture {
  const cached = ringCache.get(key);
  if (cached) return cached;

  const w = 256;
  const h = 8;
  const rand = createSeededRandom(seed);

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, w, h);

  // Banded density profile across the ring width
  for (let x = 0; x < w; x++) {
    const u = x / w;
    // Soft envelope: fade in from inner edge, out at outer edge
    const envelope =
      Math.sin(Math.min(u * 3.2, Math.PI * 0.5)) *
      Math.pow(1 - u, 0.6);
    // Band structure
    const bands =
      0.55 +
      0.45 * Math.sin(u * 40 + rand() * 4) * Math.sin(u * 13 + 2);
    const a = Math.max(0, envelope * bands * 0.85);
    ctx.fillStyle = hexToRgba(color, a);
    ctx.fillRect(x, 0, 1, h);
  }

  const texture = new THREE.CanvasTexture(canvas);
  ringCache.set(key, texture);
  return texture;
}

/* ------------------------------------------------------------------ */

function hexToRgba(hex: string, alpha: number): string {
  const value = hex.replace("#", "");
  const r = parseInt(value.substring(0, 2), 16);
  const g = parseInt(value.substring(2, 4), 16);
  const b = parseInt(value.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha.toFixed(3)})`;
}

/* ------------------------------------------------------------------ */
/* Quality tier — graceful degradation on low-end devices              */
/* ------------------------------------------------------------------ */

export type QualityTier = "high" | "low";

let cachedTier: QualityTier | null = null;

/**
 * Coarse device heuristic. "low" halves particle counts, trims nebula
 * layers and skips the planet cloud shell. Never cached on the server
 * (navigator undefined) so hydration stays consistent client-side.
 */
export function getQualityTier(): QualityTier {
  if (typeof navigator === "undefined") return "high";
  if (cachedTier) return cachedTier;

  const cores = navigator.hardwareConcurrency ?? 8;
  const memory =
    (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;

  cachedTier = cores <= 4 || memory <= 4 ? "low" : "high";
  return cachedTier;
}
