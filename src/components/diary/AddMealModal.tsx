"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Check,
  Loader2,
  ScanLine,
  Utensils,
  X,
} from "lucide-react";

import {
  addMeal,
  type ActionState,
} from "@/app/diary/actions";

interface Props {
  mealType: string;
  onClose: () => void;
}

const initialState: ActionState = {
  success: false,
  error: "",
};

const MEAL_TYPES = [
  ["breakfast", "Breakfast"],
  ["lunch", "Lunch"],
  ["before_workout", "Before Workout"],
  ["snack", "Snack"],
  ["after_workout", "After Workout"],
  ["dinner", "Dinner"],
] as const;

function getTodayIndia() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
  }).format(new Date());
}

export default function AddMealModal({
  mealType,
  onClose,
}: Props) {
  const [state, formAction, pending] =
    useActionState(
      addMeal,
      initialState
    );

  useEffect(() => {
    if (state.success) {
      onClose();
    }
  }, [state.success, onClose]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !pending) {
        onClose();
      }
    }

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [onClose, pending]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 px-3 py-4 sm:px-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-meal-title"
    >
      <button
        type="button"
        aria-label="Close"
        disabled={pending}
        onClick={onClose}
        className="absolute inset-0 cursor-default"
      />

      <div className="relative z-10 flex max-h-[calc(100dvh-32px)] w-full max-w-[640px] flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_25px_70px_rgba(0,0,0,0.22)]">
        <div className="flex shrink-0 items-center justify-between border-b border-[#e1e3e4] px-5 py-4 sm:px-6 sm:py-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e7f8f5] text-[#00685f]">
              <Utensils size={21} />
            </div>

            <div className="min-w-0">
              <h2
                id="add-meal-title"
                className="text-lg font-bold text-[#191c1d] sm:text-xl"
              >
                Add Meal
              </h2>
              <p className="text-xs text-[#6e7977] sm:text-sm">
                Add your meal and nutrition details.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={pending}
            aria-label="Close add meal"
            className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#687370] transition-colors hover:bg-[#f1f3f3] hover:text-[#191c1d] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={22} />
          </button>
        </div>

        <form
          action={formAction}
          className="min-h-0 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6 sm:py-6"
        >
          <input
            type="hidden"
            name="meal_date"
            value={getTodayIndia()}
          />

          <div className="space-y-5">
            <div>
              <label
                htmlFor="modal-meal-type"
                className="mb-2 block text-sm font-semibold text-[#191c1d]"
              >
                Meal Type
              </label>

              <select
                id="modal-meal-type"
                name="meal_type"
                defaultValue={
                  MEAL_TYPES.some(
                    ([value]) =>
                      value === mealType
                  )
                    ? mealType
                    : "breakfast"
                }
                className="h-12 w-full cursor-pointer rounded-xl border border-[#bec9c6] bg-white px-4 text-base text-[#191c1d] outline-none transition-colors focus:border-[#004e47] focus:ring-2 focus:ring-[#004e47]/10"
              >
                {MEAL_TYPES.map(
                  ([value, label]) => (
                    <option
                      key={value}
                      value={value}
                    >
                      {label}
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label
                htmlFor="modal-meal-name"
                className="mb-2 block text-sm font-semibold text-[#191c1d]"
              >
                Meal Name
              </label>

              <input
                id="modal-meal-name"
                name="name"
                type="text"
                required
                autoComplete="off"
                placeholder="Chicken Biryani"
                className="h-12 w-full rounded-xl border border-[#bec9c6] bg-white px-4 text-base text-[#191c1d] outline-none transition-colors placeholder:text-[#8a9491] focus:border-[#004e47] focus:ring-2 focus:ring-[#004e47]/10"
              />
            </div>

            <div>
              <label
                htmlFor="modal-description"
                className="mb-2 block text-sm font-semibold text-[#191c1d]"
              >
                Description
              </label>

              <textarea
                id="modal-description"
                name="description"
                rows={3}
                placeholder="Optional description..."
                className="w-full resize-none rounded-xl border border-[#bec9c6] bg-white px-4 py-3 text-base text-[#191c1d] outline-none transition-colors placeholder:text-[#8a9491] focus:border-[#004e47] focus:ring-2 focus:ring-[#004e47]/10"
              />
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="text-sm font-bold text-[#191c1d]">
                  Nutrition
                </h3>

                <Link
                  href="/scan?returnTo=/diary"
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00685f] transition-colors hover:text-[#004e47]"
                >
                  <ScanLine size={15} />
                  Scan with Photo
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                <NumberField
                  label="Calories"
                  name="calories"
                  suffix="kcal"
                />

                <NumberField
                  label="Protein"
                  name="protein_g"
                  step="0.1"
                  suffix="g"
                />

                <NumberField
                  label="Carbs"
                  name="carbs_g"
                  step="0.1"
                  suffix="g"
                />

                <NumberField
                  label="Fat"
                  name="fat_g"
                  step="0.1"
                  suffix="g"
                />

                <NumberField
                  label="Fiber"
                  name="fiber_g"
                  step="0.1"
                  suffix="g"
                />
              </div>
            </div>

            {state.error && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
              >
                {state.error}
              </div>
            )}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 border-t border-[#edf0ef] pt-5 sm:grid-cols-2">
            <button
              type="button"
              onClick={onClose}
              disabled={pending}
              className="min-h-[52px] w-full cursor-pointer rounded-xl border border-[#cbd5d3] bg-white px-5 text-base font-semibold text-[#3e4947] transition-colors hover:bg-[#f5f7f7] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={pending}
              className="flex min-h-[52px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#004e47] px-5 text-base font-bold text-white shadow-[0_5px_16px_rgba(0,78,71,0.18)] transition-colors hover:bg-[#003f3a] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? (
                <>
                  <Loader2
                    size={19}
                    className="animate-spin"
                  />
                  Saving...
                </>
              ) : (
                <>
                  <Check size={19} />
                  Add Meal
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function NumberField({
  label,
  name,
  step = "1",
  suffix,
}: {
  label: string;
  name: string;
  step?: string;
  suffix: string;
}) {
  return (
    <div className="min-w-0">
      <label
        htmlFor={`modal-${name}`}
        className="mb-2 block truncate text-xs font-medium text-[#3e4947]"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={`modal-${name}`}
          type="number"
          name={name}
          min="0"
          step={step}
          inputMode="decimal"
          defaultValue="0"
          className="h-12 w-full rounded-xl border border-[#bec9c6] bg-white px-3 pr-10 text-base text-[#191c1d] outline-none transition-colors focus:border-[#004e47] focus:ring-1 focus:ring-[#004e47]/10"
        />

        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#7b8683]">
          {suffix}
        </span>
      </div>
    </div>
  );
}
