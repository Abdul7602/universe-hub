"use client";

export default function OrbitRing() {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[4, 0.015, 16, 200]} />

      <meshBasicMaterial
        color="#6fdfff"
        transparent
        opacity={0.35}
      />
    </mesh>
  );
}
