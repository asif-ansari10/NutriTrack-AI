// // import DiaryPage from "@/components/diary/DiaryPage";
// // import { getDiaryData } from "@/lib/diary/getDiaryData";
// // import ProtectedAppShell from "@/components/navigation/ProtectedAppShell";

// // export default async function DiaryRoute() {
// //   const data = await getDiaryData();

// //   if (!data.user) {
// //     return (
// //       <ProtectedAppShell>
// //         <main className="min-h-screen bg-[#f8f9fa] text-[#191c1d]">
// //           <div className="mx-auto w-full max-w-[1500px] px-4 py-6 sm:px-6 md:px-8 lg:px-10 xl:px-8 xl:py-8">
// //             <div className="rounded-[24px] bg-white p-8 text-center shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
// //               <h1 className="text-2xl font-bold text-[#191c1d]">
// //                 Food Diary
// //               </h1>
// //               <p className="mt-2 text-sm text-[#6e7977]">
// //                 Please log in to view your diary.
// //               </p>
// //               <a
// //                 href="/login"
// //                 className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-[#004e47] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#003f3a]"
// //               >
// //                 Sign In
// //               </a>
// //             </div>
// //           </div>
// //         </main>
// //       </ProtectedAppShell>
// //     );
// //   }

// //   return (
// //     <ProtectedAppShell>
// //       <main className="min-h-screen bg-[#f8f9fa] text-[#191c1d]">
// //         <div className="mx-auto w-full max-w-[1500px] px-4 py-6 sm:px-6 md:px-8 lg:px-10 xl:px-8 xl:py-8">
// //           <DiaryPage data={data} />
// //         </div>
// //       </main>
// //     </ProtectedAppShell>
// //   );
// // }


// import DiaryPage from "@/components/diary/DiaryPage";
// import ProtectedAppShell from "@/components/navigation/ProtectedAppShell";
// import { getDiaryData } from "@/lib/diary/getDiaryData";

// interface PageProps {
//   searchParams: Promise<{
//     date?: string;
//   }>;
// }

// function getTodayIndia() {
//   return new Intl.DateTimeFormat("en-CA", {
//     timeZone: "Asia/Kolkata",
//   }).format(new Date());
// }

// function isValidDate(value: string) {
//   return /^\d{4}-\d{2}-\d{2}$/.test(value);
// }

// export default async function DiaryRoute({
//   searchParams,
// }: PageProps) {
//   const params = await searchParams;

//   const requestedDate =
//     params.date || getTodayIndia();

//   const selectedDate = isValidDate(requestedDate)
//     ? requestedDate
//     : getTodayIndia();

//   const data = await getDiaryData(selectedDate);

//   return (
//     <ProtectedAppShell>
//       <DiaryPage
//         date={selectedDate}
//         data={data}
//       />
//     </ProtectedAppShell>
//   );
// }

import ProtectedAppShell from "@/components/navigation/ProtectedAppShell";
import DiaryPage from "@/components/diary/DiaryPage";
import {
  getDiaryData,
} from "@/lib/diary/getDiaryData";

interface PageProps {
  searchParams: Promise<{
    date?: string;
  }>;
}

function getTodayIndia(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
  }).format(new Date());
}

function isValidDate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export default async function DiaryRoute({
  searchParams,
}: PageProps) {
  const params = await searchParams;

  const today = getTodayIndia();

  const requestedDate =
    params.date || today;

  /*
   * Only accept a valid date.
   */
  const selectedDate =
    isValidDate(requestedDate) &&
    requestedDate <= today
      ? requestedDate
      : today;

  /*
   * Load diary data for the selected date.
   */
  const data =
    await getDiaryData(selectedDate);

  return (
    <ProtectedAppShell>
      <DiaryPage
        date={selectedDate}
        data={data}
      />
    </ProtectedAppShell>
  );
}