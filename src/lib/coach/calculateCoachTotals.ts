export interface CoachMeal {
  calories?: number | string | null;
  protein_g?: number | string | null;
  carbs_g?: number | string | null;
  fat_g?: number | string | null;
  fiber_g?: number | string | null;
}

export interface CoachActivity {
  calories_burned?: number | string | null;
}

export interface CoachTargets {
  daily_calorie_target?: number | string | null;
  protein_target_g?: number | string | null;
  carbs_target_g?: number | string | null;
  fat_target_g?: number | string | null;
  fiber_target_g?: number | string | null;
}

export interface CoachTotals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  exerciseCalories: number;
}

export interface CoachRemaining {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

/* -------------------------------------------------------------------------- */
/* Safe number                                                                */
/* -------------------------------------------------------------------------- */

function toNumber(
  value: number | string | null | undefined
): number {
  const numberValue = Number(value);

  if (!Number.isFinite(numberValue)) {
    return 0;
  }

  return numberValue;
}

/* -------------------------------------------------------------------------- */
/* Calculate today's totals                                                   */
/* -------------------------------------------------------------------------- */

export function calculateCoachTotals(
  meals: CoachMeal[] = [],
  activities: CoachActivity[] = []
): CoachTotals {
  const totals: CoachTotals = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    exerciseCalories: 0,
  };

  /* ------------------------------------------------------------------------ */
  /* Meals                                                                    */
  /* ------------------------------------------------------------------------ */

  for (const meal of meals) {
    totals.calories += toNumber(
      meal.calories
    );

    totals.protein += toNumber(
      meal.protein_g
    );

    totals.carbs += toNumber(
      meal.carbs_g
    );

    totals.fat += toNumber(
      meal.fat_g
    );

    totals.fiber += toNumber(
      meal.fiber_g
    );
  }

  /* ------------------------------------------------------------------------ */
  /* Activities                                                               */
  /* ------------------------------------------------------------------------ */

  for (const activity of activities) {
    totals.exerciseCalories += toNumber(
      activity.calories_burned
    );
  }

  /* ------------------------------------------------------------------------ */
  /* Return rounded values                                                    */
  /* ------------------------------------------------------------------------ */

  return {
    calories: Math.round(
      totals.calories
    ),

    protein: Math.round(
      totals.protein
    ),

    carbs: Math.round(
      totals.carbs
    ),

    fat: Math.round(
      totals.fat
    ),

    fiber: Math.round(
      totals.fiber
    ),

    exerciseCalories: Math.round(
      totals.exerciseCalories
    ),
  };
}

/* -------------------------------------------------------------------------- */
/* Calculate remaining nutrition                                              */
/* -------------------------------------------------------------------------- */

export function calculateRemaining(
  totals: CoachTotals,
  targets: CoachTargets
): CoachRemaining {
  const calorieTarget = toNumber(
    targets.daily_calorie_target
  );

  const proteinTarget = toNumber(
    targets.protein_target_g
  );

  const carbsTarget = toNumber(
    targets.carbs_target_g
  );

  const fatTarget = toNumber(
    targets.fat_target_g
  );

  const fiberTarget = toNumber(
    targets.fiber_target_g
  );

  return {
    calories: Math.max(
      0,
      Math.round(
        calorieTarget -
          totals.calories
      )
    ),

    protein: Math.max(
      0,
      Math.round(
        proteinTarget -
          totals.protein
      )
    ),

    carbs: Math.max(
      0,
      Math.round(
        carbsTarget -
          totals.carbs
      )
    ),

    fat: Math.max(
      0,
      Math.round(
        fatTarget -
          totals.fat
      )
    ),

    fiber: Math.max(
      0,
      Math.round(
        fiberTarget -
          totals.fiber
      )
    ),
  };
}