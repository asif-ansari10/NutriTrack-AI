import {
  Flame,
  TrendingDown,
  TrendingUp,
  Utensils,
  CheckCircle,
} from "lucide-react";

interface EnergyBalanceProps {
  foodIntake: number;
  baselineBurn: number;
  exerciseCalories: number;
}

export default function EnergyBalance({
  foodIntake,
  baselineBurn,
  exerciseCalories,
}: EnergyBalanceProps) {
  const totalBurn =
    baselineBurn + exerciseCalories;

  const balance =
    totalBurn - foodIntake;

  const isDeficit = balance >= 0;

  return (
    <div className="h-full rounded-[20px] border border-[#e1e3e4]/60 bg-[#f3f4f5] p-5 sm:p-6">

      <h2 className="mb-5 text-xs font-semibold uppercase tracking-wider text-[#3e4947] sm:mb-6">
        Energy Balance
      </h2>

      <div className="space-y-5 sm:space-y-6">

        {/* FOOD */}
        <div className="flex items-center gap-3 rounded-xl border-l-4 border-[#004e47] bg-white p-4 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#004e47]/10 text-[#004e47]">
            <Utensils size={20} />
          </div>

          <div>
            <p className="text-xs text-[#3e4947]">
              Food Intake
            </p>

            <p className="text-xl font-semibold text-[#191c1d]">
              {foodIntake.toLocaleString()}{" "}
              <span className="text-sm font-normal">
                kcal
              </span>
            </p>
          </div>

        </div>

        {/* BURN */}
        <div className="rounded-xl border-l-4 border-[#e57373] bg-white p-4 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">

          <div className="mb-4 flex items-center gap-3 border-b border-[#e1e3e4] pb-4">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e57373]/10 text-[#e57373]">
              <Flame size={20} />
            </div>

            <div>

              <p className="text-xs text-[#3e4947]">
                Total Burn
              </p>

              <p className="text-xl font-semibold text-[#191c1d]">
                {totalBurn.toLocaleString()}{" "}
                <span className="text-sm font-normal">
                  kcal
                </span>
              </p>

            </div>

          </div>

          <div className="space-y-3 pl-0 sm:pl-12">

            <div className="flex justify-between gap-4">

              <span className="text-sm text-[#3e4947]">
                Baseline Burn
              </span>

              <span className="text-sm font-medium text-[#191c1d]">
                {baselineBurn.toLocaleString()}
              </span>

            </div>

            <div className="flex justify-between gap-4">

              <span className="flex items-center gap-1 text-sm text-[#3e4947]">
                Logged Exercise

                {exerciseCalories > 0 && (
                  <CheckCircle
                    size={14}
                    className="text-[#006a61]"
                  />
                )}
              </span>

              <span className="text-sm font-medium text-[#006a61]">
                +{exerciseCalories.toLocaleString()}
              </span>

            </div>

          </div>

        </div>

        {/* BALANCE */}
        <div className="flex items-center justify-between border-t border-[#e1e3e4] pt-5 sm:pt-6">

          <div>

            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#3e4947]">
              Estimated{" "}
              {isDeficit
                ? "Deficit"
                : "Surplus"}
            </p>

            <p
              className={`text-3xl font-bold leading-none sm:text-4xl ${
                isDeficit
                  ? "text-[#004e47]"
                  : "text-[#c45c5c]"
              }`}
            >
              {isDeficit ? "-" : "+"}
              {Math.abs(balance).toLocaleString()}{" "}
              <span className="text-xl font-normal text-[#3e4947]">
                kcal
              </span>
            </p>

          </div>

          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#004e47]/10 sm:h-16 sm:w-16">

            {isDeficit ? (
              <TrendingDown
                size={28}
                className="text-[#004e47]"
              />
            ) : (
              <TrendingUp
                size={28}
                className="text-[#c45c5c]"
              />
            )}

          </div>

        </div>

      </div>

    </div>
  );
}