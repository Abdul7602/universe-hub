import UniverseCanvas from "@/components/universe/UniverseCanvas";
import DebugHover from "@/components/DebugHover";
import ReturnHomeButton from "@/components/ReturnHomeButton";

export default function Home() {
  return (
    <main>
      <DebugHover />
      <ReturnHomeButton />
      <UniverseCanvas />
    </main>
  );
}
