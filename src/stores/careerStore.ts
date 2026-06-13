"use client";

import { create } from "zustand";

type CareerStore = {
  selectedYear: string | null;
  selectedTitle: string | null;
  selectedColor: string | null;

  setNode: (
    year: string,
    title: string,
    color: string
  ) => void;

  clearNode: () => void;
};

export const useCareerStore =
  create<CareerStore>((set) => ({
    selectedYear: null,
    selectedTitle: null,
    selectedColor: null,

    setNode: (
      year,
      title,
      color
    ) =>
      set({
        selectedYear: year,
        selectedTitle: title,
        selectedColor: color,
      }),

    clearNode: () =>
      set({
        selectedYear: null,
        selectedTitle: null,
        selectedColor: null,
      }),
  }));