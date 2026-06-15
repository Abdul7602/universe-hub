"use client";

import { create } from "zustand";

type CareerStore = {
  selectedYear: string | null;
  selectedTitle: string | null;
  selectedColor: string | null;

  pulseTrigger: number;

  activeMemoryChain: string[];

  setNode: (
    year: string,
    title: string,
    color: string
  ) => void;

  clearNode: () => void;

  setMemoryChain: (
    years: string[]
  ) => void;
};

export const useCareerStore =
  create<CareerStore>((set) => ({
    selectedYear: null,
    selectedTitle: null,
    selectedColor: null,

    pulseTrigger: 0,

    activeMemoryChain: [],

    setMemoryChain: (
      years
    ) =>
      set({
        activeMemoryChain: years,
      }),

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

        activeMemoryChain: [],
      })),

    clearNode: () =>
      set({
        selectedYear: null,
        selectedTitle: null,
        selectedColor: null,

        activeMemoryChain: [],
      }),
  }));