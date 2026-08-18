"use client";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useRouter } from "next/navigation";

interface Props {
  month: string;
}

export default function ProgressHeader({
  month,
}: Props) {
  const router = useRouter();

  const [year, monthNumber] =
    month.split("-").map(Number);

  const date = new Date(
    year,
    monthNumber - 1,
    1
  );

  const monthName =
    new Intl.DateTimeFormat(
      "en-IN",
      {
        month: "long",
        year: "numeric",
      }
    ).format(date);

  function changeMonth(
    direction: number
  ) {
    const nextDate = new Date(
      year,
      monthNumber - 1 + direction,
      1
    );

    const nextMonth = `${nextDate.getFullYear()}-${String(
      nextDate.getMonth() + 1
    ).padStart(2, "0")}`;

    router.push(
      `/progress?month=${nextMonth}`
    );
  }

  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[#191c1d]">
          Your Progress
        </h1>

        <p className="mt-1 text-sm text-[#6e7977] sm:text-base">
          Track your journey and stay consistent.
        </p>
      </div>

      <div className="flex items-center justify-between rounded-full bg-white p-1 shadow-sm ring-1 ring-[#e1e3e4] sm:w-auto">

        <button
          onClick={() =>
            changeMonth(-1)
          }
          className="flex h-10 w-10 items-center justify-center rounded-full text-[#3e4947] hover:bg-[#f3f4f5]"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="min-w-[150px] text-center text-sm font-bold text-[#191c1d]">
          {monthName}
        </div>

        <button
          onClick={() =>
            changeMonth(1)
          }
          className="flex h-10 w-10 items-center justify-center rounded-full text-[#3e4947] hover:bg-[#f3f4f5]"
        >
          <ChevronRight size={20} />
        </button>

      </div>

    </div>
  );
}