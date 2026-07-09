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
        zIndex: 9999,
        fontFamily:
          "ui-monospace, SFMono-Regular, Menlo, monospace",
        fontSize: "10px",
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: "rgba(154, 223, 238, 0.55)",
        lineHeight: 1.9,
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      <div>
        Signal ▸ {hoveredDestination ?? "—"}
      </div>

      <div>
        Lock&nbsp;&nbsp; ▸ {selectedDestination ?? "—"}
      </div>
    </div>
  );
}
