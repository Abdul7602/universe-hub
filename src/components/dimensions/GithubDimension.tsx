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
          "radial-gradient(circle at center, #020617, #000)",
        color: "white",
        zIndex: 99999,
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => resetUniverse()}
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
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1
          style={{
            fontSize: "56px",
            marginBottom: "12px",
          }}
        >
          GitHub Galaxy
        </h1>

        <p
          style={{
            opacity: 0.8,
            marginBottom: "40px",
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
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: "140px",
              height: "140px",
              borderRadius: "50%",
              transform:
                "translate(-50%, -50%)",
              background:
                "radial-gradient(circle, #66e0ff, #0ea5e9)",
              boxShadow:
                "0 0 60px rgba(102,224,255,0.5)",
            }}
          />

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