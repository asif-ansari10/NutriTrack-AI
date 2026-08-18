import { CalendarDays } from "lucide-react";

export default function DiaryHeader() {
  const today = new Date();

  const dateText =
    today.toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
      }
    );

  return (
    <header className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">

      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[#191c1d] sm:text-4xl">
          Food Diary
        </h1>

        <p className="mt-1 text-sm text-[#6e7977]">
          Track your meals and activities for today.
        </p>
      </div>

      <div className="flex w-fit items-center gap-2 rounded-full bg-white px-4 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
        <CalendarDays
          size={18}
          className="text-[#004e47]"
        />

        <span className="text-sm font-semibold text-[#191c1d]">
          Today, {dateText}
        </span>
      </div>

    </header>
  );
}