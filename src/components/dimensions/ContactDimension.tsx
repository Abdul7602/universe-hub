"use client";

import { useNavigationStore } from "@/stores/navigationStore";
import { contactData } from "@/data/contactData";

/** Slow-drifting dust motes — positions/timings fixed, transform-only. */
const MOTES = [
  { left: "16%", top: "72%", size: 3, duration: 26, delay: 0 },
  { left: "28%", top: "58%", size: 2, duration: 32, delay: -8 },
  { left: "41%", top: "80%", size: 2.5, duration: 24, delay: -15 },
  { left: "58%", top: "66%", size: 2, duration: 30, delay: -4 },
  { left: "71%", top: "78%", size: 3, duration: 28, delay: -19 },
  { left: "83%", top: "60%", size: 2, duration: 34, delay: -11 },
  { left: "10%", top: "44%", size: 2, duration: 36, delay: -22 },
  { left: "90%", top: "38%", size: 2.5, duration: 31, delay: -6 },
];

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
          "radial-gradient(ellipse at 50% 18%, #081226 0%, #040918 50%, #010206 100%)",
        color: "white",
        zIndex: 99999,
        overflowY: "auto",
      }}
    >
      <style>
        {`
          @keyframes cntMoonBreath {
            0%, 100% {
              box-shadow:
                0 0 60px -10px rgba(255, 208, 128, 0.35),
                0 0 120px -20px rgba(102, 224, 255, 0.25),
                inset -18px -14px 40px rgba(0, 0, 0, 0.45),
                inset 10px 8px 30px rgba(255, 236, 200, 0.18);
            }
            50% {
              box-shadow:
                0 0 80px -8px rgba(255, 208, 128, 0.45),
                0 0 150px -20px rgba(102, 224, 255, 0.32),
                inset -18px -14px 40px rgba(0, 0, 0, 0.45),
                inset 10px 8px 30px rgba(255, 236, 200, 0.22);
            }
          }

          @keyframes cntHalo {
            0%, 100% { opacity: 0.25; transform: translate(-50%, -50%) scale(1); }
            50% { opacity: 0.45; transform: translate(-50%, -50%) scale(1.05); }
          }

          @keyframes cntMote {
            0%, 100% { transform: translate(0px, 0px); opacity: 0.15; }
            25% { opacity: 0.5; }
            50% { transform: translate(14px, -26px); opacity: 0.3; }
            75% { opacity: 0.45; }
          }

          @keyframes cntTitleGlow {
            0%, 100% { text-shadow: 0 0 20px rgba(180, 225, 255, 0.3); }
            50% { text-shadow: 0 0 32px rgba(200, 235, 255, 0.45); }
          }

          .cnt-return {
            transition: box-shadow 0.3s ease, border-color 0.3s ease;
          }

          .cnt-return:hover {
            border-color: rgba(160, 215, 245, 0.7);
            box-shadow: 0 0 22px -6px rgba(160, 215, 245, 0.7);
          }

          .cnt-cta {
            transition: box-shadow 0.35s ease, transform 0.35s ease,
              border-color 0.35s ease, background 0.35s ease;
          }

          .cnt-cta:hover {
            transform: translateY(-2px);
          }

          .cnt-cta-primary:hover {
            box-shadow: 0 0 34px -6px #8adcff;
          }

          .cnt-cta-ghost:hover {
            border-color: rgba(190, 230, 255, 0.65) !important;
            background: rgba(140, 200, 240, 0.08) !important;
          }

          @media (prefers-reduced-motion: reduce) {
            .cnt-moon, .cnt-halo, .cnt-mote, .cnt-title {
              animation: none !important;
            }
          }
        `}
      </style>

      {/* Sparse, quiet stars — dimmer than the other dimensions */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: `
            radial-gradient(1.5px 1.5px at 13% 24%, rgba(200,225,255,0.4), transparent 100%),
            radial-gradient(1px 1px at 33% 12%, rgba(220,235,255,0.3), transparent 100%),
            radial-gradient(1px 1px at 55% 30%, rgba(255,235,200,0.3), transparent 100%),
            radial-gradient(1.5px 1.5px at 72% 16%, rgba(205,230,255,0.35), transparent 100%),
            radial-gradient(1px 1px at 88% 34%, rgba(220,235,255,0.3), transparent 100%),
            radial-gradient(1px 1px at 22% 52%, rgba(255,240,210,0.22), transparent 100%),
            radial-gradient(1.5px 1.5px at 68% 48%, rgba(200,225,255,0.25), transparent 100%),
            radial-gradient(1px 1px at 44% 64%, rgba(215,232,255,0.2), transparent 100%)
          `,
        }}
      />

      {/* Soft moonlight wash from above */}
      <div
        style={{
          position: "fixed",
          left: "20%",
          right: "20%",
          top: 0,
          height: "45vh",
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(170,210,245,0.09), transparent 70%)",
        }}
      />

      {/* Drifting dust motes */}
      {MOTES.map((mote, i) => (
        <div
          key={i}
          className="cnt-mote"
          style={{
            position: "fixed",
            left: mote.left,
            top: mote.top,
            width: `${mote.size}px`,
            height: `${mote.size}px`,
            borderRadius: "50%",
            background: "rgba(220,238,255,0.7)",
            boxShadow: "0 0 6px rgba(200,230,255,0.5)",
            pointerEvents: "none",
            animation: `cntMote ${mote.duration}s ease-in-out ${mote.delay}s infinite`,
          }}
        />
      ))}

      {/* Vignette */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at center, transparent 52%, rgba(1,2,6,0.8) 100%)",
        }}
      />

      <button
        className="cnt-return"
        onClick={() => resetUniverse()}
        style={{
          position: "fixed",
          top: "24px",
          left: "24px",
          padding: "12px 18px",
          border: "1px solid rgba(160,215,245,0.3)",
          borderRadius: "8px",
          cursor: "pointer",
          zIndex: 100000,
          background: "rgba(6,12,24,0.7)",
          color: "#d5ecfa",
          letterSpacing: "0.06em",
          backdropFilter: "blur(6px)",
        }}
      >
        Return To Universe
      </button>

      <div
        style={{
          maxWidth: "900px",
          margin: "110px auto",
          padding: "40px",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* Quiet moon */}
        <div
          style={{
            position: "relative",
            width: "180px",
            height: "180px",
            margin: "0 auto 48px",
          }}
        >
          {/* Halo ring */}
          <div
            className="cnt-halo"
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: "240px",
              height: "240px",
              borderRadius: "50%",
              border: "1px solid rgba(190,225,250,0.25)",
              animation: "cntHalo 12s ease-in-out infinite",
              pointerEvents: "none",
            }}
          />

          <div
            className="cnt-moon"
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background: `
                radial-gradient(circle at 26% 22%, rgba(255,246,225,0.95), #d8cba8 30%, #8f8468 62%, #4a4234 88%, #2e2820 100%)
              `,
              animation: "cntMoonBreath 10s ease-in-out infinite",
            }}
          >
            {/* Crater hints */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background: `
                  radial-gradient(12px 12px at 62% 38%, rgba(0,0,0,0.16), transparent 100%),
                  radial-gradient(8px 8px at 38% 60%, rgba(0,0,0,0.14), transparent 100%),
                  radial-gradient(15px 15px at 52% 72%, rgba(0,0,0,0.12), transparent 100%),
                  radial-gradient(6px 6px at 72% 58%, rgba(0,0,0,0.14), transparent 100%),
                  radial-gradient(9px 9px at 30% 34%, rgba(0,0,0,0.1), transparent 100%)
                `,
              }}
            />
          </div>
        </div>

        <h1
          className="cnt-title"
          style={{
            fontSize: "48px",
            marginBottom: "10px",
            letterSpacing: "0.16em",
            fontWeight: 500,
            animation: "cntTitleGlow 9s ease-in-out infinite",
          }}
        >
          Beacon Station
        </h1>

        <p
          style={{
            opacity: 0.5,
            marginBottom: "56px",
            letterSpacing: "0.34em",
            textTransform: "uppercase",
            fontSize: "12px",
            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, monospace",
            color: "#a9cfe8",
          }}
        >
          Deep Space Communication Hub
        </p>

        <h2
          style={{
            letterSpacing: "0.04em",
            marginBottom: "6px",
          }}
        >
          {contactData.name}
        </h2>

        <p
          style={{
            opacity: 0.65,
            marginBottom: "36px",
            color: "#c8dff0",
          }}
        >
          {contactData.title}
        </p>

        <p
          style={{
            maxWidth: "640px",
            margin: "0 auto 48px",
            lineHeight: 1.9,
            opacity: 0.8,
            padding: "22px 28px",
            borderRadius: "10px",
            border: "1px solid rgba(160,215,245,0.14)",
            background: "rgba(8,16,30,0.5)",
            backdropFilter: "blur(6px)",
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
            className="cnt-cta cnt-cta-primary"
            href={`mailto:${contactData.email}`}
            style={{
              padding: "12px 22px",
              background:
                "linear-gradient(160deg, #8adcff, #58b8e8)",
              color: "#04121e",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: 600,
              letterSpacing: "0.03em",
              boxShadow: "0 0 26px -8px #8adcff",
            }}
          >
            Email
          </a>

          <a
            className="cnt-cta cnt-cta-ghost"
            href={contactData.links.github}
            target="_blank"
            rel="noreferrer"
            style={{
              padding: "12px 22px",
              border:
                "1px solid rgba(190,230,255,0.25)",
              borderRadius: "8px",
              color: "#e2f1fb",
              textDecoration: "none",
              letterSpacing: "0.03em",
              background: "rgba(140,200,240,0.03)",
            }}
          >
            GitHub
          </a>

          <a
            className="cnt-cta cnt-cta-ghost"
            href={contactData.links.linkedin}
            target="_blank"
            rel="noreferrer"
            style={{
              padding: "12px 22px",
              border:
                "1px solid rgba(190,230,255,0.25)",
              borderRadius: "8px",
              color: "#e2f1fb",
              textDecoration: "none",
              letterSpacing: "0.03em",
              background: "rgba(140,200,240,0.03)",
            }}
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
