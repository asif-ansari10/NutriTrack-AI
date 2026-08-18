import { createClient } from "@/lib/supabase/server";

export interface DiaryMeal {
  id: string;
  user_id: string;
  meal_date: string;
  meal_type: string;
  name: string;
  description: string | null;
  image_url: string | null;
  calories: number | null;
  protein_g: number | null;
  carbs_g: number | null;
  fat_g: number | null;
  created_at: string;
}

export interface DiaryActivity {
  id: string;
  user_id: string;
  activity_date: string;
  activity_type: string;
  activity_name: string;
  duration_minutes: number | null;
  calories_burned: number | null;
  note: string | null;
  created_at: string;
}

export interface DiaryProfile {
  id: string;
  full_name: string | null;
  goal: string | null;
  daily_calorie_target: number | null;
  protein_target_g: number | null;
  carbs_target_g: number | null;
  fat_target_g: number | null;
}

export interface DiaryTotals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  exerciseCalories: number;
  baselineBurn: number;
  totalBurn: number;
  deficit: number;
}

export interface DiaryData {
  user: {
    id: string;
    email: string | null;
  } | null;

  profile: DiaryProfile | null;

  meals: DiaryMeal[];

  activities: DiaryActivity[];

  totals: DiaryTotals;
}

function getToday() {
  return new Intl.DateTimeFormat(
    "en-CA",
    {
      timeZone: "Asia/Kolkata",
    }
  ).format(new Date());
}

export async function getDiaryData(): Promise<DiaryData> {
  const supabase = await createClient();

  const {
    data: {
      user,
    },
  } = await supabase.auth.getUser();

  /*
   * Not logged in
   */
  if (!user) {
    return {
      user: null,
      profile: null,
      meals: [],
      activities: [],
      totals: {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        exerciseCalories: 0,
        baselineBurn: 0,
        totalBurn: 0,
        deficit: 0,
      },
    };
  }

  const today = getToday();

  const [
    profileResult,
    mealsResult,
    activitiesResult,
  ] = await Promise.all([
    supabase
      .from("profiles")
      .select(
        `
          id,
          full_name,
          goal,
          daily_calorie_target,
          protein_target_g,
          carbs_target_g,
          fat_target_g
        `
      )
      .eq("id", user.id)
      .maybeSingle(),

    supabase
      .from("meals")
      .select(
        `
          id,
          user_id,
          meal_date,
          meal_type,
          name,
          description,
          image_url,
          calories,
          protein_g,
          carbs_g,
          fat_g,
          created_at
        `
      )
      .eq("user_id", user.id)
      .eq("meal_date", today)
      .order("created_at", {
        ascending: true,
      }),

    supabase
      .from("activities")
      .select(
        `
          id,
          user_id,
          activity_date,
          activity_type,
          activity_name,
          duration_minutes,
          calories_burned,
          note,
          created_at
        `
      )
      .eq("user_id", user.id)
      .eq("activity_date", today)
      .order("created_at", {
        ascending: true,
      }),
  ]);

  if (profileResult.error) {
    console.error(
      "Diary profile error:",
      profileResult.error
    );
  }

  if (mealsResult.error) {
    console.error(
      "Diary meals error:",
      mealsResult.error
    );
  }

  if (activitiesResult.error) {
    console.error(
      "Diary activities error:",
      activitiesResult.error
    );
  }

  const profile =
    profileResult.data as DiaryProfile | null;

  const meals =
    (mealsResult.data ||
      []) as DiaryMeal[];

  const activities =
    (activitiesResult.data ||
      []) as DiaryActivity[];

  /*
   * Today's food totals
   */
  const calories = meals.reduce(
    (sum, meal) =>
      sum +
      Number(meal.calories || 0),
    0
  );

  const protein = meals.reduce(
    (sum, meal) =>
      sum +
      Number(meal.protein_g || 0),
    0
  );

  const carbs = meals.reduce(
    (sum, meal) =>
      sum +
      Number(meal.carbs_g || 0),
    0
  );

  const fat = meals.reduce(
    (sum, meal) =>
      sum +
      Number(meal.fat_g || 0),
    0
  );

  /*
   * Today's exercise calories
   */
  const exerciseCalories =
    activities.reduce(
      (sum, activity) =>
        sum +
        Number(
          activity.calories_burned || 0
        ),
      0
    );

  /*
   * Baseline burn.
   *
   * We use the calorie target as a safe
   * fallback when a separate TDEE value
   * is not stored.
   */
  const baselineBurn = Number(
    profile?.daily_calorie_target || 0
  );

  const totalBurn =
    baselineBurn +
    exerciseCalories;

  const deficit =
    totalBurn - calories;

  return {
    user: {
      id: user.id,
      email: user.email || null,
    },

    profile,

    meals,

    activities,

    totals: {
      calories: Math.round(calories),
      protein: Math.round(protein * 10) / 10,
      carbs: Math.round(carbs * 10) / 10,
      fat: Math.round(fat * 10) / 10,
      exerciseCalories,
      baselineBurn,
      totalBurn,
      deficit,
    },
  };
}