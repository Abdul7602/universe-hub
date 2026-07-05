import { create } from "zustand";

type Vector3 = [number, number, number];

type NavigationStore = {
  selectedDestination: string | null;
  hoveredDestination: string | null;
  cameraTarget: Vector3 | null;
  activeDimension: string | null;

  setSelectedDestination: (
    destination: string | null
  ) => void;

  setHoveredDestination: (
    destination: string | null
  ) => void;

  setCameraTarget: (
    target: Vector3 | null
  ) => void;

  setActiveDimension: (
    dimension: string | null
  ) => void;

  resetUniverse: () => void;
};

export const useNavigationStore =
  create<NavigationStore>((set) => ({
    selectedDestination: null,
    hoveredDestination: null,
    cameraTarget: null,
    activeDimension: null,

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

    setCameraTarget: (
      target
    ) =>
      set({
        cameraTarget: target,
      }),

    setActiveDimension: (
      dimension
    ) =>
      set({
        activeDimension: dimension,
      }),

    resetUniverse: () =>
      set({
        selectedDestination: null,
        hoveredDestination: null,
        cameraTarget: null,
        activeDimension: null,
      }),
  }));