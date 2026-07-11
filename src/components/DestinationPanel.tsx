"use client";

import { useNavigationStore } from "@/stores/navigationStore";
import { destinationContent } from "@/data/destinationContent";
import { links } from "@/data/links";
import { skills } from "@/data/skills/skills";

export default function DestinationPanel() {
  const selectedDestination = useNavigationStore(
    (state) => state.selectedDestination
  );

  const setActiveDimension =
    useNavigationStore(
      (state) =>
        state.setActiveDimension
    );

  if (!selectedDestination) return null;

  const current =
    destinationContent[
      selectedDestination as keyof typeof destinationContent
    ];

  let actionLink = "";
  let actionText = "";

  switch (selectedDestination) {
    case "github":
      actionLink = links.github;
      actionText = "Open GitHub";
      break;

    case "projects":
      actionLink = links.portfolio;
      actionText = "Open Portfolio";
      break;

    case "career":
      actionLink = links.linkedin;
      actionText = "Open LinkedIn";
      break;

    case "contact":
      actionLink = links.email;
      actionText = "Send Email";
      break;
  }

  return (
    <>
      <style>
        {`
          @keyframes dpEnter {
            from {
              opacity: 0;
              transform: translateY(-50%) translateX(14px);
            }
            to {
              opacity: 1;
              transform: translateY(-50%) translateX(0);
            }
          }

          .dp-panel {
            animation: dpEnter 0.32s cubic-bezier(0.2, 0.8, 0.3, 1);
          }

          .dp-cta {
            transition: box-shadow 0.25s ease, transform 0.25s ease,
              border-color 0.25s ease, background 0.25s ease;
          }

          .dp-cta:hover {
            transform: translateY(-2px);
            border-color: rgba(94, 228, 255, 0.7);
            background: rgba(94, 228, 255, 0.14);
            box-shadow: 0 0 22px -8px rgba(94, 228, 255, 0.8);
          }

          .dp-enter {
            transition: box-shadow 0.25s ease, transform 0.25s ease;
          }

          .dp-enter:hover {
            transform: translateY(-2px);
            box-shadow: 0 0 34px -6px #66e0ff;
          }

          .dp-corner {
            position: absolute;
            width: 12px;
            height: 12px;
            border-color: rgba(94, 228, 255, 0.7);
            border-style: solid;
          }

          .dp-corner.tl { top: 0; left: 0; border-width: 1px 0 0 1px; }
          .dp-corner.tr { top: 0; right: 0; border-width: 1px 1px 0 0; }
          .dp-corner.bl { bottom: 0; left: 0; border-width: 0 0 1px 1px; }
          .dp-corner.br { bottom: 0; right: 0; border-width: 0 1px 1px 0; }

          @media (prefers-reduced-motion: reduce) {
            .dp-panel { animation: none; }
          }
        `}
      </style>

      <div
        className="dp-panel"
        style={{
          position: "fixed",
          top: "50%",
          right: "40px",
          transform: "translateY(-50%)",
          width: "320px",
          maxHeight: "70vh",
          overflowY: "auto",
          padding: "28px 26px 26px",
          background:
            "linear-gradient(170deg, rgba(6,14,24,0.88), rgba(3,8,14,0.92))",
          border:
            "1px solid rgba(94,228,255,0.3)",
          borderRadius: "10px",
          color: "white",
          backdropFilter: "blur(12px)",
          boxShadow:
            "0 0 40px -14px rgba(94,228,255,0.35), 0 20px 50px -30px rgba(0,0,0,0.9)",
          zIndex: 9999,
        }}
      >
        {/* Corner brackets — same panel system as the modals */}
        <span className="dp-corner tl" />
        <span className="dp-corner tr" />
        <span className="dp-corner bl" />
        <span className="dp-corner br" />

        {/* Top edge beam */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "10%",
            right: "10%",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(94,228,255,0.8), transparent)",
          }}
        />

        <p
          style={{
            fontSize: "10px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(154,223,238,0.75)",
            marginBottom: "10px",
            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, monospace",
          }}
        >
          Destination Signal
        </p>

        <h2
          style={{
            marginBottom: "10px",
            fontSize: "22px",
            letterSpacing: "0.05em",
            textShadow:
              "0 0 14px rgba(94,228,255,0.3)",
          }}
        >
          {current.title}
        </h2>

        <p
          style={{
            opacity: 0.8,
            lineHeight: 1.65,
            fontSize: "14px",
          }}
        >
          {current.description}
        </p>

        <a
          className="dp-cta"
          href={actionLink}
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-block",
            marginTop: "18px",
            padding: "10px 16px",
            background: "rgba(94,228,255,0.08)",
            border: "1px solid rgba(94,228,255,0.4)",
            color: "#c8f4ff",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "14px",
            letterSpacing: "0.03em",
          }}
        >
          {actionText}
        </a>

        {(selectedDestination === "career" ||
          selectedDestination === "projects" ||
          selectedDestination === "github" ||
          selectedDestination === "contact") && (
          <>
            {selectedDestination === "career" && (
              <div style={{ marginTop: "22px" }}>
                <h3
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "#9adfee",
                    opacity: 0.85,
                    fontFamily:
                      "ui-monospace, SFMono-Regular, Menlo, monospace",
                  }}
                >
                  Skills
                </h3>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                    marginTop: "12px",
                  }}
                >
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        padding: "5px 10px",
                        border:
                          "1px solid rgba(94,228,255,0.3)",
                        background:
                          "rgba(94,228,255,0.06)",
                        borderRadius: "999px",
                        fontSize: "12px",
                        color: "rgba(255,255,255,0.88)",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div style={{ marginTop: "6px" }}>
              <button
                className="dp-enter"
                onClick={() =>
                  setActiveDimension(
                    selectedDestination
                  )
                }
                style={{
                  marginTop: "18px",
                  padding: "12px 18px",
                  width: "100%",
                  background:
                    "linear-gradient(160deg, #7de8ff, #4cc2ea)",
                  color: "#04121e",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: 600,
                  fontSize: "14px",
                  letterSpacing: "0.05em",
                  cursor: "pointer",
                  boxShadow:
                    "0 0 26px -8px #66e0ff",
                }}
              >
                Enter Dimension
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
