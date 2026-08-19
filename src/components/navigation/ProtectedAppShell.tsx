import AppShell from "./AppShell";
import AuthGate from "@/components/auth/AuthGate";

interface ProtectedAppShellProps {
  children: React.ReactNode;
}

export default function ProtectedAppShell({
  children,
}: ProtectedAppShellProps) {
  return (
    <AuthGate>
      <AppShell>
        {children}
      </AppShell>
    </AuthGate>
  );
}