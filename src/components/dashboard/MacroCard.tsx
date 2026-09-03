interface MacroCardProps {
  name: string;
  value: number;
  target: number;
  unit?: string;
  color: string;
}

export default function MacroCard({
  name,
  value,
  target,
  unit = "g",
  color,
}: MacroCardProps) {
  const safeValue = Number(value) || 0;
  const safeTarget = Number(target) || 0;

  const percentage =
    safeTarget > 0
      ? Math.min(
          (safeValue / safeTarget) * 100,
          100
        )
      : 0;

  return (
    <div className="rounded-[20px] bg-white p-4 text-center shadow-[0_4px_20px_rgba(0,0,0,0.04)]">

      {/* ======================================================
          NAME
      ====================================================== */}

      <p className="mb-2 text-xs font-semibold tracking-wider text-[#3e4947]">
        {name}
      </p>

      {/* ======================================================
          VALUE
      ====================================================== */}

      <p className="text-xl font-semibold text-[#191c1d]">
        {safeValue}
        <span className="ml-1 text-xs font-normal text-[#3e4947]">
          {unit}
        </span>
      </p>

      {/* ======================================================
          PROGRESS
      ====================================================== */}

      <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-[#e1e3e4]">

        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        />

      </div>

      {/* ======================================================
          TARGET
      ====================================================== */}

      <p className="mt-1 text-[10px] text-[#3e4947]">
        of {safeTarget}
        {unit}
      </p>

    </div>
  );
}