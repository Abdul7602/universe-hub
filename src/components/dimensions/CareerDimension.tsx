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

export default function CareerDimension() {
  const setActiveDimension =
    useNavigationStore(
      (state) => state.setActiveDimension
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
          "radial-gradient(circle at center, #0f172a, #020617)",
        color: "white",
        zIndex: 99999,
        overflow: "auto",
      }}
    >
      <button
        onClick={() =>
          setActiveDimension(null)
        }
        style={{
          position: "fixed",
          top: "24px",
          left: "24px",
          padding: "12px 18px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          zIndex: 100000,
        }}
      >
        Return To Universe
      </button>

      <div
        style={{
          maxWidth: "1200px",
          margin: "120px auto",
          padding: "40px",
        }}
      >
        <h1
          style={{
            fontSize: "56px",
            textAlign: "center",
            marginBottom: "16px",
          }}
        >
          Career Dimension
        </h1>

        <p
          style={{
            opacity: 0.8,
            textAlign: "center",
            marginBottom: "64px",
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

          {/* TOP NODE */}

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

          {/* LEFT NODE */}

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

          {/* RIGHT NODE */}

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

          {/* BOTTOM NODE */}

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
      </div>
    </div>
  );
}