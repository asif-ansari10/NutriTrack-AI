"use client";

import { useState } from "react";

import {
  Plus,
  Sun,
  Utensils,
  Coffee,
  Moon,
} from "lucide-react";

import type {
  DiaryMeal,
} from "@/lib/diary/getDiaryData";

import MealItem from "./MealItem";
import AddMealModal from "./AddMealModal";

interface MealSectionProps {
  mealType:
    | "breakfast"
    | "lunch"
    | "snack"
    | "dinner";

  title: string;

  meals: DiaryMeal[];
}

/* ============================================================
   GET MEAL ICON
============================================================ */

function getIcon(
  mealType: MealSectionProps["mealType"]
) {
  switch (mealType) {
    case "breakfast":
      return Sun;

    case "lunch":
      return Utensils;

    case "snack":
      return Coffee;

    case "dinner":
      return Moon;

    default:
      return Utensils;
  }
}

/* ============================================================
   COMPONENT
============================================================ */

export default function MealSection({
  mealType,
  title,
  meals,
}: MealSectionProps) {
  const [
    open,
    setOpen,
  ] = useState(false);

  const Icon =
    getIcon(mealType);

  /* ==========================================================
     CALCULATE CALORIES
  ========================================================== */

  const calories =
    meals.reduce(
      (sum, meal) =>
        sum +
        Number(
          meal.calories || 0
        ),
      0
    );

  return (
    <>
      <section className="rounded-[20px] bg-white p-4 shadow-[0_4px_20px_rgba(0,0,0,0.04)] sm:p-6">

        {/* ====================================================
            HEADER
        ==================================================== */}

        <div className="mb-4 flex items-center justify-between">

          <h2 className="flex items-center text-lg font-semibold text-[#191c1d] sm:text-xl">

            <Icon
              size={21}
              className="mr-2 text-[#004e47]"
            />

            {title}

          </h2>

          <span className="text-xs font-semibold text-[#3e4947] sm:text-sm">
            {calories.toLocaleString()} kcal
          </span>

        </div>

        {/* ====================================================
            MEALS
        ==================================================== */}

        {meals.length > 0 ? (
          <div className="mb-3 space-y-1">

            {meals.map(
              (meal) => (
                <MealItem
                  key={meal.id}
                  meal={meal}
                />
              )
            )}

          </div>
        ) : (
          <div className="mb-3 rounded-xl border border-dashed border-[#bec9c6] px-4 py-6 text-center">

            <p className="text-sm font-medium text-[#6e7977]">
              No {title.toLowerCase()} logged yet.
            </p>

          </div>
        )}

        {/* ====================================================
            ADD MEAL BUTTON
        ==================================================== */}

        <button
          type="button"
          onClick={() =>
            setOpen(true)
          }
          className="flex min-h-[46px] w-full cursor-pointer items-center justify-center rounded-xl border border-dashed border-[#bec9c6] text-sm font-semibold text-[#004e47] transition hover:border-[#004e47] hover:bg-[#f3fafa]"
        >
          <Plus
            size={17}
            className="mr-2"
          />

          Add {title}
        </button>

      </section>

      {/* ======================================================
          ADD MEAL MODAL
      ====================================================== */}

      <AddMealModal
        open={open}
        onClose={() =>
          setOpen(false)
        }
        defaultMealType={
          mealType
        }
      />
    </>
  );
}