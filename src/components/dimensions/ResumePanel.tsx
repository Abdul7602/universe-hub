"use client";

import { careerResume } from "@/data/careerResume";

const sectionHeader: React.CSSProperties = {
  marginBottom: "12px",
  fontSize: "12px",
  letterSpacing: "0.25em",
  textTransform: "uppercase",
  color: "#9ad4ee",
  opacity: 0.85,
  fontFamily:
    "ui-monospace, SFMono-Regular, Menlo, monospace",
};

const cornerBase: React.CSSProperties = {
  position: "absolute",
  width: "12px",
  height: "12px",
  borderColor: "rgba(102,224,255,0.7)",
  borderStyle: "solid",
};

export default function ResumePanel() {
  return (
    <>
      <style>
        {`
          .cxr-cta {
            transition: box-shadow 0.3s ease, transform 0.3s ease;
          }

          .cxr-cta:hover {
            transform: translateY(-2px);
            box-shadow: 0 0 30px -6px #66e0ff;
          }
        `}
      </style>

      <div
        style={{
          position: "relative",
          marginTop: "32px",
          padding: "32px",
          border:
            "1px solid rgba(102,224,255,0.22)",
          borderRadius: "10px",
          background:
            "linear-gradient(170deg, rgba(6,14,28,0.8), rgba(3,8,18,0.85))",
          backdropFilter: "blur(8px)",
          boxShadow:
            "0 0 40px -14px rgba(102,224,255,0.35), 0 20px 50px -30px rgba(0,0,0,0.9)",
        }}
      >
        {/* Corner brackets */}
        <span style={{ ...cornerBase, top: -1, left: -1, borderWidth: "1px 0 0 1px" }} />
        <span style={{ ...cornerBase, top: -1, right: -1, borderWidth: "1px 1px 0 0" }} />
        <span style={{ ...cornerBase, bottom: -1, left: -1, borderWidth: "0 0 1px 1px" }} />
        <span style={{ ...cornerBase, bottom: -1, right: -1, borderWidth: "0 1px 1px 0" }} />

        {/* Top edge beam */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "10%",
            right: "10%",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(102,224,255,0.8), transparent)",
          }}
        />

        <p style={sectionHeader}>
          Personnel Record
        </p>

        <h2
          style={{
            marginBottom: "6px",
            letterSpacing: "0.04em",
            textShadow:
              "0 0 16px rgba(102,224,255,0.35)",
          }}
        >
          {careerResume.personal.name}
        </h2>

        <p
          style={{
            opacity: 0.7,
            marginBottom: "28px",
            color: "#bfe6f5",
          }}
        >
          {careerResume.personal.title}
        </p>

        <h3 style={sectionHeader}>
          Education
        </h3>

        {careerResume.education.map(
          (item) => (
            <div
              key={
                item.institution
              }
              style={{
                marginBottom: "16px",
                paddingLeft: "14px",
                borderLeft:
                  "2px solid rgba(102,224,255,0.35)",
              }}
            >
              <strong>
                {item.degree}
              </strong>

              <div style={{ opacity: 0.85 }}>
                {item.institution}
              </div>

              <small style={{ opacity: 0.55 }}>
                {item.period}
              </small>
            </div>
          )
        )}

        <h3
          style={{
            ...sectionHeader,
            marginTop: "26px",
          }}
        >
          Experience
        </h3>

        {careerResume.experience.map(
          (item) => (
            <div
              key={item.company}
              style={{
                marginBottom: "20px",
                paddingLeft: "14px",
                borderLeft:
                  "2px solid rgba(102,224,255,0.35)",
              }}
            >
              <strong>
                {item.role}
              </strong>

              <div style={{ opacity: 0.85 }}>
                {item.company}
              </div>

              <small style={{ opacity: 0.55 }}>
                {item.period}
              </small>

              <p
                style={{
                  marginTop: "8px",
                  opacity: 0.8,
                  lineHeight: 1.6,
                }}
              >
                {item.description}
              </p>
            </div>
          )
        )}

        <a
          className="cxr-cta"
          href={
            careerResume.resumeUrl
          }
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-block",
            marginTop: "24px",
            padding: "10px 16px",
            background:
              "#66e0ff",
            color: "#000",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: 600,
            boxShadow:
              "0 0 24px -8px #66e0ff",
          }}
        >
          Download Resume
        </a>
      </div>
    </>
  );
}
