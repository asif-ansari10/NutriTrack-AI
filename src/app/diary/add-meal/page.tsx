// import Link from "next/link";
// import { ArrowLeft } from "lucide-react";

// import {
//   addMeal,
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
//           className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#004e47]"
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
//             action={addMeal}
//             className="mt-7 space-y-5"
//           >

//             <input
//               type="hidden"
//               name="meal_date"
//               value={date}
//             />

//             <Field
//               label="Meal Name"
//               name="name"
//               placeholder="Chicken Biryani"
//               required
//             />

//             <div>
//               <label className="mb-2 block text-sm font-medium">
//                 Meal Type
//               </label>

//               <select
//                 name="meal_type"
//                 defaultValue={
//                   mealType
//                 }
//                 className="h-12 w-full rounded-xl border border-[#bec9c6] bg-white px-4 outline-none focus:border-[#004e47]"
//               >
//                 <option value="breakfast">
//                   Breakfast
//                 </option>
//                 <option value="lunch">
//                   Lunch
//                 </option>
//                 <option value="snack">
//                   Snack
//                 </option>
//                 <option value="dinner">
//                   Dinner
//                 </option>
//               </select>
//             </div>

//             <Field
//               label="Description"
//               name="description"
//               placeholder="Optional description"
//             />

//             <Field
//               label="Image URL"
//               name="image_url"
//               placeholder="Optional image URL"
//             />

//             <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

//               <NumberField
//                 label="Calories"
//                 name="calories"
//               />

//               <NumberField
//                 label="Protein (g)"
//                 name="protein_g"
//                 step="0.1"
//               />

//               <NumberField
//                 label="Carbs (g)"
//                 name="carbs_g"
//                 step="0.1"
//               />

//               <NumberField
//                 label="Fat (g)"
//                 name="fat_g"
//                 step="0.1"
//               />

//             </div>

//             <button
//               type="submit"
//               className="min-h-12 w-full rounded-xl bg-[#004e47] px-5 font-semibold text-white transition hover:bg-[#00685f]"
//             >
//               Add Meal
//             </button>

//           </form>

//         </div>

//       </div>

//     </div>
//   );
// }

// function Field({
//   label,
//   name,
//   placeholder,
//   required,
// }: {
//   label: string;
//   name: string;
//   placeholder?: string;
//   required?: boolean;
// }) {
//   return (
//     <div>
//       <label className="mb-2 block text-sm font-medium">
//         {label}
//       </label>

//       <input
//         name={name}
//         placeholder={placeholder}
//         required={required}
//         className="h-12 w-full rounded-xl border border-[#bec9c6] px-4 outline-none focus:border-[#004e47]"
//       />
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

import { addMeal } from "../actions";

interface Props {
  searchParams: Promise<{
    date?: string;
    mealType?: string;
  }>;
}

const MEAL_TYPES = [
  {
    value: "breakfast",
    label: "Breakfast",
  },
  {
    value: "lunch",
    label: "Lunch",
  },
  {
    value: "snack",
    label: "Snack",
  },
  {
    value: "dinner",
    label: "Dinner",
  },
];

function getToday() {
  return new Date().toISOString().split("T")[0];
}

export default async function AddMealPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const date = params.date || getToday();

  const mealType = MEAL_TYPES.some(
    (item) => item.value === params.mealType
  )
    ? params.mealType!
    : "breakfast";

  return (
    <main className="min-h-screen bg-[#f8f9fa] px-4 py-6 sm:px-6">
      <div className="mx-auto w-full max-w-2xl">
        {/* Back */}
        <Link
          href={`/diary?date=${date}`}
          className="mb-6 inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-[#004e47] transition hover:text-[#00685f]"
        >
          <ArrowLeft size={18} />
          Back to Diary
        </Link>

        {/* Card */}
        <section className="rounded-[20px] bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] sm:p-8">
          <div>
            <h1 className="text-2xl font-bold text-[#191c1d]">
              Add Meal
            </h1>

            <p className="mt-1 text-sm text-[#3e4947]">
              Add your meal and nutrition details.
            </p>
          </div>

          <form
            action={addMeal}
            className="mt-7 space-y-5"
          >
            {/* Meal date */}
            <div>
              <label
                htmlFor="meal_date"
                className="mb-2 block text-sm font-medium text-[#191c1d]"
              >
                Meal Date
              </label>

              <input
                id="meal_date"
                type="date"
                name="meal_date"
                defaultValue={date}
                required
                className="h-12 w-full cursor-pointer rounded-xl border border-[#bec9c6] bg-white px-4 outline-none transition focus:border-[#004e47] focus:ring-2 focus:ring-[#004e47]/10"
              />
            </div>

            {/* Meal name */}
            <Field
              label="Meal Name"
              name="name"
              placeholder="Chicken Biryani"
              required
            />

            {/* Meal type */}
            <div>
              <label
                htmlFor="meal_type"
                className="mb-2 block text-sm font-medium text-[#191c1d]"
              >
                Meal Type
              </label>

              <select
                id="meal_type"
                name="meal_type"
                defaultValue={mealType}
                required
                className="h-12 w-full cursor-pointer rounded-xl border border-[#bec9c6] bg-white px-4 outline-none transition focus:border-[#004e47] focus:ring-2 focus:ring-[#004e47]/10"
              >
                {MEAL_TYPES.map((item) => (
                  <option
                    key={item.value}
                    value={item.value}
                  >
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-[#191c1d]"
              >
                Description
              </label>

              <textarea
                id="description"
                name="description"
                rows={4}
                placeholder="Example: 2 rotis with grilled chicken and salad"
                className="w-full resize-none rounded-xl border border-[#bec9c6] px-4 py-3 outline-none transition focus:border-[#004e47] focus:ring-2 focus:ring-[#004e47]/10"
              />
            </div>

            {/* Nutrition */}
            <div>
              <h2 className="mb-3 text-sm font-semibold text-[#191c1d]">
                Nutrition
              </h2>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <NumberField
                  label="Calories"
                  name="calories"
                  step="1"
                />

                <NumberField
                  label="Protein (g)"
                  name="protein_g"
                  step="0.1"
                />

                <NumberField
                  label="Carbs (g)"
                  name="carbs_g"
                  step="0.1"
                />

                <NumberField
                  label="Fat (g)"
                  name="fat_g"
                  step="0.1"
                />
              </div>
            </div>

            {/* Serving size */}
            <Field
              label="Serving Size"
              name="serving_size"
              placeholder="Example: 1 plate, 2 rotis, 250g"
            />

            {/* Submit */}
            <button
              type="submit"
              className="min-h-12 w-full cursor-pointer rounded-xl bg-[#004e47] px-5 font-semibold text-white transition hover:bg-[#00685f] active:scale-[0.99]"
            >
              Add Meal
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

function Field({
  label,
  name,
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-[#191c1d]"
      >
        {label}
      </label>

      <input
        id={name}
        type="text"
        name={name}
        placeholder={placeholder}
        required={required}
        className="h-12 w-full rounded-xl border border-[#bec9c6] bg-white px-4 outline-none transition focus:border-[#004e47] focus:ring-2 focus:ring-[#004e47]/10"
      />
    </div>
  );
}

function NumberField({
  label,
  name,
  step = "1",
}: {
  label: string;
  name: string;
  step?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-xs font-medium text-[#191c1d]"
      >
        {label}
      </label>

      <input
        id={name}
        type="number"
        name={name}
        min="0"
        step={step}
        defaultValue="0"
        className="h-12 w-full rounded-xl border border-[#bec9c6] bg-white px-3 outline-none transition focus:border-[#004e47] focus:ring-2 focus:ring-[#004e47]/10"
      />
    </div>
  );
}