"use client";

import { useNavigationStore } from "@/stores/navigationStore";
import { contactData } from "@/data/contactData";

export default function ContactDimension() {
  const resetUniverse =
    useNavigationStore(
      (state) => state.resetUniverse
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
        overflowY: "auto",
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
          maxWidth: "900px",
          margin: "120px auto",
          padding: "40px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "180px",
            height: "180px",
            margin: "0 auto 40px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, #66e0ff, #0ea5e9)",
            boxShadow:
              "0 0 80px rgba(102,224,255,0.5)",
          }}
        />

        <h1
          style={{
            fontSize: "56px",
            marginBottom: "12px",
          }}
        >
          Beacon Station
        </h1>

        <p
          style={{
            opacity: 0.8,
            marginBottom: "48px",
          }}
        >
          Deep Space Communication Hub
        </p>

        <h2>{contactData.name}</h2>

        <p
          style={{
            opacity: 0.8,
            marginBottom: "32px",
          }}
        >
          {contactData.title}
        </p>

        <p
          style={{
            maxWidth: "700px",
            margin: "0 auto 40px",
            lineHeight: 1.8,
          }}
        >
          {contactData.availability}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <a
            href={`mailto:${contactData.email}`}
            style={{
              padding: "12px 20px",
              background: "#66e0ff",
              color: "#000",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Email
          </a>

          <a
            href={contactData.links.github}
            target="_blank"
            rel="noreferrer"
            style={{
              padding: "12px 20px",
              border:
                "1px solid rgba(255,255,255,0.2)",
              borderRadius: "8px",
              color: "white",
              textDecoration: "none",
            }}
          >
            GitHub
          </a>

          <a
            href={contactData.links.linkedin}
            target="_blank"
            rel="noreferrer"
            style={{
              padding: "12px 20px",
              border:
                "1px solid rgba(255,255,255,0.2)",
              borderRadius: "8px",
              color: "white",
              textDecoration: "none",
            }}
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}