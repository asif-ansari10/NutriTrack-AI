import MacroCard from "./MacroCard";

interface MacroSummaryProps {
  protein: number;
  proteinTarget: number;

  carbs: number;
  carbsTarget: number;

  fat: number;
  fatTarget: number;

  fiber: number;
  fiberTarget: number;
}

export default function MacroSummary({
  protein,
  proteinTarget,

  carbs,
  carbsTarget,

  fat,
  fatTarget,

  fiber,
  fiberTarget,
}: MacroSummaryProps) {
  return (
    <div className="rounded-[16px] bg-white p-3 text-center shadow-[0_4px_20px_rgba(0,0,0,0.04)] sm:rounded-[20px] sm:p-4">

      {/* ======================================================
          PROTEIN
      ====================================================== */}

      <MacroCard
        name="PROTEIN"
        value={protein}
        target={proteinTarget}
        color="#0058be"
      />

      {/* ======================================================
          CARBS
      ====================================================== */}

      <MacroCard
        name="CARBS"
        value={carbs}
        target={carbsTarget}
        color="#006a61"
      />

      {/* ======================================================
          FAT
      ====================================================== */}

      <MacroCard
        name="FAT"
        value={fat}
        target={fatTarget}
        color="#e57373"
      />

      {/* ======================================================
          FIBER
      ====================================================== */}

      <MacroCard
        name="FIBER"
        value={fiber}
        target={fiberTarget}
        color="#8b5cf6"
      />

    </div>
  );
}