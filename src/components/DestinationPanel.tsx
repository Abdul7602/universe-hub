"use client";

import { useNavigationStore } from "@/stores/navigationStore";

export default function DestinationPanel() {
  const selectedDestination =
    useNavigationStore(
      (state) => state.selectedDestination
    );

  if (!selectedDestination) return null;

  const content = {
    github: {
      title: "GitHub Station",
      description:
        "Explore repositories, codebases, and open-source work.",
    },

    projects: {
      title: "Projects Planet",
      description:
        "Browse featured projects, demos, and case studies.",
    },

    career: {
      title: "Career Galaxy",
      description:
        "View experience, skills, certifications, and resume.",
    },

    contact: {
      title: "Contact Moon",
      description:
        "Get in touch through email, social platforms, and future contact portals.",
    },
  };

  const current =
    content[
      selectedDestination as keyof typeof content
    ];

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        right: "40px",
        transform: "translateY(-50%)",
        width: "320px",
        padding: "24px",
        background: "rgba(0,0,0,0.8)",
        border:
          "1px solid rgba(255,255,255,0.2)",
        borderRadius: "16px",
        color: "white",
        backdropFilter: "blur(10px)",
        zIndex: 9999,
      }}
    >
      <h2>{current.title}</h2>

      <p>{current.description}</p>
    </div>
  );
}
