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
    <button
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
        border: "none",
        cursor: "pointer",
      }}
    >
      Return Home
    </button>
  );
}
