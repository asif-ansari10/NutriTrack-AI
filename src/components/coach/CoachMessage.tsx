// "use client";

// import {
//   Brain,
//   MapPin,
// } from "lucide-react";

// import RestaurantResults from "./RestaurantResults";

// export interface Restaurant {
//   name: string;
//   address: string;
//   rating?: number;
//   distance?: number;
//   latitude?: number;
//   longitude?: number;
//   placeId?: string;
// }

// interface CoachMessageProps {
//   role: "user" | "assistant";
//   content: string;
//   restaurants?: Restaurant[];
// }

// export default function CoachMessage({
//   role,
//   content,
//   restaurants,
// }: CoachMessageProps) {
//   const isUser =
//     role === "user";

//   return (
//     <div
//       className={`flex gap-3 ${
//         isUser
//           ? "justify-end"
//           : "justify-start"
//       }`}
//     >
//       {!isUser && (
//         <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#00685f] text-white shadow-sm">
//           <Brain size={18} />
//         </div>
//       )}

//       <div
//         className={`flex max-w-[90%] flex-col sm:max-w-[75%] ${
//           isUser
//             ? "items-end"
//             : "items-start"
//         }`}
//       >
//         <span className="mb-1 px-2 text-[11px] font-medium text-[#6e7977]">
//           {isUser
//             ? "You"
//             : "NutriTrack Coach"}
//         </span>

//         <div
//           className={`whitespace-pre-wrap rounded-2xl px-4 py-3 text-[15px] leading-6 ${
//             isUser
//               ? "rounded-tr-sm bg-[#00685f] text-white shadow-sm"
//               : "rounded-tl-sm border border-[#e1e3e4] bg-white text-[#191c1d] shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
//           }`}
//         >
//           {content}
//         </div>

//         {restaurants &&
//           restaurants.length > 0 && (
//             <div className="w-full">
//               <RestaurantResults
//                 restaurants={
//                   restaurants
//                 }
//               />
//             </div>
//           )}
//       </div>
//     </div>
//   );
// }

"use client";

import {
  Brain,
} from "lucide-react";

import RestaurantResults from "./RestaurantResults";

export interface Restaurant {
  id: string;
  name: string;
  address: string;

  latitude: number | null;
  longitude: number | null;

  cuisine: string | null;

  directionsUrl: string;
}

interface CoachMessageProps {
  role: "user" | "assistant";
  content: string;
  restaurants?: Restaurant[];
}

export default function CoachMessage({
  role,
  content,
  restaurants,
}: CoachMessageProps) {
  const isUser = role === "user";

  return (
    <div
      className={`flex gap-3 ${
        isUser
          ? "justify-end"
          : "justify-start"
      }`}
    >
      {/* ============================================================
          COACH ICON
      ============================================================ */}

      {!isUser && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#00685f] text-white shadow-sm">
          <Brain size={18} />
        </div>
      )}

      {/* ============================================================
          MESSAGE CONTENT
      ============================================================ */}

      <div
        className={`flex max-w-[90%] flex-col sm:max-w-[75%] ${
          isUser
            ? "items-end"
            : "items-start"
        }`}
      >
        {/* NAME */}

        <span className="mb-1 px-2 text-[11px] font-medium text-[#6e7977]">
          {isUser
            ? "You"
            : "NutriTrack Coach"}
        </span>

        {/* MESSAGE */}

        <div
          className={`whitespace-pre-wrap rounded-2xl px-4 py-3 text-[15px] leading-6 ${
            isUser
              ? "rounded-tr-sm bg-[#00685f] text-white shadow-sm"
              : "rounded-tl-sm border border-[#e1e3e4] bg-white text-[#191c1d] shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
          }`}
        >
          {content}
        </div>

        {/* ============================================================
            RESTAURANT RESULTS

            These are displayed only when the API returns
            real nearby restaurant results.
        ============================================================ */}

        {restaurants &&
          restaurants.length > 0 && (
            <div className="mt-1 w-full">
              <RestaurantResults
                restaurants={restaurants}
              />
            </div>
          )}
      </div>
    </div>
  );
}