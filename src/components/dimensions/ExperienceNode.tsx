"use client";

import { useCareerStore } from "@/stores/careerStore";

type ExperienceNodeProps = {
  year: string;
  title: string;
};

export default function ExperienceNode({
  year,
  title,
}: ExperienceNodeProps) {
  const setNode =
    useCareerStore(
      (state) => state.setNode
    );

  return (
    <div
      onClick={() =>
        setNode(year, title)
      }
      style={{
        padding: "16px",
        marginBottom: "24px",
        border:
          "1px solid rgba(102,224,255,0.3)",
        borderRadius: "12px",
        background:
          "rgba(255,255,255,0.03)",
        boxShadow:
          "0 0 20px rgba(102,224,255,0.1)",
        cursor: "pointer",
      }}
    >
      <h3>{year}</h3>

      <p>{title}</p>
    </div>
  );
}