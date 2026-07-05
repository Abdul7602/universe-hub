"use client";

import {
  ReactNode,
  useEffect,
  useState,
} from "react";

type RepositoryOrbitProps = {
  radius: number;
  speed: number;
  startAngle: number;
  children: ReactNode;
};

export default function RepositoryOrbit({
  radius,
  speed,
  startAngle,
  children,
}: RepositoryOrbitProps) {
  const [angle, setAngle] =
    useState(startAngle);

  useEffect(() => {
    const interval =
      setInterval(() => {
        setAngle(
          (prev) =>
            prev + speed
        );
      }, 16);

    return () =>
      clearInterval(interval);
  }, [speed]);

  const x =
    Math.cos(angle) *
    radius;

  const y =
    Math.sin(angle) *
    radius;

  return (
    <div
      style={{
        position: "absolute",

        left: "50%",
        top: "50%",

        transform: `
          translate(-50%, -50%)
          translate(${x}px, ${y}px)
        `,
      }}
    >
      {children}
    </div>
  );
}