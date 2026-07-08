"use client";

import { useNavigationStore } from "@/stores/navigationStore";
import { useRepositoryStore } from "@/stores/repositoryStore";

import RepositoryNode from "./RepositoryNode";
import RepositoryOrbit from "./RepositoryOrbit";
import RepositoryModal from "./RepositoryModal";
import MemoryBackdrop from "./MemoryBackdrop";

export default function GithubDimension() {
  const resetUniverse =
    useNavigationStore(
      (state) => state.resetUniverse
    );

  const selectedRepository =
    useRepositoryStore(
      (state) =>
        state.selectedRepository
    );

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background:
          "radial-gradient(ellipse at center, #041018 0%, #020a10 45%, #000205 100%)",
        color: "white",
        zIndex: 99999,
        overflow: "hidden",
      }}
    >
      <style>
        {`
          @keyframes ghdRingSpin {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
          }

          @keyframes ghdRingSpinReverse {
            from { transform: translate(-50%, -50%) rotate(360deg); }
            to { transform: translate(-50%, -50%) rotate(0deg); }
          }

          @keyframes ghdCoreBreath {
            0%, 100% {
              box-shadow:
                0 0 40px -6px rgba(94, 228, 255, 0.55),
                0 0 120px -20px rgba(94, 228, 255, 0.3),
                inset 0 0 26px rgba(160, 255, 255, 0.35);
            }
            50% {
              box-shadow:
                0 0 60px -4px rgba(94, 228, 255, 0.75),
                0 0 160px -20px rgba(94, 228, 255, 0.4),
                inset 0 0 34px rgba(190, 255, 255, 0.5);
            }
          }

          @keyframes ghdDrift {
            0%, 100% { transform: translate(-8%, -4%); opacity: 0.5; }
            50% { transform: translate(6%, 5%); opacity: 0.75; }
          }

          @keyframes ghdTitleGlow {
            0%, 100% { text-shadow: 0 0 22px rgba(94, 228, 255, 0.35); }
            50% { text-shadow: 0 0 34px rgba(94, 228, 255, 0.55); }
          }

          .ghd-ring {
            position: absolute;
            left: 50%;
            top: 50%;
            border-radius: 50%;
            pointer-events: none;
          }

          .ghd-return {
            transition: box-shadow 0.3s ease, border-color 0.3s ease;
          }

          .ghd-return:hover {
            border-color: rgba(94, 228, 255, 0.8);
            box-shadow: 0 0 22px -6px rgba(94, 228, 255, 0.8);
          }

          @media (prefers-reduced-motion: reduce) {
            .ghd-ring,
            .ghd-core,
            .ghd-core-ring,
            .ghd-drift,
            .ghd-title {
              animation: none !important;
            }
          }
        `}
      </style>

      {/* Static star speckle — two layered radial-dot fields */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: `
            radial-gradient(1.5px 1.5px at 12% 22%, rgba(180,240,255,0.5), transparent 100%),
            radial-gradient(1px 1px at 32% 68%, rgba(200,250,255,0.4), transparent 100%),
            radial-gradient(1.5px 1.5px at 51% 14%, rgba(160,230,255,0.45), transparent 100%),
            radial-gradient(1px 1px at 64% 82%, rgba(200,255,250,0.35), transparent 100%),
            radial-gradient(2px 2px at 78% 33%, rgba(190,245,255,0.5), transparent 100%),
            radial-gradient(1px 1px at 88% 61%, rgba(170,235,255,0.4), transparent 100%),
            radial-gradient(1px 1px at 22% 87%, rgba(190,245,255,0.35), transparent 100%),
            radial-gradient(1.5px 1.5px at 42% 43%, rgba(160,230,255,0.3), transparent 100%),
            radial-gradient(1px 1px at 71% 9%, rgba(200,250,255,0.4), transparent 100%),
            radial-gradient(1px 1px at 6% 52%, rgba(180,240,255,0.35), transparent 100%),
            radial-gradient(1.5px 1.5px at 93% 88%, rgba(190,245,255,0.4), transparent 100%),
            radial-gradient(1px 1px at 57% 58%, rgba(170,235,255,0.3), transparent 100%)
          `,
        }}
      />

      {/* Faint holographic grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: `
            linear-gradient(rgba(94,228,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(94,228,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.9), transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.9), transparent 75%)",
        }}
      />

      {/* Drifting cyan-green glow */}
      <div
        className="ghd-drift"
        style={{
          position: "absolute",
          left: "20%",
          top: "15%",
          width: "55vw",
          height: "55vh",
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at center, rgba(40,180,190,0.12), rgba(40,220,150,0.04) 55%, transparent 75%)",
          filter: "blur(10px)",
          animation: "ghdDrift 26s ease-in-out infinite",
        }}
      />

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,2,5,0.75) 100%)",
        }}
      />

      <button
        className="ghd-return"
        onClick={() => resetUniverse()}
        style={{
          position: "fixed",
          top: "24px",
          left: "24px",
          padding: "12px 18px",
          border: "1px solid rgba(94,228,255,0.35)",
          borderRadius: "8px",
          cursor: "pointer",
          zIndex: 100000,
          background: "rgba(4,14,22,0.7)",
          color: "#c8f4ff",
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
          className="ghd-title"
          style={{
            fontSize: "52px",
            marginBottom: "8px",
            letterSpacing: "0.14em",
            fontWeight: 600,
            animation: "ghdTitleGlow 8s ease-in-out infinite",
          }}
        >
          GitHub Galaxy
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
            color: "#9adfee",
          }}
        >
          Repository Constellation
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
          {/* Orbit guide — crisp dashed hairline at the true 280px radius */}
          <div
            className="ghd-ring"
            style={{
              width: "560px",
              height: "560px",
              border: "1px dashed rgba(94,228,255,0.14)",
              animation: "ghdRingSpin 90s linear infinite",
            }}
          />

          {/* Orbit guide — soft glow ring, counter-rotating */}
          <div
            className="ghd-ring"
            style={{
              width: "574px",
              height: "574px",
              border: "1px solid rgba(94,228,255,0.05)",
              boxShadow:
                "0 0 24px -8px rgba(94,228,255,0.25), inset 0 0 24px -8px rgba(94,228,255,0.2)",
              animation: "ghdRingSpinReverse 140s linear infinite",
            }}
          />

          {/* Holographic reactor core */}
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
              className="ghd-core"
              style={{
                position: "absolute",
                inset: "14px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 38% 32%, rgba(230,255,255,0.95), #66e0ff 38%, #0a5a78 75%, #063246 100%)",
                animation: "ghdCoreBreath 6s ease-in-out infinite",
              }}
            />
            <div
              className="ghd-core-ring"
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: "140px",
                height: "140px",
                borderRadius: "50%",
                background:
                  "conic-gradient(from 0deg, transparent 0deg, rgba(94,228,255,0.5) 24deg, transparent 60deg, transparent 180deg, rgba(94,228,255,0.25) 210deg, transparent 250deg)",
                maskImage:
                  "radial-gradient(circle, transparent 64%, black 66%, black 70%, transparent 72%)",
                WebkitMaskImage:
                  "radial-gradient(circle, transparent 64%, black 66%, black 70%, transparent 72%)",
                animation: "ghdRingSpin 14s linear infinite",
              }}
            />
          </div>

          {selectedRepository && (
            <>
              <MemoryBackdrop />
              <RepositoryModal />
            </>
          )}

          <RepositoryOrbit
            radius={280}
            speed={0.0015}
            startAngle={-1.57}
          >
            <RepositoryNode repositoryKey="universeHub" />
          </RepositoryOrbit>

          <RepositoryOrbit
            radius={280}
            speed={0.0015}
            startAngle={3.14}
          >
            <RepositoryNode repositoryKey="clearCV" />
          </RepositoryOrbit>

          <RepositoryOrbit
            radius={280}
            speed={0.0015}
            startAngle={0}
          >
            <RepositoryNode repositoryKey="schedulePlanner" />
          </RepositoryOrbit>

          <RepositoryOrbit
            radius={280}
            speed={0.0015}
            startAngle={1.57}
          >
            <RepositoryNode repositoryKey="kukaRobot" />
          </RepositoryOrbit>
        </div>
      </div>
    </div>
  );
}
