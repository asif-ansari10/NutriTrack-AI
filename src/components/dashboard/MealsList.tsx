import Link from "next/link";
import { Plus } from "lucide-react";
import MealCard from "./MealCard";
import type {
  DashboardMeal,
} from "@/lib/dashboard/getDashboardData";

interface MealsListProps {
  meals: DashboardMeal[];
}

const mealColors: Record<
  string,
  string
> = {
  breakfast: "#FFF3E0",
  lunch: "#E3F2FD",
  dinner: "#E8F5E9",
  snack: "#F3E5F5",
};

const mealIcons: Record<
  string,
  string
> = {
  breakfast: "🌅",
  lunch: "☀️",
  dinner: "🌙",
  snack: "🥐",
};

function formatMealType(
  type: string
) {
  return type
    .replaceAll("_", " ")
    .replace(
      /\b\w/g,
      (letter) =>
        letter.toUpperCase()
    );
}

export default function MealsList({
  meals,
}: MealsListProps) {
  return (
    <section className="space-y-4">

      <div className="mb-2 flex items-center justify-between">

        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#3e4947]">
          Today's Meals
        </h2>

        <Link
          href="/scan"
          aria-label="Add meal"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-[#004e47] transition hover:bg-[#004e47]/5 active:scale-95"
        >
          <Plus size={20} />
        </Link>

      </div>

      {meals.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#c1c9c7] bg-white p-6 text-center">

          <p className="text-sm font-medium text-[#191c1d]">
            No meals logged today
          </p>

          <p className="mt-1 text-xs text-[#687370]">
            Scan or add your first meal.
          </p>

          <Link
            href="/scan"
            className="mt-4 inline-flex cursor-pointer items-center rounded-lg bg-[#004e47] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#003f3a]"
          >
            Add Meal
          </Link>

        </div>
      ) : (
        meals.map((meal) => {

          const type =
            meal.meal_type
              ?.toLowerCase() ||
            "snack";

          return (
            <MealCard
              key={meal.id}
              meal={formatMealType(type)}
              food={meal.name}
              calories={Number(
                meal.calories || 0
              )}
              icon={
                mealIcons[type] ||
                "🍽️"
              }
              color={
                mealColors[type] ||
                "#F3F4F5"
              }
            />
          );
        })
      )}

    </section>
  );
}