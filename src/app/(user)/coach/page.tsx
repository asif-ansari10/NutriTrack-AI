import AICoachPage from "@/components/coach/AICoachPage";
import ProtectedAppShell from "@/components/navigation/ProtectedAppShell";
import { requireUser } from "@/lib/auth/requireUser";

export default async function CoachRoute() {
  await requireUser();
  return (
    <ProtectedAppShell>
      <AICoachPage />
    </ProtectedAppShell>
  );
}