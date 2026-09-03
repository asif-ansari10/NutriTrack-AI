// import { createClient } from "@/lib/supabase/server";

// export interface DiaryMeal {
//   id: string;
//   user_id: string;
//   meal_date: string;
//   meal_type: string;
//   name: string;
//   description: string | null;
//   image_url: string | null;
//   calories: number | null;
//   protein_g: number | null;
//   carbs_g: number | null;
//   fat_g: number | null;
//   created_at: string;
// }

// export interface DiaryActivity {
//   id: string;
//   user_id: string;
//   activity_date: string;
//   activity_type: string;
//   activity_name: string;
//   duration_minutes: number | null;
//   calories_burned: number | null;
//   note: string | null;
//   created_at: string;
// }

// export interface DiaryProfile {
//   id: string;
//   full_name: string | null;
//   goal: string | null;
//   daily_calorie_target: number | null;
//   protein_target_g: number | null;
//   carbs_target_g: number | null;
//   fat_target_g: number | null;
// }

// export interface DiaryTotals {
//   calories: number;
//   protein: number;
//   carbs: number;
//   fat: number;
//   exerciseCalories: number;
//   baselineBurn: number;
//   totalBurn: number;
//   deficit: number;
// }

// export interface DiaryData {
//   user: {
//     id: string;
//     email: string | null;
//   } | null;

//   profile: DiaryProfile | null;

//   meals: DiaryMeal[];

//   activities: DiaryActivity[];

//   totals: DiaryTotals;
// }

// function getToday() {
//   return new Intl.DateTimeFormat(
//     "en-CA",
//     {
//       timeZone: "Asia/Kolkata",
//     }
//   ).format(new Date());
// }

// export async function getDiaryData(): Promise<DiaryData> {
//   const supabase = await createClient();

//   const {
//     data: {
//       user,
//     },
//   } = await supabase.auth.getUser();

//   /*
//    * Not logged in
//    */
//   if (!user) {
//     return {
//       user: null,
//       profile: null,
//       meals: [],
//       activities: [],
//       totals: {
//         calories: 0,
//         protein: 0,
//         carbs: 0,
//         fat: 0,
//         exerciseCalories: 0,
//         baselineBurn: 0,
//         totalBurn: 0,
//         deficit: 0,
//       },
//     };
//   }

//   const today = getToday();

//   const [
//     profileResult,
//     mealsResult,
//     activitiesResult,
//   ] = await Promise.all([
//     supabase
//       .from("profiles")
//       .select(
//         `
//           id,
//           full_name,
//           goal,
//           daily_calorie_target,
//           protein_target_g,
//           carbs_target_g,
//           fat_target_g
//         `
//       )
//       .eq("id", user.id)
//       .maybeSingle(),

//     supabase
//       .from("meals")
//       .select(
//         `
//           id,
//           user_id,
//           meal_date,
//           meal_type,
//           name,
//           description,
//           image_url,
//           calories,
//           protein_g,
//           carbs_g,
//           fat_g,
//           created_at
//         `
//       )
//       .eq("user_id", user.id)
//       .eq("meal_date", today)
//       .order("created_at", {
//         ascending: true,
//       }),

//     supabase
//       .from("activities")
//       .select(
//         `
//           id,
//           user_id,
//           activity_date,
//           activity_type,
//           activity_name,
//           duration_minutes,
//           calories_burned,
//           note,
//           created_at
//         `
//       )
//       .eq("user_id", user.id)
//       .eq("activity_date", today)
//       .order("created_at", {
//         ascending: true,
//       }),
//   ]);

//   if (profileResult.error) {
//     console.error(
//       "Diary profile error:",
//       profileResult.error
//     );
//   }

//   if (mealsResult.error) {
//     console.error(
//       "Diary meals error:",
//       mealsResult.error
//     );
//   }

//   if (activitiesResult.error) {
//     console.error(
//       "Diary activities error:",
//       activitiesResult.error
//     );
//   }

//   const profile =
//     profileResult.data as DiaryProfile | null;

//   const meals =
//     (mealsResult.data ||
//       []) as DiaryMeal[];

//   const activities =
//     (activitiesResult.data ||
//       []) as DiaryActivity[];

//   /*
//    * Today's food totals
//    */
//   const calories = meals.reduce(
//     (sum, meal) =>
//       sum +
//       Number(meal.calories || 0),
//     0
//   );

//   const protein = meals.reduce(
//     (sum, meal) =>
//       sum +
//       Number(meal.protein_g || 0),
//     0
//   );

//   const carbs = meals.reduce(
//     (sum, meal) =>
//       sum +
//       Number(meal.carbs_g || 0),
//     0
//   );

//   const fat = meals.reduce(
//     (sum, meal) =>
//       sum +
//       Number(meal.fat_g || 0),
//     0
//   );

//   /*
//    * Today's exercise calories
//    */
//   const exerciseCalories =
//     activities.reduce(
//       (sum, activity) =>
//         sum +
//         Number(
//           activity.calories_burned || 0
//         ),
//       0
//     );

//   /*
//    * Baseline burn.
//    *
//    * We use the calorie target as a safe
//    * fallback when a separate TDEE value
//    * is not stored.
//    */
//   const baselineBurn = Number(
//     profile?.daily_calorie_target || 0
//   );

//   const totalBurn =
//     baselineBurn +
//     exerciseCalories;

//   const deficit =
//     totalBurn - calories;

//   return {
//     user: {
//       id: user.id,
//       email: user.email || null,
//     },

//     profile,

//     meals,

//     activities,

//     totals: {
//       calories: Math.round(calories),
//       protein: Math.round(protein * 10) / 10,
//       carbs: Math.round(carbs * 10) / 10,
//       fat: Math.round(fat * 10) / 10,
//       exerciseCalories,
//       baselineBurn,
//       totalBurn,
//       deficit,
//     },
//   };
// }

import { createClient } from "@/lib/supabase/server";

export type MealType =
  | "breakfast"
  | "lunch"
  | "before_workout"
  | "snack"
  | "after_workout"
  | "dinner";

export interface DiaryMeal {
  id: string;
  meal_date: string;
  meal_type: MealType;
  name: string;
  description: string | null;
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  fiber_g: number;
  image_url?: string | null;
  ai_analyzed?: boolean;
  ai_confidence?: number | null;
  serving_size?: string | null;
  created_at: string;
}

export interface DiaryActivity {
  id: string;
  activity_date: string;
  activity_type: string;
  activity_name: string;
  duration_minutes: number;
  calories_burned: number;
  note: string | null;
  created_at: string;
}

export interface DiaryData {
  user: {
    id: string;
    email?: string;
  } | null;

  profile: {
    fullName: string;
    currentWeight: number;
    targetWeight: number;
    dailyCalorieTarget: number;
    proteinTarget: number;
    carbsTarget: number;
    fatTarget: number;
    gender: string | null;
    dateOfBirth: string | null;
    heightCm: number | null;
    activityLevel: string | null;
  } | null;

  meals: DiaryMeal[];
  activities: DiaryActivity[];

  totals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    exerciseCalories: number;
    baselineBurn: number;
    totalBurn: number;
    estimatedDeficit: number;
  };

  mealGroups: Record<MealType, DiaryMeal[]>;
}

function getTodayIndia() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
  }).format(new Date());
}

function calculateAge(dateOfBirth: string | null) {
  if (!dateOfBirth) return null;

  const birth = new Date(`${dateOfBirth}T00:00:00`);
  if (Number.isNaN(birth.getTime())) return null;

  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();

  const monthDifference =
    now.getMonth() - birth.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 &&
      now.getDate() < birth.getDate())
  ) {
    age -= 1;
  }

  return age > 0 ? age : null;
}

function getActivityMultiplier(level: string | null) {
  switch (level) {
    case "light":
      return 1.375;
    case "moderate":
      return 1.55;
    case "active":
      return 1.725;
    case "very_active":
      return 1.9;
    default:
      return 1.2;
  }
}

function calculateBaselineBurn(profile: {
  gender: string | null;
  dateOfBirth: string | null;
  heightCm: number | null;
  currentWeight: number;
  activityLevel: string | null;
}) {
  const age = calculateAge(profile.dateOfBirth);

  if (
    !age ||
    !profile.heightCm ||
    !profile.currentWeight
  ) {
    return 0;
  }

  let bmr =
    10 * profile.currentWeight +
    6.25 * profile.heightCm -
    5 * age;

  if (
    profile.gender === "male" ||
    profile.gender === "m"
  ) {
    bmr += 5;
  } else if (
    profile.gender === "female" ||
    profile.gender === "f"
  ) {
    bmr -= 161;
  } else {
    bmr -= 78;
  }

  return Math.round(
    bmr * getActivityMultiplier(profile.activityLevel)
  );
}

export async function getDiaryData(): Promise<DiaryData> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

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
        fiber: 0,
        exerciseCalories: 0,
        baselineBurn: 0,
        totalBurn: 0,
        estimatedDeficit: 0,
      },
      mealGroups: {
        breakfast: [],
        lunch: [],
        before_workout: [],
        snack: [],
        after_workout: [],
        dinner: [],
      },
    };
  }

  const today = getTodayIndia();

  const [
    profileResult,
    mealsResult,
    activitiesResult,
  ] = await Promise.all([
    supabase
      .from("profiles")
      .select(`
        id,
        full_name,
        gender,
        date_of_birth,
        height_cm,
        current_weight_kg,
        target_weight_kg,
        activity_level,
        daily_calorie_target,
        protein_target_g,
        carbs_target_g,
        fat_target_g
      `)
      .eq("id", user.id)
      .maybeSingle(),

    supabase
      .from("meals")
      .select(`
        id,
        meal_date,
        meal_type,
        name,
        description,
        calories,
        protein_g,
        carbs_g,
        fat_g,
        fiber_g,
        image_url,
        ai_analyzed,
        ai_confidence,
        serving_size,
        created_at
      `)
      .eq("user_id", user.id)
      .eq("meal_date", today)
      .order("created_at", {
        ascending: true,
      }),

    supabase
      .from("activities")
      .select(`
        id,
        activity_date,
        activity_type,
        activity_name,
        duration_minutes,
        calories_burned,
        note,
        created_at
      `)
      .eq("user_id", user.id)
      .eq("activity_date", today)
      .order("created_at", {
        ascending: true,
      }),
  ]);

  if (profileResult.error) {
    console.error(
      "GET DIARY PROFILE ERROR:",
      profileResult.error
    );
  }

  if (mealsResult.error) {
    console.error(
      "GET DIARY MEALS ERROR:",
      mealsResult.error
    );
  }

  if (activitiesResult.error) {
    console.error(
      "GET DIARY ACTIVITIES ERROR:",
      activitiesResult.error
    );
  }

  const rawProfile = profileResult.data;

  const profile = rawProfile
    ? {
        fullName:
          rawProfile.full_name || "User",
        currentWeight:
          Number(rawProfile.current_weight_kg) || 0,
        targetWeight:
          Number(rawProfile.target_weight_kg) || 0,
        dailyCalorieTarget:
          Number(rawProfile.daily_calorie_target) || 0,
        proteinTarget:
          Number(rawProfile.protein_target_g) || 0,
        carbsTarget:
          Number(rawProfile.carbs_target_g) || 0,
        fatTarget:
          Number(rawProfile.fat_target_g) || 0,
        gender:
          rawProfile.gender || null,
        dateOfBirth:
          rawProfile.date_of_birth || null,
        heightCm:
          rawProfile.height_cm == null
            ? null
            : Number(rawProfile.height_cm),
        activityLevel:
          rawProfile.activity_level || null,
      }
    : null;

  const meals: DiaryMeal[] =
    (mealsResult.data || []).map((meal) => ({
      id: meal.id,
      meal_date: meal.meal_date,
      meal_type: meal.meal_type as MealType,
      name: meal.name,
      description: meal.description,
      calories: Number(meal.calories) || 0,
      protein_g: Number(meal.protein_g) || 0,
      carbs_g: Number(meal.carbs_g) || 0,
      fat_g: Number(meal.fat_g) || 0,
      fiber_g: Number(meal.fiber_g) || 0,
      image_url: meal.image_url,
      ai_analyzed: meal.ai_analyzed,
      ai_confidence:
        meal.ai_confidence == null
          ? null
          : Number(meal.ai_confidence),
      serving_size: meal.serving_size,
      created_at: meal.created_at,
    }));

  const activities: DiaryActivity[] =
    (activitiesResult.data || []).map(
      (activity) => ({
        id: activity.id,
        activity_date:
          activity.activity_date,
        activity_type:
          activity.activity_type,
        activity_name:
          activity.activity_name,
        duration_minutes:
          Number(activity.duration_minutes) || 0,
        calories_burned:
          Number(activity.calories_burned) || 0,
        note: activity.note,
        created_at:
          activity.created_at,
      })
    );

  const totals = meals.reduce(
    (sum, meal) => ({
      calories:
        sum.calories + meal.calories,
      protein:
        sum.protein + meal.protein_g,
      carbs:
        sum.carbs + meal.carbs_g,
      fat:
        sum.fat + meal.fat_g,
      fiber:
        sum.fiber + meal.fiber_g,
    }),
    {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
    }
  );

  const exerciseCalories =
    activities.reduce(
      (sum, activity) =>
        sum + activity.calories_burned,
      0
    );

  const baselineBurn = profile
    ? calculateBaselineBurn(profile)
    : 0;

  const totalBurn =
    baselineBurn + exerciseCalories;

  return {
    user: {
      id: user.id,
      email: user.email,
    },

    profile,

    meals,
    activities,

    totals: {
      ...totals,
      exerciseCalories,
      baselineBurn,
      totalBurn,
      estimatedDeficit:
        totalBurn - totals.calories,
    },

    mealGroups: {
      breakfast: meals.filter(
        (meal) =>
          meal.meal_type === "breakfast"
      ),
      lunch: meals.filter(
        (meal) =>
          meal.meal_type === "lunch"
      ),
      before_workout: meals.filter(
        (meal) =>
          meal.meal_type === "before_workout"
      ),
      snack: meals.filter(
        (meal) =>
          meal.meal_type === "snack"
      ),
      after_workout: meals.filter(
        (meal) =>
          meal.meal_type === "after_workout"
      ),
      dinner: meals.filter(
        (meal) =>
          meal.meal_type === "dinner"
      ),
    },
  };
}
