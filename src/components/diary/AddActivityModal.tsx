// "use client";

// import { useActionState, useEffect } from "react";
// import {
//   Check,
//   Dumbbell,
//   Loader2,
//   X,
// } from "lucide-react";

// import {
//   addActivity,
//   type ActionState,
// } from "@/app/diary/actions";

// interface Props {
//   onClose: () => void;
// }

// const initialState: ActionState = {
//   success: false,
//   error: "",
// };

// function getTodayIndia() {
//   return new Intl.DateTimeFormat("en-CA", {
//     timeZone: "Asia/Kolkata",
//   }).format(new Date());
// }

// export default function AddActivityModal({
//   onClose,
// }: Props) {
//   const [state, formAction, pending] =
//     useActionState(
//       addActivity,
//       initialState
//     );

//   useEffect(() => {
//     if (state.success) {
//       onClose();
//     }
//   }, [state.success, onClose]);

//   return (
//     <div
//       className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 px-3 py-4 sm:px-5"
//       role="dialog"
//       aria-modal="true"
//       aria-labelledby="add-activity-title"
//     >
//       <button
//         type="button"
//         aria-label="Close"
//         disabled={pending}
//         onClick={onClose}
//         className="absolute inset-0 cursor-default"
//       />

//       <div className="relative z-10 flex max-h-[calc(100dvh-32px)] w-full max-w-[600px] flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_25px_70px_rgba(0,0,0,0.22)]">
//         <div className="flex shrink-0 items-center justify-between border-b border-[#e1e3e4] px-5 py-4 sm:px-6 sm:py-5">
//           <div className="flex items-center gap-3">
//             <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e7f8f5] text-[#00685f]">
//               <Dumbbell size={21} />
//             </div>

//             <div>
//               <h2
//                 id="add-activity-title"
//                 className="text-lg font-bold text-[#191c1d] sm:text-xl"
//               >
//                 Add Activity
//               </h2>

//               <p className="text-xs text-[#6e7977] sm:text-sm">
//                 Record your exercise or physical activity.
//               </p>
//             </div>
//           </div>

//           <button
//             type="button"
//             onClick={onClose}
//             disabled={pending}
//             className="flex h-10 w-10 items-center justify-center rounded-full text-[#687370] hover:bg-[#f1f3f3] disabled:opacity-50"
//           >
//             <X size={22} />
//           </button>
//         </div>

//         <form
//           action={formAction}
//           className="min-h-0 overflow-y-auto px-5 py-5 sm:px-6 sm:py-6"
//         >
//           <input
//             type="hidden"
//             name="activity_date"
//             value={getTodayIndia()}
//           />

//           <div className="space-y-5">
//             <div>
//               <label
//                 htmlFor="modal-activity-type"
//                 className="mb-2 block text-sm font-semibold"
//               >
//                 Activity Type
//               </label>

//               <select
//                 id="modal-activity-type"
//                 name="activity_type"
//                 defaultValue="gym"
//                 className="h-12 w-full rounded-xl border border-[#bec9c6] bg-white px-4 text-base text-[#191c1d] outline-none focus:border-[#004e47]"
//               >
//                 <option value="gym">Gym</option>
//                 <option value="walking">Walking</option>
//                 <option value="running">Running</option>
//                 <option value="cycling">Cycling</option>
//                 <option value="sports">Sports</option>
//                 <option value="strength">Strength Training</option>
//                 <option value="other">Other</option>
//               </select>
//             </div>

//             <div>
//               <label
//                 htmlFor="modal-activity-name"
//                 className="mb-2 block text-sm font-semibold"
//               >
//                 Activity Name
//               </label>

//               <input
//                 id="modal-activity-name"
//                 name="activity_name"
//                 type="text"
//                 required
//                 placeholder="Morning Gym"
//                 className="h-12 w-full rounded-xl border border-[#bec9c6] px-4 text-base text-[#191c1d] outline-none placeholder:text-gray-400 focus:border-[#004e47]"
//               />
//             </div>

//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//               <div>
//                 <label
//                   htmlFor="modal-duration"
//                   className="mb-2 block text-sm font-semibold"
//                 >
//                   Duration (minutes)
//                 </label>

//                 <input
//                   id="modal-duration"
//                   type="number"
//                   name="duration_minutes"
//                   min="1"
//                   required
//                   inputMode="numeric"
//                   placeholder="45"
//                   className="h-12 w-full rounded-xl border border-[#bec9c6] px-4 text-base text-[#191c1d] outline-none focus:border-[#004e47]"
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="modal-calories-burned"
//                   className="mb-2 block text-sm font-semibold"
//                 >
//                   Calories Burned
//                 </label>

//                 <input
//                   id="modal-calories-burned"
//                   type="number"
//                   name="calories_burned"
//                   min="0"
//                   required
//                   inputMode="numeric"
//                   placeholder="250"
//                   className="h-12 w-full rounded-xl border border-[#bec9c6] px-4 text-base text-[#191c1d] outline-none focus:border-[#004e47]"
//                 />
//               </div>
//             </div>

//             <div>
//               <label
//                 htmlFor="modal-activity-note"
//                 className="mb-2 block text-sm font-semibold"
//               >
//                 Note
//               </label>

//               <textarea
//                 id="modal-activity-note"
//                 name="note"
//                 rows={3}
//                 placeholder="Optional note about your activity..."
//                 className="w-full resize-none rounded-xl border border-[#bec9c6] px-4 py-3 text-base text-[#191c1d] outline-none placeholder:text-gray-400 focus:border-[#004e47]"
//               />
//             </div>

//             {state.error && (
//               <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
//                 {state.error}
//               </div>
//             )}
//           </div>

//           <div className="mt-6 grid grid-cols-1 gap-3 border-t border-[#edf0ef] pt-5 sm:grid-cols-2">
//             <button
//               type="button"
//               onClick={onClose}
//               disabled={pending}
//               className="min-h-[52px] w-full rounded-xl border border-[#cbd5d3] bg-white px-5 text-base font-semibold text-[#3e4947] hover:bg-[#f5f7f7] disabled:opacity-50"
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               disabled={pending}
//               className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-[#004e47] px-5 text-base font-bold text-white hover:bg-[#003f3a] disabled:opacity-60"
//             >
//               {pending ? (
//                 <>
//                   <Loader2
//                     size={19}
//                     className="animate-spin"
//                   />
//                   Saving...
//                 </>
//               ) : (
//                 <>
//                   <Check size={19} />
//                   Add Activity
//                 </>
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
} from "react";

import {
  Check,
  Dumbbell,
  Loader2,
  X,
} from "lucide-react";

import {
  addActivity,
  type ActionState,
} from "@/app/diary/actions";

interface Props {
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
}: Props) {
  const [state, formAction, isPending] =
    useActionState(
      addActivity,
      initialState
    );

  useEffect(() => {
    if (state.success && open) {
      onClose();
    }
  }, [
    state.success,
    open,
    onClose,
  ]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 p-4"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget &&
          !isPending
        ) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-activity-title"
        className="flex w-full max-w-lg flex-col overflow-hidden rounded-[24px] bg-white shadow-2xl"
        style={{
          maxHeight:
            "calc(100dvh - 32px)",
        }}
      >
        {/* HEADER */}
        <div className="flex shrink-0 items-center justify-between border-b border-[#e5e8e7] px-5 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e8f5f3] text-[#004e47]">
              <Dumbbell size={21} />
            </div>

            <div className="min-w-0">
              <h2
                id="add-activity-title"
                className="text-lg font-bold text-[#191c1d] sm:text-xl"
              >
                Add Activity
              </h2>

              <p className="text-sm text-[#6e7977]">
                Log your exercise and activity.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            aria-label="Close"
            className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#6e7977] transition-colors hover:bg-[#f2f4f3] hover:text-[#191c1d] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={21} />
          </button>
        </div>

        {/* FORM */}
        <form
          action={formAction}
          className="min-h-0 overflow-y-auto"
        >
          <div className="space-y-5 p-5 sm:p-6">
            {/* ACTIVITY TYPE */}
            <div>
              <label
                htmlFor="activity_type"
                className="mb-2 block text-sm font-semibold text-[#191c1d]"
              >
                Activity Type
              </label>

              <select
                id="activity_type"
                name="activity_type"
                defaultValue="other"
                disabled={isPending}
                className="h-12 w-full cursor-pointer rounded-xl border border-[#bec9c6] bg-white px-4 text-base text-[#191c1d] outline-none transition-colors focus:border-[#004e47]"
              >
                <option value="walking">
                  Walking
                </option>

                <option value="running">
                  Running
                </option>

                <option value="cycling">
                  Cycling
                </option>

                <option value="gym">
                  Gym / Strength Training
                </option>

                <option value="cardio">
                  Cardio
                </option>

                <option value="swimming">
                  Swimming
                </option>

                <option value="sports">
                  Sports
                </option>

                <option value="yoga">
                  Yoga
                </option>

                <option value="other">
                  Other
                </option>
              </select>
            </div>

            {/* ACTIVITY NAME */}
            <div>
              <label
                htmlFor="activity_name"
                className="mb-2 block text-sm font-semibold text-[#191c1d]"
              >
                Activity Name
              </label>

              <input
                id="activity_name"
                name="activity_name"
                required
                maxLength={150}
                disabled={isPending}
                placeholder="Morning Walk"
                className="h-12 w-full rounded-xl border border-[#bec9c6] px-4 text-base text-[#191c1d] outline-none placeholder:text-[#9aa4a2] transition-colors focus:border-[#004e47] disabled:bg-[#f5f6f6]"
              />
            </div>

            {/* DURATION + CALORIES */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="duration_minutes"
                  className="mb-2 block text-sm font-semibold text-[#191c1d]"
                >
                  Duration
                </label>

                <div className="relative">
                  <input
                    id="duration_minutes"
                    type="number"
                    name="duration_minutes"
                    required
                    min="1"
                    step="1"
                    defaultValue="30"
                    disabled={isPending}
                    className="h-12 w-full rounded-xl border border-[#bec9c6] px-4 pr-16 text-base text-[#191c1d] outline-none transition-colors focus:border-[#004e47] disabled:bg-[#f5f6f6]"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#6e7977]">
                    min
                  </span>
                </div>
              </div>

              <div>
                <label
                  htmlFor="calories_burned"
                  className="mb-2 block text-sm font-semibold text-[#191c1d]"
                >
                  Calories Burned
                </label>

                <div className="relative">
                  <input
                    id="calories_burned"
                    type="number"
                    name="calories_burned"
                    min="0"
                    step="1"
                    defaultValue="0"
                    disabled={isPending}
                    className="h-12 w-full rounded-xl border border-[#bec9c6] px-4 pr-16 text-base text-[#191c1d] outline-none transition-colors focus:border-[#004e47] disabled:bg-[#f5f6f6]"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#6e7977]">
                    kcal
                  </span>
                </div>
              </div>
            </div>

            {/* NOTE */}
            <div>
              <label
                htmlFor="activity_note"
                className="mb-2 block text-sm font-semibold text-[#191c1d]"
              >
                Note
                <span className="ml-1 font-normal text-[#8a9492]">
                  (Optional)
                </span>
              </label>

              <textarea
                id="activity_note"
                name="note"
                rows={3}
                maxLength={500}
                disabled={isPending}
                placeholder="Any additional details..."
                className="w-full resize-none rounded-xl border border-[#bec9c6] px-4 py-3 text-base text-[#191c1d] outline-none placeholder:text-[#9aa4a2] transition-colors focus:border-[#004e47] disabled:bg-[#f5f6f6]"
              />
            </div>

            {/* ERROR */}
            {state.error && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
              >
                {state.error}
              </div>
            )}
          </div>

          {/* FOOTER */}
          <div className="flex shrink-0 flex-col-reverse gap-3 border-t border-[#e5e8e7] bg-white p-4 sm:flex-row sm:justify-end sm:px-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="min-h-12 w-full cursor-pointer rounded-xl border border-[#bec9c6] px-5 text-sm font-semibold text-[#3e4947] transition-colors hover:bg-[#f5f7f6] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:min-w-[120px]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#004e47] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#00685f] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[150px]"
            >
              {isPending ? (
                <>
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />
                  Adding...
                </>
              ) : (
                <>
                  <Check size={17} />
                  Add Activity
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}