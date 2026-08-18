import DiaryHeader from "./DiaryHeader";
import DiarySummary from "./DiarySummary";
import MealSection from "./MealSection";
import EnergyBalance from "./EnergyBalance";
import ActivitySection from "./ActivitySection";

import type { DiaryData } from "@/lib/diary/getDiaryData";

interface DiaryPageProps {
  data: DiaryData;
}

export default function DiaryPage({
  data,
}: DiaryPageProps) {
  const {
    meals,
    activities,
    totals,
  } = data;

  const breakfast = meals.filter(
    (meal) => meal.meal_type === "breakfast"
  );

  const lunch = meals.filter(
    (meal) => meal.meal_type === "lunch"
  );

  const snack = meals.filter(
    (meal) => meal.meal_type === "snack"
  );

  const dinner = meals.filter(
    (meal) => meal.meal_type === "dinner"
  );

  return (
    <div className="w-full">

      <DiaryHeader />

      <DiarySummary
        calories={totals.calories}
        protein={totals.protein}
        carbs={totals.carbs}
        fat={totals.fat}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">

        {/* LEFT */}
        <div className="min-w-0 space-y-5">

          <MealSection
            mealType="breakfast"
            title="Breakfast"
            meals={breakfast}
          />

          <MealSection
            mealType="lunch"
            title="Lunch"
            meals={lunch}
          />

          <MealSection
            mealType="snack"
            title="Snack"
            meals={snack}
          />

          <MealSection
            mealType="dinner"
            title="Dinner"
            meals={dinner}
          />

        </div>

        {/* RIGHT */}
        <div className="min-w-0 space-y-6">

          <EnergyBalance
            foodIntake={totals.calories}
            baselineBurn={totals.baselineBurn}
            exerciseCalories={
              totals.exerciseCalories
            }
            totalBurn={totals.totalBurn}
            deficit={totals.deficit}
          />

          <ActivitySection
            activities={activities}
          />

        </div>

      </div>

    </div>
  );
}