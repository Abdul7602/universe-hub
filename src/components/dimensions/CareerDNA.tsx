"use client";

export default function CareerDNA() {
  return (
    <>
      <style>
        {`
          @keyframes floatDNA {
            0% {
              transform:
                translateY(0px)
                rotate(0deg);
            }

            50% {
              transform:
                translateY(-12px)
                rotate(180deg);
            }

            100% {
              transform:
                translateY(0px)
                rotate(360deg);
            }
          }

          @keyframes pulseCore {
            0% {
              box-shadow:
                0 0 30px rgba(102,224,255,0.3);
            }

            50% {
              box-shadow:
                0 0 80px rgba(102,224,255,0.8);
            }

            100% {
              box-shadow:
                0 0 30px rgba(102,224,255,0.3);
            }
          }
        `}
      </style>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "64px",
        }}
      >
        <div
          style={{
            width: "260px",
            height: "260px",
            border:
              "2px solid rgba(102,224,255,0.4)",

            borderRadius: "50%",

            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            background:
              "radial-gradient(circle, rgba(102,224,255,0.08), transparent)",

            animation:
              "pulseCore 3s infinite",
          }}
        >
          <div
            style={{
              fontSize: "120px",

              animation:
                "floatDNA 8s linear infinite",

              filter:
                "drop-shadow(0 0 20px #66e0ff)",
            }}
          >
            🧬
          </div>
        </div>
      </div>
    </>
  );
}