import {
  Scale,
  Flame,
  Beef,
  TrendingDown,
} from "lucide-react";

interface Props {
  currentWeight: number;
  weightChange: number;
  averageCalories: number;
  averageProtein: number;
  calorieTarget: number;
  proteinTarget: number;
}

export default function ProgressSummary({
  currentWeight,
  weightChange,
  averageCalories,
  averageProtein,
  calorieTarget,
  proteinTarget,
}: Props) {
  const cards = [
    {
      title: "CURRENT WEIGHT",
      value: currentWeight.toFixed(1),
      suffix: "kg",
      icon: Scale,
      extra:
        weightChange <= 0
          ? `${weightChange.toFixed(1)} kg`
          : `+${weightChange.toFixed(1)} kg`,
    },

    {
      title: "AVG DAILY CALORIES",
      value: averageCalories,
      suffix: `/ ${calorieTarget}`,
      icon: Flame,
      extra:
        averageCalories <= calorieTarget
          ? "On Track"
          : "Above Target",
    },

    {
      title: "AVG DAILY PROTEIN",
      value: averageProtein,
      suffix: `/ ${proteinTarget} g`,
      icon: Beef,
      extra:
        averageProtein >= proteinTarget
          ? "Target Met"
          : "Keep Going",
    },

    {
      title: "WEIGHT CHANGE",
      value: Math.abs(weightChange).toFixed(1),
      suffix: "kg",
      icon: TrendingDown,
      extra:
        weightChange < 0
          ? "Lost"
          : weightChange > 0
          ? "Gained"
          : "No Change",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-2xl border border-[#e1e3e4] bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">

              <span className="text-[11px] font-semibold tracking-[0.05em] text-[#6e7977]">
                {card.title}
              </span>

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#91f4e6]/40 text-[#004e47]">
                <Icon size={18} />
              </div>

            </div>

            <div className="mt-5 flex items-baseline gap-2">

              <span className="text-3xl font-bold text-[#004e47]">
                {card.value}
              </span>

              <span className="text-sm text-[#6e7977]">
                {card.suffix}
              </span>

            </div>

            <p className="mt-3 text-xs font-semibold text-[#00685f]">
              {card.extra}
            </p>

          </div>
        );
      })}

    </div>
  );
}