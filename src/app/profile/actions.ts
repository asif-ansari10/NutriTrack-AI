"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
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

  const proteinPerKg =
    goal === "gain" ? 1.8 : 1.6;

  const protein = Math.round(
    weight * proteinPerKg
  );

  const fat = Math.round(
    (calories * 0.25) / 9
  );

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

/* --------------------------------
   UPDATE PROFILE
-------------------------------- */

export async function updateProfile(
  formData: FormData
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

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
  );

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

  /* Validation */

  if (!fullName) {
    redirect(
      "/profile?error=Please%20enter%20your%20name."
    );
  }

  if (
    !["lose", "maintain", "gain"].includes(
      goal
    )
  ) {
    redirect(
      "/profile?error=Invalid%20goal."
    );
  }

  if (
    !["male", "female", "other"].includes(
      gender
    )
  ) {
    redirect(
      "/profile?error=Invalid%20gender."
    );
  }

  if (!dateOfBirth) {
    redirect(
      "/profile?error=Please%20enter%20your%20date%20of%20birth."
    );
  }

  const age = calculateAge(dateOfBirth);

  if (age < 13 || age > 100) {
    redirect(
      "/profile?error=Age%20must%20be%20between%2013%20and%20100."
    );
  }

  if (
    !height ||
    height < 100 ||
    height > 250
  ) {
    redirect(
      "/profile?error=Please%20enter%20a%20valid%20height."
    );
  }

  if (
    !currentWeight ||
    currentWeight < 30 ||
    currentWeight > 300
  ) {
    redirect(
      "/profile?error=Please%20enter%20a%20valid%20current%20weight."
    );
  }

  if (
    !targetWeight ||
    targetWeight < 30 ||
    targetWeight > 300
  ) {
    redirect(
      "/profile?error=Please%20enter%20a%20valid%20target%20weight."
    );
  }

  if (
    goal === "lose" &&
    targetWeight >= currentWeight
  ) {
    redirect(
      "/profile?error=For%20fat%20loss%2C%20target%20weight%20must%20be%20lower."
    );
  }

  if (
    goal === "gain" &&
    targetWeight <= currentWeight
  ) {
    redirect(
      "/profile?error=For%20weight%20gain%2C%20target%20weight%20must%20be%20higher."
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
      "/profile?error=Please%20select%20an%20activity%20level."
    );
  }

  /* Recalculate nutrition */

  const nutrition = calculateNutrition({
    gender,
    age,
    height,
    weight: currentWeight,
    goal,
    activity,
  });

  /* Update profile */

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: fullName,
      goal,
      gender,
      date_of_birth: dateOfBirth,
      height_cm: height,
      current_weight_kg: currentWeight,
      target_weight_kg: targetWeight,
      activity_level: activity,

      daily_calorie_target:
        nutrition.daily_calorie_target,

      protein_target_g:
        nutrition.protein_target_g,

      carbs_target_g:
        nutrition.carbs_target_g,

      fat_target_g:
        nutrition.fat_target_g,

      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  if (error) {
    console.error(
      "Profile update error:",
      error
    );

    redirect(
      "/profile?error=Unable%20to%20update%20your%20profile."
    );
  }

  redirect(
    "/profile?success=Profile%20updated%20successfully."
  );
}

/* --------------------------------
   PASSWORD RESET
-------------------------------- */

export async function requestPasswordReset() {
  const supabase = await createClient();

  /*
   * Get logged-in user
   */
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.error(
      "Get user error:",
      userError
    );

    redirect(
      "/profile?error=Unable%20to%20authenticate%20your%20account."
    );
  }

  if (!user?.email) {
    redirect(
      "/profile?error=Unable%20to%20find%20your%20email."
    );
  }

  /*
   * IMPORTANT:
   *
   * This URL MUST be added to
   * Supabase Dashboard → Authentication
   * → URL Configuration → Redirect URLs
   */
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

  const redirectTo =
    `${siteUrl}/auth/callback?next=/update-password`;

  console.log(
    "Password reset redirect URL:",
    redirectTo
  );

  /*
   * Send password reset email
   */
  const { error } =
    await supabase.auth.resetPasswordForEmail(
      user.email,
      {
        redirectTo,
      }
    );

  /*
   * Show the REAL Supabase error in terminal
   */
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

  /*
   * Success
   */
  redirect(
    "/profile?success=Password%20reset%20link%20sent%20to%20your%20email."
  );
}

/* --------------------------------
   LOGOUT
-------------------------------- */

export async function logout() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  redirect("/login");
}