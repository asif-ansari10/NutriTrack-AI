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

export async function completeOnboarding(
  formData: FormData
) {
  /*
   * =========================================
   * 1. READ FORM DATA
   * =========================================
   */

  const goal = String(
    formData.get("goal") || ""
  ) as Goal;

  const gender = String(
    formData.get("gender") || ""
  ) as Gender;

  const dateOfBirth = String(
    formData.get("date_of_birth") || ""
  );

  const height = Number(
    formData.get("height")
  );

  const currentWeight = Number(
    formData.get("current_weight")
  );

  const targetWeight = Number(
    formData.get("target_weight")
  );

  const activity = String(
    formData.get("activity") || ""
  ) as Activity;

  /*
   * =========================================
   * 2. VALIDATE GOAL
   * =========================================
   */

  if (
    ![
      "lose",
      "maintain",
      "gain",
    ].includes(goal)
  ) {
    redirect(
      "/onboarding?error=Invalid%20goal."
    );
  }

  /*
   * =========================================
   * 3. VALIDATE GENDER
   * =========================================
   */

  if (
    ![
      "male",
      "female",
      "other",
    ].includes(gender)
  ) {
    redirect(
      "/onboarding?error=Please%20select%20your%20gender."
    );
  }

  /*
   * =========================================
   * 4. VALIDATE DOB
   * =========================================
   */

  if (!dateOfBirth) {
    redirect(
      "/onboarding?error=Please%20enter%20your%20date%20of%20birth."
    );
  }

  const age =
    calculateAge(dateOfBirth);

  if (
    age < 13 ||
    age > 100
  ) {
    redirect(
      "/onboarding?error=Age%20must%20be%20between%2013%20and%20100."
    );
  }

  /*
   * =========================================
   * 5. VALIDATE HEIGHT
   * =========================================
   */

  if (
    !Number.isFinite(height) ||
    height < 100 ||
    height > 250
  ) {
    redirect(
      "/onboarding?error=Please%20enter%20a%20valid%20height."
    );
  }

  /*
   * =========================================
   * 6. VALIDATE CURRENT WEIGHT
   * =========================================
   */

  if (
    !Number.isFinite(
      currentWeight
    ) ||
    currentWeight < 30 ||
    currentWeight > 300
  ) {
    redirect(
      "/onboarding?error=Please%20enter%20a%20valid%20current%20weight."
    );
  }

  /*
   * =========================================
   * 7. VALIDATE TARGET WEIGHT
   * =========================================
   */

  if (
    !Number.isFinite(
      targetWeight
    ) ||
    targetWeight < 30 ||
    targetWeight > 300
  ) {
    redirect(
      "/onboarding?error=Please%20enter%20a%20valid%20target%20weight."
    );
  }

  /*
   * =========================================
   * 8. GOAL + TARGET WEIGHT VALIDATION
   * =========================================
   */

  if (
    goal === "lose" &&
    targetWeight >=
      currentWeight
  ) {
    redirect(
      `/onboarding?error=${encodeURIComponent(
        "For fat loss, your target weight must be lower than your current weight."
      )}`
    );
  }

  if (
    goal === "gain" &&
    targetWeight <=
      currentWeight
  ) {
    redirect(
      `/onboarding?error=${encodeURIComponent(
        "For weight gain, your target weight must be higher than your current weight."
      )}`
    );
  }

  /*
   * =========================================
   * 9. VALIDATE ACTIVITY
   * =========================================
   */

  if (
    ![
      "sedentary",
      "light",
      "moderate",
      "active",
      "very_active",
    ].includes(activity)
  ) {
    redirect(
      "/onboarding?error=Please%20select%20your%20activity%20level."
    );
  }

  /*
   * =========================================
   * 10. CALCULATE NUTRITION
   *
   * This now includes:
   *
   * Calories
   * Protein
   * Carbs
   * Fat
   * Fiber
   * =========================================
   */

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
    "Calculated onboarding nutrition:",
    nutrition
  );

  /*
   * =========================================
   * 11. SUPABASE
   * =========================================
   */

  const supabase =
    await createClient();

  /*
   * =========================================
   * 12. GET LOGGED-IN USER
   * =========================================
   */

  const {
    data: {
      user,
    },
    error: userError,
  } =
    await supabase.auth.getUser();

  if (
    userError ||
    !user
  ) {
    redirect(
      "/login?error=Please%20login%20to%20continue."
    );
  }

  /*
   * =========================================
   * 13. CHECK PROFILE
   * =========================================
   */

  const {
    data: existingProfile,
    error: profileError,
  } =
    await supabase
      .from("profiles")
      .select("id")
      .eq(
        "id",
        user.id
      )
      .maybeSingle();

  if (profileError) {
    console.error(
      "Profile lookup error:",
      profileError
    );

    redirect(
      `/onboarding?error=${encodeURIComponent(
        "Unable to load your profile."
      )}`
    );
  }

  if (!existingProfile) {
    console.error(
      "Profile does not exist for user:",
      user.id
    );

    redirect(
      `/onboarding?error=${encodeURIComponent(
        "Your profile was not found. Please login again."
      )}`
    );
  }

  /*
   * =========================================
   * 14. UPDATE PROFILE
   * =========================================
   */

  const {
    data: updatedProfile,
    error: updateError,
  } =
    await supabase
      .from("profiles")
      .update({
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

        /*
         * CALCULATED TARGETS
         */

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

        onboarding_completed:
          true,

        updated_at:
          new Date().toISOString(),
      })
      .eq(
        "id",
        user.id
      )
      .select(
        "id, onboarding_completed, daily_calorie_target, protein_target_g, carbs_target_g, fat_target_g, fiber_target_g"
      )
      .single();

  /*
   * =========================================
   * 15. UPDATE ERROR
   * =========================================
   */

  if (updateError) {
    console.error(
      "ONBOARDING UPDATE ERROR:",
      updateError
    );

    redirect(
      `/onboarding?error=${encodeURIComponent(
        updateError.message
      )}`
    );
  }

  /*
   * =========================================
   * 16. VERIFY SAVE
   * =========================================
   */

  if (
    !updatedProfile ||
    updatedProfile.onboarding_completed !==
      true
  ) {
    console.error(
      "Profile update did not persist:",
      updatedProfile
    );

    redirect(
      `/onboarding?error=${encodeURIComponent(
        "Your information could not be saved. Please try again."
      )}`
    );
  }

  /*
   * =========================================
   * 17. SUCCESS
   * =========================================
   */

  redirect("/");
}