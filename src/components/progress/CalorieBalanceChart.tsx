"use client";

interface CalorieBalanceData {
  date: string;
  calories: number;
}

interface CalorieBalanceChartProps {
  data: CalorieBalanceData[];
  target: number;
}

export default function CalorieBalanceChart({
  data,
  target,
}: CalorieBalanceChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="rounded-2xl border border-[#e1e3e4] bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#191c1d]">
              Daily Calorie Balance
            </h2>

            <p className="mt-1 text-xs text-[#6e7977]">
              Intake compared with your daily calorie target.
            </p>
          </div>
        </div>

        <div className="flex h-64 items-center justify-center text-sm text-[#6e7977]">
          No calorie data available for this month.
        </div>
      </div>
    );
  }

  /*
   * Positive balance:
   * User ate LESS than target → calorie deficit
   *
   * Negative balance:
   * User ate MORE than target → calorie surplus
   */
  const balances = data.map((item) => ({
    ...item,
    balance: target - item.calories,
  }));

  const maxBalance = Math.max(
    ...balances.map((item) => Math.abs(item.balance)),
    1
  );

  return (
    <div className="rounded-2xl border border-[#e1e3e4] bg-white p-5 shadow-sm sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#191c1d]">
            Daily Calorie Balance
          </h2>

          <p className="mt-1 text-xs text-[#6e7977]">
            Intake compared with your daily calorie target.
          </p>
        </div>

        <div className="rounded-full bg-[#f3f4f5] px-3 py-1.5 text-xs font-medium text-[#3e4947]">
          Target: {target.toLocaleString()} kcal
        </div>
      </div>

      {/* Legend */}
      <div className="mt-5 flex flex-wrap gap-4 text-xs text-[#6e7977]">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-sm bg-[#2e7d32]" />
          Deficit
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-sm bg-[#BA1A1A]" />
          Surplus
        </div>
      </div>

      {/* Chart */}
      <div className="relative mt-6 h-64">
        {/* Center / target line */}
        <div className="absolute left-0 right-0 top-1/2 z-0 border-t border-dashed border-[#bec9c6]" />

        {/* Labels */}
        <span className="absolute left-0 top-[calc(50%-58px)] text-[10px] font-medium text-[#2e7d32]">
          Deficit
        </span>

        <span className="absolute left-0 top-[calc(50%+8px)] text-[10px] font-medium text-[#BA1A1A]">
          Surplus
        </span>

        {/* Bars */}
        <div className="absolute inset-x-0 top-0 bottom-0 flex items-center gap-1 pl-8">
          {balances.map((item) => {
            const isDeficit =
              item.balance >= 0;

            const barHeight =
              (Math.abs(item.balance) /
                maxBalance) *
              42;

            const formattedDate =
              new Date(
                `${item.date}T00:00:00`
              );

            return (
              <div
                key={item.date}
                className="relative h-full min-w-[18px] flex-1"
                title={`${formatDate(
                  item.date
                )}: ${
                  Math.abs(item.balance)
                } kcal ${
                  isDeficit
                    ? "deficit"
                    : "surplus"
                }`}
              >
                {/* Bar */}
                <div
                  className={`absolute left-1/2 w-full max-w-[30px] -translate-x-1/2 rounded-sm ${
                    isDeficit
                      ? "bg-[#2e7d32]"
                      : "bg-[#BA1A1A]"
                  }`}
                  style={{
                    height: `${Math.max(
                      barHeight,
                      item.balance !== 0
                        ? 3
                        : 1
                    )}%`,
                    ...(isDeficit
                      ? {
                          bottom: "50%",
                        }
                      : {
                          top: "50%",
                        }),
                  }}
                />

                {/* Day number */}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[9px] font-medium text-[#6e7977]">
                  {formattedDate.getDate()}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom information */}
      <div className="mt-3 flex justify-between border-t border-[#e1e3e4] pt-3 text-[10px] text-[#6e7977]">
        <span>
          {formatDate(data[0].date)}
        </span>

        <span>
          Target:{" "}
          {target.toLocaleString()} kcal
        </span>

        <span>
          {formatDate(
            data[data.length - 1].date
          )}
        </span>
      </div>
    </div>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
  }).format(new Date(`${date}T00:00:00`));
}