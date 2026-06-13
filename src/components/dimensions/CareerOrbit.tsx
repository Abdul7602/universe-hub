"use client";

import {
  useEffect,
  useState,
} from "react";

import { useCareerStore } from "@/stores/careerStore";

export default function CareerOrbit({
  children,
  radius,
  speed,
  startAngle,
}: {
  children: React.ReactNode;
  radius: number;
  speed: number;
  startAngle: number;
}) {
  const [angle, setAngle] =
    useState(startAngle);

  const selectedYear =
    useCareerStore(
      (state) => state.selectedYear
    );

  const active =
    selectedYear !== null;

  useEffect(() => {
    const interval =
      setInterval(() => {
        setAngle(
          (prev) =>
            prev +
            (active
              ? speed * 2.5
              : speed)
        );
      }, 16);

    return () =>
      clearInterval(interval);
  }, [speed, active]);

  const orbitRadius =
    active
      ? radius - 20
      : radius;

  const x =
    Math.cos(angle) *
    orbitRadius;

  const y =
    Math.sin(angle) *
    orbitRadius;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",

        transform:
          `translate(${x}px, ${y}px)`,

        transition:
          "transform 0.5s ease",

        zIndex: active
          ? 20
          : 10,
      }}
    >
      {children}
    </div>
  );
}