
import HomeDashboard from "@/components/dashboard/HomeDashboard";
import ProtectedAppShell from "@/components/navigation/ProtectedAppShell";
import OrganizationSchema from "@/components/seo/OrganizationSchema";

export default function Home() {
  return (
    <ProtectedAppShell>
      <OrganizationSchema />
      <HomeDashboard />
    </ProtectedAppShell>
  );
}