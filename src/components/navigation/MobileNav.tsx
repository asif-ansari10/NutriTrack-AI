// import Link from "next/link";
// import {
//   Home,
//   BookOpen,
//   Camera,
//   TrendingUp,
//   User,
//   LogIn,
// } from "lucide-react";

// import { createClient } from "@/lib/supabase/server";

// export default async function MobileNav() {
//   const supabase = await createClient();

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   return (
//     <nav className="fixed bottom-0 left-0 z-50 w-full border-t border-gray-200 bg-white/95 backdrop-blur-xl xl:hidden">

//       <div className="flex h-20 items-center justify-around px-2">

//         {/* Home */}
//         <Link
//           href="/"
//           className="flex min-w-[52px] flex-col items-center justify-center gap-1 text-[#004e47]"
//         >
//           <Home size={21} />
//           <span className="text-[11px] font-semibold">
//             Home
//           </span>
//         </Link>

//         {/* Diary */}
//         <Link
//           href="/diary"
//           className="flex min-w-[52px] flex-col items-center justify-center gap-1 text-[#3e4947]"
//         >
//           <BookOpen size={21} />
//           <span className="text-[11px]">
//             Diary
//           </span>
//         </Link>

//         {/* Scan */}
//         <Link
//           href="/scan"
//           className="-mt-7 flex min-w-[60px] flex-col items-center gap-1"
//         >
//           <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#004e47] text-white shadow-lg">
//             <Camera size={24} />
//           </div>

//           <span className="text-[11px] font-medium text-[#3e4947]">
//             Scan
//           </span>
//         </Link>

//         {/* Progress */}
//         <Link
//           href="/progress"
//           className="flex min-w-[52px] flex-col items-center justify-center gap-1 text-[#3e4947]"
//         >
//           <TrendingUp size={21} />

//           <span className="text-[11px]">
//             Progress
//           </span>
//         </Link>

//         {/* Auth-dependent */}
//         {user ? (
//           <Link
//             href="/profile"
//             className="flex min-w-[52px] flex-col items-center justify-center gap-1 text-[#3e4947]"
//           >
//             <User size={21} />

//             <span className="text-[11px]">
//               Profile
//             </span>
//           </Link>
//         ) : (
//           <Link
//             href="/login"
//             className="flex min-w-[52px] flex-col items-center justify-center gap-1 text-[#00685f]"
//           >
//             <LogIn size={21} />

//             <span className="text-[11px] font-semibold">
//               Login
//             </span>
//           </Link>
//         )}

//       </div>

//     </nav>
//   );
// }

import { createClient } from "@/lib/supabase/server";
import { MobileNavigation } from "./NavigationLinks";

export default async function MobileNav() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <MobileNavigation
      isLoggedIn={!!user}
    />
  );
}