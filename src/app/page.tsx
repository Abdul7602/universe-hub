"use client";

import UniverseCanvas from "@/components/universe/UniverseCanvas";
import DebugHover from "@/components/DebugHover";
import ReturnHomeButton from "@/components/ReturnHomeButton";
import DestinationPanel from "@/components/DestinationPanel";

import CareerDimension from "@/components/dimensions/CareerDimension";
import ProjectsDimension from "@/components/dimensions/ProjectsDimension";
import GithubDimension from "@/components/dimensions/GithubDimension";
import ContactDimension from "@/components/dimensions/ContactDimension";

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
      ) : activeDimension === "projects" ? (
        <ProjectsDimension />
      ) : activeDimension === "github" ? (
        <GithubDimension />
      ) : activeDimension === "contact" ? (
        <ContactDimension />
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