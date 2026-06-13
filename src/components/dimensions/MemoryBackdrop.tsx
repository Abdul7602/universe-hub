"use client";

export default function MemoryBackdrop() {
  return (
    <>
      <style>
        {`
          @keyframes fadeBackdrop {
            from {
              opacity: 0;
            }

            to {
              opacity: 1;
            }
          }
        `}
      </style>

      <div
        style={{
          position: "fixed",
          inset: 0,

          background:
            "rgba(0,0,0,0.55)",

          backdropFilter:
            "blur(8px)",

          animation:
            "fadeBackdrop 0.3s ease-out",

          zIndex: 99998,
        }}
      />
    </>
  );
}