"use client";

import { useNavigationStore } from "@/stores/navigationStore";
import { useCareerStore } from "@/stores/careerStore";

import ExperienceNode from "./ExperienceNode";
import CareerDNAModel from "./CareerDNAModel";
import CareerOrbit from "./CareerOrbit";
import DNAOrbit from "./DNAOrbit";
import DNALinks from "./DNALinks";
import DNAEnergy from "./DNAEnergy";
import MemoryBackdrop from "./MemoryBackdrop";
import MemoryModal from "./MemoryModal";
import MemoryPulse from "./MemoryPulse";
import DependencyGraph from "./DependencyGraph";
import ResumePanel from "./ResumePanel";

export default function CareerDimension() {
  const resetUniverse =
    useNavigationStore(
      (state) => state.resetUniverse
    );

  const selectedYear =
    useCareerStore(
      (state) => state.selectedYear
    );

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background:
          "radial-gradient(ellipse at 50% 28%, #0a1430 0%, #050a1e 48%, #010209 100%)",
        color: "white",
        zIndex: 99999,
        overflow: "auto",
      }}
    >
      <style>
        {`
          @keyframes cxdDrift {
            0%, 100% { transform: translate(-6%, -3%); opacity: 0.5; }
            50% { transform: translate(5%, 4%); opacity: 0.8; }
          }

          @keyframes cxdTitleGlow {
            0%, 100% { text-shadow: 0 0 22px rgba(102, 224, 255, 0.35); }
            50% { text-shadow: 0 0 36px rgba(102, 224, 255, 0.55); }
          }

          .cxd-return {
            transition: box-shadow 0.3s ease, border-color 0.3s ease;
          }

          .cxd-return:hover {
            border-color: rgba(102, 224, 255, 0.8);
            box-shadow: 0 0 22px -6px rgba(102, 224, 255, 0.8);
          }

          @media (prefers-reduced-motion: reduce) {
            .cxd-drift,
            .cxd-title {
              animation: none !important;
            }
          }
        `}
      </style>

      {/* Static star speckle */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: `
            radial-gradient(1.5px 1.5px at 9% 18%, rgba(190,235,255,0.5), transparent 100%),
            radial-gradient(1px 1px at 27% 74%, rgba(200,240,255,0.4), transparent 100%),
            radial-gradient(1.5px 1.5px at 46% 11%, rgba(170,225,255,0.45), transparent 100%),
            radial-gradient(1px 1px at 61% 88%, rgba(210,245,255,0.35), transparent 100%),
            radial-gradient(2px 2px at 74% 27%, rgba(185,235,255,0.5), transparent 100%),
            radial-gradient(1px 1px at 91% 56%, rgba(175,230,255,0.4), transparent 100%),
            radial-gradient(1px 1px at 17% 92%, rgba(195,240,255,0.35), transparent 100%),
            radial-gradient(1.5px 1.5px at 38% 48%, rgba(165,225,255,0.3), transparent 100%),
            radial-gradient(1px 1px at 67% 6%, rgba(205,245,255,0.4), transparent 100%),
            radial-gradient(1px 1px at 4% 44%, rgba(185,235,255,0.35), transparent 100%),
            radial-gradient(1.5px 1.5px at 96% 82%, rgba(195,240,255,0.4), transparent 100%),
            radial-gradient(1px 1px at 54% 63%, rgba(175,230,255,0.3), transparent 100%)
          `,
        }}
      />

      {/* Faint neural lattice grid */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: `
            linear-gradient(rgba(102,224,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(102,224,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.9), transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.9), transparent 78%)",
        }}
      />

      {/* Drifting indigo-cyan knowledge glow */}
      <div
        className="cxd-drift"
        style={{
          position: "fixed",
          left: "18%",
          top: "12%",
          width: "60vw",
          height: "60vh",
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at center, rgba(70,120,230,0.1), rgba(80,200,240,0.05) 55%, transparent 75%)",
          filter: "blur(10px)",
          animation: "cxdDrift 30s ease-in-out infinite",
        }}
      />

      {/* Vignette */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(1,2,9,0.75) 100%)",
        }}
      />

      <button
        className="cxd-return"
        onClick={() => resetUniverse()}
        style={{
          position: "fixed",
          top: "24px",
          left: "24px",
          padding: "12px 18px",
          border: "1px solid rgba(102,224,255,0.35)",
          borderRadius: "8px",
          cursor: "pointer",
          zIndex: 100000,
          background: "rgba(5,12,26,0.7)",
          color: "#c8f0ff",
          letterSpacing: "0.06em",
          backdropFilter: "blur(6px)",
        }}
      >
        Return To Universe
      </button>

      <div
        style={{
          maxWidth: "1200px",
          margin: "120px auto",
          padding: "40px",
          position: "relative",
        }}
      >
        <h1
          className="cxd-title"
          style={{
            fontSize: "52px",
            textAlign: "center",
            marginBottom: "10px",
            letterSpacing: "0.14em",
            fontWeight: 600,
            animation: "cxdTitleGlow 8s ease-in-out infinite",
          }}
        >
          Career Dimension
        </h1>

        <p
          style={{
            opacity: 0.55,
            textAlign: "center",
            marginBottom: "64px",
            letterSpacing: "0.34em",
            textTransform: "uppercase",
            fontSize: "12px",
            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, monospace",
            color: "#9ad4ee",
          }}
        >
          Professional Journey Timeline
        </p>

        <div
          style={{
            position: "relative",
            height: "700px",
            marginTop: "40px",
          }}
        >
          <CareerDNAModel />

          <MemoryPulse />

          <DependencyGraph />

          <DNAOrbit />

          <DNALinks />

          <DNAEnergy />

          {selectedYear && (
            <>
              <MemoryBackdrop />
              <MemoryModal />
            </>
          )}

          <CareerOrbit
            radius={280}
            speed={0.002}
            startAngle={-1.57}
          >
            <ExperienceNode
              year="2025"
              title="Universe Hub Development"
            />
          </CareerOrbit>

          <CareerOrbit
            radius={280}
            speed={0.002}
            startAngle={3.14}
          >
            <ExperienceNode
              year="2024"
              title="Full Stack Projects & Portfolio Work"
            />
          </CareerOrbit>

          <CareerOrbit
            radius={280}
            speed={0.002}
            startAngle={0}
          >
            <ExperienceNode
              year="2023"
              title="Learning and Career Growth"
            />
          </CareerOrbit>

          <CareerOrbit
            radius={280}
            speed={0.002}
            startAngle={1.57}
          >
            <ExperienceNode
              year="2022"
              title="Beginning The Journey"
            />
          </CareerOrbit>
        </div>

        <ResumePanel />
      </div>
    </div>
  );
}
