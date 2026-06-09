"use client";

export default function ContactMoon() {
  return (
    <group position={[0, -8, -8]}>
      <mesh>
        <sphereGeometry args={[0.7, 64, 64]} />

        <meshStandardMaterial
          color="#f7c65f"
          emissive="#f7c65f"
          emissiveIntensity={1}
        />
      </mesh>
    </group>
  );
}
