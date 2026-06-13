"use client";

import { create } from "zustand";

type CareerStore = {
  selectedYear: string | null;
  selectedTitle: string | null;
  selectedColor: string | null;

  pulseTrigger: number;

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

    pulseTrigger: 0,

    setNode: (
      year,
      title,
      color
    ) =>
      set((state) => ({
        selectedYear: year,
        selectedTitle: title,
        selectedColor: color,

        pulseTrigger:
          state.pulseTrigger + 1,
      })),

    clearNode: () =>
      set({
        selectedYear: null,
        selectedTitle: null,
        selectedColor: null,
      }),
  }));