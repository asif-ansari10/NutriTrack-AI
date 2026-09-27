// "use server";

// import { redirect } from "next/navigation";

// import { createClient } from "@/lib/supabase/server";

// import {
//   calculateAge,
//   calculateNutrition,
//   type Goal,
//   type Gender,
//   type Activity,
// } from "@/lib/nutrition/calculateNutrition";

// function getTodayIndia(): string {
//   return new Intl.DateTimeFormat(
//     "en-CA",
//     {
//       timeZone: "Asia/Kolkata",
//     }
//   ).format(new Date());
// }

// /* =========================================================
//    UPDATE PROFILE
// ========================================================= */

// export async function updateProfile(
//   formData: FormData
// ) {
//   const supabase =
//     await createClient();

//   /*
//    * -------------------------------------------------------
//    * AUTH
//    * -------------------------------------------------------
//    */

//   const {
//     data: { user },
//   } =
//     await supabase.auth.getUser();

//   if (!user) {
//     redirect("/login");
//   }

//   /*
//    * -------------------------------------------------------
//    * FORM DATA
//    * -------------------------------------------------------
//    */

//   const fullName = String(
//     formData.get("full_name") || ""
//   ).trim();

//   const goal = String(
//     formData.get("goal") || ""
//   ) as Goal;

//   const gender = String(
//     formData.get("gender") || ""
//   ) as Gender;

//   const dateOfBirth = String(
//     formData.get("date_of_birth") || ""
//   );

//   const height = Number(
//     formData.get("height_cm")
//   );

//   const currentWeight = Number(
//     formData.get("current_weight_kg")
//   );

//   const targetWeight = Number(
//     formData.get("target_weight_kg")
//   );

//   const activity = String(
//     formData.get("activity_level") || ""
//   ) as Activity;

//   /*
//    * -------------------------------------------------------
//    * VALIDATION
//    * -------------------------------------------------------
//    */

//   if (!fullName) {
//     redirect(
//       "/profile?error=Please%20enter%20your%20name."
//     );
//   }

//   if (
//     ![
//       "lose",
//       "maintain",
//       "gain",
//     ].includes(goal)
//   ) {
//     redirect(
//       "/profile?error=Invalid%20goal."
//     );
//   }

//   if (
//     ![
//       "male",
//       "female",
//       "other",
//     ].includes(gender)
//   ) {
//     redirect(
//       "/profile?error=Invalid%20gender."
//     );
//   }

//   if (!dateOfBirth) {
//     redirect(
//       "/profile?error=Please%20enter%20your%20date%20of%20birth."
//     );
//   }

//   const age =
//     calculateAge(dateOfBirth);

//   if (
//     age < 13 ||
//     age > 100
//   ) {
//     redirect(
//       "/profile?error=Age%20must%20be%20between%2013%20and%20100."
//     );
//   }

//   if (
//     !Number.isFinite(height) ||
//     height < 100 ||
//     height > 250
//   ) {
//     redirect(
//       "/profile?error=Please%20enter%20a%20valid%20height."
//     );
//   }

//   if (
//     !Number.isFinite(
//       currentWeight
//     ) ||
//     currentWeight < 30 ||
//     currentWeight > 300
//   ) {
//     redirect(
//       "/profile?error=Please%20enter%20a%20valid%20current%20weight."
//     );
//   }

//   if (
//     !Number.isFinite(
//       targetWeight
//     ) ||
//     targetWeight < 30 ||
//     targetWeight > 300
//   ) {
//     redirect(
//       "/profile?error=Please%20enter%20a%20valid%20target%20weight."
//     );
//   }

//   if (
//     goal === "lose" &&
//     targetWeight >= currentWeight
//   ) {
//     redirect(
//       `/profile?error=${encodeURIComponent(
//         "For fat loss, target weight must be lower than current weight."
//       )}`
//     );
//   }

//   if (
//     goal === "gain" &&
//     targetWeight <= currentWeight
//   ) {
//     redirect(
//       `/profile?error=${encodeURIComponent(
//         "For weight gain, target weight must be higher than current weight."
//       )}`
//     );
//   }

//   if (
//     ![
//       "sedentary",
//       "light",
//       "moderate",
//       "active",
//       "very_active",
//     ].includes(activity)
//   ) {
//     redirect(
//       "/profile?error=Please%20select%20an%20activity%20level."
//     );
//   }

//   /*
//    * -------------------------------------------------------
//    * RECALCULATE ALL NUTRITION TARGETS
//    * -------------------------------------------------------
//    */

//   const nutrition =
//     calculateNutrition({
//       gender,
//       age,
//       height,
//       weight:
//         currentWeight,
//       goal,
//       activity,
//     });

//   console.log(
//     "Updated nutrition targets:",
//     nutrition
//   );

//   /*
//    * -------------------------------------------------------
//    * GET OLD PROFILE
//    *
//    * Used to determine whether weight changed.
//    * -------------------------------------------------------
//    */

//   const {
//     data: oldProfile,
//     error: oldProfileError,
//   } =
//     await supabase
//       .from("profiles")
//       .select(
//         "current_weight_kg"
//       )
//       .eq("id", user.id)
//       .single();

//   if (oldProfileError) {
//     console.error(
//       "Old profile lookup error:",
//       oldProfileError
//     );

//     redirect(
//       "/profile?error=Unable%20to%20load%20your%20current%20profile."
//     );
//   }

//   const oldWeight =
//     Number(
//       oldProfile?.current_weight_kg
//     );

//   const weightChanged =
//     !Number.isFinite(oldWeight) ||
//     Math.abs(
//       oldWeight -
//         currentWeight
//     ) > 0.001;

//   /*
//    * -------------------------------------------------------
//    * UPDATE PROFILE
//    * -------------------------------------------------------
//    */

//   const {
//     error: profileUpdateError,
//   } =
//     await supabase
//       .from("profiles")
//       .update({
//         full_name:
//           fullName,

//         goal,

//         gender,

//         date_of_birth:
//           dateOfBirth,

//         height_cm:
//           height,

//         current_weight_kg:
//           currentWeight,

//         target_weight_kg:
//           targetWeight,

//         activity_level:
//           activity,

//         daily_calorie_target:
//           nutrition.daily_calorie_target,

//         protein_target_g:
//           nutrition.protein_target_g,

//         carbs_target_g:
//           nutrition.carbs_target_g,

//         fat_target_g:
//           nutrition.fat_target_g,

//         fiber_target_g:
//           nutrition.fiber_target_g,

//         updated_at:
//           new Date().toISOString(),
//       })
//       .eq("id", user.id);

//   if (profileUpdateError) {
//     console.error(
//       "Profile update error:",
//       profileUpdateError
//     );

//     redirect(
//       "/profile?error=Unable%20to%20update%20your%20profile."
//     );
//   }

//   /*
//    * -------------------------------------------------------
//    * WEIGHT LOG
//    *
//    * Only create/update the weight log when
//    * current weight actually changed.
//    * -------------------------------------------------------
//    */

//   if (weightChanged) {
//     const today =
//       getTodayIndia();

//     /*
//      * Check whether today's weight log
//      * already exists.
//      */

//     const {
//       data: existingWeightLog,
//       error: weightLogLookupError,
//     } =
//       await supabase
//         .from("weight_logs")
//         .select("id")
//         .eq(
//           "user_id",
//           user.id
//         )
//         .eq(
//           "recorded_at",
//           today
//         )
//         .maybeSingle();

//     if (weightLogLookupError) {
//       console.error(
//         "Weight log lookup error:",
//         weightLogLookupError
//       );

//       redirect(
//         "/profile?error=Unable%20to%20update%20your%20weight%20history."
//       );
//     }

//     if (existingWeightLog) {
//       /*
//        * Update today's existing log
//        */

//       const {
//         error:
//           weightLogUpdateError,
//       } =
//         await supabase
//           .from("weight_logs")
//           .update({
//             weight_kg:
//               currentWeight,

//             note:
//               "Updated from profile",

//             created_at:
//               new Date().toISOString(),
//           })
//           .eq(
//             "id",
//             existingWeightLog.id
//           );

//       if (weightLogUpdateError) {
//         console.error(
//           "Weight log update error:",
//           weightLogUpdateError
//         );

//         redirect(
//           "/profile?error=Unable%20to%20update%20your%20weight%20history."
//         );
//       }
//     } else {
//       /*
//        * Create today's new log
//        */

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
//               currentWeight,

//             recorded_at:
//               today,

//             note:
//               "Updated from profile",
//           });

//       if (weightLogInsertError) {
//         console.error(
//           "Weight log insert error:",
//           weightLogInsertError
//         );

//         redirect(
//           "/profile?error=Unable%20to%20save%20your%20weight%20history."
//         );
//       }
//     }
//   }

//   /*
//    * -------------------------------------------------------
//    * SUCCESS
//    * -------------------------------------------------------
//    */

//   redirect(
//     "/profile?success=Profile%20and%20nutrition%20targets%20updated%20successfully."
//   );
// }

// /* =========================================================
//    PASSWORD RESET
// ========================================================= */

// export async function requestPasswordReset() {
//   const supabase =
//     await createClient();

//   const {
//     data: { user },
//     error: userError,
//   } =
//     await supabase.auth.getUser();

//   if (userError) {
//     console.error(
//       "Get user error:",
//       userError
//     );

//     redirect(
//       "/profile?error=Unable%20to%20authenticate%20your%20account."
//     );
//   }

//   if (!user?.email) {
//     redirect(
//       "/profile?error=Unable%20to%20find%20your%20email."
//     );
//   }

//   const siteUrl =
//     process.env.NEXT_PUBLIC_SITE_URL ||
//     "http://localhost:3000";

//   const redirectTo =
//     `${siteUrl}/auth/callback?next=/update-password`;

//   const { error } =
//     await supabase.auth.resetPasswordForEmail(
//       user.email,
//       {
//         redirectTo,
//       }
//     );

//   if (error) {
//     console.error(
//       "Password reset error:",
//       error
//     );

//     redirect(
//       `/profile?error=${encodeURIComponent(
//         error.message
//       )}`
//     );
//   }

//   redirect(
//     "/profile?success=Password%20reset%20link%20sent%20to%20your%20email."
//   );
// }

// /* =========================================================
//    LOGOUT
// ========================================================= */

// export async function logout() {
//   const supabase =
//     await createClient();

//   await supabase.auth.signOut();

//   redirect("/login");
// }

"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import {
  calculateAge,
  calculateNutrition,
  type Goal,
  type Gender,
  type Activity,
} from "@/lib/nutrition/calculateNutrition";

/* ============================================================
   VALID VALUES
============================================================ */

const VALID_GOALS = [
  "lose",
  "maintain",
  "gain",
] as const;

const VALID_GENDERS = [
  "male",
  "female",
  "other",
] as const;

const VALID_ACTIVITIES = [
  "sedentary",
  "light",
  "moderate",
  "active",
  "very_active",
] as const;

/* ============================================================
   UPDATE PROFILE
============================================================ */

export async function updateProfile(
  formData: FormData
) {
  const supabase =
    await createClient();

  /* ==========================================================
     AUTH
  ========================================================== */

  const {
    data: { user },
  } =
    await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  /* ==========================================================
     READ FORM DATA
  ========================================================== */

  const fullName = String(
    formData.get("full_name") || ""
  ).trim();

  const goal = String(
    formData.get("goal") || ""
  ) as Goal;

  const gender = String(
    formData.get("gender") || ""
  ) as Gender;

  const dateOfBirth = String(
    formData.get("date_of_birth") || ""
  ).trim();

  const height = Number(
    formData.get("height_cm")
  );

  const currentWeight = Number(
    formData.get("current_weight_kg")
  );

  const targetWeight = Number(
    formData.get("target_weight_kg")
  );

  const activity = String(
    formData.get("activity_level") || ""
  ) as Activity;

  /* ==========================================================
     VALIDATION
  ========================================================== */

  if (!fullName) {
    redirect(
      `/profile?error=${encodeURIComponent(
        "Please enter your name."
      )}`
    );
  }

  if (
    !VALID_GOALS.includes(
      goal as (typeof VALID_GOALS)[number]
    )
  ) {
    redirect(
      `/profile?error=${encodeURIComponent(
        "Invalid goal."
      )}`
    );
  }

  if (
    !VALID_GENDERS.includes(
      gender as (typeof VALID_GENDERS)[number]
    )
  ) {
    redirect(
      `/profile?error=${encodeURIComponent(
        "Invalid gender."
      )}`
    );
  }

  if (!dateOfBirth) {
    redirect(
      `/profile?error=${encodeURIComponent(
        "Please enter your date of birth."
      )}`
    );
  }

  const age =
    calculateAge(dateOfBirth);

  if (
    age < 13 ||
    age > 100
  ) {
    redirect(
      `/profile?error=${encodeURIComponent(
        "Age must be between 13 and 100."
      )}`
    );
  }

  if (
    !Number.isFinite(height) ||
    height < 100 ||
    height > 250
  ) {
    redirect(
      `/profile?error=${encodeURIComponent(
        "Please enter a valid height between 100 and 250 cm."
      )}`
    );
  }

  if (
    !Number.isFinite(currentWeight) ||
    currentWeight < 30 ||
    currentWeight > 300
  ) {
    redirect(
      `/profile?error=${encodeURIComponent(
        "Please enter a valid current weight between 30 and 300 kg."
      )}`
    );
  }

  if (
    !Number.isFinite(targetWeight) ||
    targetWeight < 30 ||
    targetWeight > 300
  ) {
    redirect(
      `/profile?error=${encodeURIComponent(
        "Please enter a valid target weight between 30 and 300 kg."
      )}`
    );
  }

  if (
    goal === "lose" &&
    targetWeight >= currentWeight
  ) {
    redirect(
      `/profile?error=${encodeURIComponent(
        "For fat loss, target weight must be lower than current weight."
      )}`
    );
  }

  if (
    goal === "gain" &&
    targetWeight <= currentWeight
  ) {
    redirect(
      `/profile?error=${encodeURIComponent(
        "For weight gain, target weight must be higher than current weight."
      )}`
    );
  }

  if (
    !VALID_ACTIVITIES.includes(
      activity as (typeof VALID_ACTIVITIES)[number]
    )
  ) {
    redirect(
      `/profile?error=${encodeURIComponent(
        "Please select an activity level."
      )}`
    );
  }

  /* ==========================================================
     GET OLD WEIGHT
     
     We need this ONLY to know whether the weight changed.
     
     We do NOT update an old weight log.
  ========================================================== */

  const {
    data: oldProfile,
    error: oldProfileError,
  } =
    await supabase
      .from("profiles")
      .select(
        "current_weight_kg"
      )
      .eq(
        "id",
        user.id
      )
      .single();

  if (
    oldProfileError ||
    !oldProfile
  ) {
    console.error(
      "Old profile lookup error:",
      oldProfileError
    );

    redirect(
      `/profile?error=${encodeURIComponent(
        "Unable to load your current profile."
      )}`
    );
  }

  const oldWeight =
    Number(
      oldProfile.current_weight_kg
    );

  const weightChanged =
    !Number.isFinite(oldWeight) ||
    Math.abs(
      oldWeight -
        currentWeight
    ) > 0.001;

  /* ==========================================================
     RECALCULATE NUTRITION
     
     IMPORTANT:
     Use NEW current weight.
  ========================================================== */

  const nutrition =
    calculateNutrition({
      gender,
      age,
      height,
      weight:
        currentWeight,
      goal,
      activity,
    });

  console.log(
    "Profile nutrition recalculated:",
    {
      oldWeight,
      currentWeight,
      nutrition,
    }
  );

  /* ==========================================================
     UPDATE PROFILE
     
     This updates:
     
     current_weight_kg
     daily_calorie_target
     protein_target_g
     carbs_target_g
     fat_target_g
     fiber_target_g
  ========================================================== */

  const {
    error:
      profileUpdateError,
  } =
    await supabase
      .from("profiles")
      .update({
        full_name:
          fullName,

        goal,

        gender,

        date_of_birth:
          dateOfBirth,

        height_cm:
          height,

        current_weight_kg:
          currentWeight,

        target_weight_kg:
          targetWeight,

        activity_level:
          activity,

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

    redirect(
      `/profile?error=${encodeURIComponent(
        "Unable to update your profile."
      )}`
    );
  }

  /* ==========================================================
     WEIGHT HISTORY
     
     IMPORTANT:
     
     If weight changed:
     
       INSERT NEW ROW
     
     Never:
     
       UPDATE old row
       DELETE old row
       FIND today's row
  ========================================================== */

  if (weightChanged) {
    const {
      error:
        weightLogInsertError,
    } =
      await supabase
        .from("weight_logs")
        .insert({
          user_id:
            user.id,

          weight_kg:
            currentWeight,

          /*
           * weight_logs.recorded_at
           * is a timestamp.
           *
           * Store the exact time of this
           * new weight entry.
           */
          recorded_at:
            new Date().toISOString(),

          note:
            "Updated from profile",
        });

    if (
      weightLogInsertError
    ) {
      console.error(
        "Weight log insert error:",
        weightLogInsertError
      );

      /*
       * Profile has already been updated.
       * Tell the user that the history insert failed.
       */
      redirect(
        `/profile?error=${encodeURIComponent(
          "Your profile was updated, but the new weight history could not be saved."
        )}`
      );
    }
  }

  /* ==========================================================
     REVALIDATE
  ========================================================== */

  const {
    revalidatePath,
  } = await import(
    "next/cache"
  );

  revalidatePath("/");
  revalidatePath("/profile");
  revalidatePath("/progress");
  revalidatePath("/diary");

  /* ==========================================================
     SUCCESS
  ========================================================== */

  redirect(
    `/profile?success=${encodeURIComponent(
      weightChanged
        ? "Profile, nutrition targets, and new weight log updated successfully."
        : "Profile and nutrition targets updated successfully."
    )}`
  );
}

/* ============================================================
   PASSWORD RESET
============================================================ */

export async function requestPasswordReset() {
  const supabase =
    await createClient();

  const {
    data: { user },
    error: userError,
  } =
    await supabase.auth.getUser();

  if (userError) {
    console.error(
      "Get user error:",
      userError
    );

    redirect(
      `/profile?error=${encodeURIComponent(
        "Unable to authenticate your account."
      )}`
    );
  }

  if (!user?.email) {
    redirect(
      `/profile?error=${encodeURIComponent(
        "Unable to find your email."
      )}`
    );
  }

  const siteUrl =
    process.env
      .NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

  const redirectTo =
    `${siteUrl}/auth/callback?next=/update-password`;

  const {
    error,
  } =
    await supabase.auth.resetPasswordForEmail(
      user.email,
      {
        redirectTo,
      }
    );

  if (error) {
    console.error(
      "Password reset error:",
      error
    );

    redirect(
      `/profile?error=${encodeURIComponent(
        error.message
      )}`
    );
  }

  redirect(
    `/profile?success=${encodeURIComponent(
      "Password reset link sent to your email."
    )}`
  );
}

/* ============================================================
   LOGOUT
============================================================ */

export async function logout() {
  const supabase =
    await createClient();

  await supabase.auth.signOut();

  redirect("/login");
}