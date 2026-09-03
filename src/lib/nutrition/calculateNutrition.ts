export type Goal =
  | "lose"
  | "maintain"
  | "gain";

export type Gender =
  | "male"
  | "female"
  | "other";

export type Activity =
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "very_active";

export interface NutritionTargets {
  daily_calorie_target: number;
  protein_target_g: number;
  carbs_target_g: number;
  fat_target_g: number;
  fiber_target_g: number;
}

/* ============================================================
   CALCULATE AGE
============================================================ */

export function calculateAge(
  dateOfBirth: string
): number {
  const dob = new Date(
    `${dateOfBirth}T00:00:00`
  );

  if (Number.isNaN(dob.getTime())) {
    return 0;
  }

  const today = new Date();

  let age =
    today.getFullYear() -
    dob.getFullYear();

  const monthDifference =
    today.getMonth() -
    dob.getMonth();

  if (
    monthDifference < 0 ||
    (
      monthDifference === 0 &&
      today.getDate() < dob.getDate()
    )
  ) {
    age--;
  }

  return age;
}

/* ============================================================
   CALCULATE NUTRITION
============================================================ */

export function calculateNutrition({
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
}): NutritionTargets {
  /* ==========================================================
     BMR - MIFFLIN ST JEOR
  ========================================================== */

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

  /* ==========================================================
     ACTIVITY MULTIPLIER
  ========================================================== */

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
    bmr *
    activityMultipliers[activity];

  /* ==========================================================
     CALORIES
  ========================================================== */

  let calories =
    maintenanceCalories;

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

  /* ==========================================================
     PROTEIN
  ========================================================== */

  const proteinPerKg =
    goal === "gain"
      ? 1.8
      : 1.6;

  const protein =
    Math.round(
      weight * proteinPerKg
    );

  /* ==========================================================
     FAT
  ========================================================== */

  const fat =
    Math.round(
      (calories * 0.25) / 9
    );

  /* ==========================================================
     CARBS
  ========================================================== */

  const carbs =
    Math.max(
      0,
      Math.round(
        (
          calories -
          protein * 4 -
          fat * 9
        ) / 4
      )
    );

  /* ==========================================================
     FIBER
     14g per 1000 kcal
     Minimum 20g
  ========================================================== */

  const fiber =
    Math.max(
      20,
      Math.round(
        (calories / 1000) * 14
      )
    );

  return {
    daily_calorie_target:
      calories,

    protein_target_g:
      protein,

    carbs_target_g:
      carbs,

    fat_target_g:
      fat,

    fiber_target_g:
      fiber,
  };
}