"use client";

export default function DNAOrbit() {
  return (
    <>
      <style>
        {`
          @keyframes rotateOrbit {
            from {
              transform:
                translate(-50%, -50%)
                rotate(0deg);
            }
            to {
              transform:
                translate(-50%, -50%)
                rotate(360deg);
            }
          }

          @keyframes rotateOrbitReverse {
            from {
              transform:
                translate(-50%, -50%)
                rotate(360deg);
            }
            to {
              transform:
                translate(-50%, -50%)
                rotate(0deg);
            }
          }
        `}
      </style>

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: "420px",
          height: "420px",
          border:
            "1px solid rgba(102,224,255,0.15)",
          borderRadius: "50%",
          animation:
            "rotateOrbit 18s linear infinite",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: "560px",
          height: "560px",
          border:
            "1px solid rgba(102,224,255,0.08)",
          borderRadius: "50%",
          animation:
            "rotateOrbitReverse 30s linear infinite",
        }}
      />
    </>
  );
}