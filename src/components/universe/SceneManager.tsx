"use client";

import { useNavigationStore } from "@/stores/navigationStore";

import Starfield from "./Starfield";
import Nebula from "./Nebula";
import OrbitRing from "./OrbitRing";
import Eclipse from "./Eclipse";
import Satellite from "./Satellite";

import GitHubStation from "./GitHubStation";
import ProjectsPlanet from "./ProjectsPlanet";
import CareerGalaxy from "./CareerGalaxy";
import ContactMoon from "./ContactMoon";
import Portal from "./Portal";

export default function SceneManager() {
const selectedDestination =
useNavigationStore(
(state) => state.selectedDestination
);

const portalPositions = {
github: [10, 0, -2],
projects: [-12, 2, -4],
career: [0, 8, -8],
contact: [0, -8, -8],
} as const;

return (
<> <Starfield /> <Nebula />


  <OrbitRing />

  <Eclipse />
  <Satellite />

  {selectedDestination && (
    <Portal
      position={[
        ...portalPositions[
          selectedDestination as keyof typeof portalPositions
        ],
      ]}
    />
  )}

  <GitHubStation />
  <ProjectsPlanet />
  <CareerGalaxy />
  <ContactMoon />
</>


);
}
