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
    <div
      style={{
        position: "fixed",
        top: "50%",
        right: "40px",
        transform: "translateY(-50%)",
        width: "320px",
        maxHeight: "70vh",
        overflowY: "auto",
        padding: "26px",
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
      <h2
        style={{
          marginBottom: "12px",
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
        href={actionLink}
        target="_blank"
        rel="noreferrer"
        style={{
          display: "inline-block",
          marginTop: "16px",
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
            <div style={{ marginTop: "24px" }}>
              <h3
                style={{
                  fontSize: "12px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#9adfee",
                  opacity: 0.85,
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
                      padding: "6px 10px",
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

          <div style={{ marginTop: "18px" }}>
            <button
              onClick={() =>
                setActiveDimension(
                  selectedDestination
                )
              }
              style={{
                marginTop: "18px",
                marginBottom: "24px",
                padding: "11px 18px",
                background:
                  "linear-gradient(160deg, #7de8ff, #4cc2ea)",
                color: "#04121e",
                border: "none",
                borderRadius: "8px",
                fontWeight: 600,
                letterSpacing: "0.04em",
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
  );
}