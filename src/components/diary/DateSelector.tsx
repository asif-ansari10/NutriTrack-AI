"use client";

import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface DateSelectorProps {
  date: string;
}

export default function DateSelector({
  date,
}: DateSelectorProps) {
  const router = useRouter();

  function changeDate(newDate: string) {
    router.push(`/diary?date=${newDate}`);
  }

  function addDays(
    dateString: string,
    amount: number
  ) {
    const [year, month, day] =
      dateString.split("-").map(Number);

    const date = new Date(
      year,
      month - 1,
      day
    );

    date.setDate(
      date.getDate() + amount
    );

    return `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(
      date.getDate()
    ).padStart(2, "0")}`;
  }

  function formatDate(dateString: string) {
    const [year, month, day] =
      dateString.split("-").map(Number);

    const date = new Date(
      year,
      month - 1,
      day
    );

    return new Intl.DateTimeFormat(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    ).format(date);
  }

  function isToday(dateString: string) {
    const today = new Intl.DateTimeFormat(
      "en-CA",
      {
        timeZone: "Asia/Kolkata",
      }
    ).format(new Date());

    return dateString === today;
  }

  return (
    <div className="flex items-center gap-2">
      {/* PREVIOUS DAY */}
      <button
        type="button"
        onClick={() =>
          changeDate(
            addDays(date, -1)
          )
        }
        aria-label="Previous day"
        className="
          flex h-11 w-11
          items-center justify-center
          rounded-full
          border border-[#e1e3e4]
          bg-white
          text-[#3e4947]
          shadow-sm
          transition
          hover:bg-[#f3f5f4]
          active:scale-95
        "
      >
        <ChevronLeft size={20} />
      </button>

      {/* DATE */}
      <div className="relative">
        <label
          htmlFor="diary-date"
          className="
            flex h-11
            cursor-pointer
            items-center gap-2
            rounded-full
            border border-[#e1e3e4]
            bg-white
            px-4
            text-sm
            font-semibold
            text-[#191c1d]
            shadow-sm
            transition
            hover:border-[#00685f]
            hover:bg-[#f8faf9]
            sm:px-5
          "
        >
          <CalendarDays
            size={18}
            className="shrink-0 text-[#00685f]"
          />

          <span className="whitespace-nowrap">
            {isToday(date)
              ? "Today, "
              : ""}
            {formatDate(date)}
          </span>
        </label>

        <input
          id="diary-date"
          type="date"
          value={date}
          max={new Intl.DateTimeFormat(
            "en-CA",
            {
              timeZone: "Asia/Kolkata",
            }
          ).format(new Date())}
          onChange={(event) => {
            if (event.target.value) {
              changeDate(
                event.target.value
              );
            }
          }}
          className="
            absolute
            inset-0
            h-full
            w-full
            cursor-pointer
            opacity-0
          "
        />
      </div>

      {/* NEXT DAY */}
      <button
        type="button"
        disabled={isToday(date)}
        onClick={() =>
          changeDate(
            addDays(date, 1)
          )
        }
        aria-label="Next day"
        className="
          flex h-11 w-11
          items-center justify-center
          rounded-full
          border border-[#e1e3e4]
          bg-white
          text-[#3e4947]
          shadow-sm
          transition
          hover:bg-[#f3f5f4]
          active:scale-95
          disabled:cursor-not-allowed
          disabled:opacity-35
        "
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}