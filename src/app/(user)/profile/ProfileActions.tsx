"use client";

import { useFormStatus } from "react-dom";
import {
  Loader2,
  LogOut,
  Save,
  LockKeyhole,
} from "lucide-react";

/* =========================================================
   SAVE BUTTON
========================================================= */

export function SaveButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#004e47] px-6 text-sm font-semibold text-white transition hover:bg-[#003f3a] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-[#004e47] disabled:active:scale-100 sm:w-auto"
    >
      {pending ? (
        <>
          <Loader2
            size={18}
            className="animate-spin"
          />
          Saving...
        </>
      ) : (
        <>
          <Save size={18} />
          Save Changes
        </>
      )}
    </button>
  );
}

/* =========================================================
   CHANGE PASSWORD BUTTON
========================================================= */

export function ChangePasswordButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#e7e8e9] px-5 text-sm font-semibold text-[#191c1d] transition hover:bg-[#dfe1e2] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-[#e7e8e9] disabled:active:scale-100 sm:w-auto"
    >
      {pending ? (
        <>
          <Loader2
            size={18}
            className="animate-spin"
          />
          Sending...
        </>
      ) : (
        <>
          <LockKeyhole size={18} />
          Change Password
        </>
      )}
    </button>
  );
}

/* =========================================================
   LOGOUT BUTTON
========================================================= */

export function LogoutButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-50 text-sm font-semibold text-red-600 transition hover:bg-red-100 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-red-50 disabled:active:scale-100"
    >
      {pending ? (
        <>
          <Loader2
            size={18}
            className="animate-spin"
          />
          Logging out...
        </>
      ) : (
        <>
          <LogOut size={18} />
          Logout
        </>
      )}
    </button>
  );
}