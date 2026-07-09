"use client";

import { useNavigationStore } from "@/stores/navigationStore";

export default function ReturnHomeButton() {
  const setSelectedDestination =
    useNavigationStore(
      (state) => state.setSelectedDestination
    );

  const setCameraTarget =
    useNavigationStore(
      (state) => state.setCameraTarget
    );

  return (
    <>
      <style>
        {`
          .uh-return {
            transition: box-shadow 0.3s ease, border-color 0.3s ease;
          }

          .uh-return:hover {
            border-color: rgba(94, 228, 255, 0.8);
            box-shadow: 0 0 22px -6px rgba(94, 228, 255, 0.8);
          }
        `}
      </style>

      <button
        className="uh-return"
        onClick={() => {
          setSelectedDestination(null);
          setCameraTarget([0, 0, 0]);
        }}
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 9999,
          padding: "10px 16px",
          borderRadius: "8px",
          border: "1px solid rgba(94,228,255,0.35)",
          cursor: "pointer",
          background: "rgba(4,12,22,0.7)",
          color: "#c8f4ff",
          letterSpacing: "0.06em",
          backdropFilter: "blur(6px)",
        }}
      >
        Return Home
      </button>
    </>
  );
}
