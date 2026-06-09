"use client";

import { Text } from "@react-three/drei";

type Props = {
  text: string;
  position: [number, number, number];
};

export default function DestinationLabel({
  text,
  position,
}: Props) {
  return (
    <Text
      position={position}
      fontSize={0.35}
      color="white"
      anchorX="center"
      anchorY="middle"
    >
      {text}
    </Text>
  );
}
