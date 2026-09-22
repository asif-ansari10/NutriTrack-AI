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
      <div className="w-full min-w-0 rounded-2xl border border-[#e1e3e4] bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-xl font-bold text-[#191c1d]">
          Daily Calorie Balance
        </h2>

        <p className="mt-1 text-xs text-[#6e7977]">
          Intake compared with your daily calorie target.
        </p>

        <div className="flex h-64 items-center justify-center text-sm text-[#6e7977]">
          No calorie data available for this month.
        </div>
      </div>
    );
  }

  /*
   * Positive = calorie deficit
   * Negative = calorie surplus
   */
  const balances = data.map((item) => ({
    ...item,
    balance: target - item.calories,
  }));

  const maxBalance = Math.max(
    ...balances.map((item) =>
      Math.abs(item.balance)
    ),
    1
  );

  return (
    <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-[#e1e3e4] bg-white p-5 shadow-sm sm:p-6">

      {/* =========================
          HEADER
      ========================= */}

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-xl font-bold text-[#191c1d]">
            Daily Calorie Balance
          </h2>

          <p className="mt-1 text-xs text-[#6e7977]">
            Intake compared with your daily calorie target.
          </p>
        </div>

        <span className="shrink-0 rounded-full bg-[#91f4e6]/50 px-3 py-1 text-xs font-semibold text-[#004e47]">
          Target {target.toLocaleString()}
        </span>
      </div>

      {/* =========================
          LEGEND
      ========================= */}

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

      {/* =========================
          CHART
      ========================= */}

      <div className="mt-6 overflow-x-auto border-b border-[#e1e3e4]">
        <div className="relative h-64 min-w-[620px]">

          {/* BASELINE */}

          <div className="absolute left-0 right-0 top-[62%] border-t border-dashed border-[#bec9c6]" />

          {/* DEFICIT LABEL */}

          <span className="absolute left-0 top-[18%] text-[9px] font-medium text-[#2e7d32]">
            Deficit
          </span>

          {/* SURPLUS LABEL */}

          <span className="absolute left-0 top-[68%] text-[9px] font-medium text-[#BA1A1A]">
            Surplus
          </span>

          {/* BARS */}

          <div className="absolute inset-0 flex items-start gap-1 pl-9 pr-1">

            {balances.map((item) => {
              const isDeficit =
                item.balance >= 0;

              /*
               * Keep the bars proportional,
               * but prevent them becoming too small.
               */
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
                  )}: ${Math.abs(
                    item.balance
                  )} kcal ${
                    isDeficit
                      ? "deficit"
                      : "surplus"
                  }`}
                >

                  {/* DEFICIT BAR */}

                  {isDeficit && (
                    <div
                      className="absolute bottom-[38%] left-1/2 w-full max-w-[28px] -translate-x-1/2 rounded-t-md bg-[#2e7d32] transition hover:bg-[#256b2a]"
                      style={{
                        height: `${Math.max(
                          barHeight,
                          item.balance !== 0
                            ? 3
                            : 1
                        )}%`,
                      }}
                    />
                  )}

                  {/* SURPLUS BAR */}

                  {!isDeficit && (
                    <div
                      className="absolute left-1/2 top-[62%] w-full max-w-[28px] -translate-x-1/2 rounded-b-md bg-[#BA1A1A] transition hover:bg-[#9f1616]"
                      style={{
                        height: `${Math.max(
                          barHeight,
                          item.balance !== 0
                            ? 3
                            : 1
                        )}%`,
                      }}
                    />
                  )}

                  {/* DATE */}

                  <span className="absolute left-1/2 top-[64%] -translate-x-1/2 text-[9px] font-medium text-[#6e7977]">
                    {formattedDate.getDate()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* =========================
          DATE RANGE
      ========================= */}

      <div className="mt-3 flex items-center justify-between text-[10px] text-[#6e7977]">
        <span>
          {formatDate(data[0].date)}
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
  }).format(
    new Date(`${date}T00:00:00`)
  );
}