# Universe Hub

An interactive 3D portfolio built as a small explorable universe. Instead of traditional pages, professional content is presented as celestial destinations — a career galaxy, a projects planet, a GitHub station, and a contact moon — rendered in real time with Three.js and React Three Fiber.

## Features

- **Interactive 3D universe** with four selectable destinations, a central eclipse, layered starfields, procedural nebula clouds, an orbit ring, and an orbiting satellite
- **Cinematic camera** that idles with subtle drift and mouse parallax, then travels smoothly to a destination when selected
- **Hover and selection feedback** on every celestial body (eased emissive response, telemetry readout, destination panel)
- **Four themed dimensions**, each with its own visual identity:
  - *GitHub Dimension* — repositories as an orbiting constellation with holographic detail modals
  - *Career Dimension* — a professional timeline arranged around an animated core, with memory modals and a resume panel
  - *Projects Dimension* — projects orbiting an innovation core, with per-project dossier modals
  - *Contact Dimension* — a calm, minimal contact page with email, GitHub, and LinkedIn links
- **Procedural texturing** — nebula clouds, lunar surface (maria, craters, roughness), planet terrain, and glow sprites are all generated at runtime on canvas; no image assets required
- **Custom lightweight shaders** for fresnel rim glow, twinkling stars, and galaxy particle arms
- **Performance tiering** that reduces particle counts and skips secondary effects on low-end devices
- **Accessibility touches** — keyboard focus rings, `prefers-reduced-motion` support, high-contrast text
- **Resume download** served as a static PDF

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Three.js](https://threejs.org/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) + [@react-three/drei](https://github.com/pmndrs/drei)
- [Zustand](https://zustand.docs.pmnd.rs/) for state management

## Architecture

**Universe Hub.** The root view (`src/app/page.tsx`) renders `UniverseCanvas`, a full-screen React Three Fiber canvas containing the scene, lighting rig, and camera. `SceneManager` composes the environment (starfield, nebula, eclipse, orbit ring, satellite, portal) together with the four destination components.

**Dimension system.** Each destination can be "entered", swapping the 3D universe for a full-screen dimension view (`src/components/dimensions/`). Dimensions are DOM/CSS experiences with their own backdrops, orbital layouts, and modals. Leaving a dimension resets navigation state and returns to the universe.

**Camera system.** `CameraRig` runs inside the render loop. With no target it applies slow idle drift plus mouse parallax; when a destination is selected it eases the camera toward that destination's position and releases control once home is reached again.

**Zustand state management.** A `navigationStore` holds the hovered destination, selected destination, camera target, and active dimension. Separate small stores back the career, project, and repository dimensions (selected item, modal state). Components subscribe with selectors, so updates stay granular.

**React Three Fiber.** All 3D content is declarative JSX over Three.js. Animation runs through `useFrame` with no per-frame allocations; procedural textures and geometries are built once and cached at module level.

## Screenshots

<p align="center">
  <img src="https://github.com/user-attachments/assets/00bba1ae-d6e9-4f6c-9ebd-5d20fabfe488"
       alt="Universe Hub"
       width="900">
</p>

| Universe Hub | GitHub Dimension |
| --- | --- |
| _placeholder_ | _placeholder_ |

| Career Dimension | Projects Dimension |
| --- | --- |
| _placeholder_ | _placeholder_ |

## Installation

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
npm run build
```

## Project Structure

```
src/
├── app/                      # Next.js App Router entry, layout, global styles
├── components/
│   ├── universe/             # 3D scene: canvas, camera rig, scene manager,
│   │                         # celestial bodies, procedural texture helpers
│   ├── dimensions/           # Full-screen dimension views and their modals
│   └── ...                   # Shared UI (destination panel, HUD, return button)
├── stores/                   # Zustand stores (navigation, career, projects, repos)
└── data/                     # Content: destinations, projects, repositories, resume
public/                       # Static assets (resume.pdf)
```

## Future Improvements

- Post-processing bloom pass for physically-grounded glow (currently approximated with additive sprites and fresnel shaders)
- Keep the 3D canvas mounted across dimension transitions to remove the WebGL re-initialization gap
- Live GitHub API integration so repository data stays current automatically
- Touch and mobile-specific interaction tuning
- Unit and end-to-end test coverage

## License

MIT
