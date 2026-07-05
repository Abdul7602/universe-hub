"use client";

import {
  ReactNode,
  useEffect,
  useState,
} from "react";

type ProjectOrbitProps = {
  radius: number;
  speed: number;
  startAngle: number;
  children: ReactNode;
};

export default function ProjectOrbit({
  radius,
  speed,
  startAngle,
  children,
}: ProjectOrbitProps) {
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
          translate(
            calc(-50% + ${x}px),
            calc(-50% + ${y}px)
          )
        `,
      }}
    >
      {children}
    </div>
  );
}