"use client";

import { create } from "zustand";

type ProjectStore = {
  selectedProject: string | null;

  setProject: (
    project: string
  ) => void;

  clearProject: () => void;
};

export const useProjectStore =
  create<ProjectStore>((set) => ({
    selectedProject: null,

    setProject: (
      project
    ) =>
      set({
        selectedProject:
          project,
      }),

    clearProject: () =>
      set({
        selectedProject:
          null,
      }),
  }));