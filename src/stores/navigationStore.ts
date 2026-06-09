import { create } from "zustand";

type NavigationStore = {
  selectedDestination: string | null;
  hoveredDestination: string | null;

  setSelectedDestination: (
    destination: string | null
  ) => void;

  setHoveredDestination: (
    destination: string | null
  ) => void;
};

export const useNavigationStore =
  create<NavigationStore>((set) => ({
    selectedDestination: null,
    hoveredDestination: null,

    setSelectedDestination: (
      destination
    ) =>
      set({
        selectedDestination: destination,
      }),

    setHoveredDestination: (
      destination
    ) =>
      set({
        hoveredDestination: destination,
      }),
  }));
