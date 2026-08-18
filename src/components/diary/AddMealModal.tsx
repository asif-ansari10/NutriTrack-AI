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

import { addMeal } from "@/app/diary/actions";

interface AddMealModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AddMealModal({
  open,
  onClose,
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
        new FormData(event.currentTarget);

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
        "Something went wrong while adding the meal."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-5 shadow-xl sm:p-7">

        <div className="mb-6 flex items-center justify-between">

          <div>
            <h2 className="text-xl font-bold text-[#191c1d]">
              Add Meal
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Add your meal and nutrition details.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer text-2xl text-gray-500 hover:text-black"
          >
            ×
          </button>

        </div>

        {error && (
          <div className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Meal Type */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Meal Type
            </label>

            <select
              name="meal_type"
              defaultValue="breakfast"
              required
              className="h-12 w-full cursor-pointer rounded-xl border border-[#bec9c6] bg-white px-4 outline-none focus:border-[#004e47]"
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
            <label className="mb-2 block text-sm font-medium">
              Meal Name
            </label>

            <input
              name="name"
              required
              placeholder="Chicken Biryani"
              className="h-12 w-full rounded-xl border border-[#bec9c6] px-4 outline-none focus:border-[#004e47]"
            />
          </div>

          {/* Description */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <textarea
              name="description"
              rows={3}
              placeholder="Optional description"
              className="w-full rounded-xl border border-[#bec9c6] px-4 py-3 outline-none focus:border-[#004e47]"
            />
          </div>

          {/* Nutrition */}

          <div>
            <label className="mb-3 block text-sm font-semibold">
              Nutrition
            </label>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

              <NutritionInput
                label="Calories"
                name="calories"
                step="1"
              />

              <NutritionInput
                label="Protein (g)"
                name="protein_g"
                step="0.1"
              />

              <NutritionInput
                label="Carbs (g)"
                name="carbs_g"
                step="0.1"
              />

              <NutritionInput
                label="Fat (g)"
                name="fat_g"
                step="0.1"
              />

            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="min-h-12 w-full cursor-pointer rounded-xl bg-[#004e47] font-semibold text-white transition hover:bg-[#00685f] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Adding Meal..."
              : "Add Meal"}
          </button>

        </form>

      </div>

    </div>
  );
}

function NutritionInput({
  label,
  name,
  step,
}: {
  label: string;
  name: string;
  step: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium">
        {label}
      </label>

      <input
        type="number"
        name={name}
        min="0"
        step={step}
        defaultValue="0"
        className="h-12 w-full rounded-xl border border-[#bec9c6] px-3 outline-none focus:border-[#004e47]"
      />
    </div>
  );
}