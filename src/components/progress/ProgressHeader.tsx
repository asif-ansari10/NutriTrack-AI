"use client";

import {
  ChevronLeft,
  ChevronRight,
  Scale,
} from "lucide-react";

import { useRouter } from "next/navigation";

interface Props {
  month: string;
  onUpdateWeight: () => void;
}

export default function ProgressHeader({
  month,
  onUpdateWeight,
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
    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

      {/* =====================================================
          TITLE
      ====================================================== */}

      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[#191c1d] sm:text-4xl">
          Your Progress
        </h1>

        <p className="mt-1 text-sm text-[#6e7977] sm:text-base">
          Track your journey and stay consistent.
        </p>
      </div>

      {/* =====================================================
          ACTIONS
      ====================================================== */}

      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center lg:w-auto">

        {/* =================================================
            MONTH NAVIGATION
        ================================================= */}

        <div
          className="
            flex
            h-12
            w-full
            items-center
            justify-between
            rounded-full
            bg-white
            p-1
            shadow-sm
            ring-1
            ring-[#e1e3e4]
            sm:w-auto
          "
        >
          <button
            type="button"
            onClick={() =>
              changeMonth(-1)
            }
            aria-label="Previous month"
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              text-[#3e4947]
              transition-colors
              duration-150
              hover:bg-[#f3f4f5]
              hover:text-[#004e47]
              active:scale-95
            "
          >
            <ChevronLeft size={20} />
          </button>

          <div
            className="
              min-w-0
              flex-1
              px-3
              text-center
              text-sm
              font-bold
              text-[#191c1d]
              sm:min-w-[150px]
              sm:flex-none
            "
          >
            {monthName}
          </div>

          <button
            type="button"
            onClick={() =>
              changeMonth(1)
            }
            aria-label="Next month"
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              text-[#3e4947]
              transition-colors
              duration-150
              hover:bg-[#f3f4f5]
              hover:text-[#004e47]
              active:scale-95
            "
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* =================================================
            UPDATE WEIGHT BUTTON
        ================================================= */}

        <button
          type="button"
          onClick={onUpdateWeight}
          className="
            inline-flex
            min-h-[48px]
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#004e47]
            px-5
            text-sm
            font-bold
            text-white
            shadow-[0_5px_16px_rgba(0,78,71,0.16)]
            transition-all
            duration-150
            hover:bg-[#003f3a]
            hover:shadow-[0_7px_20px_rgba(0,78,71,0.22)]
            active:scale-[0.98]
            sm:w-auto
          "
        >
          <Scale
            size={18}
            strokeWidth={2.2}
          />

          Update Weight
        </button>
      </div>
    </div>
  );
}