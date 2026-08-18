import {
  Flame,
  TrendingDown,
  Utensils,
  CheckCircle,
} from "lucide-react";

interface EnergyBalanceProps {
  foodIntake: number;
  baselineBurn: number;
  exerciseCalories: number;
  totalBurn: number;
  deficit: number;
}

export default function EnergyBalance({
  foodIntake,
  baselineBurn,
  exerciseCalories,
  totalBurn,
  deficit,
}: EnergyBalanceProps) {
  const hasData =
    foodIntake > 0 ||
    baselineBurn > 0 ||
    exerciseCalories > 0;

  if (!hasData) {
    return (
      <div className="rounded-[20px] bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">

        <h2 className="mb-5 text-xs font-semibold uppercase tracking-wider text-[#3e4947]">
          Energy Balance
        </h2>

        <div className="rounded-xl border border-dashed border-[#bec9c6] p-6 text-center">

          <p className="text-sm font-medium text-[#6e7977]">
            No energy data yet.
          </p>

          <p className="mt-1 text-xs text-[#8a9492]">
            Log a meal or activity to see your balance.
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="rounded-[20px] bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] sm:p-6">

      <h2 className="mb-5 text-xl font-semibold text-[#191c1d]">
        Energy Balance
      </h2>

      {/* Food */}
      <div className="flex items-center justify-between border-b border-[#e1e3e4] py-4">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#004e47]/10 text-[#004e47]">
            <Utensils size={17} />
          </div>

          <span className="text-sm text-[#3e4947]">
            Food Intake
          </span>

        </div>

        <span className="text-sm font-bold text-[#191c1d]">
          {foodIntake.toLocaleString()} kcal
        </span>

      </div>

      {/* Baseline */}
      <div className="flex items-center justify-between border-b border-[#e1e3e4] py-4">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f3f4f5] text-[#3e4947]">
            <Flame size={17} />
          </div>

          <span className="text-sm text-[#3e4947]">
            Baseline Burn
          </span>

        </div>

        <span className="text-sm font-bold text-[#191c1d]">
          {baselineBurn.toLocaleString()} kcal
        </span>

      </div>

      {/* Exercise */}
      <div className="flex items-center justify-between border-b border-[#e1e3e4] py-4">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#91f4e6]/30 text-[#004e47]">
            <CheckCircle size={17} />
          </div>

          <span className="text-sm text-[#3e4947]">
            Logged Exercise
          </span>

        </div>

        <span className="text-sm font-bold text-[#00685f]">
          +{exerciseCalories.toLocaleString()} kcal
        </span>

      </div>

      {/* Total */}
      <div className="flex items-center justify-between py-4">

        <span className="text-sm font-semibold text-[#3e4947]">
          Est. Total Burn
        </span>

        <span className="text-sm font-bold text-[#191c1d]">
          {totalBurn.toLocaleString()} kcal
        </span>

      </div>

      {/* Deficit */}
      <div className="mt-3 flex items-center justify-between rounded-2xl bg-[#f3fafa] p-4">

        <div>

          <p className="text-xs font-semibold uppercase tracking-wider text-[#6e7977]">
            Estimated Deficit
          </p>

          <p
            className={`mt-1 text-2xl font-bold ${
              deficit >= 0
                ? "text-[#00685f]"
                : "text-[#d35454]"
            }`}
          >
            {deficit > 0
              ? "-"
              : "+"}
            {Math.abs(
              deficit
            ).toLocaleString()}{" "}
            <span className="text-sm font-normal text-[#6e7977]">
              kcal
            </span>
          </p>

        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#91f4e6]/30">
          <TrendingDown
            size={22}
            className="text-[#004e47]"
          />
        </div>

      </div>

    </div>
  );
}