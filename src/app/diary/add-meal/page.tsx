// import Link from "next/link";
// import { ArrowLeft } from "lucide-react";

// import {
//   addMealForm,
// } from "../actions";

// interface Props {
//   searchParams: Promise<{
//     date?: string;
//     mealType?: string;
//   }>;
// }

// export default async function AddMealPage({
//   searchParams,
// }: Props) {
//   const params =
//     await searchParams;

//   const date =
//     params.date ||
//     new Date()
//       .toISOString()
//       .split("T")[0];

//   const mealType =
//     params.mealType ||
//     "breakfast";

//   return (
//     <div className="min-h-screen bg-[#f8f9fa] px-4 py-6 sm:px-6">

//       <div className="mx-auto w-full max-w-2xl">

//         <Link
//           href={`/diary?date=${date}`}
//           className="mb-6 inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-[#004e47]"
//         >
//           <ArrowLeft size={18} />
//           Back to Diary
//         </Link>

//         <div className="rounded-[20px] bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] sm:p-8">

//           <h1 className="text-2xl font-bold text-[#191c1d]">
//             Add Meal
//           </h1>

//           <p className="mt-1 text-sm text-[#3e4947]">
//             Add your meal and nutrition details.
//           </p>

//           <form
//             action={addMealForm}
//             className="mt-7 space-y-5"
//           >

//             <input
//               type="hidden"
//               name="meal_date"
//               value={date}
//             />

//             <div>
//               <label className="mb-2 block text-sm font-medium">
//                 Meal Name
//               </label>

//               <input
//                 name="name"
//                 required
//                 placeholder="Chicken Biryani"
//                 className="h-12 w-full rounded-xl border border-[#bec9c6] px-4 outline-none focus:border-[#004e47]"
//               />
//             </div>

//             <div>
//               <label className="mb-2 block text-sm font-medium">
//                 Meal Type
//               </label>

// <select
//   name="meal_type"
//   defaultValue={mealType}
//   className="
//     h-12
//     w-full
//     cursor-pointer
//     rounded-xl
//     border
//     border-[#bec9c6]
//     bg-white
//     px-4
//     text-base
//     text-[#191c1d]
//     outline-none
//     focus:border-[#004e47]
//   "
// >
//   <option value="breakfast">
//     Breakfast
//   </option>

//   <option value="lunch">
//     Lunch
//   </option>

//   <option value="snack">
//     Snack
//   </option>

//   <option value="before_workout">
//     Before Workout
//   </option>

//   <option value="after_workout">
//     After Workout
//   </option>

//   <option value="dinner">
//     Dinner
//   </option>
// </select>
//             </div>

//             <div>
//               <label className="mb-2 block text-sm font-medium">
//                 Description
//               </label>

//               <input
//                 name="description"
//                 placeholder="Optional description"
//                 className="h-12 w-full rounded-xl border border-[#bec9c6] px-4 outline-none focus:border-[#004e47]"
//               />
//             </div>

// <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">

//   <NumberField
//     label="Calories"
//     name="calories"
//   />

//   <NumberField
//     label="Protein (g)"
//     name="protein_g"
//     step="0.1"
//   />

//   <NumberField
//     label="Carbs (g)"
//     name="carbs_g"
//     step="0.1"
//   />

//   <NumberField
//     label="Fat (g)"
//     name="fat_g"
//     step="0.1"
//   />

//   <NumberField
//     label="Fiber (g)"
//     name="fiber_g"
//     step="0.1"
//   />

// </div>

//             <button
//               type="submit"
//               className="min-h-12 w-full cursor-pointer rounded-xl bg-[#004e47] px-5 font-semibold text-white transition hover:bg-[#00685f]"
//             >
//               Add Meal
//             </button>

//           </form>

//         </div>

//       </div>

//     </div>
//   );
// }

// function NumberField({
//   label,
//   name,
//   step = "1",
// }: {
//   label: string;
//   name: string;
//   step?: string;
// }) {
//   return (
//     <div>
//       <label className="mb-2 block text-xs font-medium">
//         {label}
//       </label>

//       <input
//         type="number"
//         name={name}
//         min="0"
//         step={step}
//         defaultValue="0"
//         className="h-12 w-full rounded-xl border border-[#bec9c6] px-3 outline-none focus:border-[#004e47]"
//       />
//     </div>
//   );
// }

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { addMealForm } from "../actions";

interface Props {
  searchParams: Promise<{
    date?: string;
    mealType?: string;
  }>;
}

const MEAL_TYPES = [
  ["breakfast", "Breakfast"],
  ["lunch", "Lunch"],
  ["before_workout", "Before Workout"],
  ["snack", "Snack"],
  ["after_workout", "After Workout"],
  ["dinner", "Dinner"],
] as const;

function getTodayIndia() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
  }).format(new Date());
}

export default async function AddMealPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const date =
    params.date && /^\d{4}-\d{2}-\d{2}$/.test(params.date)
      ? params.date
      : getTodayIndia();

  const mealType = MEAL_TYPES.some(
    ([value]) => value === params.mealType
  )
    ? params.mealType!
    : "breakfast";

  return (
    <main className="min-h-screen bg-[#f8f9fa] px-4 py-6 text-[#191c1d] sm:px-6">
      <div className="mx-auto w-full max-w-2xl">
        <Link
          href={`/diary?date=${date}`}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#004e47] hover:text-[#00685f]"
        >
          <ArrowLeft size={18} />
          Back to Diary
        </Link>

        <div className="rounded-[20px] bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] sm:p-8">
          <h1 className="text-2xl font-bold">
            Add Meal
          </h1>

          <p className="mt-1 text-sm text-[#3e4947]">
            Add your meal and nutrition details.
          </p>

          <form
            action={addMealForm}
            className="mt-7 space-y-5"
          >
            <input
              type="hidden"
              name="meal_date"
              value={date}
            />

            <div>
              <label
                htmlFor="meal_name"
                className="mb-2 block text-sm font-medium"
              >
                Meal Name
              </label>

              <input
                id="meal_name"
                name="name"
                required
                placeholder="Chicken Biryani"
                className="h-12 w-full rounded-xl border border-[#bec9c6] px-4 text-base outline-none focus:border-[#004e47]"
              />
            </div>

            <div>
              <label
                htmlFor="meal_type"
                className="mb-2 block text-sm font-medium"
              >
                Meal Type
              </label>

              <select
                id="meal_type"
                name="meal_type"
                defaultValue={mealType}
                className="h-12 w-full cursor-pointer rounded-xl border border-[#bec9c6] bg-white px-4 text-base outline-none focus:border-[#004e47]"
              >
                {MEAL_TYPES.map(
                  ([value, label]) => (
                    <option
                      key={value}
                      value={value}
                    >
                      {label}
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium"
              >
                Description
              </label>

              <textarea
                id="description"
                name="description"
                rows={3}
                placeholder="Optional description"
                className="w-full resize-none rounded-xl border border-[#bec9c6] px-4 py-3 text-base outline-none focus:border-[#004e47]"
              />
            </div>

            <div>
              <h2 className="mb-3 text-sm font-bold">
                Nutrition
              </h2>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                <NumberField
                  label="Calories"
                  name="calories"
                  suffix="kcal"
                />

                <NumberField
                  label="Protein"
                  name="protein_g"
                  step="0.1"
                  suffix="g"
                />

                <NumberField
                  label="Carbs"
                  name="carbs_g"
                  step="0.1"
                  suffix="g"
                />

                <NumberField
                  label="Fat"
                  name="fat_g"
                  step="0.1"
                  suffix="g"
                />

                <NumberField
                  label="Fiber"
                  name="fiber_g"
                  step="0.1"
                  suffix="g"
                />
              </div>
            </div>

            <button
              type="submit"
              className="min-h-[52px] w-full rounded-xl bg-[#004e47] px-5 text-base font-semibold text-white hover:bg-[#00685f]"
            >
              Add Meal
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

function NumberField({
  label,
  name,
  step = "1",
  suffix,
}: {
  label: string;
  name: string;
  step?: string;
  suffix: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-xs font-medium"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={name}
          type="number"
          name={name}
          min="0"
          step={step}
          defaultValue="0"
          inputMode="decimal"
          className="h-12 w-full rounded-xl border border-[#bec9c6] px-3 pr-10 text-base outline-none focus:border-[#004e47]"
        />

        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#7b8683]">
          {suffix}
        </span>
      </div>
    </div>
  );
}
