"use client";

import { Loader2 } from "lucide-react";

interface DeleteMealModalProps {
  open: boolean;
  mealName: string;
  deleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteMealModal({
  open,
  mealName,
  deleting,
  onClose,
  onConfirm,
}: DeleteMealModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-meal-title"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close"
        disabled={deleting}
        onClick={onClose}
        className="absolute inset-0 cursor-default"
      />

      {/* Popup */}
      <div className="relative z-10 w-full max-w-[490px] rounded-[16px] bg-white px-6 py-6 shadow-[0_12px_40px_rgba(0,0,0,0.18)] sm:px-7 sm:py-7">

        {/* Title */}
        <h2
          id="delete-meal-title"
          className="text-xl font-semibold text-[#191c1d]"
        >
          Delete Meal
        </h2>

        {/* Message */}
        <p className="mt-4 text-sm leading-6 text-[#596562]">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-[#191c1d]">
            {mealName}
          </span>
          ?
        </p>

        {/* Divider */}
        <div className="my-5 h-px bg-[#e2e5e4]" />

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3">

          <button
            type="button"
            onClick={onClose}
            disabled={deleting}
            className="h-10 cursor-pointer rounded-lg px-4 text-sm font-medium text-[#596562] transition-colors hover:bg-[#f4f6f5] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={deleting}
            className="h-10 min-w-[90px] cursor-pointer rounded-lg bg-red-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {deleting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2
                  size={15}
                  className="animate-spin"
                />
                Deleting
              </span>
            ) : (
              "Delete"
            )}
          </button>

        </div>

      </div>
    </div>
  );
}