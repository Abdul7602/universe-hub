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
        padding: "24px",
        background: "rgba(0,0,0,0.8)",
        border:
          "1px solid rgba(255,255,255,0.2)",
        borderRadius: "16px",
        color: "white",
        backdropFilter: "blur(10px)",
        zIndex: 9999,
      }}
    >
      <h2
        style={{
          marginBottom: "12px",
        }}
      >
        {current.title}
      </h2>

      <p>{current.description}</p>

      <a
        href={actionLink}
        target="_blank"
        rel="noreferrer"
        style={{
          display: "inline-block",
          marginTop: "16px",
          padding: "10px 16px",
          background: "#ffffff",
          color: "#000000",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: 600,
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
              <h3>Skills</h3>

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
                        "1px solid rgba(255,255,255,0.2)",
                      borderRadius: "999px",
                      fontSize: "12px",
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
                padding: "10px 16px",
                background: "#66e0ff",
                color: "#000",
                border: "none",
                borderRadius: "8px",
                fontWeight: 600,
                cursor: "pointer",
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