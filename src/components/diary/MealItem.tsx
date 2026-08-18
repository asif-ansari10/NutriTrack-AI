"use client";

import {
  Trash2,
} from "lucide-react";

import type {
  DiaryMeal,
} from "@/lib/diary/getDiaryData";

import {
  deleteMeal,
} from "@/app/diary/actions";

interface MealItemProps {
  meal: DiaryMeal;
}

export default function MealItem({
  meal,
}: MealItemProps) {
  const time =
    meal.created_at
      ? new Date(
          meal.created_at
        ).toLocaleTimeString(
          "en-US",
          {
            hour: "numeric",
            minute: "2-digit",
          }
        )
      : "";

  return (
    <div className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-[#f7f8f8] sm:gap-4 sm:p-3">

      {/* Image */}
      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-[#eef1f0] sm:h-16 sm:w-16">

        {meal.image_url ? (
          <img
            src={meal.image_url}
            alt={meal.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xl">
            🍽️
          </div>
        )}

      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">

        <h3 className="truncate text-sm font-bold text-[#191c1d]">
          {meal.name}
        </h3>

        <p className="mt-1 truncate text-xs text-[#6e7977]">
          {time}

          {" • "}

          {Number(
            meal.protein_g || 0
          )}
          g protein
        </p>

      </div>

      {/* Calories */}
      <div className="hidden shrink-0 sm:block">
        <p className="text-sm font-bold text-[#004e47]">
          {Number(
            meal.calories || 0
          ).toLocaleString()}{" "}
          kcal
        </p>
      </div>

      {/* Delete */}
      <form
        action={deleteMeal}
        className="shrink-0"
      >
        <input
          type="hidden"
          name="id"
          value={meal.id}
        />

        <button
          type="submit"
          aria-label={`Delete ${meal.name}`}
          className="flex h-9 w-9 items-center justify-center rounded-full text-[#8a9492] transition hover:bg-red-50 hover:text-red-600"
        >
          <Trash2 size={16} />
        </button>
      </form>

    </div>
  );
}