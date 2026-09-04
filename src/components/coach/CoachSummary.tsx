"use client";

import {
  Activity,
  Flame,
  Wheat,
  Dumbbell,
} from "lucide-react";

interface CoachSummaryProps {
  calories: number;
  calorieTarget: number;

  protein: number;
  proteinTarget: number;

  carbs: number;
  carbsTarget: number;

  fat: number;
  fatTarget: number;

  fiber: number;
  fiberTarget: number;

  exerciseCalories: number;
}

export default function CoachSummary({
  calories,
  calorieTarget,
  protein,
  proteinTarget,
  carbs,
  carbsTarget,
  fat,
  fatTarget,
  fiber,
  fiberTarget,
  exerciseCalories,
}: CoachSummaryProps) {
  const caloriesLeft =
    Math.max(
      0,
      calorieTarget - calories
    );

  return (
    <aside className="hidden w-[360px] shrink-0 overflow-y-auto border-r border-[#e1e3e4] bg-white p-6 xl:block">
      <h2 className="text-xl font-bold text-[#191c1d]">
        Today's Summary
      </h2>

      <p className="mt-1 text-sm text-[#6e7977]">
        Your Coach is using your
        actual NutriTrack records.
      </p>

      {/* Calories */}

      <div className="mt-6 rounded-[20px] border border-[#e1e3e4] bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#6e7977]">
            Calories Remaining
          </p>

          <div className="relative mx-auto mt-4 h-40 w-40">
            <svg
              viewBox="0 0 100 100"
              className="-rotate-90"
            >
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#e7eeee"
                strokeWidth="8"
              />

              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#00685f"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="251.2"
                strokeDashoffset={
                  calorieTarget > 0
                    ? 251.2 -
                      Math.min(
                        calories /
                          calorieTarget,
                        1
                      ) *
                        251.2
                    : 251.2
                }
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-[#191c1d]">
                {caloriesLeft.toLocaleString()}
              </span>

              <span className="text-xs text-[#6e7977]">
                kcal
              </span>
            </div>
          </div>

          <p className="mt-2 text-xs text-[#6e7977]">
            {calories.toLocaleString()} of{" "}
            {calorieTarget.toLocaleString()}{" "}
            kcal
          </p>
        </div>
      </div>

      {/* Macro cards */}

      <div className="mt-5 grid grid-cols-2 gap-3">
        <Macro
          label="Protein"
          value={protein}
          target={proteinTarget}
        />

        <Macro
          label="Carbs"
          value={carbs}
          target={carbsTarget}
        />

        <Macro
          label="Fat"
          value={fat}
          target={fatTarget}
        />

        <Macro
          label="Fiber"
          value={fiber}
          target={fiberTarget}
          icon={<Wheat size={14} />}
        />
      </div>

      {/* Activity */}

      <div className="mt-4 rounded-2xl border border-[#e1e3e4] p-4">
        <div className="flex items-center gap-2">
          <Dumbbell
            size={18}
            className="text-[#00685f]"
          />

          <span className="text-sm font-semibold">
            Today's Exercise
          </span>
        </div>

        <p className="mt-2 text-2xl font-bold text-[#191c1d]">
          {exerciseCalories}
          <span className="ml-1 text-sm font-normal text-[#6e7977]">
            kcal
          </span>
        </p>
      </div>

      {/* Insight */}

      <div className="mt-5 rounded-2xl border border-[#91f4e6] bg-[#e7f8f5] p-4">
        <div className="flex gap-3">
          <Flame
            size={20}
            className="mt-0.5 text-[#00685f]"
          />

          <div>
            <h3 className="text-sm font-semibold text-[#005049]">
              Coach Insight
            </h3>

            <p className="mt-1 text-sm leading-5 text-[#3e4947]">
              {proteinTarget >
              protein
                ? `You have ${Math.max(
                    0,
                    proteinTarget -
                      protein
                  )}g protein left today.`
                : "You've reached your protein target for today."}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function Macro({
  label,
  value,
  target,
  icon,
}: {
  label: string;
  value: number;
  target: number;
  icon?: React.ReactNode;
}) {
  const percentage =
    target > 0
      ? Math.min(
          (value / target) * 100,
          100
        )
      : 0;

  return (
    <div className="rounded-2xl border border-[#e1e3e4] p-3">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6e7977]">
          {label}
        </span>

        {icon || (
          <Activity
            size={14}
            className="text-[#00685f]"
          />
        )}
      </div>

      <p className="mt-2 text-lg font-bold text-[#191c1d]">
        {Math.round(value)}
        <span className="ml-1 text-xs font-normal text-[#6e7977]">
          g
        </span>
      </p>

      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#e7eeee]">
        <div
          className="h-full rounded-full bg-[#00685f] transition-all duration-500"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      <p className="mt-1 text-[10px] text-[#6e7977]">
        of {target}g
      </p>
    </div>
  );
}