"use client";

import { useState } from "react";

import {
  Activity as ActivityIcon,
  Plus,
} from "lucide-react";

import type {
  DiaryActivity,
} from "@/lib/diary/getDiaryData";

import ActivityCard from "./ActivityCard";
import AddActivityModal from "./AddActivityModal";

interface ActivitySectionProps {
  activities: DiaryActivity[];
  selectedDate: string;
}

export default function ActivitySection({
  activities,
  selectedDate,
}: ActivitySectionProps) {
  const [open, setOpen] =
    useState(false);

  const totalCalories =
    activities.reduce(
      (sum, activity) =>
        sum +
        Number(
          activity.calories_burned || 0
        ),
      0
    );

  const formattedDate =
    new Intl.DateTimeFormat(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    ).format(
      new Date(
        `${selectedDate}T00:00:00`
      )
    );

  return (
    <>
      <section className="rounded-[20px] bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] sm:p-6">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="mb-4 flex items-center justify-between">

          <h2 className="flex items-center text-xl font-semibold text-[#191c1d]">

            <ActivityIcon
              size={20}
              className="mr-2 text-[#004e47]"
            />

            Activity

          </h2>

          {totalCalories > 0 && (
            <span className="text-xs font-bold text-[#004e47]">
              {totalCalories.toLocaleString()} kcal
            </span>
          )}

        </div>

        {/* ==================================================
            DATE
        ================================================== */}

        <p className="mb-4 text-xs text-[#7a8582]">
          Activity for{" "}
          <span className="font-semibold text-[#3e4947]">
            {formattedDate}
          </span>
        </p>

        {/* ==================================================
            ACTIVITIES
        ================================================== */}

        {activities.length > 0 ? (
          <div className="mb-4 space-y-3">

            {activities.map(
              (activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                />
              )
            )}

          </div>
        ) : (
          <div className="mb-4 rounded-xl border border-dashed border-[#bec9c6] px-4 py-6 text-center">

            <p className="text-sm font-medium text-[#6e7977]">
              No activity logged for this date.
            </p>

            <p className="mt-1 text-xs text-[#8a9492]">
              Add your workout or movement below.
            </p>

          </div>
        )}

        {/* ==================================================
            ADD ACTIVITY
        ================================================== */}

        <button
          type="button"
          onClick={() =>
            setOpen(true)
          }
          className="flex min-h-[48px] w-full items-center justify-center rounded-full border border-[#bec9c6] text-sm font-semibold text-[#191c1d] transition-colors hover:border-[#004e47] hover:bg-[#f3fafa]"
        >

          <Plus
            size={17}
            className="mr-2"
          />

          Add Activity

        </button>

      </section>

      {/* ====================================================
          ADD ACTIVITY MODAL
      ==================================================== */}

      {open && (
        <AddActivityModal
          key={selectedDate}
          open={open}
          selectedDate={selectedDate}
          onClose={() =>
            setOpen(false)
          }
        />
      )}

    </>
  );
}