"use client";

import Starfield from "./Starfield";
import Nebula from "./Nebula";
import OrbitRing from "./OrbitRing";
import Eclipse from "./Eclipse";
import Satellite from "./Satellite";

import GitHubStation from "./GitHubStation";
import ProjectsPlanet from "./ProjectsPlanet";
import LinkedInGalaxy from "./LinkedInGalaxy";
import ContactMoon from "./ContactMoon";

export default function SceneManager() {
  return (
    <>
      <Starfield />
      <Nebula />

      <OrbitRing />

      <Eclipse />
      <Satellite />

      <GitHubStation />
      <ProjectsPlanet />
      <LinkedInGalaxy />
      <ContactMoon />
    </>
  );
}
