"use client";

import { useCareerStore } from "@/stores/careerStore";

export default function NodePanel() {
  const selectedYear =
    useCareerStore(
      (state) => state.selectedYear
    );

  const selectedTitle =
    useCareerStore(
      (state) => state.selectedTitle
    );

  const clearNode =
    useCareerStore(
      (state) => state.clearNode
    );

  if (
    !selectedYear ||
    !selectedTitle
  )
    return null;

  return (
    <div
      style={{
        position: "fixed",
        right: "40px",
        top: "50%",
        transform: "translateY(-50%)",
        width: "320px",
        padding: "24px",
        borderRadius: "16px",
        background:
          "rgba(10,15,30,0.9)",
        border:
          "1px solid rgba(102,224,255,0.3)",
        backdropFilter: "blur(12px)",
        color: "white",
        zIndex: 100000,
      }}
    >
      <button
        onClick={clearNode}
        style={{
          float: "right",
          background: "none",
          border: "none",
          color: "#66e0ff",
          cursor: "pointer",
          fontSize: "18px",
        }}
      >
        ✕
      </button>

      <h2>{selectedYear}</h2>

      <h3>{selectedTitle}</h3>

      <p
        style={{
          opacity: 0.8,
          marginTop: "16px",
        }}
      >
        Career details will appear here.
      </p>
    </div>
  );
}