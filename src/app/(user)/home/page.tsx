import HomeDashboard from "@/components/dashboard/HomeDashboard";
import ProtectedAppShell from "@/components/navigation/ProtectedAppShell";
import { requireUser } from "@/lib/auth/requireUser";

export default async function HomePage() {
  await requireUser();

  return (
    <ProtectedAppShell>
      <HomeDashboard />
    </ProtectedAppShell>
  );
}