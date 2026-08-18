interface CalorieRingProps {
  consumed: number;
  target: number;
}

export default function CalorieRing({
  consumed,
  target,
}: CalorieRingProps) {
  const safeTarget = Math.max(target, 1);

  const percentage = Math.min(
    (consumed / safeTarget) * 100,
    100
  );

  const circumference =
    2 * Math.PI * 50;

  const offset =
    circumference -
    (percentage / 100) * circumference;

  const remaining = Math.max(
    target - consumed,
    0
  );

  return (
    <div className="rounded-[20px] bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] sm:p-6">

      <h2 className="mb-5 text-xs font-semibold uppercase tracking-wider text-[#3e4947] sm:mb-6">
        Daily Calories
      </h2>

      <div className="relative flex justify-center">

        <svg
          className="h-40 w-40 sm:h-48 sm:w-48"
          viewBox="0 0 120 120"
        >

          <circle
            cx="60"
            cy="60"
            r="50"
            fill="transparent"
            stroke="#e1e3e4"
            strokeWidth="12"
          />

          {target > 0 && (
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="transparent"
              stroke="#004e47"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform="rotate(-90 60 60)"
              className="transition-all duration-1000"
            />
          )}

        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">

          <span className="text-3xl font-bold tracking-tight text-[#191c1d] sm:text-4xl">
            {consumed.toLocaleString()}
          </span>

          <span className="text-xs text-[#3e4947]">
            {target > 0
              ? `/ ${target.toLocaleString()} kcal`
              : "No target"}
          </span>

        </div>

      </div>

      <div className="mt-5 flex items-center justify-center gap-2 sm:mt-6">

        <div className="h-2 w-2 rounded-full bg-[#006a61]" />

        <p className="text-sm text-[#3e4947]">

          <span className="font-bold text-[#191c1d]">
            {remaining.toLocaleString()} kcal
          </span>{" "}

          {target > 0 ? "left" : ""}

        </p>

      </div>

    </div>
  );
}