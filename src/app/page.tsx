"use client";

import UniverseCanvas from "@/components/universe/UniverseCanvas";
import DebugHover from "@/components/DebugHover";
import ReturnHomeButton from "@/components/ReturnHomeButton";
import DestinationPanel from "@/components/DestinationPanel";

import CareerDimension from "@/components/dimensions/CareerDimension";

import { useNavigationStore } from "@/stores/navigationStore";

export default function Home() {
  const activeDimension =
    useNavigationStore(
      (state) => state.activeDimension
    );

  return (
  <main>
    {activeDimension === "career" ? (
      <CareerDimension />
    ) : (
      <>
        <DebugHover />
        <ReturnHomeButton />
        <DestinationPanel />
        <UniverseCanvas />
      </>
    )}
  </main>
  );
}