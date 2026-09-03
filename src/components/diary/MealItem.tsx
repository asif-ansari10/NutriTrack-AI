"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

import type {
  DiaryMeal,
} from "@/lib/diary/getDiaryData";

import {
  deleteMeal,
} from "@/app/diary/actions";

import DeleteMealModal from "./DeleteMealModal";

interface MealItemProps {
  meal: DiaryMeal;
}

export default function MealItem({
  meal,
}: MealItemProps) {
  const [
    deleteModalOpen,
    setDeleteModalOpen,
  ] = useState(false);

  const [
    deleting,
    setDeleting,
  ] = useState(false);

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

  const calories = Number(
    meal.calories || 0
  );

  const protein = Number(
    meal.protein_g || 0
  );

  const fiber = Number(
    meal.fiber_g || 0
  );

  async function handleDelete() {
    if (deleting) {
      return;
    }

    setDeleting(true);

    try {
      const formData = new FormData();

      formData.append(
        "id",
        meal.id
      );

      await deleteMeal(formData);

      setDeleteModalOpen(false);
    } catch (error) {
      console.error(
        "DELETE MEAL ERROR:",
        error
      );
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <div className="flex min-w-0 items-center gap-2 rounded-xl p-2 transition-colors hover:bg-[#f7f8f8] sm:gap-4 sm:p-3">

        {/* Image */}
        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-[#eef1f0] sm:h-16 sm:w-16">
          {meal.image_url ? (
            <img
              src={meal.image_url}
              alt={meal.name}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-lg sm:text-xl">
              🍽️
            </div>
          )}
        </div>

        {/* Information */}
        <div className="min-w-0 flex-1">

          <h3 className="truncate text-sm font-bold text-[#191c1d]">
            {meal.name}
          </h3>

          <p className="mt-1 truncate text-[11px] text-[#6e7977] sm:text-xs">
            {time}
            {time && " • "}
            {protein}g protein
            {" • "}
            {fiber}g fiber
          </p>

        </div>

        {/* Calories */}
        <div className="shrink-0 text-right">
          <p className="text-xs font-bold text-[#004e47] sm:text-sm">
            {calories.toLocaleString()} kcal
          </p>
        </div>

        {/* Delete */}
        <button
          type="button"
          onClick={() =>
            setDeleteModalOpen(true)
          }
          aria-label={`Delete ${meal.name}`}
          className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#8a9492] transition-colors hover:bg-red-50 hover:text-red-600 active:bg-red-100"
        >
          <Trash2 size={16} />
        </button>

      </div>

      {/* Delete Modal */}
      <DeleteMealModal
        open={deleteModalOpen}
        mealName={meal.name}
        deleting={deleting}
        onClose={() =>
          setDeleteModalOpen(false)
        }
        onConfirm={handleDelete}
      />
    </>
  );
}