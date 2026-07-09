"use client";

import { useNavigationStore } from "@/stores/navigationStore";
import { useProjectStore } from "@/stores/projectStore";

import ProjectNode from "./ProjectNode";
import ProjectOrbit from "./ProjectOrbit";
import ProjectModal from "./ProjectModal";
import MemoryBackdrop from "./MemoryBackdrop";

export default function ProjectsDimension() {
  const resetUniverse =
    useNavigationStore(
      (state) => state.resetUniverse
    );

  const selectedProject =
    useProjectStore(
      (state) => state.selectedProject
    );

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background:
          "radial-gradient(ellipse at 50% 32%, #150b30 0%, #0a0520 48%, #03010a 100%)",
        color: "white",
        zIndex: 99999,
        overflow: "hidden",
      }}
    >
      <style>
        {`
          @keyframes pjdRingSpin {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
          }

          @keyframes pjdRingSpinReverse {
            from { transform: translate(-50%, -50%) rotate(360deg); }
            to { transform: translate(-50%, -50%) rotate(0deg); }
          }

          @keyframes pjdCoreBreath {
            0%, 100% {
              box-shadow:
                0 0 40px -6px rgba(138, 95, 255, 0.55),
                0 0 120px -20px rgba(138, 95, 255, 0.3),
                inset 0 0 26px rgba(220, 200, 255, 0.35);
            }
            50% {
              box-shadow:
                0 0 60px -4px rgba(138, 95, 255, 0.75),
                0 0 160px -20px rgba(138, 95, 255, 0.4),
                inset 0 0 34px rgba(230, 215, 255, 0.5);
            }
          }

          @keyframes pjdDrift {
            0%, 100% { transform: translate(-7%, -4%); opacity: 0.5; }
            50% { transform: translate(5%, 5%); opacity: 0.8; }
          }

          @keyframes pjdTitleGlow {
            0%, 100% { text-shadow: 0 0 22px rgba(138, 95, 255, 0.4); }
            50% { text-shadow: 0 0 36px rgba(138, 95, 255, 0.6); }
          }

          .pjd-ring {
            position: absolute;
            left: 50%;
            top: 50%;
            border-radius: 50%;
            pointer-events: none;
          }

          .pjd-return {
            transition: box-shadow 0.3s ease, border-color 0.3s ease;
          }

          .pjd-return:hover {
            border-color: rgba(183, 138, 255, 0.8);
            box-shadow: 0 0 22px -6px rgba(138, 95, 255, 0.9);
          }

          @media (prefers-reduced-motion: reduce) {
            .pjd-ring,
            .pjd-core,
            .pjd-core-ring,
            .pjd-drift,
            .pjd-title {
              animation: none !important;
            }
          }
        `}
      </style>

      {/* Static star speckle — violet-tinted */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: `
            radial-gradient(1.5px 1.5px at 11% 20%, rgba(215,195,255,0.5), transparent 100%),
            radial-gradient(1px 1px at 30% 71%, rgba(225,205,255,0.4), transparent 100%),
            radial-gradient(1.5px 1.5px at 49% 12%, rgba(200,180,255,0.45), transparent 100%),
            radial-gradient(1px 1px at 63% 85%, rgba(230,215,255,0.35), transparent 100%),
            radial-gradient(2px 2px at 76% 30%, rgba(210,190,255,0.5), transparent 100%),
            radial-gradient(1px 1px at 89% 58%, rgba(205,185,255,0.4), transparent 100%),
            radial-gradient(1px 1px at 19% 89%, rgba(220,200,255,0.35), transparent 100%),
            radial-gradient(1.5px 1.5px at 40% 45%, rgba(195,175,255,0.3), transparent 100%),
            radial-gradient(1px 1px at 69% 8%, rgba(230,215,255,0.4), transparent 100%),
            radial-gradient(1px 1px at 5% 48%, rgba(210,190,255,0.35), transparent 100%),
            radial-gradient(1.5px 1.5px at 94% 85%, rgba(220,200,255,0.4), transparent 100%),
            radial-gradient(1px 1px at 55% 60%, rgba(205,185,255,0.3), transparent 100%)
          `,
        }}
      />

      {/* Faint engineering blueprint grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: `
            linear-gradient(rgba(138,95,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(138,95,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.9), transparent 76%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.9), transparent 76%)",
        }}
      />

      {/* Drifting violet-magenta atmosphere */}
      <div
        className="pjd-drift"
        style={{
          position: "absolute",
          left: "18%",
          top: "14%",
          width: "58vw",
          height: "58vh",
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at center, rgba(130,80,230,0.11), rgba(190,90,200,0.04) 55%, transparent 75%)",
          filter: "blur(10px)",
          animation: "pjdDrift 28s ease-in-out infinite",
        }}
      />

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(3,1,10,0.75) 100%)",
        }}
      />

      <button
        className="pjd-return"
        onClick={() => resetUniverse()}
        style={{
          position: "fixed",
          top: "24px",
          left: "24px",
          padding: "12px 18px",
          border: "1px solid rgba(138,95,255,0.4)",
          borderRadius: "8px",
          cursor: "pointer",
          zIndex: 100000,
          background: "rgba(10,6,26,0.7)",
          color: "#e2d4ff",
          letterSpacing: "0.06em",
          backdropFilter: "blur(6px)",
        }}
      >
        Return To Universe
      </button>

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1
          className="pjd-title"
          style={{
            fontSize: "52px",
            marginBottom: "8px",
            letterSpacing: "0.14em",
            fontWeight: 600,
            animation: "pjdTitleGlow 8s ease-in-out infinite",
          }}
        >
          Projects Dimension
        </h1>

        <p
          style={{
            opacity: 0.55,
            marginBottom: "40px",
            letterSpacing: "0.34em",
            textTransform: "uppercase",
            fontSize: "12px",
            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, monospace",
            color: "#c9b4ee",
          }}
        >
          Interactive Project Galaxy
        </p>

        <div
          style={{
            position: "relative",
            width: "900px",
            height: "900px",
            maxWidth: "95vw",
            maxHeight: "75vh",
          }}
        >
          {/* Orbit guide — dashed hairline at the true 280px radius */}
          <div
            className="pjd-ring"
            style={{
              width: "560px",
              height: "560px",
              border: "1px dashed rgba(138,95,255,0.16)",
              animation: "pjdRingSpin 95s linear infinite",
            }}
          />

          {/* Orbit guide — soft glow ring, counter-rotating */}
          <div
            className="pjd-ring"
            style={{
              width: "574px",
              height: "574px",
              border: "1px solid rgba(138,95,255,0.06)",
              boxShadow:
                "0 0 24px -8px rgba(138,95,255,0.3), inset 0 0 24px -8px rgba(138,95,255,0.22)",
              animation: "pjdRingSpinReverse 150s linear infinite",
            }}
          />

          {/* Innovation reactor core */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: "140px",
              height: "140px",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
            }}
          >
            <div
              className="pjd-core"
              style={{
                position: "absolute",
                inset: "14px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 38% 32%, rgba(245,238,255,0.95), #a37cff 38%, #4a2a8a 75%, #241448 100%)",
                animation: "pjdCoreBreath 6s ease-in-out infinite",
              }}
            />
            <div
              className="pjd-core-ring"
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: "140px",
                height: "140px",
                borderRadius: "50%",
                background:
                  "conic-gradient(from 0deg, transparent 0deg, rgba(183,138,255,0.55) 24deg, transparent 60deg, transparent 180deg, rgba(138,95,255,0.3) 210deg, transparent 250deg)",
                maskImage:
                  "radial-gradient(circle, transparent 64%, black 66%, black 70%, transparent 72%)",
                WebkitMaskImage:
                  "radial-gradient(circle, transparent 64%, black 66%, black 70%, transparent 72%)",
                animation: "pjdRingSpin 16s linear infinite",
              }}
            />
          </div>

          {selectedProject && (
            <>
              <MemoryBackdrop />
              <ProjectModal />
            </>
          )}

          <ProjectOrbit
            radius={280}
            speed={0.0015}
            startAngle={-1.57}
          >
            <ProjectNode
              projectKey="universeHub"
            />
          </ProjectOrbit>

          <ProjectOrbit
            radius={280}
            speed={0.0015}
            startAngle={3.14}
          >
            <ProjectNode
              projectKey="clearCV"
            />
          </ProjectOrbit>

          <ProjectOrbit
            radius={280}
            speed={0.0015}
            startAngle={0}
          >
            <ProjectNode
              projectKey="schedulePlanner"
            />
          </ProjectOrbit>

          <ProjectOrbit
            radius={280}
            speed={0.0015}
            startAngle={1.57}
          >
            <ProjectNode
              projectKey="kukaRobot"
            />
          </ProjectOrbit>
        </div>
      </div>
    </div>
  );
}
