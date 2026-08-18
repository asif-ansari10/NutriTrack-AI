import Sidebar from "@/components/navigation/Sidebar";
import MobileHeader from "@/components/navigation/MobileHeader";
import MobileNav from "@/components/navigation/MobileNav";

import DiaryPage from "@/components/diary/DiaryPage";

import {
  getDiaryData,
} from "@/lib/diary/getDiaryData";

export default async function DiaryRoute() {
  const data = await getDiaryData();

  /*
   * User is not logged in
   */
  if (!data.user) {
    return (
      <div className="min-h-screen bg-[#f8f9fa]">

        <Sidebar />

        <MobileHeader />

        <main className="min-h-screen pb-28 xl:ml-64 xl:pb-10">

          <div className="mx-auto w-full max-w-[1500px] px-4 py-6 sm:px-6 md:px-8 lg:px-10 xl:px-8 xl:py-8">

            <div className="rounded-[24px] bg-white p-8 text-center shadow-[0_4px_20px_rgba(0,0,0,0.04)]">

              <h1 className="text-2xl font-bold text-[#191c1d]">
                Food Diary
              </h1>

              <p className="mt-2 text-sm text-[#6e7977]">
                Please log in to view your diary.
              </p>

            </div>

          </div>

        </main>

        <MobileNav />

      </div>
    );
  }

  /*
   * Logged-in user
   */
  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#191c1d]">

      <Sidebar />

      <MobileHeader />

      <main className="min-h-screen pb-28 xl:ml-64 xl:pb-10">

        <div className="mx-auto w-full max-w-[1500px] px-4 py-6 sm:px-6 md:px-8 lg:px-10 xl:px-8 xl:py-8">

          <DiaryPage
            data={data}
          />

        </div>

      </main>

      <MobileNav />

    </div>
  );
}