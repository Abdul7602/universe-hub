import UniverseCanvas from "@/components/universe/UniverseCanvas";
import DebugHover from "@/components/DebugHover";
import ReturnHomeButton from "@/components/ReturnHomeButton";
import DestinationPanel from "@/components/DestinationPanel";

export default function Home() {
  return (
    <main>
      <DebugHover />
      <ReturnHomeButton />
      <DestinationPanel />
      <UniverseCanvas />
    </main>
  );
}
