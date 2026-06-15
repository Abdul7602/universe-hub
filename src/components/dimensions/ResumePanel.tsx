"use client";

import { careerResume } from "@/data/careerResume";

export default function ResumePanel() {
  return (
    <div
      style={{
        marginTop: "32px",
        padding: "24px",
        border:
          "1px solid rgba(102,224,255,0.2)",
        borderRadius: "20px",
        background:
          "rgba(255,255,255,0.03)",
      }}
    >
      <h2
        style={{
          marginBottom: "8px",
        }}
      >
        {careerResume.personal.name}
      </h2>

      <p
        style={{
          opacity: 0.8,
          marginBottom: "24px",
        }}
      >
        {careerResume.personal.title}
      </p>

      <h3
        style={{
          marginBottom: "12px",
        }}
      >
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
            }}
          >
            <strong>
              {item.degree}
            </strong>

            <div>
              {item.institution}
            </div>

            <small>
              {item.period}
            </small>
          </div>
        )
      )}

      <h3
        style={{
          marginTop: "24px",
          marginBottom: "12px",
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
            }}
          >
            <strong>
              {item.role}
            </strong>

            <div>
              {item.company}
            </div>

            <small>
              {item.period}
            </small>

            <p
              style={{
                marginTop: "8px",
                opacity: 0.85,
              }}
            >
              {item.description}
            </p>
          </div>
        )
      )}

      <a
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
        }}
      >
        Download Resume
      </a>
    </div>
  );
}