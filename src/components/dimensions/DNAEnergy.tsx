"use client";

export default function DNAEnergy() {
  return (
    <>
      <style>
        {`
          @keyframes energyPulse {
            0% {
              opacity: 0;
              transform: translateX(-50px);
            }

            50% {
              opacity: 1;
            }

            100% {
              opacity: 0;
              transform: translateX(50px);
            }
          }
        `}
      </style>

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "200px",
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          background: "#66e0ff",
          boxShadow:
            "0 0 20px #66e0ff",
          animation:
            "energyPulse 2s linear infinite",
        }}
      />
    </>
  );
}