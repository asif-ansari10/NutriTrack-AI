import DashboardHeader from "./DashboardHeader";
import CalorieRing from "./CalorieRing";
import MacroSummary from "./MacroSummary";
import EnergyBalance from "./EnergyBalance";
import MealsList from "./MealsList";

import {
  getDashboardData,
} from "@/lib/dashboard/getDashboardData";

/* ============================================================
   BASELINE BURN
============================================================ */

function calculateBaselineBurn(
  profile: NonNullable<
    Awaited<
      ReturnType<typeof getDashboardData>
    >["profile"]
  >
) {
  if (!profile) {
    return 0;
  }

  /*
   * If we don't have enough information,
   * use the nutrition target as fallback.
   */

  if (
    !profile.daily_calorie_target
  ) {
    return 0;
  }

  /*
   * The nutrition calculation uses:
   *
   * Lose:
   * maintenance - 500
   *
   * Maintain:
   * maintenance
   *
   * Gain:
   * maintenance + 300
   *
   * Reverse that adjustment to estimate
   * baseline / maintenance calories.
   */

  if (
    profile.goal === "lose"
  ) {
    return (
      profile.daily_calorie_target +
      500
    );
  }

  if (
    profile.goal === "gain"
  ) {
    return Math.max(
      profile.daily_calorie_target -
        300,
      0
    );
  }

  return profile.daily_calorie_target;
}

/* ============================================================
   DASHBOARD
============================================================ */

export default async function HomeDashboard() {
  const data =
    await getDashboardData();

  const profile =
    data.profile;

  const baselineBurn =
    profile
      ? calculateBaselineBurn(
          profile
        )
      : 0;

  return (
    <>
      {/* ======================================================
          HEADER
      ====================================================== */}

      <DashboardHeader
        name={
          profile?.full_name || ""
        }
        goal={
          profile?.goal || null
        }
        authenticated={
          data.authenticated
        }
      />

      {/* ======================================================
          DASHBOARD GRID
      ====================================================== */}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-12 xl:gap-6">

        {/* ====================================================
            CALORIES + MACROS
        ==================================================== */}

        <div className="space-y-5 md:col-span-1 xl:col-span-4">

          {/* --------------------------------------------------
              CALORIE RING
          -------------------------------------------------- */}

          <CalorieRing
            consumed={
              data.totals.calories
            }
            target={
              profile
                ?.daily_calorie_target ||
              0
            }
          />

          {/* --------------------------------------------------
              MACROS
          -------------------------------------------------- */}

          <MacroSummary
            protein={
              data.totals.protein
            }
            proteinTarget={
              profile
                ?.protein_target_g ||
              0
            }

            carbs={
              data.totals.carbs
            }
            carbsTarget={
              profile
                ?.carbs_target_g ||
              0
            }

            fat={
              data.totals.fat
            }
            fatTarget={
              profile
                ?.fat_target_g ||
              0
            }

            fiber={
              data.totals.fiber
            }
            fiberTarget={
              profile
                ?.fiber_target_g ||
              0
            }
          />

        </div>

        {/* ====================================================
            ENERGY BALANCE
        ==================================================== */}

        <div className="md:col-span-1 xl:col-span-5">

          <EnergyBalance
            foodIntake={
              data.totals.calories
            }
            baselineBurn={
              baselineBurn
            }
            exerciseCalories={
              data.totals
                .exerciseCalories
            }
          />

        </div>

        {/* ====================================================
            MEALS
        ==================================================== */}

        <div className="md:col-span-2 xl:col-span-3">

          <MealsList
            meals={data.meals}
          />

        </div>

      </div>
    </>
  );
}