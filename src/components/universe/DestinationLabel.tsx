"use client";

import { Text } from "@react-three/drei";

type Props = {
  text: string;
  position: [number, number, number];
};

export default function DestinationLabel({ text, position }: Props) {
  return (
    <Text
      position={position}
      fontSize={0.35}
      color="#e8f0ff"
      anchorX="center"
      anchorY="middle"
      outlineWidth={0.015}
      outlineColor="#5ee4ff"
      outlineOpacity={0.35}
      fillOpacity={0.95}
    >
      {text}
    </Text>
  );
}
