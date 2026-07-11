"use client";

import { careerResume } from "@/data/careerResume";

const sectionHeader: React.CSSProperties = {
  marginBottom: "12px",
  fontSize: "12px",
  letterSpacing: "0.25em",
  textTransform: "uppercase",
  color: "#9ad4ee",
  opacity: 0.8,
  fontFamily:
    "ui-monospace, SFMono-Regular, Menlo, monospace",
};

export default function ResumePanel() {
  return (
    <>
      <style>
        {`
          .cxr-panel {
            transition:
              transform .35s ease,
              box-shadow .35s ease,
              border-color .35s ease;
          }

          .cxr-panel:hover {
            transform: translateY(-2px);
            border-color: rgba(102,224,255,.18);
            box-shadow:
              inset 0 0 60px rgba(102,224,255,.07),
              0 0 90px rgba(102,224,255,.12);
          }

          .cxr-button {
            transition:
              transform .25s ease,
              background .25s ease,
              border-color .25s ease,
              box-shadow .25s ease;
          }

          .cxr-button:hover {
            transform: translateY(-2px);
            background: rgba(102,224,255,.18);
            border-color: rgba(102,224,255,.55);
            box-shadow: 0 0 26px rgba(102,224,255,.22);
          }
        `}
      </style>

      <div
        className="cxr-panel"
        style={{
          position: "relative",

          marginTop: "36px",

          maxWidth: "560px",

          marginLeft: "auto",
          marginRight: "auto",

          padding: "38px",

          borderRadius: "18px",

          overflow: "hidden",

          background:
            "linear-gradient(180deg, rgba(18,35,58,.22), rgba(6,15,30,.10))",

          backdropFilter: "blur(16px)",

          border:
            "1px solid rgba(102,224,255,.08)",

          boxShadow:
            `
            inset 0 0 60px rgba(102,224,255,.05),
            0 0 70px rgba(102,224,255,.08)
            `,
        }}
      >
        {/* holographic scan texture */}

        <div
          style={{
            position: "absolute",
            inset: 0,

            pointerEvents: "none",

            background:
              "repeating-linear-gradient(180deg, rgba(102,224,255,.018) 0px, rgba(102,224,255,.018) 1px, transparent 2px, transparent 6px)",

            opacity: .45,
          }}
        />

        <p style={sectionHeader}>
          Personnel Record
        </p>

        <h2
          style={{
            marginBottom: "6px",

            letterSpacing: ".05em",

            textShadow:
              "0 0 10px rgba(102,224,255,.18)",
          }}
        >
          {careerResume.personal.name}
        </h2>

        <p
          style={{
            opacity: .72,

            marginBottom: "30px",

            color: "#bfe6f5",
          }}
        >
          {careerResume.personal.title}
        </p>

        <h3 style={sectionHeader}>
          Education
        </h3>

        {careerResume.education.map((item) => (
          <div
            key={item.institution}
            style={{
              marginBottom: "18px",

              paddingLeft: "16px",

              borderLeft:
                "2px solid rgba(102,224,255,.18)",
            }}
          >
            <strong>
              {item.degree}
            </strong>

            <div
              style={{
                opacity: .85,
              }}
            >
              {item.institution}
            </div>

            <small
              style={{
                opacity: .55,
              }}
            >
              {item.period}
            </small>
          </div>
        ))}

        <h3
          style={{
            ...sectionHeader,

            marginTop: "28px",
          }}
        >
          Experience
        </h3>

        {careerResume.experience.map((item) => (
          <div
            key={item.company}
            style={{
              marginBottom: "22px",

              paddingLeft: "16px",

              borderLeft:
                "2px solid rgba(102,224,255,.18)",
            }}
          >
            <strong>
              {item.role}
            </strong>

            <div
              style={{
                opacity: .85,
              }}
            >
              {item.company}
            </div>

            <small
              style={{
                opacity: .55,
              }}
            >
              {item.period}
            </small>

            <p
              style={{
                marginTop: "8px",

                opacity: .78,

                lineHeight: 1.65,
              }}
            >
              {item.description}
            </p>
          </div>
        ))}

        <a
          className="cxr-button"
          href={careerResume.resumeUrl}
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-block",

            marginTop: "24px",

            padding: "11px 18px",

            borderRadius: "10px",

            textDecoration: "none",

            fontWeight: 600,

            background:
              "rgba(102,224,255,.12)",

            color: "#d6f6ff",

            border:
              "1px solid rgba(102,224,255,.35)",

            backdropFilter: "blur(8px)",
          }}
        >
          Download Resume
        </a>
      </div>
    </>
  );
}