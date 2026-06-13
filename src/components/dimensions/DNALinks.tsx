"use client";

export default function DNALinks() {
  return (
    <>
      {/* Top -> Left */}

      <div
        style={{
          position: "absolute",
          left: "340px",
          top: "160px",
          width: "180px",
          height: "2px",
          background:
            "linear-gradient(to right, transparent, #66e0ff, transparent)",
          transform: "rotate(35deg)",
          boxShadow:
            "0 0 12px #66e0ff",
        }}
      />

      {/* Top -> Right */}

      <div
        style={{
          position: "absolute",
          right: "340px",
          top: "160px",
          width: "180px",
          height: "2px",
          background:
            "linear-gradient(to right, transparent, #66e0ff, transparent)",
          transform: "rotate(-35deg)",
          boxShadow:
            "0 0 12px #66e0ff",
        }}
      />

      {/* Left -> Bottom */}

      <div
        style={{
          position: "absolute",
          left: "340px",
          top: "470px",
          width: "180px",
          height: "2px",
          background:
            "linear-gradient(to right, transparent, #66e0ff, transparent)",
          transform: "rotate(-35deg)",
          boxShadow:
            "0 0 12px #66e0ff",
        }}
      />

      {/* Right -> Bottom */}

      <div
        style={{
          position: "absolute",
          right: "340px",
          top: "470px",
          width: "180px",
          height: "2px",
          background:
            "linear-gradient(to right, transparent, #66e0ff, transparent)",
          transform: "rotate(35deg)",
          boxShadow:
            "0 0 12px #66e0ff",
        }}
      />
    </>
  );
}