export const careerData = {
  "2025": {
    title: "Universe Hub Development",

    color: "#66e0ff",

    dependsOn: [
      "2024",
      "2023",
      "2022",
    ],

    description:
      "Building an interactive 3D portfolio universe inside an artificial brain (mind) using React Three Fiber and Next.js.",

    technologies: [
      "Next.js",
      "TypeScript",
      "React Three Fiber",
      "Zustand",
    ],

    achievements: [
      "Created dimensional navigation",
      "Built DNA Career Dimension",
      "Implemented node system",
    ],
  },

  "2024": {
    title:
      "Full Stack Projects & Portfolio Work",

    color: "#a855f7",

    dependsOn: [
      "2023",
      "2022",
    ],

    description:
      "Developed personal projects and expanded frontend/backend skills.",

    technologies: [
      "React",
      "Node.js",
      "MongoDB",
      "TypeScript",
    ],

    achievements: [
      "Built portfolio projects",
      "Improved full stack skills",
    ],
  },

  "2023": {
    title:
      "Learning and Career Growth",

    color: "#22c55e",

    dependsOn: [
      "2022",
    ],

    description:
      "Focused on software engineering fundamentals and project building.",

    technologies: [
      "JavaScript",
      "HTML",
      "CSS",
      "Git",
    ],

    achievements: [
      "Learned modern web development",
      "Started building projects",
    ],
  },

  "2022": {
    title:
      "Beginning The Journey",

    color: "#f59e0b",

    dependsOn: [],

    description:
      "Started exploring programming and technology.",

    technologies: [
      "Programming Basics",
    ],

    achievements: [
      "Discovered software development",
    ],
  },
} as const;