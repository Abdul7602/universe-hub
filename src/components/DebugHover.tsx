"use client";

import { useNavigationStore } from "@/stores/navigationStore";

export default function DebugHover() {
  const hoveredDestination =
    useNavigationStore(
      (state) => state.hoveredDestination
    );

  const selectedDestination =
    useNavigationStore(
      (state) => state.selectedDestination
    );

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        left: "20px",
        color: "white",
        fontFamily: "monospace",
        zIndex: 9999,
      }}
    >
      <div>
        Hovered: {hoveredDestination ?? "none"}
      </div>

      <div>
        Selected: {selectedDestination ?? "none"}
      </div>
    </div>
  );
}
