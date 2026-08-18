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
  const percentage =
    target > 0
      ? Math.min((value / target) * 100, 100)
      : 0;

  return (
    <div className="rounded-[20px] bg-white p-4 text-center shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
      <p className="mb-2 text-xs font-semibold tracking-wider text-[#3e4947]">
        {name}
      </p>

      <p className="text-xl font-semibold text-[#191c1d]">
        {value}
        <span className="ml-1 text-xs font-normal text-[#3e4947]">
          {unit}
        </span>
      </p>

      <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-[#e1e3e4]">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        />
      </div>

      <p className="mt-1 text-[10px] text-[#3e4947]">
        of {target}
        {unit}
      </p>
    </div>
  );
}