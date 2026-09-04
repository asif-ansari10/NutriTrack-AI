// import { createClient } from "@/lib/supabase/server";

// import {
//   calculateCoachTotals,
//   calculateRemaining,
// } from "./calculateCoachTotals";

// export interface CoachContext {
//   today: string;

//   monthStart: string;

//   profile: {
//     full_name: string;
//     goal: string | null;
//     gender: string | null;
//     date_of_birth: string | null;
//     height_cm: number | null;
//     current_weight_kg: number | null;
//     target_weight_kg: number | null;
//     activity_level: string | null;

//     daily_calorie_target: number;
//     protein_target_g: number;
//     carbs_target_g: number;
//     fat_target_g: number;
//     fiber_target_g: number;
//   } | null;

//   todayTotals: {
//     calories: number;
//     protein: number;
//     carbs: number;
//     fat: number;
//     fiber: number;
//     exerciseCalories: number;
//   };

//   remaining: {
//     calories: number;
//     protein: number;
//     carbs: number;
//     fat: number;
//     fiber: number;
//   };

//   todayMeals: unknown[];

//   todayActivities: unknown[];

//   monthMeals: unknown[];

//   monthActivities: unknown[];

//   weightHistory: unknown[];
// }

// function getTodayIndia() {
//   return new Intl.DateTimeFormat(
//     "en-CA",
//     {
//       timeZone: "Asia/Kolkata",
//     }
//   ).format(new Date());
// }

// function getMonthStartIndia() {
//   const today =
//     getTodayIndia();

//   return `${today.slice(
//     0,
//     7
//   )}-01`;
// }

// export async function getCoachContext(): Promise<{
//   authenticated: boolean;
//   context: CoachContext | null;
// }> {
//   const supabase =
//     await createClient();

//   const {
//     data: { user },
//   } =
//     await supabase.auth.getUser();

//   if (!user) {
//     return {
//       authenticated: false,
//       context: null,
//     };
//   }

//   const today =
//     getTodayIndia();

//   const monthStart =
//     getMonthStartIndia();

//   /* ========================================================
//      PROFILE
//   ======================================================== */

//   const {
//     data: profile,
//     error: profileError,
//   } = await supabase
//     .from("profiles")
//     .select(
//       `
//         full_name,
//         goal,
//         gender,
//         date_of_birth,
//         height_cm,
//         current_weight_kg,
//         target_weight_kg,
//         activity_level,
//         daily_calorie_target,
//         protein_target_g,
//         carbs_target_g,
//         fat_target_g,
//         fiber_target_g
//       `
//     )
//     .eq("id", user.id)
//     .maybeSingle();

//   if (profileError) {
//     console.error(
//       "Coach profile error:",
//       profileError
//     );
//   }

//   /* ========================================================
//      TODAY MEALS
//   ======================================================== */

//   const {
//     data: todayMeals,
//     error: todayMealsError,
//   } = await supabase
//     .from("meals")
//     .select(
//       `
//         id,
//         meal_date,
//         meal_type,
//         name,
//         description,
//         image_url,
//         calories,
//         protein_g,
//         carbs_g,
//         fat_g,
//         fiber_g,
//         serving_size,
//         created_at
//       `
//     )
//     .eq("user_id", user.id)
//     .eq("meal_date", today)
//     .order("created_at", {
//       ascending: true,
//     });

//   if (todayMealsError) {
//     console.error(
//       "Coach today's meals error:",
//       todayMealsError
//     );
//   }

//   /* ========================================================
//      TODAY ACTIVITIES
//   ======================================================== */

//   const {
//     data: todayActivities,
//     error: todayActivitiesError,
//   } = await supabase
//     .from("activities")
//     .select(
//       `
//         id,
//         activity_date,
//         activity_type,
//         activity_name,
//         duration_minutes,
//         calories_burned,
//         note,
//         created_at
//       `
//     )
//     .eq("user_id", user.id)
//     .eq(
//       "activity_date",
//       today
//     )
//     .order("created_at", {
//       ascending: true,
//     });

//   if (todayActivitiesError) {
//     console.error(
//       "Coach today's activities error:",
//       todayActivitiesError
//     );
//   }

//   /* ========================================================
//      CURRENT MONTH MEALS
//   ======================================================== */

//   const {
//     data: monthMeals,
//     error: monthMealsError,
//   } = await supabase
//     .from("meals")
//     .select(
//       `
//         meal_date,
//         meal_type,
//         name,
//         calories,
//         protein_g,
//         carbs_g,
//         fat_g,
//         fiber_g
//       `
//     )
//     .eq("user_id", user.id)
//     .gte(
//       "meal_date",
//       monthStart
//     )
//     .lte(
//       "meal_date",
//       today
//     )
//     .order("meal_date", {
//       ascending: true,
//     });

//   if (monthMealsError) {
//     console.error(
//       "Coach month meals error:",
//       monthMealsError
//     );
//   }

//   /* ========================================================
//      CURRENT MONTH ACTIVITIES
//   ======================================================== */

//   const {
//     data: monthActivities,
//     error: monthActivitiesError,
//   } = await supabase
//     .from("activities")
//     .select(
//       `
//         activity_date,
//         activity_type,
//         activity_name,
//         duration_minutes,
//         calories_burned
//       `
//     )
//     .eq("user_id", user.id)
//     .gte(
//       "activity_date",
//       monthStart
//     )
//     .lte(
//       "activity_date",
//       today
//     )
//     .order("activity_date", {
//       ascending: true,
//     });

//   if (monthActivitiesError) {
//     console.error(
//       "Coach month activities error:",
//       monthActivitiesError
//     );
//   }

//   /* ========================================================
//      WEIGHT HISTORY
//   ======================================================== */

//   const {
//     data: weightHistory,
//     error: weightError,
//   } = await supabase
//     .from("weight_logs")
//     .select(
//       `
//         weight_kg,
//         log_date,
//         note
//       `
//     )
//     .eq("user_id", user.id)
//     .order("log_date", {
//       ascending: true,
//     })
//     .limit(200);

//   if (weightError) {
//     console.error(
//       "Coach weight history error:",
//       weightError
//     );
//   }

//   /* ========================================================
//      TOTALS
//   ======================================================== */

//   const safeMeals =
//     todayMeals ?? [];

//   const safeActivities =
//     todayActivities ?? [];

//   const todayTotals =
//     calculateCoachTotals(
//       safeMeals,
//       safeActivities
//     );

//   const targets = {
//     daily_calorie_target:
//       profile?.daily_calorie_target,

//     protein_target_g:
//       profile?.protein_target_g,

//     carbs_target_g:
//       profile?.carbs_target_g,

//     fat_target_g:
//       profile?.fat_target_g,

//     fiber_target_g:
//       profile?.fiber_target_g,
//   };

//   const remaining =
//     calculateRemaining(
//       todayTotals,
//       targets
//     );

//   return {
//     authenticated: true,

//     context: {
//       today,

//       monthStart,

//       profile: profile
//         ? {
//             full_name:
//               profile.full_name ||
//               "",

//             goal:
//               profile.goal ||
//               null,

//             gender:
//               profile.gender ||
//               null,

//             date_of_birth:
//               profile.date_of_birth ||
//               null,

//             height_cm:
//               profile.height_cm
//                 ? Number(
//                     profile.height_cm
//                   )
//                 : null,

//             current_weight_kg:
//               profile.current_weight_kg
//                 ? Number(
//                     profile.current_weight_kg
//                   )
//                 : null,

//             target_weight_kg:
//               profile.target_weight_kg
//                 ? Number(
//                     profile.target_weight_kg
//                   )
//                 : null,

//             activity_level:
//               profile.activity_level ||
//               null,

//             daily_calorie_target:
//               Number(
//                 profile.daily_calorie_target ||
//                   0
//               ),

//             protein_target_g:
//               Number(
//                 profile.protein_target_g ||
//                   0
//               ),

//             carbs_target_g:
//               Number(
//                 profile.carbs_target_g ||
//                   0
//               ),

//             fat_target_g:
//               Number(
//                 profile.fat_target_g ||
//                   0
//               ),

//             fiber_target_g:
//               Number(
//                 profile.fiber_target_g ||
//                   0
//               ),
//           }
//         : null,

//       todayTotals,

//       remaining,

//       todayMeals:
//         safeMeals,

//       todayActivities:
//         safeActivities,

//       monthMeals:
//         monthMeals ?? [],

//       monthActivities:
//         monthActivities ?? [],

//       weightHistory:
//         weightHistory ?? [],
//     },
//   };
// }

import { createClient } from "@/lib/supabase/server";

import {
  calculateCoachTotals,
  calculateRemaining,
} from "./calculateCoachTotals";

export interface CoachContext {
  today: string;
  monthStart: string;

  profile: {
    full_name: string;
    goal: string | null;
    gender: string | null;
    date_of_birth: string | null;
    height_cm: number | null;
    current_weight_kg: number | null;
    target_weight_kg: number | null;
    activity_level: string | null;

    daily_calorie_target: number;
    protein_target_g: number;
    carbs_target_g: number;
    fat_target_g: number;
    fiber_target_g: number;
  } | null;

  todayTotals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    exerciseCalories: number;
  };

  remaining: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };

  todayMeals: unknown[];
  todayActivities: unknown[];

  monthMeals: unknown[];
  monthActivities: unknown[];

  weightHistory: unknown[];
}

/* -------------------------------------------------------------------------- */
/* India date                                                                 */
/* -------------------------------------------------------------------------- */

function getTodayIndia(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
  }).format(new Date());
}

function getMonthStartIndia(): string {
  const today = getTodayIndia();

  return `${today.slice(0, 7)}-01`;
}

/* -------------------------------------------------------------------------- */
/* Coach Context                                                              */
/* -------------------------------------------------------------------------- */

export async function getCoachContext(): Promise<{
  authenticated: boolean;
  context: CoachContext | null;
}> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      authenticated: false,
      context: null,
    };
  }

  const today = getTodayIndia();
  const monthStart = getMonthStartIndia();

  /* ====================================================================== */
  /* PROFILE                                                                */
  /* ====================================================================== */

  const {
    data: profile,
    error: profileError,
  } = await supabase
    .from("profiles")
    .select(`
      full_name,
      goal,
      gender,
      date_of_birth,
      height_cm,
      current_weight_kg,
      target_weight_kg,
      activity_level,
      daily_calorie_target,
      protein_target_g,
      carbs_target_g,
      fat_target_g,
      fiber_target_g
    `)
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) {
    console.error(
      "[Coach] Profile error:",
      profileError
    );
  }

  /* ====================================================================== */
  /* TODAY MEALS                                                             */
  /* ====================================================================== */

  const {
    data: todayMeals,
    error: todayMealsError,
  } = await supabase
    .from("meals")
    .select(`
      id,
      meal_date,
      meal_type,
      name,
      description,
      image_url,
      calories,
      protein_g,
      carbs_g,
      fat_g,
      fiber_g,
      serving_size,
      ai_analyzed,
      ai_confidence,
      created_at
    `)
    .eq("user_id", user.id)
    .eq("meal_date", today)
    .order("created_at", {
      ascending: true,
    });

  if (todayMealsError) {
    console.error(
      "[Coach] Today's meals error:",
      todayMealsError
    );
  }

  /* ====================================================================== */
  /* TODAY ACTIVITIES                                                        */
  /* ====================================================================== */

  const {
    data: todayActivities,
    error: todayActivitiesError,
  } = await supabase
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
    });

  if (todayActivitiesError) {
    console.error(
      "[Coach] Today's activities error:",
      todayActivitiesError
    );
  }

  /* ====================================================================== */
  /* CURRENT MONTH MEALS                                                    */
  /* ====================================================================== */

  const {
    data: monthMeals,
    error: monthMealsError,
  } = await supabase
    .from("meals")
    .select(`
      id,
      meal_date,
      meal_type,
      name,
      calories,
      protein_g,
      carbs_g,
      fat_g,
      fiber_g,
      serving_size
    `)
    .eq("user_id", user.id)
    .gte("meal_date", monthStart)
    .lte("meal_date", today)
    .order("meal_date", {
      ascending: true,
    })
    .order("created_at", {
      ascending: true,
    });

  if (monthMealsError) {
    console.error(
      "[Coach] Month meals error:",
      monthMealsError
    );
  }

  /* ====================================================================== */
  /* CURRENT MONTH ACTIVITIES                                                */
  /* ====================================================================== */

  const {
    data: monthActivities,
    error: monthActivitiesError,
  } = await supabase
    .from("activities")
    .select(`
      id,
      activity_date,
      activity_type,
      activity_name,
      duration_minutes,
      calories_burned,
      note
    `)
    .eq("user_id", user.id)
    .gte("activity_date", monthStart)
    .lte("activity_date", today)
    .order("activity_date", {
      ascending: true,
    });

  if (monthActivitiesError) {
    console.error(
      "[Coach] Month activities error:",
      monthActivitiesError
    );
  }

  /* ====================================================================== */
  /* WEIGHT HISTORY                                                          */
  /* ====================================================================== */

  /*
   * IMPORTANT:
   *
   * Your actual weight_logs table uses:
   *
   *     recorded_at
   *
   * NOT:
   *
   *     log_date
   */

  const {
    data: weightHistory,
    error: weightError,
  } = await supabase
    .from("weight_logs")
    .select(`
      id,
      weight_kg,
      recorded_at,
      note,
      created_at
    `)
    .eq("user_id", user.id)
    .order("recorded_at", {
      ascending: true,
    })
    .order("created_at", {
      ascending: true,
    })
    .limit(200);

  if (weightError) {
    console.error(
      "[Coach] Weight history error:",
      weightError
    );
  }

  /* ====================================================================== */
  /* TODAY TOTALS                                                            */
  /* ====================================================================== */

  const safeMeals = todayMeals ?? [];
  const safeActivities = todayActivities ?? [];

  const todayTotals = calculateCoachTotals(
    safeMeals,
    safeActivities
  );

  /* ====================================================================== */
  /* TARGETS                                                                 */
  /* ====================================================================== */

  const targets = {
    daily_calorie_target:
      profile?.daily_calorie_target ?? 0,

    protein_target_g:
      profile?.protein_target_g ?? 0,

    carbs_target_g:
      profile?.carbs_target_g ?? 0,

    fat_target_g:
      profile?.fat_target_g ?? 0,

    fiber_target_g:
      profile?.fiber_target_g ?? 0,
  };

  /* ====================================================================== */
  /* REMAINING                                                               */
  /* ====================================================================== */

  const remaining = calculateRemaining(
    todayTotals,
    targets
  );

  /* ====================================================================== */
  /* RETURN                                                                  */
  /* ====================================================================== */

  return {
    authenticated: true,

    context: {
      today,

      monthStart,

      profile: profile
        ? {
            full_name:
              profile.full_name || "",

            goal:
              profile.goal || null,

            gender:
              profile.gender || null,

            date_of_birth:
              profile.date_of_birth || null,

            height_cm:
              profile.height_cm !== null &&
              profile.height_cm !== undefined
                ? Number(profile.height_cm)
                : null,

            current_weight_kg:
              profile.current_weight_kg !== null &&
              profile.current_weight_kg !== undefined
                ? Number(profile.current_weight_kg)
                : null,

            target_weight_kg:
              profile.target_weight_kg !== null &&
              profile.target_weight_kg !== undefined
                ? Number(profile.target_weight_kg)
                : null,

            activity_level:
              profile.activity_level || null,

            daily_calorie_target:
              Number(
                profile.daily_calorie_target || 0
              ),

            protein_target_g:
              Number(
                profile.protein_target_g || 0
              ),

            carbs_target_g:
              Number(
                profile.carbs_target_g || 0
              ),

            fat_target_g:
              Number(
                profile.fat_target_g || 0
              ),

            fiber_target_g:
              Number(
                profile.fiber_target_g || 0
              ),
          }
        : null,

      todayTotals,

      remaining,

      todayMeals: safeMeals,

      todayActivities: safeActivities,

      monthMeals: monthMeals ?? [],

      monthActivities:
        monthActivities ?? [],

      weightHistory:
        weightHistory ?? [],
    },
  };
}