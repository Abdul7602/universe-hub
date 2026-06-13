"use client";

import { create } from "zustand";

type CareerStore = {
  selectedYear: string | null;
  selectedTitle: string | null;

  setNode: (
    year: string,
    title: string
  ) => void;

  clearNode: () => void;
};

export const useCareerStore =
  create<CareerStore>((set) => ({
    selectedYear: null,
    selectedTitle: null,

    setNode: (
      year,
      title
    ) =>
      set({
        selectedYear: year,
        selectedTitle: title,
      }),

    clearNode: () =>
      set({
        selectedYear: null,
        selectedTitle: null,
      }),
  }));