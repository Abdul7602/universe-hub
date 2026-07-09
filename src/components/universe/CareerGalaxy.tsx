"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useNavigationStore } from "@/stores/navigationStore";
import * as THREE from "three";
import DestinationLabel from "./DestinationLabel";
import DNAHelix from "./DNAHelix";
import {
  createFresnelMaterial,
  createSeededRandom,
  getQualityTier,
} from "./visuals";

function disableRaycast(object: THREE.Object3D | null) {
  if (object) object.raycast = () => {};
}

/* ------------------------------------------------------------------ */
/* Spiral arm particle system — single buffered <points>               */
/* ------------------------------------------------------------------ */

const ARM_COUNT = 3;
const ARM_POINTS = getQualityTier() === "low" ? 1100 : 2200;

const galaxyVertexShader = /* glsl */ `
  uniform float uTime;
  attribute float aRadius;
  attribute float aSize;
  attribute vec3 aColor;
  varying float vAlpha;
  varying vec3 vColor;

  void main() {
    vColor = aColor;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

    // Energy pulse traveling outward along the arms
    float pulse = 0.72 + 0.28 * sin(uTime * 0.9 - aRadius * 2.6);
    vAlpha = pulse;

    gl_PointSize = aSize * (52.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const galaxyFragmentShader = /* glsl */ `
  varying float vAlpha;
  varying vec3 vColor;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv) * 2.0;
    float intensity = smoothstep(1.0, 0.0, d) * vAlpha;
    if (intensity < 0.02) discard;
    gl_FragColor = vec4(vColor * intensity, intensity * 0.85);
  }
`;

function createGalaxyGeometry(): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry();

  const positions = new Float32Array(ARM_POINTS * 3);
  const radii = new Float32Array(ARM_POINTS);
  const sizes = new Float32Array(ARM_POINTS);
  const colors = new Float32Array(ARM_POINTS * 3);

  const inner = new THREE.Color("#bfe8ff");
  const outer = new THREE.Color("#7b4fff");
  const spark = new THREE.Color("#ff9ed8");
  const mixed = new THREE.Color();

  const rand = createSeededRandom(4242);

  for (let i = 0; i < ARM_POINTS; i++) {
    const arm = i % ARM_COUNT;
    const t = Math.pow(rand(), 0.65); // denser toward the core
    const radius = 0.3 + t * 1.65;

    const armAngle = (arm / ARM_COUNT) * Math.PI * 2;
    const spiral = radius * 2.4;
    const jitter = (rand() - 0.5) * (0.5 - t * 0.28);
    const angle = armAngle + spiral + jitter;

    const y = (rand() - 0.5) * 0.16 * (1.4 - t);

    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = Math.sin(angle) * radius;

    radii[i] = radius;
    sizes[i] = 0.6 + rand() * 1.4;

    if (rand() > 0.965) {
      mixed.copy(spark);
      sizes[i] += 0.8;
    } else {
      mixed.copy(inner).lerp(outer, t);
    }
    colors[i * 3] = mixed.r;
    colors[i * 3 + 1] = mixed.g;
    colors[i * 3 + 2] = mixed.b;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aRadius", new THREE.BufferAttribute(radii, 1));
  geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));

  return geometry;
}

/* ------------------------------------------------------------------ */

export default function CareerGalaxy() {
  const setHoveredDestination = useNavigationStore(
    (state) => state.setHoveredDestination
  );
  const setSelectedDestination = useNavigationStore(
    (state) => state.setSelectedDestination
  );
  const setCameraTarget = useNavigationStore(
    (state) => state.setCameraTarget
  );
  const selectedDestination = useNavigationStore(
    (state) => state.selectedDestination
  );
  const hoveredDestination = useNavigationStore(
    (state) => state.hoveredDestination
  );

  const isSelected = selectedDestination === "career";
  const isHovered = hoveredDestination === "career";
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const spinRef = useRef<THREE.Group>(null);
  const galaxyMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const emissiveLevel = useRef(1);

  const galaxyGeometry = useMemo(createGalaxyGeometry, []);
  const galaxyUniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  const shellMaterial = useMemo(
    () =>
      createFresnelMaterial({
        color: "#5ee4ff",
        power: 2.8,
        intensity: 1.2,
        opacity: 0.4,
      }),
    []
  );

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime;

    // Eased emissive ramp toward the selection state (visual only)
    const target = isSelected ? 3 : isHovered ? 1.7 : 1;
    emissiveLevel.current +=
      (target - emissiveLevel.current) * Math.min(delta * 4, 1);

    if (materialRef.current) {
      materialRef.current.emissiveIntensity =
        emissiveLevel.current + Math.sin(t * 0.9) * 0.25;
    }

    if (spinRef.current) {
      spinRef.current.rotation.y = t * 0.05;
    }

    if (galaxyMaterialRef.current) {
      galaxyMaterialRef.current.uniforms.uTime.value = t;
    }
  });

  return (
    <group
      position={[0, 8, -8]}
      scale={isSelected ? 1.2 : 1}
    >
      {/* Local cool light grounding the galaxy in the scene */}
      <pointLight
        intensity={0.5}
        distance={7}
        decay={2}
        color="#5ee4ff"
      />

      {/* Tilted spiral disc, slow spin about its own axis */}
      <group rotation={[1.05, 0, 0.35]}>
        <group ref={spinRef}>
          <points geometry={galaxyGeometry} raycast={() => {}}>
            <shaderMaterial
              ref={galaxyMaterialRef}
              vertexShader={galaxyVertexShader}
              fragmentShader={galaxyFragmentShader}
              uniforms={galaxyUniforms}
              transparent
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </points>
        </group>
      </group>

      {/* Fresnel energy shell around the core */}
      <mesh
        ref={(el) => disableRaycast(el)}
        material={shellMaterial}
      >
        <sphereGeometry args={[1.28, 32, 32]} />
      </mesh>

      {/* Interactive galactic core — geometry and handlers unchanged */}
      <mesh
        onPointerOver={() => setHoveredDestination("career")}
        onPointerOut={() => setHoveredDestination(null)}
        onClick={() => {
          setSelectedDestination("career");
          setCameraTarget([0, 8, -8]);
        }}
      >
        <icosahedronGeometry args={[0.9, 1]} />
        <meshStandardMaterial
          ref={materialRef}
          color="#2a5a8a"
          emissive="#5ee4ff"
          emissiveIntensity={isSelected ? 3 : 1}
          metalness={0.55}
          roughness={0.3}
        />
      </mesh>

      <group position={[0, 2.2, 0]}>
        <DNAHelix />
      </group>

      <DestinationLabel text="Career" position={[0, 1.8, 0]} />
    </group>
  );
}
