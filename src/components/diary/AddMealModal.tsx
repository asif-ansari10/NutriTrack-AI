// "use client";

// import {
//   useActionState,
//   useEffect,
// } from "react";

// import {
//   X,
//   Plus,
//   Loader2,
// } from "lucide-react";

// import {
//   addMeal,
// } from "@/app/diary/actions";

// interface AddMealModalProps {
//   open: boolean;
//   onClose: () => void;
//   defaultMealType?: string;
// }

// const initialState = {
//   success: false,
//   error: "",
// };

// export default function AddMealModal({
//   open,
//   onClose,
//   defaultMealType = "breakfast",
// }: AddMealModalProps) {
//   const [
//     state,
//     formAction,
//     pending,
//   ] = useActionState(
//     addMeal,
//     initialState
//   );

//   useEffect(() => {
//     if (state.success) {
//       onClose();
//     }
//   }, [
//     state.success,
//     onClose,
//   ]);

//   if (!open) {
//     return null;
//   }

//   return (
//     <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 sm:items-center sm:p-4">

//       <div className="max-h-[92vh] w-full overflow-y-auto rounded-t-[24px] bg-white p-5 shadow-2xl sm:max-w-2xl sm:rounded-[24px] sm:p-7">

//         {/* Header */}

//         <div className="mb-6 flex items-start justify-between">

//           <div>
//             <h2 className="text-xl font-bold text-[#191c1d] sm:text-2xl">
//               Add Meal
//             </h2>

//             <p className="mt-1 text-sm text-[#6e7977]">
//               Add your meal and nutrition details.
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={onClose}
//             disabled={pending}
//             className="flex h-10 w-10 items-center justify-center rounded-full text-[#6e7977] transition hover:bg-[#f3f4f5] disabled:opacity-50"
//           >
//             <X size={20} />
//           </button>

//         </div>

//         <form
//           action={formAction}
//           className="space-y-5"
//         >

//           {/* Meal Type */}

//           <div>
//             <label className="mb-2 block text-sm font-semibold text-[#191c1d]">
//               Meal Type
//             </label>

//             <select
//               name="meal_type"
//               defaultValue={defaultMealType}
//               required
//               className="h-12 w-full rounded-xl border border-[#bec9c6] bg-white px-4 text-sm outline-none transition focus:border-[#004e47] focus:ring-2 focus:ring-[#91f4e6]"
//             >
//               <option value="breakfast">
//                 Breakfast
//               </option>

//               <option value="lunch">
//                 Lunch
//               </option>

//               <option value="snack">
//                 Snack
//               </option>

//               <option value="dinner">
//                 Dinner
//               </option>
//             </select>
//           </div>

//           {/* Meal Name */}

//           <div>
//             <label className="mb-2 block text-sm font-semibold text-[#191c1d]">
//               Meal Name
//             </label>

//             <input
//               type="text"
//               name="name"
//               required
//               placeholder="e.g. 3 Eggs + 2 Roti"
//               className="h-12 w-full rounded-xl border border-[#bec9c6] px-4 text-sm outline-none transition focus:border-[#004e47] focus:ring-2 focus:ring-[#91f4e6]"
//             />
//           </div>

//           {/* Description */}

//           <div>
//             <label className="mb-2 block text-sm font-semibold text-[#191c1d]">
//               Description
//               <span className="ml-1 font-normal text-[#8a9492]">
//                 optional
//               </span>
//             </label>

//             <textarea
//               name="description"
//               rows={3}
//               placeholder="Optional details..."
//               className="w-full resize-none rounded-xl border border-[#bec9c6] px-4 py-3 text-sm outline-none transition focus:border-[#004e47] focus:ring-2 focus:ring-[#91f4e6]"
//             />
//           </div>

//           {/* Nutrition */}

//           <div>

//             <label className="mb-3 block text-sm font-semibold text-[#191c1d]">
//               Nutrition
//             </label>

//             <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

//               {/* Calories */}

//               <div>
//                 <label className="mb-1 block text-xs text-[#6e7977]">
//                   Calories
//                 </label>

//                 <div className="relative">

//                   <input
//                     type="number"
//                     name="calories"
//                     min="0"
//                     step="1"
//                     defaultValue="0"
//                     required
//                     className="h-12 w-full rounded-xl border border-[#bec9c6] px-3 pr-12 text-sm outline-none focus:border-[#004e47] focus:ring-2 focus:ring-[#91f4e6]"
//                   />

//                   <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-[#8a9492]">
//                     kcal
//                   </span>

//                 </div>
//               </div>

//               {/* Protein */}

//               <div>
//                 <label className="mb-1 block text-xs text-[#6e7977]">
//                   Protein
//                 </label>

//                 <div className="relative">

//                   <input
//                     type="number"
//                     name="protein_g"
//                     min="0"
//                     step="0.1"
//                     defaultValue="0"
//                     required
//                     className="h-12 w-full rounded-xl border border-[#bec9c6] px-3 pr-8 text-sm outline-none focus:border-[#004e47] focus:ring-2 focus:ring-[#91f4e6]"
//                   />

//                   <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-[#8a9492]">
//                     g
//                   </span>

//                 </div>
//               </div>

//               {/* Carbs */}

//               <div>
//                 <label className="mb-1 block text-xs text-[#6e7977]">
//                   Carbs
//                 </label>

//                 <div className="relative">

//                   <input
//                     type="number"
//                     name="carbs_g"
//                     min="0"
//                     step="0.1"
//                     defaultValue="0"
//                     required
//                     className="h-12 w-full rounded-xl border border-[#bec9c6] px-3 pr-8 text-sm outline-none focus:border-[#004e47] focus:ring-2 focus:ring-[#91f4e6]"
//                   />

//                   <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-[#8a9492]">
//                     g
//                   </span>

//                 </div>
//               </div>

//               {/* Fat */}

//               <div>
//                 <label className="mb-1 block text-xs text-[#6e7977]">
//                   Fat
//                 </label>

//                 <div className="relative">

//                   <input
//                     type="number"
//                     name="fat_g"
//                     min="0"
//                     step="0.1"
//                     defaultValue="0"
//                     required
//                     className="h-12 w-full rounded-xl border border-[#bec9c6] px-3 pr-8 text-sm outline-none focus:border-[#004e47] focus:ring-2 focus:ring-[#91f4e6]"
//                   />

//                   <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-[#8a9492]">
//                     g
//                   </span>

//                 </div>
//               </div>

//             </div>

//           </div>

//           {/* Error */}

//           {state.error && (
//             <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
//               {state.error}
//             </div>
//           )}

//           {/* Submit */}

//           <button
//             type="submit"
//             disabled={pending}
//             className="flex min-h-[52px] w-full items-center justify-center rounded-xl bg-[#004e47] px-5 text-sm font-bold text-white transition hover:bg-[#00685f] disabled:cursor-not-allowed disabled:opacity-60"
//           >

//             {pending ? (
//               <>
//                 <Loader2
//                   size={18}
//                   className="mr-2 animate-spin"
//                 />

//                 Adding Meal...
//               </>
//             ) : (
//               <>
//                 <Plus
//                   size={18}
//                   className="mr-2"
//                 />

//                 Add Meal
//               </>
//             )}

//           </button>

//         </form>

//       </div>

//     </div>
//   );
// }

"use client";

import {
  useState,
  type FormEvent,
} from "react";

import {
  X,
  Utensils,
  Loader2,
} from "lucide-react";

import { addMeal } from "@/app/diary/actions";

type MealType =
  | "breakfast"
  | "lunch"
  | "snack"
  | "dinner";

interface AddMealModalProps {
  open: boolean;
  onClose: () => void;
  defaultMealType?: MealType;
}

export default function AddMealModal({
  open,
  onClose,
  defaultMealType = "breakfast",
}: AddMealModalProps) {
  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  if (!open) {
    return null;
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const formData =
        new FormData(
          event.currentTarget
        );

      const result =
        await addMeal(formData);

      if (!result.success) {
        setError(
          result.error ||
            "Unable to add meal."
        );

        return;
      }

      event.currentTarget.reset();

      onClose();
    } catch (err) {
      console.error(
        "Add meal error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while adding the meal."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 px-4 py-6 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#e5e9e8] px-5 py-4 sm:px-6">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dff8f5] text-[#004e47]">
              <Utensils size={20} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#191c1d]">
                Add Meal
              </h2>

              <p className="text-xs text-[#64706d]">
                Add your meal and nutrition details.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-[#56615f] transition hover:bg-[#f1f4f3] hover:text-[#191c1d]"
            aria-label="Close"
          >
            <X size={20} />
          </button>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-5 sm:p-6"
        >

          {/* Error */}
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Meal Type */}
          <div>
            <label
              htmlFor="modal-meal-type"
              className="mb-2 block text-sm font-medium text-[#191c1d]"
            >
              Meal Type
            </label>

            <select
              id="modal-meal-type"
              name="meal_type"
              defaultValue={
                defaultMealType
              }
              required
              className="h-12 w-full cursor-pointer rounded-xl border border-[#bec9c6] bg-white px-4 outline-none transition focus:border-[#004e47] focus:ring-1 focus:ring-[#004e47]"
            >
              <option value="breakfast">
                Breakfast
              </option>

              <option value="lunch">
                Lunch
              </option>

              <option value="snack">
                Snack
              </option>

              <option value="dinner">
                Dinner
              </option>
            </select>
          </div>

          {/* Meal Name */}
          <div>
            <label
              htmlFor="modal-meal-name"
              className="mb-2 block text-sm font-medium text-[#191c1d]"
            >
              Meal Name
            </label>

            <input
              id="modal-meal-name"
              name="name"
              type="text"
              required
              placeholder="Chicken Biryani"
              className="h-12 w-full rounded-xl border border-[#bec9c6] px-4 outline-none transition placeholder:text-gray-400 focus:border-[#004e47] focus:ring-1 focus:ring-[#004e47]"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="modal-meal-description"
              className="mb-2 block text-sm font-medium text-[#191c1d]"
            >
              Description
            </label>

            <textarea
              id="modal-meal-description"
              name="description"
              rows={3}
              placeholder="Optional description..."
              className="w-full resize-none rounded-xl border border-[#bec9c6] px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-[#004e47] focus:ring-1 focus:ring-[#004e47]"
            />
          </div>

          {/* Nutrition */}
          <div>
            <label className="mb-3 block text-sm font-medium text-[#191c1d]">
              Nutrition
            </label>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

              {/* Calories */}
              <NutritionInput
                label="Calories"
                name="calories"
                suffix="kcal"
                step="1"
              />

              {/* Protein */}
              <NutritionInput
                label="Protein"
                name="protein_g"
                suffix="g"
                step="0.1"
              />

              {/* Carbs */}
              <NutritionInput
                label="Carbs"
                name="carbs_g"
                suffix="g"
                step="0.1"
              />

              {/* Fat */}
              <NutritionInput
                label="Fat"
                name="fat_g"
                suffix="g"
                step="0.1"
              />

            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row">

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="min-h-12 flex-1 cursor-pointer rounded-xl border border-[#bec9c6] bg-white px-5 font-semibold text-[#34403d] transition hover:bg-[#f5f7f6] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="min-h-12 flex-1 cursor-pointer rounded-xl bg-[#004e47] px-5 font-semibold text-white transition hover:bg-[#00685f] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Adding...
                </span>
              ) : (
                "Add Meal"
              )}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

/* ============================================================
   NUTRITION INPUT
============================================================ */

function NutritionInput({
  label,
  name,
  suffix,
  step,
}: {
  label: string;
  name: string;
  suffix: string;
  step: string;
}) {
  return (
    <div>
      <label
        htmlFor={`nutrition-${name}`}
        className="mb-2 block text-xs font-medium text-[#46514f]"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={`nutrition-${name}`}
          type="number"
          name={name}
          min="0"
          step={step}
          defaultValue="0"
          className="h-12 w-full rounded-xl border border-[#bec9c6] px-3 pr-10 outline-none transition focus:border-[#004e47] focus:ring-1 focus:ring-[#004e47]"
        />

        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#687370]">
          {suffix}
        </span>
      </div>
    </div>
  );
}