// "use client";

// import {
//   useState,
//   type FormEvent,
// } from "react";

// import {
//   X,
//   Dumbbell,
//   Loader2,
// } from "lucide-react";

// import {
//   addActivity,
// } from "@/app/diary/actions";

// interface AddActivityModalProps {
//   open: boolean;
//   onClose: () => void;
// }

// export default function AddActivityModal({
//   open,
//   onClose,
// }: AddActivityModalProps) {
//   const [loading, setLoading] =
//     useState(false);

//   const [error, setError] =
//     useState("");

//   if (!open) {
//     return null;
//   }

//   async function handleSubmit(
//     event: FormEvent<HTMLFormElement>
//   ) {
//     event.preventDefault();

//     setLoading(true);
//     setError("");

//     try {
//       const formData =
//         new FormData(
//           event.currentTarget
//         );

//       const result =
//         await addActivity(formData);

//       if (!result.success) {
//         setError(
//           result.error ||
//             "Unable to add activity."
//         );

//         return;
//       }

//       event.currentTarget.reset();

//       onClose();
//     } catch (err) {
//       console.error(
//         "Add activity error:",
//         err
//       );

//       setError(
//         err instanceof Error
//           ? err.message
//           : "Something went wrong while adding the activity."
//       );
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div
//       className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 px-4 py-6 backdrop-blur-sm"
//       onMouseDown={(event) => {
//         if (
//           event.target ===
//           event.currentTarget
//         ) {
//           onClose();
//         }
//       }}
//     >
//       <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">

//         {/* Header */}
//         <div className="flex items-center justify-between border-b border-[#e5e9e8] px-5 py-4 sm:px-6">

//           <div className="flex items-center gap-3">

//             <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dff8f5] text-[#004e47]">
//               <Dumbbell size={20} />
//             </div>

//             <div>
//               <h2 className="text-lg font-bold text-[#191c1d]">
//                 Add Activity
//               </h2>

//               <p className="text-xs text-[#64706d]">
//                 Record your exercise or activity.
//               </p>
//             </div>

//           </div>

//           <button
//             type="button"
//             onClick={onClose}
//             className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-[#56615f] transition hover:bg-[#f1f4f3] hover:text-[#191c1d]"
//             aria-label="Close"
//           >
//             <X size={20} />
//           </button>

//         </div>

//         {/* Form */}
//         <form
//           onSubmit={handleSubmit}
//           className="space-y-5 p-5 sm:p-6"
//         >

//           {/* Error */}
//           {error && (
//             <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//               {error}
//             </div>
//           )}

//           {/* Activity Type */}
//           <div>
//             <label
//               htmlFor="modal-activity-type"
//               className="mb-2 block text-sm font-medium text-[#191c1d]"
//             >
//               Activity Type
//             </label>

//             <select
//               id="modal-activity-type"
//               name="activity_type"
//               defaultValue="gym"
//               required
//               className="h-12 w-full cursor-pointer rounded-xl border border-[#bec9c6] bg-white px-4 outline-none transition focus:border-[#004e47] focus:ring-1 focus:ring-[#004e47]"
//             >
//               <option value="gym">
//                 Gym
//               </option>

//               <option value="walking">
//                 Walking
//               </option>

//               <option value="running">
//                 Running
//               </option>

//               <option value="cycling">
//                 Cycling
//               </option>

//               <option value="sports">
//                 Sports
//               </option>

//               <option value="strength">
//                 Strength Training
//               </option>

//               <option value="other">
//                 Other
//               </option>
//             </select>
//           </div>

//           {/* Activity Name */}
//           <div>
//             <label
//               htmlFor="modal-activity-name"
//               className="mb-2 block text-sm font-medium text-[#191c1d]"
//             >
//               Activity Name
//             </label>

//             <input
//               id="modal-activity-name"
//               name="activity_name"
//               type="text"
//               required
//               placeholder="Morning Gym"
//               className="h-12 w-full rounded-xl border border-[#bec9c6] px-4 outline-none transition placeholder:text-gray-400 focus:border-[#004e47] focus:ring-1 focus:ring-[#004e47]"
//             />
//           </div>

//           {/* Duration + Calories */}
//           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

//             <div>
//               <label
//                 htmlFor="modal-duration"
//                 className="mb-2 block text-sm font-medium text-[#191c1d]"
//               >
//                 Duration
//               </label>

//               <div className="relative">
//                 <input
//                   id="modal-duration"
//                   type="number"
//                   name="duration_minutes"
//                   min="1"
//                   required
//                   placeholder="45"
//                   className="h-12 w-full rounded-xl border border-[#bec9c6] px-4 pr-12 outline-none transition placeholder:text-gray-400 focus:border-[#004e47] focus:ring-1 focus:ring-[#004e47]"
//                 />

//                 <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#687370]">
//                   min
//                 </span>
//               </div>
//             </div>

//             <div>
//               <label
//                 htmlFor="modal-calories-burned"
//                 className="mb-2 block text-sm font-medium text-[#191c1d]"
//               >
//                 Calories Burned
//               </label>

//               <div className="relative">
//                 <input
//                   id="modal-calories-burned"
//                   type="number"
//                   name="calories_burned"
//                   min="0"
//                   required
//                   placeholder="250"
//                   className="h-12 w-full rounded-xl border border-[#bec9c6] px-4 pr-12 outline-none transition placeholder:text-gray-400 focus:border-[#004e47] focus:ring-1 focus:ring-[#004e47]"
//                 />

//                 <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#687370]">
//                   kcal
//                 </span>
//               </div>
//             </div>

//           </div>

//           {/* Note */}
//           <div>
//             <label
//               htmlFor="modal-activity-note"
//               className="mb-2 block text-sm font-medium text-[#191c1d]"
//             >
//               Note
//             </label>

//             <textarea
//               id="modal-activity-note"
//               name="note"
//               rows={3}
//               placeholder="Optional note..."
//               className="w-full resize-none rounded-xl border border-[#bec9c6] px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-[#004e47] focus:ring-1 focus:ring-[#004e47]"
//             />
//           </div>

//           {/* Buttons */}
//           <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row">

//             <button
//               type="button"
//               onClick={onClose}
//               disabled={loading}
//               className="min-h-12 flex-1 cursor-pointer rounded-xl border border-[#bec9c6] bg-white px-5 font-semibold text-[#34403d] transition hover:bg-[#f5f7f6] disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               disabled={loading}
//               className="min-h-12 flex-1 cursor-pointer rounded-xl bg-[#004e47] px-5 font-semibold text-white transition hover:bg-[#00685f] disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center gap-2">
//                   <Loader2
//                     size={18}
//                     className="animate-spin"
//                   />
//                   Adding...
//                 </span>
//               ) : (
//                 "Add Activity"
//               )}
//             </button>

//           </div>

//         </form>
//       </div>
//     </div>
//   );
// }

"use client";

import {
  useActionState,
  useEffect,
  useState,
} from "react";

import {
  X,
  Dumbbell,
} from "lucide-react";

import {
  addActivity,
  type ActionState,
} from "@/app/diary/actions";

interface AddActivityModalProps {
  open: boolean;
  onClose: () => void;
}

const initialState: ActionState = {
  success: false,
  error: "",
};

export default function AddActivityModal({
  open,
  onClose,
}: AddActivityModalProps) {
  const [
    state,
    formAction,
    isPending,
  ] = useActionState(
    addActivity,
    initialState
  );

  const [
    activityType,
    setActivityType,
  ] = useState("gym");

  /*
   * Successful submission.
   *
   * IMPORTANT:
   * Do NOT use:
   *
   * formRef.current.reset()
   *
   * because the ref can become null after
   * the server action finishes.
   *
   * The modal closes instead.
   */
  useEffect(() => {
    if (!state.success) {
      return;
    }

    onClose();
  }, [state.success, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 p-3 backdrop-blur-sm sm:p-5">

      {/* Modal */}
      <div className="relative flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-[22px] bg-white shadow-2xl">

        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-[#e1e5e4] px-5 py-4 sm:px-6">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e4f4f2] text-[#004e47]">
              <Dumbbell size={21} />
            </div>

            <div>

              <h2 className="text-xl font-bold text-[#191c1d]">
                Add Activity
              </h2>

              <p className="text-sm text-[#687370]">
                Record your exercise or activity.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-[#687370] transition hover:bg-[#f1f4f3] hover:text-[#191c1d] disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Close"
          >
            <X size={22} />
          </button>

        </div>

        {/* Scrollable area */}
        <div className="overflow-y-auto">

          <form
            action={formAction}
            className="space-y-5 px-5 py-5 sm:px-6 sm:py-6"
          >

            {/* Error */}
            {state.error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {state.error}
              </div>
            )}

            {/* Activity Type */}
            <div>

              <label
                htmlFor="activity_type"
                className="mb-2 block text-sm font-medium text-[#191c1d]"
              >
                Activity Type
              </label>

              <select
                id="activity_type"
                name="activity_type"
                value={activityType}
                onChange={(event) =>
                  setActivityType(
                    event.target.value
                  )
                }
                disabled={isPending}
                className="h-12 w-full cursor-pointer rounded-xl border border-[#bec9c6] bg-white px-4 text-sm text-[#191c1d] outline-none transition focus:border-[#004e47] focus:ring-2 focus:ring-[#004e47]/10 disabled:cursor-not-allowed disabled:bg-[#f5f6f6]"
              >

                <option value="gym">
                  Gym
                </option>

                <option value="walking">
                  Walking
                </option>

                <option value="running">
                  Running
                </option>

                <option value="cycling">
                  Cycling
                </option>

                <option value="sports">
                  Sports
                </option>

                <option value="strength">
                  Strength Training
                </option>

                <option value="other">
                  Other
                </option>

              </select>

            </div>

            {/* Activity Name */}
            <div>

              <label
                htmlFor="activity_name"
                className="mb-2 block text-sm font-medium text-[#191c1d]"
              >
                Activity Name
              </label>

              <input
                id="activity_name"
                name="activity_name"
                type="text"
                required
                disabled={isPending}
                placeholder="Morning Gym"
                className="h-12 w-full rounded-xl border border-[#bec9c6] bg-white px-4 text-sm text-[#191c1d] outline-none transition placeholder:text-[#8a9492] focus:border-[#004e47] focus:ring-2 focus:ring-[#004e47]/10 disabled:cursor-not-allowed disabled:bg-[#f5f6f6]"
              />

            </div>

            {/* Duration + Calories */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              {/* Duration */}
              <div>

                <label
                  htmlFor="duration_minutes"
                  className="mb-2 block text-sm font-medium text-[#191c1d]"
                >
                  Duration
                </label>

                <div className="relative">

                  <input
                    id="duration_minutes"
                    name="duration_minutes"
                    type="number"
                    min="1"
                    step="1"
                    required
                    disabled={isPending}
                    placeholder="45"
                    className="h-12 w-full rounded-xl border border-[#bec9c6] bg-white px-4 pr-12 text-sm outline-none focus:border-[#004e47] focus:ring-2 focus:ring-[#004e47]/10 disabled:bg-[#f5f6f6]"
                  />

                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#687370]">
                    min
                  </span>

                </div>

              </div>

              {/* Calories */}
              <div>

                <label
                  htmlFor="calories_burned"
                  className="mb-2 block text-sm font-medium text-[#191c1d]"
                >
                  Calories Burned
                </label>

                <div className="relative">

                  <input
                    id="calories_burned"
                    name="calories_burned"
                    type="number"
                    min="0"
                    step="1"
                    required
                    disabled={isPending}
                    placeholder="250"
                    className="h-12 w-full rounded-xl border border-[#bec9c6] bg-white px-4 pr-12 text-sm outline-none focus:border-[#004e47] focus:ring-2 focus:ring-[#004e47]/10 disabled:bg-[#f5f6f6]"
                  />

                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#687370]">
                    kcal
                  </span>

                </div>

              </div>

            </div>

            {/* Note */}
            <div>

              <label
                htmlFor="activity_note"
                className="mb-2 block text-sm font-medium text-[#191c1d]"
              >
                Note
              </label>

              <textarea
                id="activity_note"
                name="note"
                rows={3}
                disabled={isPending}
                placeholder="Optional note..."
                className="w-full resize-none rounded-xl border border-[#bec9c6] bg-white px-4 py-3 text-sm text-[#191c1d] outline-none transition placeholder:text-[#8a9492] focus:border-[#004e47] focus:ring-2 focus:ring-[#004e47]/10 disabled:cursor-not-allowed disabled:bg-[#f5f6f6]"
              />

            </div>

            {/* Buttons */}
            <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">

              <button
                type="button"
                onClick={onClose}
                disabled={isPending}
                className="min-h-12 cursor-pointer rounded-xl border border-[#bec9c6] bg-white px-5 text-sm font-semibold text-[#191c1d] transition hover:bg-[#f6f8f7] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isPending}
                className="min-h-12 cursor-pointer rounded-xl bg-[#004e47] px-5 text-sm font-semibold text-white transition hover:bg-[#003f3a] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isPending
                  ? "Adding Activity..."
                  : "Add Activity"}
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}