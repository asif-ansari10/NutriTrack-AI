"use client";

interface WeightPoint {
  id: string;
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
  // =========================================================
  // EMPTY STATE
  // =========================================================

  if (!data.length) {
    return (
      <ChartCard
        title="Weight Trend"
        subtitle="No weight records for this month."
      />
    );
  }

  // =========================================================
  // WEIGHT VALUES
  // =========================================================

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

  const range = Math.max(
    max - min,
    1
  );

  // =========================================================
  // SVG DIMENSIONS
  // =========================================================

  const width = 1000;
  const height = 320;

  // =========================================================
  // CREATE CHART POINTS
  // =========================================================

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
        id: item.id,
        x,
        y,
        date: item.date,
        weight: item.weight,
      };
    }
  );

  // =========================================================
  // LINE PATH
  // =========================================================

  const path = points
    .map(
      (point, index) =>
        `${index === 0 ? "M" : "L"} ${
          point.x
        },${point.y}`
    )
    .join(" ");

  // =========================================================
  // AREA PATH
  // =========================================================

  const area = `${path} L ${width},${height} L 0,${height} Z`;

  // =========================================================
  // GOAL POSITION
  // =========================================================

  const goalY =
    height -
    ((goal - min) /
      range) *
      (height - 30);

  const showGoal =
    goal >= min &&
    goal <= max;

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
          role="img"
          aria-label="Weight trend chart"
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

          {/* =================================================
              GRID
          ================================================== */}

          {[0, 1, 2, 3, 4].map(
            (line) => {
              const y =
                (height / 4) *
                line;

              return (
                <line
                  key={`grid-${line}`}
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

          {/* =================================================
              GOAL LINE
          ================================================== */}

          {showGoal && (
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

          {/* =================================================
              AREA
          ================================================== */}

          <path
            d={area}
            fill="url(#weightFill)"
          />

          {/* =================================================
              LINE
          ================================================== */}

          <path
            d={path}
            fill="none"
            stroke="#004e47"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* =================================================
              POINTS
          ================================================== */}

          {points.map(
            (point) => (
              <circle
                key={point.id}
                cx={point.x}
                cy={point.y}
                r="7"
                fill="white"
                stroke="#004e47"
                strokeWidth="4"
              />
            )
          )}
        </svg>

        {/* ===================================================
            DATE RANGE
        ==================================================== */}

        <div className="mt-2 flex justify-between text-[10px] text-[#6e7977]">
          <span>
            {formatDate(
              data[0].date
            )}
          </span>

          <span>
            {formatDate(
              data[
                data.length - 1
              ].date
            )}
          </span>
        </div>
      </div>
    </ChartCard>
  );
}

// ===========================================================
// DATE FORMAT
// ===========================================================

function formatDate(date: string) {
  return new Intl.DateTimeFormat(
    "en-IN",
    {
      day: "numeric",
      month: "short",
    }
  ).format(new Date(date));
}

// ===========================================================
// CHART CARD
// ===========================================================

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