import AICoachPage from "@/components/coach/AICoachPage";
import ProtectedAppShell from "@/components/navigation/ProtectedAppShell";

export default function CoachRoute() {
  return (
    <ProtectedAppShell>
      <AICoachPage />
    </ProtectedAppShell>
  );
}