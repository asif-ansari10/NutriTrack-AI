// import Sidebar from "@/components/navigation/Sidebar";
// import MobileNav from "@/components/navigation/MobileNav";
// import MobileHeader from "@/components/navigation/MobileHeader";
// import HomeDashboard from "@/components/dashboard/HomeDashboard";
// import AuthGate from "@/components/auth/AuthGate";

// export default function Home() {
//   return (
//     <AuthGate>
//     <div className="min-h-screen bg-[#f8f9fa] text-[#191c1d]">

//       {/* Desktop sidebar */}
//       <Sidebar />

//       {/* Mobile + Tablet header */}
//       <MobileHeader />

//       <main className="min-h-screen pb-28 xl:ml-64 xl:pb-10">

//         <div className="mx-auto w-full max-w-[1500px] px-4 py-6 sm:px-6 md:px-8 lg:px-10 xl:px-8 xl:py-8">

//           <HomeDashboard />

//         </div>

//       </main>

//       {/* Mobile + Tablet */}
//       <MobileNav />

//     </div>
//     </AuthGate>
//   );
// }

import AppShell from "@/components/navigation/AppShell";
import HomeDashboard from "@/components/dashboard/HomeDashboard";

export default function Home() {
  return (
    <AppShell>
      <HomeDashboard />
    </AppShell>
  );
}