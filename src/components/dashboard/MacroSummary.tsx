import MacroCard from "./MacroCard";

interface MacroSummaryProps {
  protein: number;
  proteinTarget: number;
  carbs: number;
  carbsTarget: number;
  fat: number;
  fatTarget: number;
}

export default function MacroSummary({
  protein,
  proteinTarget,
  carbs,
  carbsTarget,
  fat,
  fatTarget,
}: MacroSummaryProps) {
  return (
    <div className="rounded-[16px] bg-white p-3 text-center shadow-[0_4px_20px_rgba(0,0,0,0.04)] sm:rounded-[20px] sm:p-4">
      <MacroCard
        name="PROTEIN"
        value={protein}
        target={proteinTarget}
        color="#0058be"
      />

      <MacroCard
        name="CARBS"
        value={carbs}
        target={carbsTarget}
        color="#006a61"
      />

      <MacroCard
        name="FAT"
        value={fat}
        target={fatTarget}
        color="#e57373"
      />
    </div>
  );
}