"use client";

import { useCareerStore } from "@/stores/careerStore";

export default function CareerDNAModel() {
  const selectedYear =
    useCareerStore(
      (state) => state.selectedYear
    );

  const selectedColor =
    useCareerStore(
      (state) => state.selectedColor
    );

  const active =
    selectedYear !== null;

  const color =
    selectedColor || "#66e0ff";

  return (
    <>
      <style>
        {`
          @keyframes spinDNA {
            from {
              transform:
                translate(-50%, -50%)
                rotate(0deg);
            }

            to {
              transform:
                translate(-50%, -50%)
                rotate(360deg);
            }
          }

          @keyframes pulseCore {
            0% {
              opacity: 0.5;
              transform:
                translate(-50%, -50%)
                scale(1);
            }

            50% {
              opacity: 1;
              transform:
                translate(-50%, -50%)
                scale(1.15);
            }

            100% {
              opacity: 0.5;
              transform:
                translate(-50%, -50%)
                scale(1);
            }
          }

          @keyframes reactorBurst {
            0% {
              transform:
                translate(-50%, -50%)
                scale(1);
              opacity: 0.7;
            }

            100% {
              transform:
                translate(-50%, -50%)
                scale(2.2);
              opacity: 0;
            }
          }
        `}
      </style>

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: "240px",
          height: "240px",
          transform:
            "translate(-50%, -50%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,

            border: active
              ? `2px solid ${color}`
              : "2px solid rgba(102,224,255,0.4)",

            borderRadius: "50%",

            animation: `spinDNA ${
              active ? "8s" : "20s"
            } linear infinite`,

            boxShadow: active
              ? `0 0 50px ${color}`
              : "none",
          }}
        />

        {active && (
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",

              width: "120px",
              height: "120px",

              borderRadius: "50%",

              border:
                `2px solid ${color}`,

              animation:
                "reactorBurst 1.8s infinite",
            }}
          />
        )}

        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",

            width: active
              ? "100px"
              : "80px",

            height: active
              ? "100px"
              : "80px",

            borderRadius: "50%",

            background:
              `radial-gradient(circle, ${color}, transparent)`,

            transform:
              "translate(-50%, -50%)",

            animation:
              "pulseCore 1.2s infinite",

            boxShadow: active
              ? `0 0 100px ${color}`
              : `0 0 40px ${color}`,

            transition:
              "all 0.4s ease",
          }}
        />

        {[
          {
            top: "20px",
            left: "50%",
            transform:
              "translateX(-50%)",
          },
          {
            bottom: "20px",
            left: "50%",
            transform:
              "translateX(-50%)",
          },
          {
            left: "20px",
            top: "50%",
            transform:
              "translateY(-50%)",
          },
          {
            right: "20px",
            top: "50%",
            transform:
              "translateY(-50%)",
          },
        ].map((dot, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              ...dot,

              color,

              fontSize: active
                ? "32px"
                : "24px",

              transition:
                "all 0.3s ease",
            }}
          >
            ●
          </div>
        ))}
      </div>
    </>
  );
}