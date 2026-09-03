"use client";

import { useState } from "react";

import ProgressHeader from "./ProgressHeader";
import ProgressSummary from "./ProgressSummary";
import WeightTrendChart from "./WeightTrendChart";
import CalorieIntakeChart from "./CalorieIntakeChart";
import ProteinTrendChart from "./ProteinTrendChart";
import CalorieBalanceChart from "./CalorieBalanceChart";
import GoalProgressCard from "./GoalProgressCard";
import MonthlyStats from "./MonthlyStats";
import UpdateWeightModal from "./UpdateWeightModal";

interface Props {
  month: string;

  data: {
    profile: {
      currentWeight: number;
      targetWeight: number;
      dailyCalorieTarget: number;
      proteinTarget: number;
    };

    daily: {
      date: string;
      calories: number;
      protein: number;
      weight: number | null;
    }[];

    weightLogs: {
      id: string;
      weight_kg: number;
      recorded_at: string;
    }[];

    totals: {
      averageCalories: number;
      averageProtein: number;
      loggedDays: number;
      firstWeight: number;
      lastWeight: number;
      weightChange: number;
      remaining: number;
      goalPercentage: number;
    };
  };
}

export default function ProgressPage({
  month,
  data,
}: Props) {
  const {
    profile,
    daily,
    weightLogs,
    totals,
  } = data;

  // =========================================================
  // UPDATE WEIGHT MODAL
  // =========================================================

  const [showWeightModal, setShowWeightModal] =
    useState(false);

  // =========================================================
  // WEIGHT CHART DATA
  // =========================================================
  // Keep the database ID so every chart point has a unique
  // React key, even if multiple weights are recorded
  // on the same date.
  // =========================================================

  const weightChart = weightLogs.map(
    (item) => ({
      id: item.id,
      date: item.recorded_at.slice(0, 10),
      weight: Number(item.weight_kg),
    })
  );

  return (
    <>
      <main className="min-h-screen bg-[#f8f9fa]">
        <div className="mx-auto w-full max-w-7xl px-4 py-6 pb-28 sm:px-6 md:px-8 md:py-8 md:pb-10">

          {/* =================================================
              HEADER
          ================================================= */}

          <ProgressHeader
            month={month}
            onUpdateWeight={() =>
              setShowWeightModal(true)
            }
          />

          {/* =================================================
              SUMMARY
          ================================================= */}

          <section className="mt-6">
            <ProgressSummary
              currentWeight={
                profile.currentWeight
              }
              weightChange={
                totals.weightChange
              }
              averageCalories={
                totals.averageCalories
              }
              averageProtein={
                totals.averageProtein
              }
              calorieTarget={
                profile.dailyCalorieTarget
              }
              proteinTarget={
                profile.proteinTarget
              }
            />
          </section>

          {/* =================================================
              MAIN CHARTS
          ================================================= */}

          <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-12">

            {/* =================================================
                WEIGHT TREND
            ================================================= */}

            <div className="xl:col-span-8">
              <WeightTrendChart
                data={weightChart}
                goal={
                  profile.targetWeight
                }
              />
            </div>

            {/* =================================================
                GOAL PROGRESS
            ================================================= */}

            <div className="xl:col-span-4">
              <GoalProgressCard
                startWeight={
                  totals.firstWeight
                }
                currentWeight={
                  profile.currentWeight
                }
                targetWeight={
                  profile.targetWeight
                }
                percentage={
                  totals.goalPercentage
                }
                remaining={
                  totals.remaining
                }
              />
            </div>
          </section>

          {/* =================================================
              NUTRITION CHARTS
          ================================================= */}

          <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">

            {/* =================================================
                CALORIE INTAKE
            ================================================= */}

            <CalorieIntakeChart
              data={daily.map(
                (item) => ({
                  date: item.date,
                  calories:
                    item.calories,
                })
              )}
              target={
                profile.dailyCalorieTarget
              }
            />

            {/* =================================================
                PROTEIN
            ================================================= */}

            <ProteinTrendChart
              data={daily.map(
                (item) => ({
                  date: item.date,
                  protein:
                    item.protein,
                })
              )}
              target={
                profile.proteinTarget
              }
            />

            {/* =================================================
                CALORIE BALANCE
            ================================================= */}

            <CalorieBalanceChart
              data={daily.map(
                (item) => ({
                  date: item.date,
                  calories:
                    item.calories,
                })
              )}
              target={
                profile.dailyCalorieTarget
              }
            />

            {/* =================================================
                MONTHLY STATS
            ================================================= */}

            <MonthlyStats
              averageCalories={
                totals.averageCalories
              }
              averageProtein={
                totals.averageProtein
              }
              loggedDays={
                totals.loggedDays
              }
              weightChange={
                totals.weightChange
              }
            />
          </section>
        </div>
      </main>

      {/* =====================================================
          UPDATE WEIGHT MODAL
      ====================================================== */}

      {showWeightModal && (
        <UpdateWeightModal
          currentWeight={
            profile.currentWeight
          }
          onClose={() =>
            setShowWeightModal(false)
          }
        />
      )}
    </>
  );
}