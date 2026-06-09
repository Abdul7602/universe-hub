"use client";

import Starfield from "./Starfield";
import Nebula from "./Nebula";
import Eclipse from "./Eclipse";
import Satellite from "./Satellite";

export default function SceneManager() {
  return (
    <>
      <Starfield />
      <Nebula />
      <Eclipse />
      <Satellite />
    </>
  );
}
