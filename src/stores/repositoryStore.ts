"use client";

import { create } from "zustand";

type RepositoryStore = {
  selectedRepository: string | null;

  setRepository: (
    repository: string
  ) => void;

  clearRepository: () => void;
};

export const useRepositoryStore =
  create<RepositoryStore>((set) => ({
    selectedRepository: null,

    setRepository: (
      repository
    ) =>
      set({
        selectedRepository:
          repository,
      }),

    clearRepository: () =>
      set({
        selectedRepository:
          null,
      }),
  }));