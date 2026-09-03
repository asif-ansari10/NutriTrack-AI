import { createClient } from "@/lib/supabase/server";

/* ============================================================
   DASHBOARD MEAL
============================================================ */

export interface DashboardMeal {
  id: string;
  meal_type: string;
  name: string;
  description: string | null;
  image_url: string | null;

  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  fiber_g: number;

  serving_size: string | null;
}

/* ============================================================
   DASHBOARD ACTIVITY
============================================================ */

export interface DashboardActivity {
  id: string;
  activity_type: string;
  activity_name: string;
  duration_minutes: number | null;
  calories_burned: number;
  note: string | null;
}

/* ============================================================
   DASHBOARD DATA
============================================================ */

export interface DashboardData {
  authenticated: boolean;

  profile: {
    full_name: string;
    goal: string | null;

    current_weight_kg: number | null;
    target_weight_kg: number | null;

    daily_calorie_target: number;
    protein_target_g: number;
    carbs_target_g: number;
    fat_target_g: number;
    fiber_target_g: number;

    activity_level: string | null;
  } | null;

  meals: DashboardMeal[];

  activities: DashboardActivity[];

  totals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    exerciseCalories: number;
  };
}

/* ============================================================
   EMPTY DATA
============================================================ */

const EMPTY_DATA: DashboardData = {
  authenticated: false,

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
  },
};

/* ============================================================
   GET DASHBOARD DATA
============================================================ */

export async function getDashboardData(): Promise<DashboardData> {
  const supabase =
    await createClient();

  /* ==========================================================
     AUTH
  ========================================================== */

  const {
    data: { user },
  } =
    await supabase.auth.getUser();

  /*
   * User is not logged in.
   *
   * Never return fake/demo data.
   */

  if (!user) {
    return EMPTY_DATA;
  }

  /* ==========================================================
     TODAY - INDIA
  ========================================================== */

  const today =
    new Intl.DateTimeFormat(
      "en-CA",
      {
        timeZone:
          "Asia/Kolkata",
      }
    ).format(new Date());

  /* ==========================================================
     PROFILE
  ========================================================== */

  const {
    data: profile,
    error: profileError,
  } =
    await supabase
      .from("profiles")
      .select(
        `
          full_name,
          goal,
          current_weight_kg,
          target_weight_kg,

          daily_calorie_target,
          protein_target_g,
          carbs_target_g,
          fat_target_g,
          fiber_target_g,

          activity_level
        `
      )
      .eq(
        "id",
        user.id
      )
      .maybeSingle();

  if (profileError) {
    console.error(
      "Dashboard profile error:",
      profileError
    );
  }

  /* ==========================================================
     TODAY'S MEALS
  ========================================================== */

  const {
    data: meals,
    error: mealsError,
  } =
    await supabase
      .from("meals")
      .select(
        `
          id,
          meal_type,
          name,
          description,
          image_url,

          calories,
          protein_g,
          carbs_g,
          fat_g,
          fiber_g,

          serving_size
        `
      )
      .eq(
        "user_id",
        user.id
      )
      .eq(
        "meal_date",
        today
      )
      .order(
        "created_at",
        {
          ascending: true,
        }
      );

  if (mealsError) {
    console.error(
      "Dashboard meals error:",
      mealsError
    );
  }

  /* ==========================================================
     TODAY'S ACTIVITIES
  ========================================================== */

  const {
    data: activities,
    error: activitiesError,
  } =
    await supabase
      .from("activities")
      .select(
        `
          id,
          activity_type,
          activity_name,
          duration_minutes,
          calories_burned,
          note
        `
      )
      .eq(
        "user_id",
        user.id
      )
      .eq(
        "activity_date",
        today
      )
      .order(
        "created_at",
        {
          ascending: true,
        }
      );

  if (activitiesError) {
    console.error(
      "Dashboard activities error:",
      activitiesError
    );
  }

  /* ==========================================================
     SAFE DATA
  ========================================================== */

  const safeMeals =
    (meals ?? []) as DashboardMeal[];

  const safeActivities =
    (activities ?? []) as DashboardActivity[];

  /* ==========================================================
     CALCULATE FOOD TOTALS
     
     Includes:
     - Calories
     - Protein
     - Carbs
     - Fat
     - Fiber
  ========================================================== */

  const totals =
    safeMeals.reduce(
      (
        acc,
        meal
      ) => {
        acc.calories +=
          Number(
            meal.calories || 0
          );

        acc.protein +=
          Number(
            meal.protein_g || 0
          );

        acc.carbs +=
          Number(
            meal.carbs_g || 0
          );

        acc.fat +=
          Number(
            meal.fat_g || 0
          );

        acc.fiber +=
          Number(
            meal.fiber_g || 0
          );

        return acc;
      },
      {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber: 0,
      }
    );

  /* ==========================================================
     EXERCISE CALORIES
  ========================================================== */

  const exerciseCalories =
    safeActivities.reduce(
      (
        total,
        activity
      ) =>
        total +
        Number(
          activity.calories_burned ||
            0
        ),
      0
    );

  /* ==========================================================
     RETURN DASHBOARD DATA
  ========================================================== */

  return {
    authenticated: true,

    /* ========================================================
       PROFILE
    ======================================================== */

    profile: profile
      ? {
          full_name:
            profile.full_name ||
            "",

          goal:
            profile.goal ||
            null,

          current_weight_kg:
            profile.current_weight_kg !==
            null
              ? Number(
                  profile.current_weight_kg
                )
              : null,

          target_weight_kg:
            profile.target_weight_kg !==
            null
              ? Number(
                  profile.target_weight_kg
                )
              : null,

          daily_calorie_target:
            Number(
              profile.daily_calorie_target ||
                0
            ),

          protein_target_g:
            Number(
              profile.protein_target_g ||
                0
            ),

          carbs_target_g:
            Number(
              profile.carbs_target_g ||
                0
            ),

          fat_target_g:
            Number(
              profile.fat_target_g ||
                0
            ),

          fiber_target_g:
            Number(
              profile.fiber_target_g ||
                0
            ),

          activity_level:
            profile.activity_level ||
            null,
        }
      : null,

    /* ========================================================
       MEALS
    ======================================================== */

    meals: safeMeals,

    /* ========================================================
       ACTIVITIES
    ======================================================== */

    activities:
      safeActivities,

    /* ========================================================
       TOTALS
    ======================================================== */

    totals: {
      calories:
        Math.round(
          totals.calories
        ),

      protein:
        Math.round(
          totals.protein
        ),

      carbs:
        Math.round(
          totals.carbs
        ),

      fat:
        Math.round(
          totals.fat
        ),

      /*
       * Fiber can be decimal,
       * so keep one decimal place.
       */
      fiber:
        Math.round(
          totals.fiber * 10
        ) / 10,

      exerciseCalories:
        Math.round(
          exerciseCalories
        ),
    },
  };
}