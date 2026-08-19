
import HomeDashboard from "@/components/dashboard/HomeDashboard";
import ProtectedAppShell from "@/components/navigation/ProtectedAppShell";

export default function Home() {
  return (
    <ProtectedAppShell>
      <HomeDashboard />
    </ProtectedAppShell>
  );
}