"use client";

export default function DNALinks() {
  return (
    <>
      {/* TOP */}

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "130px",
          width: "2px",
          height: "120px",
          background:
            "linear-gradient(#66e0ff, transparent)",
          transform:
            "translateX(-50%)",
          boxShadow:
            "0 0 20px #66e0ff",
        }}
      />

      {/* LEFT */}

      <div
        style={{
          position: "absolute",
          left: "350px",
          top: "350px",
          width: "220px",
          height: "2px",
          background:
            "linear-gradient(to right, #66e0ff, transparent)",
          boxShadow:
            "0 0 20px #66e0ff",
        }}
      />

      {/* RIGHT */}

      <div
        style={{
          position: "absolute",
          right: "350px",
          top: "350px",
          width: "220px",
          height: "2px",
          background:
            "linear-gradient(to left, #66e0ff, transparent)",
          boxShadow:
            "0 0 20px #66e0ff",
        }}
      />

      {/* BOTTOM */}

      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: "130px",
          width: "2px",
          height: "120px",
          background:
            "linear-gradient(transparent, #66e0ff)",
          transform:
            "translateX(-50%)",
          boxShadow:
            "0 0 20px #66e0ff",
        }}
      />
    </>
  );
}