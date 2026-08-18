interface Props {
  averageCalories: number;
  averageProtein: number;
  loggedDays: number;
  weightChange: number;
}

export default function MonthlyStats({
  averageCalories,
  averageProtein,
  loggedDays,
  weightChange,
}: Props) {
  return (
    <div className="rounded-2xl border border-[#e1e3e4] bg-white p-5 shadow-sm sm:p-6">

      <h2 className="text-xl font-bold">
        Monthly Overview
      </h2>

      <div className="mt-6 grid grid-cols-2 gap-4">

        <Stat
          label="Avg Calories"
          value={`${averageCalories}`}
          suffix="kcal"
        />

        <Stat
          label="Avg Protein"
          value={`${averageProtein}`}
          suffix="g"
        />

        <Stat
          label="Days Logged"
          value={`${loggedDays}`}
          suffix="days"
        />

        <Stat
          label="Weight Change"
          value={`${Math.abs(
            weightChange
          ).toFixed(1)}`}
          suffix={
            weightChange < 0
              ? "kg lost"
              : weightChange > 0
              ? "kg gained"
              : "kg"
          }
        />

      </div>

    </div>
  );
}

function Stat({
  label,
  value,
  suffix,
}: {
  label: string;
  value: string;
  suffix: string;
}) {
  return (
    <div className="rounded-xl bg-[#f3f4f5] p-4">

      <p className="text-[10px] font-semibold uppercase tracking-wide text-[#6e7977]">
        {label}
      </p>

      <div className="mt-2 flex items-baseline gap-1">

        <span className="text-xl font-bold text-[#004e47]">
          {value}
        </span>

        <span className="text-[10px] text-[#6e7977]">
          {suffix}
        </span>

      </div>

    </div>
  );
}