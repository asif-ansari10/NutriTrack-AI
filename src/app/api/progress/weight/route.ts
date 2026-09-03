// import { NextResponse } from "next/server";
// import { revalidatePath } from "next/cache";

// import { createClient } from "@/lib/supabase/server";

// import {
//   calculateAge,
//   calculateNutrition,
//   type Goal,
//   type Gender,
//   type Activity,
// } from "@/lib/nutrition/calculateNutrition";

// /* ============================================================
//    INDIA DATE
// ============================================================ */

// function getTodayIndia(): string {
//   return new Intl.DateTimeFormat("en-CA", {
//     timeZone: "Asia/Kolkata",
//   }).format(new Date());
// }

// /* ============================================================
//    GET START / END OF TODAY IN INDIA
// ============================================================ */

// function getTodayIndiaRange() {
//   const today = getTodayIndia();

//   /*
//    * India timezone:
//    *
//    * UTC + 05:30
//    *
//    * Convert:
//    *
//    * Today 00:00 IST
//    * Today 00:00 IST + 1 day
//    *
//    * into UTC timestamps.
//    */

//   const start = new Date(
//     `${today}T00:00:00+05:30`
//   );

//   const end = new Date(
//     `${today}T00:00:00+05:30`
//   );

//   end.setDate(
//     end.getDate() + 1
//   );

//   return {
//     start: start.toISOString(),
//     end: end.toISOString(),
//   };
// }

// /* ============================================================
//    POST
// ============================================================ */

// export async function POST(
//   request: Request
// ) {
//   try {
//     /* ========================================================
//        SUPABASE
//     ======================================================== */

//     const supabase =
//       await createClient();

//     /* ========================================================
//        AUTH
//     ======================================================== */

//     const {
//       data: { user },
//       error: authError,
//     } =
//       await supabase.auth.getUser();

//     if (
//       authError ||
//       !user
//     ) {
//       return NextResponse.json(
//         {
//           success: false,
//           error:
//             "Please log in to update your weight.",
//         },
//         {
//           status: 401,
//         }
//       );
//     }

//     /* ========================================================
//        REQUEST BODY
//     ======================================================== */

//     let body: {
//       weight?: unknown;
//       note?: unknown;
//     };

//     try {
//       body = await request.json();
//     } catch {
//       return NextResponse.json(
//         {
//           success: false,
//           error:
//             "Invalid request.",
//         },
//         {
//           status: 400,
//         }
//       );
//     }

//     const weight =
//       Number(body?.weight);

//     const note =
//       typeof body?.note === "string"
//         ? body.note.trim()
//         : null;

//     /* ========================================================
//        VALIDATE WEIGHT
//     ======================================================== */

//     if (
//       !Number.isFinite(weight) ||
//       weight < 20 ||
//       weight > 500
//     ) {
//       return NextResponse.json(
//         {
//           success: false,
//           error:
//             "Please enter a valid weight between 20 and 500 kg.",
//         },
//         {
//           status: 400,
//         }
//       );
//     }

//     /* ========================================================
//        GET PROFILE
//     ======================================================== */

//     const {
//       data: profile,
//       error: profileError,
//     } =
//       await supabase
//         .from("profiles")
//         .select(
//           `
//             id,
//             goal,
//             gender,
//             date_of_birth,
//             height_cm,
//             current_weight_kg,
//             activity_level
//           `
//         )
//         .eq(
//           "id",
//           user.id
//         )
//         .single();

//     if (
//       profileError ||
//       !profile
//     ) {
//       console.error(
//         "Weight update profile error:",
//         profileError
//       );

//       return NextResponse.json(
//         {
//           success: false,
//           error:
//             "Unable to load your profile.",
//         },
//         {
//           status: 500,
//         }
//       );
//     }

//     /* ========================================================
//        VALIDATE PROFILE
//     ======================================================== */

//     if (
//       !profile.date_of_birth ||
//       profile.height_cm === null ||
//       profile.height_cm === undefined ||
//       !profile.goal ||
//       !profile.gender ||
//       !profile.activity_level
//     ) {
//       return NextResponse.json(
//         {
//           success: false,
//           error:
//             "Your profile information is incomplete. Please update your profile first.",
//         },
//         {
//           status: 400,
//         }
//       );
//     }

//     const goal =
//       profile.goal as Goal;

//     const gender =
//       profile.gender as Gender;

//     const activity =
//       profile.activity_level as Activity;

//     const height =
//       Number(
//         profile.height_cm
//       );

//     /* ========================================================
//        VALIDATE HEIGHT
//     ======================================================== */

//     if (
//       !Number.isFinite(height) ||
//       height <= 0
//     ) {
//       return NextResponse.json(
//         {
//           success: false,
//           error:
//             "Your height information is invalid.",
//         },
//         {
//           status: 400,
//         }
//       );
//     }

//     /* ========================================================
//        CALCULATE AGE
//     ======================================================== */

//     const age =
//       calculateAge(
//         profile.date_of_birth
//       );

//     if (
//       age < 13 ||
//       age > 100
//     ) {
//       return NextResponse.json(
//         {
//           success: false,
//           error:
//             "Your date of birth is invalid.",
//         },
//         {
//           status: 400,
//         }
//       );
//     }

//     /* ========================================================
//        RECALCULATE NUTRITION
       
//        NEW WEIGHT IS USED
       
//        Calculates:
//        - Calories
//        - Protein
//        - Carbs
//        - Fat
//        - Fiber
//     ======================================================== */

//     const nutrition =
//       calculateNutrition({
//         gender,
//         age,
//         height,
//         weight,
//         goal,
//         activity,
//       });

//     console.log(
//       "Weight update nutrition:",
//       {
//         oldWeight:
//           profile.current_weight_kg,
//         newWeight:
//           weight,
//         nutrition,
//       }
//     );

//     /* ========================================================
//        TODAY'S INDIA DATE RANGE
       
//        IMPORTANT:
       
//        weight_logs uses:
       
//        recorded_at TIMESTAMP
       
//        NOT:
       
//        log_date
//     ======================================================== */

//     const {
//       start: todayStart,
//       end: todayEnd,
//     } =
//       getTodayIndiaRange();

//     /* ========================================================
//        FIND TODAY'S WEIGHT LOG
       
//        We use recorded_at because that is the
//        actual column in weight_logs.
//     ======================================================== */

//     const {
//       data: existingWeightLog,
//       error:
//         weightLogLookupError,
//     } =
//       await supabase
//         .from("weight_logs")
//         .select(
//           "id, weight_kg, recorded_at"
//         )
//         .eq(
//           "user_id",
//           user.id
//         )
//         .gte(
//           "recorded_at",
//           todayStart
//         )
//         .lt(
//           "recorded_at",
//           todayEnd
//         )
//         .order(
//           "recorded_at",
//           {
//             ascending: false,
//           }
//         )
//         .limit(1)
//         .maybeSingle();

//     if (
//       weightLogLookupError
//     ) {
//       console.error(
//         "Weight log lookup error:",
//         weightLogLookupError
//       );

//       return NextResponse.json(
//         {
//           success: false,
//           error:
//             "Unable to check your weight history.",
//           details:
//             weightLogLookupError.message,
//         },
//         {
//           status: 500,
//         }
//       );
//     }

//     /* ========================================================
//        UPDATE PROFILE
//     ======================================================== */

//     const {
//       error:
//         profileUpdateError,
//     } =
//       await supabase
//         .from("profiles")
//         .update({
//           current_weight_kg:
//             weight,

//           daily_calorie_target:
//             nutrition.daily_calorie_target,

//           protein_target_g:
//             nutrition.protein_target_g,

//           carbs_target_g:
//             nutrition.carbs_target_g,

//           fat_target_g:
//             nutrition.fat_target_g,

//           fiber_target_g:
//             nutrition.fiber_target_g,

//           updated_at:
//             new Date().toISOString(),
//         })
//         .eq(
//           "id",
//           user.id
//         );

//     if (
//       profileUpdateError
//     ) {
//       console.error(
//         "Profile update error:",
//         profileUpdateError
//       );

//       return NextResponse.json(
//         {
//           success: false,
//           error:
//             "Unable to update your profile.",
//         },
//         {
//           status: 500,
//         }
//       );
//     }

//     /* ========================================================
//        UPDATE TODAY'S WEIGHT LOG
//     ======================================================== */

//     if (
//       existingWeightLog
//     ) {
//       const {
//         error:
//           weightLogUpdateError,
//       } =
//         await supabase
//           .from("weight_logs")
//           .update({
//             weight_kg:
//               weight,

//             note:
//               note || null,
//           })
//           .eq(
//             "id",
//             existingWeightLog.id
//           )
//           .eq(
//             "user_id",
//             user.id
//           );

//       if (
//         weightLogUpdateError
//       ) {
//         console.error(
//           "Weight log update error:",
//           weightLogUpdateError
//         );

//         return NextResponse.json(
//           {
//             success: false,
//             profileUpdated:
//               true,
//             error:
//               "Your weight and nutrition targets were updated, but today's weight history could not be updated.",
//             details:
//               weightLogUpdateError.message,
//           },
//           {
//             status: 500,
//           }
//         );
//       }
//     }

//     /* ========================================================
//        CREATE TODAY'S WEIGHT LOG
//     ======================================================== */

//     else {
//       const {
//         error:
//           weightLogInsertError,
//       } =
//         await supabase
//           .from("weight_logs")
//           .insert({
//             user_id:
//               user.id,

//             weight_kg:
//               weight,

//             recorded_at:
//               new Date().toISOString(),

//             note:
//               note || null,
//           });

//       if (
//         weightLogInsertError
//       ) {
//         console.error(
//           "Weight log insert error:",
//           weightLogInsertError
//         );

//         return NextResponse.json(
//           {
//             success: false,
//             profileUpdated:
//               true,
//             error:
//               "Your weight and nutrition targets were updated, but today's weight history could not be saved.",
//             details:
//               weightLogInsertError.message,
//           },
//           {
//             status: 500,
//           }
//         );
//       }
//     }

//     /* ========================================================
//        REVALIDATE ALL AFFECTED PAGES
//     ======================================================== */

//     revalidatePath("/");
//     revalidatePath("/profile");
//     revalidatePath("/progress");
//     revalidatePath("/diary");

//     /* ========================================================
//        SUCCESS
//     ======================================================== */

//     return NextResponse.json({
//       success: true,

//       weight,

//       nutrition,

//       weightLog: {
//         date:
//           getTodayIndia(),

//         weight,
//       },
//     });
//   } catch (error) {
//     console.error(
//       "POST /api/progress/weight error:",
//       error
//     );

//     return NextResponse.json(
//       {
//         success: false,
//         error:
//           "Something went wrong while updating your weight.",
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

import {
  calculateAge,
  calculateNutrition,
  type Goal,
  type Gender,
  type Activity,
} from "@/lib/nutrition/calculateNutrition";

/* ============================================================
   POST /api/progress/weight
============================================================ */

export async function POST(
  request: Request
) {
  try {
    /* ========================================================
       SUPABASE
    ======================================================== */

    const supabase =
      await createClient();

    /* ========================================================
       AUTH
    ======================================================== */

    const {
      data: { user },
      error: authError,
    } =
      await supabase.auth.getUser();

    if (
      authError ||
      !user
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please log in to update your weight.",
        },
        {
          status: 401,
        }
      );
    }

    /* ========================================================
       REQUEST BODY
    ======================================================== */

    let body: {
      weight?: unknown;
      note?: unknown;
    };

    try {
      body =
        await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid request.",
        },
        {
          status: 400,
        }
      );
    }

    const weight =
      Number(body?.weight);

    const note =
      typeof body?.note === "string"
        ? body.note.trim()
        : null;

    /* ========================================================
       VALIDATE WEIGHT
    ======================================================== */

    if (
      !Number.isFinite(weight) ||
      weight < 20 ||
      weight > 500
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please enter a valid weight between 20 and 500 kg.",
        },
        {
          status: 400,
        }
      );
    }

    /* ========================================================
       GET PROFILE
    ======================================================== */

    const {
      data: profile,
      error: profileError,
    } =
      await supabase
        .from("profiles")
        .select(
          `
            id,
            goal,
            gender,
            date_of_birth,
            height_cm,
            current_weight_kg,
            activity_level
          `
        )
        .eq(
          "id",
          user.id
        )
        .single();

    if (
      profileError ||
      !profile
    ) {
      console.error(
        "Weight update profile error:",
        profileError
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Unable to load your profile.",
        },
        {
          status: 500,
        }
      );
    }

    /* ========================================================
       VALIDATE PROFILE
    ======================================================== */

    if (
      !profile.date_of_birth ||
      profile.height_cm ===
        null ||
      profile.height_cm ===
        undefined ||
      !profile.goal ||
      !profile.gender ||
      !profile.activity_level
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Your profile information is incomplete. Please update your profile first.",
        },
        {
          status: 400,
        }
      );
    }

    const goal =
      profile.goal as Goal;

    const gender =
      profile.gender as Gender;

    const activity =
      profile.activity_level as Activity;

    const height =
      Number(
        profile.height_cm
      );

    /* ========================================================
       VALIDATE HEIGHT
    ======================================================== */

    if (
      !Number.isFinite(height) ||
      height <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Your height information is invalid.",
        },
        {
          status: 400,
        }
      );
    }

    /* ========================================================
       CALCULATE AGE
    ======================================================== */

    const age =
      calculateAge(
        profile.date_of_birth
      );

    if (
      age < 13 ||
      age > 100
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Your date of birth is invalid.",
        },
        {
          status: 400,
        }
      );
    }

    /* ========================================================
       RECALCULATE NUTRITION
       
       IMPORTANT:
       The NEW weight is used.
       
       This recalculates:
       - Calories
       - Protein
       - Carbs
       - Fat
       - Fiber
    ======================================================== */

    const nutrition =
      calculateNutrition({
        gender,
        age,
        height,
        weight,
        goal,
        activity,
      });

    console.log(
      "Progress weight update:",
      {
        userId: user.id,
        oldWeight:
          profile.current_weight_kg,
        newWeight: weight,
        nutrition,
      }
    );

    /* ========================================================
       UPDATE PROFILE
       
       The current profile weight changes to the
       newly submitted weight.
       
       Nutrition targets are also updated.
    ======================================================== */

    const {
      error:
        profileUpdateError,
    } =
      await supabase
        .from("profiles")
        .update({
          current_weight_kg:
            weight,

          daily_calorie_target:
            nutrition.daily_calorie_target,

          protein_target_g:
            nutrition.protein_target_g,

          carbs_target_g:
            nutrition.carbs_target_g,

          fat_target_g:
            nutrition.fat_target_g,

          fiber_target_g:
            nutrition.fiber_target_g,

          updated_at:
            new Date().toISOString(),
        })
        .eq(
          "id",
          user.id
        );

    if (
      profileUpdateError
    ) {
      console.error(
        "Profile update error:",
        profileUpdateError
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Unable to update your profile.",
          details:
            profileUpdateError.message,
        },
        {
          status: 500,
        }
      );
    }

    /* ========================================================
       ADD NEW WEIGHT LOG
       
       IMPORTANT:
       
       NEVER UPDATE AN OLD WEIGHT LOG.
       
       Every weight submission creates a NEW row.
    ======================================================== */

    const {
      data: weightLog,
      error:
        weightLogInsertError,
    } =
      await supabase
        .from("weight_logs")
        .insert({
          user_id:
            user.id,

          weight_kg:
            weight,

          recorded_at:
            new Date().toISOString(),

          note:
            note || null,
        })
        .select(
          "id, weight_kg, recorded_at, note"
        )
        .single();

    /* ========================================================
       HANDLE WEIGHT LOG ERROR
    ======================================================== */

    if (
      weightLogInsertError
    ) {
      console.error(
        "Weight log insert error:",
        weightLogInsertError
      );

      return NextResponse.json(
        {
          success: false,

          /*
           * Profile has already been updated.
           */
          profileUpdated: true,

          error:
            "Your weight and nutrition targets were updated, but the new weight history could not be saved.",

          details:
            weightLogInsertError.message,
        },
        {
          status: 500,
        }
      );
    }

    /* ========================================================
       REVALIDATE
    ======================================================== */

    revalidatePath("/");
    revalidatePath("/profile");
    revalidatePath("/progress");
    revalidatePath("/diary");

    /* ========================================================
       SUCCESS
    ======================================================== */

    return NextResponse.json({
      success: true,

      weight,

      nutrition,

      weightLog,
    });
  } catch (error) {
    console.error(
      "POST /api/progress/weight error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Something went wrong while updating your weight.",
      },
      {
        status: 500,
      }
    );
  }
}