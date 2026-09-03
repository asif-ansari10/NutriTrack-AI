"use client";

import {
  Apple,
  Dumbbell,
  Moon,
  Plus,
  Sunrise,
  Trash2,
  Utensils,
} from "lucide-react";

import type {
  DiaryMeal,
  MealType,
} from "@/lib/diary/getDiaryData";

interface Props {
  type: MealType;
  meals: DiaryMeal[];
  onAdd: () => void;
  onDelete: (id: string) => void;
}

const CONFIG: Record<
  MealType,
  {
    title: string;
    icon: React.ReactNode;
    iconBg: string;
    iconColor: string;
  }
> = {
  breakfast: {
    title: "Breakfast",
    icon: <Sunrise size={22} />,
    iconBg: "bg-[#e7f8f5]",
    iconColor: "text-[#00685f]",
  },
  lunch: {
    title: "Lunch",
    icon: <Utensils size={21} />,
    iconBg: "bg-[#e7f8f5]",
    iconColor: "text-[#00685f]",
  },
  before_workout: {
    title: "Before Workout",
    icon: <Dumbbell size={21} />,
    iconBg: "bg-[#eef7ff]",
    iconColor: "text-[#0058be]",
  },
  snack: {
    title: "Snack",
    icon: <Apple size={21} />,
    iconBg: "bg-[#fff5e8]",
    iconColor: "text-[#b86b00]",
  },
  after_workout: {
    title: "After Workout",
    icon: <Dumbbell size={21} />,
    iconBg: "bg-[#f0ebff]",
    iconColor: "text-[#6941c6]",
  },
  dinner: {
    title: "Dinner",
    icon: <Moon size={21} />,
    iconBg: "bg-[#eef0ff]",
    iconColor: "text-[#4754a8]",
  },
};

function formatTime(value: string) {
  return new Intl.DateTimeFormat(
    "en-IN",
    {
      hour: "numeric",
      minute: "2-digit",
    }
  ).format(new Date(value));
}

function formatNumber(value: number) {
  return Number.isInteger(value)
    ? String(value)
    : value.toFixed(1);
}

export default function MealSection({
  type,
  meals,
  onAdd,
  onDelete,
}: Props) {
  const config = CONFIG[type];

  const totalCalories = meals.reduce(
    (sum, meal) => sum + meal.calories,
    0
  );

  return (
    <section className="overflow-hidden rounded-[22px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-between gap-4 px-5 pt-5 sm:px-7 sm:pt-7">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${config.iconBg} ${config.iconColor}`}
          >
            {config.icon}
          </div>

          <h2 className="truncate text-lg font-bold text-[#191c1d] sm:text-xl">
            {config.title}
          </h2>
        </div>

        <span className="shrink-0 text-sm font-bold text-[#191c1d] sm:text-base">
          {totalCalories} kcal
        </span>
      </div>

      <div className="px-5 pb-4 pt-3 sm:px-7 sm:pb-5">
        {meals.length === 0 ? (
          <button
            type="button"
            onClick={onAdd}
            className="flex min-h-[46px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-[#b9c8c5] bg-[#fcfdfd] text-sm font-semibold text-[#00685f] transition-colors hover:border-[#00685f] hover:bg-[#f3fffd]"
          >
            <Plus size={18} />
            Add {config.title}
          </button>
        ) : (
          <>
            <div className="divide-y divide-[#edf0ef]">
              {meals.map((meal) => (
                <div
                  key={meal.id}
                  className="flex items-center gap-3 py-4 first:pt-3 last:pb-3 sm:gap-4 sm:py-5"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#eef2f1] text-xl sm:h-20 sm:w-20 sm:rounded-2xl">
                    <span aria-hidden="true">🍽️</span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p
                      className="truncate text-sm font-bold text-[#191c1d] sm:text-base"
                      title={meal.name}
                    >
                      {meal.name}
                    </p>

                    <p className="mt-1 truncate text-xs text-[#6e7977] sm:text-sm">
                      {formatTime(meal.created_at)}
                      {" • "}
                      {formatNumber(meal.protein_g)}g protein
                      {" • "}
                      {formatNumber(meal.fiber_g)}g fiber
                    </p>
                  </div>

                  {/* Desktop only */}
                  <span className="hidden shrink-0 text-sm font-bold text-[#004e47] md:block sm:text-base">
                    {meal.calories} kcal
                  </span>

                  <button
                    type="button"
                    onClick={() => onDelete(meal.id)}
                    aria-label={`Delete ${meal.name}`}
                    className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#7c8885] transition-colors hover:bg-red-50 hover:text-red-600 active:scale-95"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={onAdd}
              className="mt-2 flex min-h-[46px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-[#b9c8c5] bg-white text-sm font-semibold text-[#00685f] transition-colors hover:border-[#00685f] hover:bg-[#f3fffd]"
            >
              <Plus size={18} />
              Add {config.title}
            </button>
          </>
        )}
      </div>
    </section>
  );
}
