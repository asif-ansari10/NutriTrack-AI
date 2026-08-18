"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type Goal = "lose" | "maintain" | "gain";

type Gender = "male" | "female" | "other";

type Activity =
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "very_active";

function calculateAge(dateOfBirth: string) {
  const dob = new Date(dateOfBirth);
  const today = new Date();

  let age =
    today.getFullYear() -
    dob.getFullYear();

  const monthDifference =
    today.getMonth() -
    dob.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 &&
      today.getDate() < dob.getDate())
  ) {
    age--;
  }

  return age;
}

function calculateNutrition({
  gender,
  age,
  height,
  weight,
  goal,
  activity,
}: {
  gender: Gender;
  age: number;
  height: number;
  weight: number;
  goal: Goal;
  activity: Activity;
}) {
  /*
   * Mifflin-St Jeor
   */

  let bmr: number;

  if (gender === "female") {
    bmr =
      10 * weight +
      6.25 * height -
      5 * age -
      161;
  } else {
    bmr =
      10 * weight +
      6.25 * height -
      5 * age +
      5;
  }

  const activityMultipliers: Record<
    Activity,
    number
  > = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  };

  const maintenanceCalories =
    bmr * activityMultipliers[activity];

  let calories = maintenanceCalories;

  if (goal === "lose") {
    calories -= 500;
  }

  if (goal === "gain") {
    calories += 300;
  }

  calories = Math.max(
    1200,
    Math.round(calories)
  );

  /*
   * Protein
   */

  const proteinPerKg =
    goal === "gain" ? 1.8 : 1.6;

  const protein = Math.round(
    weight * proteinPerKg
  );

  /*
   * Fat = approximately 25% calories
   */

  const fat = Math.round(
    (calories * 0.25) / 9
  );

  /*
   * Remaining calories = carbs
   */

  const carbs = Math.max(
    0,
    Math.round(
      (calories -
        protein * 4 -
        fat * 9) /
        4
    )
  );

  return {
    daily_calorie_target: calories,
    protein_target_g: protein,
    carbs_target_g: carbs,
    fat_target_g: fat,
  };
}

export async function completeOnboarding(
  formData: FormData
) {
  /*
   * Read form data
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
   * Validation
   */

  if (
    !["lose", "maintain", "gain"].includes(
      goal
    )
  ) {
    redirect(
      "/onboarding?error=Invalid%20goal."
    );
  }

  if (
    !["male", "female", "other"].includes(
      gender
    )
  ) {
    redirect(
      "/onboarding?error=Please%20select%20your%20gender."
    );
  }

  if (!dateOfBirth) {
    redirect(
      "/onboarding?error=Please%20enter%20your%20date%20of%20birth."
    );
  }

  const age = calculateAge(dateOfBirth);

  if (age < 13 || age > 100) {
    redirect(
      "/onboarding?error=Age%20must%20be%20between%2013%20and%20100."
    );
  }

  if (
    !height ||
    height < 100 ||
    height > 250
  ) {
    redirect(
      "/onboarding?error=Please%20enter%20a%20valid%20height."
    );
  }

  if (
    !currentWeight ||
    currentWeight < 30 ||
    currentWeight > 300
  ) {
    redirect(
      "/onboarding?error=Please%20enter%20a%20valid%20current%20weight."
    );
  }

  if (
    !targetWeight ||
    targetWeight < 30 ||
    targetWeight > 300
  ) {
    redirect(
      "/onboarding?error=Please%20enter%20a%20valid%20target%20weight."
    );
  }

  if (
    goal === "lose" &&
    targetWeight >= currentWeight
  ) {
    redirect(
      `/onboarding?error=${encodeURIComponent(
        "For fat loss, your target weight must be lower than your current weight."
      )}`
    );
  }

  if (
    goal === "gain" &&
    targetWeight <= currentWeight
  ) {
    redirect(
      `/onboarding?error=${encodeURIComponent(
        "For weight gain, your target weight must be higher than your current weight."
      )}`
    );
  }

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
   * Calculate nutrition
   */

  const nutrition =
    calculateNutrition({
      gender,
      age,
      height,
      weight: currentWeight,
      goal,
      activity,
    });

  /*
   * Supabase
   */

  const supabase =
    await createClient();

  /*
   * Get logged-in user
   */

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect(
      "/login?error=Please%20login%20to%20continue."
    );
  }

  /*
   * Make sure profile exists
   */

  const { data: existingProfile, error: profileError } =
    await supabase
      .from("profiles")
      .select("id")
      .eq("id", user.id)
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
   * UPDATE PROFILE
   */

  const { data: updatedProfile, error: updateError } =
    await supabase
      .from("profiles")
      .update({
        goal,
        gender,
        date_of_birth: dateOfBirth,

        height_cm: height,

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

        onboarding_completed: true,

        updated_at:
          new Date().toISOString(),
      })
      .eq("id", user.id)
      .select(
        "id, onboarding_completed"
      )
      .single();

  /*
   * Update failed
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
   * IMPORTANT:
   * Verify database actually saved it.
   */

  if (
    !updatedProfile ||
    updatedProfile.onboarding_completed !== true
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
   * SUCCESS
   */

  redirect("/");
}