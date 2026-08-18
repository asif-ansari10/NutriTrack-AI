interface Props {
  startWeight: number;
  currentWeight: number;
  targetWeight: number;
  percentage: number;
  remaining: number;
}

export default function GoalProgressCard({
  startWeight,
  currentWeight,
  targetWeight,
  percentage,
  remaining,
}: Props) {
  const circumference = 282;

  const offset =
    circumference -
    (circumference *
      percentage) /
      100;

  return (
    <div className="rounded-2xl border border-[#e1e3e4] bg-white p-5 shadow-sm sm:p-6">

      <h2 className="text-xl font-bold text-center">
        Distance to Goal
      </h2>

      <p className="mt-1 text-center text-xs text-[#6e7977]">
        Every step counts.
      </p>

      <div className="mx-auto mt-8 relative h-52 w-52">

        <svg
          viewBox="0 0 100 100"
          className="-rotate-90"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#e1e3e4"
            strokeWidth="8"
          />

          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#004e47"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="282"
            strokeDashoffset={offset}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">

          <span className="text-4xl font-bold text-[#004e47]">
            {remaining.toFixed(1)}
          </span>

          <span className="text-[11px] font-semibold uppercase text-[#6e7977]">
            kg remaining
          </span>

        </div>

      </div>

      <div className="mt-4">

        <div className="flex justify-between text-xs">
          <span>
            Start:{" "}
            <strong>
              {startWeight} kg
            </strong>
          </span>

          <span className="text-[#004e47]">
            Goal:{" "}
            <strong>
              {targetWeight} kg
            </strong>
          </span>
        </div>

        <div className="mt-3 h-2 rounded-full bg-[#e1e3e4]">

          <div
            className="h-full rounded-full bg-[#004e47]"
            style={{
              width: `${percentage}%`,
            }}
          />

        </div>

        <div className="mt-2 text-center text-xs font-semibold text-[#3e4947]">
          Current:{" "}
          {currentWeight.toFixed(1)} kg
        </div>

      </div>

    </div>
  );
}