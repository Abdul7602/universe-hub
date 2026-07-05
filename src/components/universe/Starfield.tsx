"use client";

import { Stars } from "@react-three/drei";

export default function Starfield() {
  return (
    <group>
      {/* Distant star layer — dense, small, cool tint */}
      <Stars
        radius={120}
        depth={60}
        count={6000}
        factor={3}
        saturation={0.15}
        fade
        speed={0.3}
      />

      {/* Mid-depth layer — moderate brightness with subtle warmth */}
      <Stars
        radius={80}
        depth={40}
        count={2500}
        factor={5}
        saturation={0.35}
        fade
        speed={0.6}
      />

      {/* Near bright stars — sparse highlights for depth parallax */}
      <Stars
        radius={50}
        depth={25}
        count={400}
        factor={7}
        saturation={0.5}
        fade
        speed={1.2}
      />
    </group>
  );
}
