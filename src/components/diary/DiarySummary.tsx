interface DiarySummaryProps {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export default function DiarySummary({
  calories,
  protein,
  carbs,
  fat,
}: DiarySummaryProps) {
  return (
    <div className="mb-6 grid grid-cols-2 overflow-hidden rounded-[20px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] sm:mb-8 sm:grid-cols-4">

      <SummaryItem
        label="Calories"
        value={calories}
        unit="kcal"
        primary
      />

      <SummaryItem
        label="Protein"
        value={protein}
        unit="g"
      />

      <SummaryItem
        label="Carbs"
        value={carbs}
        unit="g"
      />

      <SummaryItem
        label="Fat"
        value={fat}
        unit="g"
      />

    </div>
  );
}

function SummaryItem({
  label,
  value,
  unit,
  primary = false,
}: {
  label: string;
  value: number;
  unit: string;
  primary?: boolean;
}) {
  return (
    <div className="border-b border-[#e1e3e4] px-4 py-4 last:border-b-0 sm:border-b-0 sm:border-r sm:px-6 sm:py-5 sm:last:border-r-0">

      <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-[#6e7977]">
        {label}
      </p>

      <p
        className={`text-xl font-bold sm:text-2xl ${
          primary
            ? "text-[#004e47]"
            : "text-[#191c1d]"
        }`}
      >
        {Number(
          value || 0
        ).toLocaleString()}

        <span className="ml-1 text-xs font-normal text-[#6e7977]">
          {unit}
        </span>
      </p>

    </div>
  );
}