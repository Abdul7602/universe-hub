"use client";

export default function ProjectsPlanet() {
  return (
    <group position={[-12, 2, -4]}>
      <mesh>
        <sphereGeometry args={[1.2, 64, 64]} />

        <meshStandardMaterial
          color="#8a5fff"
          emissive="#8a5fff"
          emissiveIntensity={1}
        />
      </mesh>
    </group>
  );
}
