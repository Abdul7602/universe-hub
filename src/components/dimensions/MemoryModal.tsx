"use client";

import { useCareerStore } from "@/stores/careerStore";
import { careerData } from "@/data/careerData";

export default function MemoryModal() {
  const selectedYear =
    useCareerStore(
      (state) => state.selectedYear
    );

  const clearNode =
    useCareerStore(
      (state) => state.clearNode
    );

  if (!selectedYear) return null;

  const current =
    careerData[
      selectedYear as keyof typeof careerData
    ];

  const color =
    current.color || "#66e0ff";

  const chipStyle: React.CSSProperties = {
    padding: "6px 12px",
    border: `1px solid ${color}44`,
    borderRadius: "999px",
    background: `${color}12`,
    fontSize: "12px",
    color: "rgba(255,255,255,0.9)",
  };

  const sectionHeader: React.CSSProperties = {
    color,
    marginBottom: "12px",
    fontSize: "13px",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    opacity: 0.9,
  };

  return (
    <>
      <style>
        {`
          @keyframes openMemory {
            from {
              opacity: 0;
              transform:
                translate(-50%, -50%)
                scale(0.96);
            }

            to {
              opacity: 1;
              transform:
                translate(-50%, -50%)
                scale(1);
            }
          }

          @keyframes cxmBeam {
            0%, 100% { opacity: 0.7; }
            50% { opacity: 1; }
          }

          .cxm-close {
            transition: color 0.25s ease, text-shadow 0.25s ease;
          }

          .cxm-close:hover {
            color: #ffffff;
            text-shadow: 0 0 12px rgba(255,255,255,0.8);
          }

          .cxm-corner {
            position: absolute;
            width: 14px;
            height: 14px;
            border-style: solid;
            opacity: 0.9;
          }

          .cxm-corner.tl { top: -1px; left: -1px; border-width: 1px 0 0 1px; }
          .cxm-corner.tr { top: -1px; right: -1px; border-width: 1px 1px 0 0; }
          .cxm-corner.bl { bottom: -1px; left: -1px; border-width: 0 0 1px 1px; }
          .cxm-corner.br { bottom: -1px; right: -1px; border-width: 0 1px 1px 0; }

          @media (prefers-reduced-motion: reduce) {
            .cxm-panel { animation: none !important; }
          }
        `}
      </style>

      <div
        className="cxm-panel"
        style={{
          position: "fixed",
          left: "50%",
          top: "50%",
          transform:
            "translate(-50%, -50%)",
          width: "700px",
          maxWidth: "90vw",
          maxHeight: "80vh",
          overflowY: "auto",
          padding: "44px 40px 40px",
          borderRadius: "10px",
          background:
            "linear-gradient(170deg, rgba(6,14,26,0.96), rgba(3,8,16,0.97))",
          border: `1px solid ${color}66`,
          backdropFilter:
            "blur(20px)",
          boxShadow:
            `0 0 70px -12px ${color}55, 0 24px 60px -24px rgba(0,0,0,0.9)`,
          animation:
            "openMemory 0.35s cubic-bezier(0.2, 0.8, 0.3, 1)",
          zIndex: 100001,
          color: "white",
        }}
      >
        {/* Corner brackets */}
        <span className="cxm-corner tl" style={{ borderColor: color }} />
        <span className="cxm-corner tr" style={{ borderColor: color }} />
        <span className="cxm-corner bl" style={{ borderColor: color }} />
        <span className="cxm-corner br" style={{ borderColor: color }} />

        {/* Top edge beam */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "10%",
            right: "10%",
            height: "1px",
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            animation: "cxmBeam 4s ease-in-out infinite",
          }}
        />

        {/* Scanline texture — very faint */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            borderRadius: "10px",
            background:
              "repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 4px)",
          }}
        />

        <button
          className="cxm-close"
          onClick={clearNode}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            border: "none",
            background: "none",
            color: "rgba(255,255,255,0.6)",
            cursor: "pointer",
            fontSize: "24px",
          }}
        >
          ×
        </button>

        <p
          style={{
            fontSize: "11px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: `${color}bb`,
            marginBottom: "10px",
            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, monospace",
          }}
        >
          Memory Record
        </p>

        <h1
          style={{
            color,
            marginBottom: "8px",
            letterSpacing: "0.06em",
            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, monospace",
            textShadow: `0 0 18px ${color}55`,
          }}
        >
          {selectedYear}
        </h1>

        <h2
          style={{
            marginBottom: "24px",
            letterSpacing: "0.03em",
          }}
        >
          {current.title}
        </h2>

        <p
          style={{
            opacity: 0.85,
            lineHeight: 1.8,
            marginBottom: "32px",
          }}
        >
          {current.description}
        </p>

        {current.dependsOn?.length > 0 && (
          <>
            <h3 style={sectionHeader}>
              Dependency Chain
            </h3>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginBottom: "32px",
              }}
            >
              {current.dependsOn.map(
                (dependency) => (
                  <span
                    key={dependency}
                    style={chipStyle}
                  >
                    {dependency}
                  </span>
                )
              )}
            </div>
          </>
        )}

        {current.technologies && (
          <>
            <h3 style={sectionHeader}>
              Technologies
            </h3>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginBottom: "32px",
              }}
            >
              {current.technologies.map(
                (tech) => (
                  <span
                    key={tech}
                    style={chipStyle}
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </>
        )}

        {current.achievements && (
          <>
            <h3 style={sectionHeader}>
              Achievements
            </h3>

            <ul
              style={{
                paddingLeft: "20px",
                opacity: 0.9,
              }}
            >
              {current.achievements.map(
                (
                  achievement
                ) => (
                  <li
                    key={
                      achievement
                    }
                    style={{
                      marginBottom:
                        "10px",
                      lineHeight:
                        1.6,
                    }}
                  >
                    {achievement}
                  </li>
                )
              )}
            </ul>
          </>
        )}
      </div>
    </>
  );
}
