"use client";

export default function GitHubStation() {
  return (
    <group position={[10, 0, -2]}>
      <mesh>
        <octahedronGeometry args={[0.8, 0]} />

        <meshStandardMaterial
          color="#7df9ff"
          emissive="#7df9ff"
          emissiveIntensity={1.5}
        />
      </mesh>
    </group>
  );
}
