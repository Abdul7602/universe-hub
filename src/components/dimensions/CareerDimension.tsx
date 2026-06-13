"use client";

import { useNavigationStore } from "@/stores/navigationStore";
import ExperienceNode from "./ExperienceNode";
import CareerDNA from "./CareerDNA";
import DNAOrbit from "./DNAOrbit";
import DNALinks from "./DNALinks";
import DNAEnergy from "./DNAEnergy";
import NodePanel from "./NodePanel";
import { useCareerStore } from "@/stores/careerStore";

export default function CareerDimension() {
  const setActiveDimension =
    useNavigationStore(
      (state) => state.setActiveDimension
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

        <CareerDNA />

        <div
          style={{
            position: "relative",
            height: "700px",
            marginTop: "40px",
          }}
        >
	  <DNAOrbit />
	  <DNALinks />
	  <DNAEnergy />

	  <NodePanel />
          {/* TOP NODE */}

          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "0",
              transform:
                "translateX(-50%)",
              width: "280px",
            }}
          >
            <ExperienceNode
              year="2025"
              title="Universe Hub Development"
            />
          </div>

          {/* LEFT NODE */}

          <div
            style={{
              position: "absolute",
              left: "120px",
              top: "250px",
              width: "280px",
            }}
          >
            <ExperienceNode
              year="2024"
              title="Full Stack Projects & Portfolio Work"
            />
          </div>

          {/* RIGHT NODE */}

          <div
            style={{
              position: "absolute",
              right: "120px",
              top: "250px",
              width: "280px",
            }}
          >
            <ExperienceNode
              year="2023"
              title="Learning and Career Growth"
            />
          </div>

          {/* BOTTOM NODE */}

          <div
            style={{
              position: "absolute",
              left: "50%",
              bottom: "0",
              transform:
                "translateX(-50%)",
              width: "280px",
            }}
          >
            <ExperienceNode
              year="2022"
              title="Beginning The Journey"
            />
          </div>
        </div>
      </div>
    </div>
  );
}