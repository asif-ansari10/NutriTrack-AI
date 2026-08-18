"use client";

interface WeightPoint {
  date: string;
  weight: number;
}

interface Props {
  data: WeightPoint[];
  goal: number;
}

export default function WeightTrendChart({
  data,
  goal,
}: Props) {
  if (!data.length) {
    return (
      <ChartCard
        title="Weight Trend"
        subtitle="No weight records for this month."
      />
    );
  }

  const values = data.map(
    (item) => item.weight
  );

  const min = Math.min(
    ...values,
    goal
  );

  const max = Math.max(
    ...values,
    goal
  );

  const range =
    Math.max(max - min, 1);

  const width = 1000;
  const height = 320;

  const points = data.map(
    (item, index) => {
      const x =
        data.length === 1
          ? width / 2
          : (index /
              (data.length - 1)) *
            width;

      const y =
        height -
        ((item.weight - min) /
          range) *
          (height - 30);

      return {
        x,
        y,
        ...item,
      };
    }
  );

  const path = points
    .map(
      (point, index) =>
        `${index === 0 ? "M" : "L"} ${
          point.x
        },${point.y}`
    )
    .join(" ");

  const area = `${path} L ${width},${height} L 0,${height} Z`;

  const goalY =
    height -
    ((goal - min) / range) *
      (height - 30);

  return (
    <ChartCard
      title="Weight Trend"
      subtitle="Your weight progress during this month."
    >
      <div className="mt-6 overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-[280px] w-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="weightFill"
              x1="0"
              x2="0"
              y1="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#00685f"
                stopOpacity="0.20"
              />

              <stop
                offset="100%"
                stopColor="#00685f"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>

          {/* Grid */}

          {[0, 1, 2, 3, 4].map(
            (line) => {
              const y =
                (height / 4) *
                line;

              return (
                <line
                  key={line}
                  x1="0"
                  x2={width}
                  y1={y}
                  y2={y}
                  stroke="#e1e3e4"
                  strokeWidth="1"
                />
              );
            }
          )}

          {/* Goal */}

          {goal >= min &&
            goal <= max && (
              <>
                <line
                  x1="0"
                  x2={width}
                  y1={goalY}
                  y2={goalY}
                  stroke="#004e47"
                  strokeDasharray="8 8"
                  strokeWidth="2"
                />

                <text
                  x={width - 5}
                  y={goalY - 8}
                  textAnchor="end"
                  fontSize="18"
                  fill="#004e47"
                >
                  Goal {goal}kg
                </text>
              </>
            )}

          {/* Area */}

          <path
            d={area}
            fill="url(#weightFill)"
          />

          {/* Line */}

          <path
            d={path}
            fill="none"
            stroke="#004e47"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Points */}

          {points.map((point) => (
            <circle
              key={point.date}
              cx={point.x}
              cy={point.y}
              r="7"
              fill="white"
              stroke="#004e47"
              strokeWidth="4"
            />
          ))}
        </svg>

        <div className="mt-2 flex justify-between text-[10px] text-[#6e7977]">
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
    </ChartCard>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat(
    "en-IN",
    {
      day: "numeric",
      month: "short",
    }
  ).format(new Date(date));
}

function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[#e1e3e4] bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-xl font-bold text-[#191c1d]">
        {title}
      </h2>

      <p className="mt-1 text-xs text-[#6e7977]">
        {subtitle}
      </p>

      {children}
    </div>
  );
}