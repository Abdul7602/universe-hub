"use client";

import { useEffect, useState } from "react";

import { useCareerStore } from "@/stores/careerStore";

export default function MemoryPulse() {
  const pulseTrigger =
    useCareerStore(
      (state) => state.pulseTrigger
    );

  const color =
    useCareerStore(
      (state) => state.selectedColor
    ) || "#66e0ff";

  const [visible, setVisible] =
    useState(false);

  useEffect(() => {
    if (!pulseTrigger) return;

    setVisible(true);

    const timeout =
      setTimeout(() => {
        setVisible(false);
      }, 1800);

    return () =>
      clearTimeout(timeout);
  }, [pulseTrigger]);

  if (!visible) return null;

  return (
    <>
      <style>
        {`
          @keyframes streamToCore {
            0% {
              opacity: 0;
              transform:
                translateY(0px)
                scale(0.3);
            }

            20% {
              opacity: 1;
            }

            100% {
              opacity: 0;
              transform:
                translateY(-220px)
                scale(1);
            }
          }
        `}
      </style>

      {[0, 1, 2, 3, 4, 5].map(
        (particle) => (
          <div
            key={particle}
            style={{
              position:
                "absolute",

              left: "50%",
              top: "50%",

              width: "10px",
              height: "10px",

              borderRadius:
                "50%",

              background:
                color,

              boxShadow:
                `0 0 20px ${color}`,

              transform:
                "translate(-50%, -50%)",

              animation:
                `streamToCore 1.6s ease-out ${particle * 0.15}s forwards`,

              zIndex: 25,
            }}
          />
        )
      )}
    </>
  );
}