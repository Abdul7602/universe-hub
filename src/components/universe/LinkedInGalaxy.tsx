"use client";

export default function LinkedInGalaxy() {
  return (
    <group position={[0, 8, -8]}>
      <mesh>
        <icosahedronGeometry args={[0.9, 0]} />

        <meshStandardMaterial
          color="#4fc3ff"
          emissive="#4fc3ff"
          emissiveIntensity={1}
        />
      </mesh>
    </group>
  );
}
