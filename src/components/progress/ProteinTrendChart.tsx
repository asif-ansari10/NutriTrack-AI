interface Props {
  data: {
    date: string;
    protein: number;
  }[];
  target: number;
}

export default function ProteinTrendChart({
  data,
  target,
}: Props) {
  const max = Math.max(
    target,
    ...data.map(
      (d) => d.protein
    ),
    1
  );

  return (
    <div className="rounded-2xl border border-[#e1e3e4] bg-white p-5 shadow-sm sm:p-6">

      <div className="flex items-start justify-between">

        <div>
          <h2 className="text-xl font-bold">
            Protein Intake
          </h2>

          <p className="mt-1 text-xs text-[#6e7977]">
            Daily protein against your target.
          </p>
        </div>

        <span className="rounded-full bg-[#91f4e6]/50 px-3 py-1 text-xs font-semibold text-[#004e47]">
          Target {target}g
        </span>

      </div>

      <div className="mt-8 flex h-64 items-end gap-1 overflow-x-auto border-b border-[#e1e3e4]">

        {data.map((item) => {
          const height =
            (item.protein / max) *
            100;

          const achieved =
            item.protein >= target;

          return (
            <div
              key={item.date}
              className="flex h-full min-w-[18px] flex-1 flex-col items-center justify-end"
            >

              <div
                title={`${Math.round(
                  item.protein
                )}g protein`}
                className={`w-full max-w-[32px] rounded-t-md ${
                  achieved
                    ? "bg-[#00685f]"
                    : "bg-[#c4ebe5]"
                }`}
                style={{
                  height: `${Math.max(
                    height,
                    item.protein
                      ? 3
                      : 1
                  )}%`,
                }}
              />

              <span className="mt-2 text-[9px] text-[#6e7977]">
                {new Date(
                  item.date
                ).getDate()}
              </span>

            </div>
          );
        })}

      </div>

    </div>
  );
}