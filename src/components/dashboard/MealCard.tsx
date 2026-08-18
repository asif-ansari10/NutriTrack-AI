import { Clock } from "lucide-react";

interface MealCardProps {
  meal: string;
  food: string;
  calories: number;
  icon: string;
  color: string;
}

export default function MealCard({
  meal,
  food,
  calories,
  icon,
  color,
}: MealCardProps) {
  return (
    <div className="flex cursor-pointer items-start gap-4 rounded-2xl bg-white p-4 shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition hover:-translate-y-0.5 hover:shadow-md">

      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
        style={{ backgroundColor: color }}
      >
        <span className="text-xl">
          {icon}
        </span>
      </div>

      <div className="min-w-0 flex-1">

        <div className="mb-1 flex items-start justify-between gap-2">
          <p className="text-xs font-semibold text-[#3e4947]">
            {meal}
          </p>

          <p className="whitespace-nowrap text-xs font-semibold text-[#004e47]">
            {calories} kcal
          </p>
        </div>

        <p className="truncate text-sm text-[#191c1d]">
          {food}
        </p>

      </div>
    </div>
  );
}