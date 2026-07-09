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
            "1px dashed rgba(102,224,255,0.14)",
          borderRadius: "50%",
          animation:
            "rotateOrbit 70s linear infinite",
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
            "1px solid rgba(102,224,255,0.05)",
          borderRadius: "50%",
          boxShadow:
            "0 0 22px -8px rgba(102,224,255,0.25), inset 0 0 22px -8px rgba(102,224,255,0.2)",
          animation:
            "rotateOrbitReverse 110s linear infinite",
        }}
      />
    </>
  );
}