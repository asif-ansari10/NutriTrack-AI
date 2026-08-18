import { createClient } from "@/lib/supabase/server";

export interface WeightLog {
  id: string;
  weight_kg: number;
  recorded_at: string;
}

export interface Meal {
  id: string;
  meal_date: string;
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
}

export interface ProgressProfile {
  current_weight_kg: number | null;
  target_weight_kg: number | null;
  daily_calorie_target: number | null;
  protein_target_g: number | null;
}

export interface DailyProgress {
  date: string;
  calories: number;
  protein: number;
  weight: number | null;
}

function getMonthRange(month: string) {
  const [year, monthNumber] = month
    .split("-")
    .map(Number);

  const start = `${year}-${String(
    monthNumber
  ).padStart(2, "0")}-01`;

  const lastDay = new Date(
    year,
    monthNumber,
    0
  ).getDate();

  const end = `${year}-${String(
    monthNumber
  ).padStart(2, "0")}-${lastDay}`;

  return {
    start,
    end,
  };
}

export async function getProgressData(
  selectedMonth: string
) {
  const supabase = await createClient();

  const {
    data: {
      user,
    },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const {
    start,
    end,
  } = getMonthRange(selectedMonth);

  // -----------------------------
  // PROFILE
  // -----------------------------

  const {
    data: profile,
    error: profileError,
  } = await supabase
    .from("profiles")
    .select(
      `
      current_weight_kg,
      target_weight_kg,
      daily_calorie_target,
      protein_target_g
      `
    )
    .eq("id", user.id)
    .single();

  if (profileError) {
    console.error(
      "PROFILE ERROR:",
      profileError
    );
  }

  // -----------------------------
  // WEIGHT LOGS
  // -----------------------------

  const {
    data: weightLogs,
    error: weightError,
  } = await supabase
    .from("weight_logs")
    .select(
      `
      id,
      weight_kg,
      recorded_at
      `
    )
    .eq("user_id", user.id)
    .gte("recorded_at", start)
    .lte("recorded_at", end)
    .order("recorded_at", {
      ascending: true,
    });

  if (weightError) {
    console.error(
      "WEIGHT ERROR:",
      weightError
    );
  }

  // -----------------------------
  // MEALS
  // -----------------------------

  const {
    data: meals,
    error: mealsError,
  } = await supabase
    .from("meals")
    .select(
      `
      id,
      meal_date,
      calories,
      protein_g,
      carbs_g,
      fat_g
      `
    )
    .eq("user_id", user.id)
    .gte("meal_date", start)
    .lte("meal_date", end)
    .order("meal_date", {
      ascending: true,
    });

  if (mealsError) {
    console.error(
      "MEALS ERROR:",
      mealsError
    );
  }

  const safeWeights =
    (weightLogs ?? []) as WeightLog[];

  const safeMeals =
    (meals ?? []) as Meal[];

  // -----------------------------
  // DAILY AGGREGATION
  // -----------------------------

  const dailyMap =
    new Map<string, DailyProgress>();

  safeMeals.forEach((meal) => {
    const existing =
      dailyMap.get(meal.meal_date);

    if (existing) {
      existing.calories +=
        Number(meal.calories || 0);

      existing.protein +=
        Number(meal.protein_g || 0);
    } else {
      dailyMap.set(meal.meal_date, {
        date: meal.meal_date,
        calories: Number(
          meal.calories || 0
        ),
        protein: Number(
          meal.protein_g || 0
        ),
        weight: null,
      });
    }
  });

  // Attach weight to corresponding dates
  safeWeights.forEach((log) => {
    const date =
      log.recorded_at.slice(0, 10);

    const existing =
      dailyMap.get(date);

    if (existing) {
      existing.weight =
        Number(log.weight_kg);
    } else {
      dailyMap.set(date, {
        date,
        calories: 0,
        protein: 0,
        weight: Number(log.weight_kg),
      });
    }
  });

  const daily = Array.from(
    dailyMap.values()
  ).sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  // -----------------------------
  // MONTHLY TOTALS
  // -----------------------------

  const totalCalories =
    daily.reduce(
      (sum, day) =>
        sum + day.calories,
      0
    );

  const totalProtein =
    daily.reduce(
      (sum, day) =>
        sum + day.protein,
      0
    );

  const loggedDays =
    daily.filter(
      (day) =>
        day.calories > 0 ||
        day.protein > 0
    ).length;

  const averageCalories =
    loggedDays > 0
      ? Math.round(
          totalCalories /
            loggedDays
        )
      : 0;

  const averageProtein =
    loggedDays > 0
      ? Math.round(
          totalProtein /
            loggedDays
        )
      : 0;

  // -----------------------------
  // WEIGHT
  // -----------------------------

  const firstWeight =
    safeWeights.length > 0
      ? Number(
          safeWeights[0].weight_kg
        )
      : Number(
          profile?.current_weight_kg ??
            0
        );

  const lastWeight =
    safeWeights.length > 0
      ? Number(
          safeWeights[
            safeWeights.length - 1
          ].weight_kg
        )
      : Number(
          profile?.current_weight_kg ??
            0
        );

  const weightChange =
    lastWeight - firstWeight;

  const targetWeight =
    Number(
      profile?.target_weight_kg ?? 0
    );

  const currentWeight =
    lastWeight ||
    Number(
      profile?.current_weight_kg ?? 0
    );

  const startingWeight =
    firstWeight ||
    currentWeight;

  const totalDistance =
    startingWeight - targetWeight;

  const achieved =
    startingWeight - currentWeight;

  const goalPercentage =
    totalDistance > 0
      ? Math.min(
          100,
          Math.max(
            0,
            (achieved /
              totalDistance) *
              100
          )
        )
      : 0;

  const remaining =
    Math.max(
      0,
      currentWeight -
        targetWeight
    );

  return {
    profile: {
      currentWeight,
      targetWeight,
      dailyCalorieTarget:
        Number(
          profile?.daily_calorie_target ??
            0
        ),
      proteinTarget:
        Number(
          profile?.protein_target_g ??
            0
        ),
    },

    daily,

    weightLogs: safeWeights,

    totals: {
      totalCalories,
      totalProtein,
      averageCalories,
      averageProtein,
      loggedDays,

      firstWeight,
      lastWeight,
      weightChange,

      remaining,
      goalPercentage,
    },
  };
}