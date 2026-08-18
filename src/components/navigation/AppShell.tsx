import Sidebar from "@/components/navigation/Sidebar";
import MobileNav from "@/components/navigation/MobileNav";
import MobileHeader from "@/components/navigation/MobileHeader";
import AuthGate from "@/components/auth/AuthGate";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({
  children,
}: AppShellProps) {
  return (
    <AuthGate>
      <div className="min-h-screen bg-[#f8f9fa] text-[#191c1d]">

        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Mobile / Tablet Header */}
        <MobileHeader />

        {/* Main Content */}
        <main className="min-h-screen pb-28 xl:ml-64 xl:pb-10">
          <div className="mx-auto w-full max-w-[1500px] px-4 py-6 sm:px-6 md:px-8 lg:px-10 xl:px-8 xl:py-8">
            {children}
          </div>
        </main>

        {/* Mobile / Tablet Navigation */}
        <MobileNav />

      </div>
    </AuthGate>
  );
}