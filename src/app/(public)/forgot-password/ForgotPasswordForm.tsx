"use client";

import { useFormStatus } from "react-dom";
import { Mail, Loader2 } from "lucide-react";
import { resetPassword } from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#004e47] px-6 text-sm font-bold text-white shadow-sm transition hover:bg-[#003f3a] hover:shadow-md active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#00685f] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-[#004e47] disabled:hover:shadow-sm disabled:active:scale-100"
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
        "Send Reset Link"
      )}
    </button>
  );
}

export default function ForgotPasswordForm() {
  const { pending } = useFormStatus();

  return (
    <form
      action={resetPassword}
      className="mt-7 space-y-5"
    >
      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-semibold text-[#191c1d]"
        >
          Email address
        </label>

        <div className="relative">
          <Mail
            size={19}
            strokeWidth={2}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#687370]"
          />

          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            disabled={pending}
            placeholder="you@example.com"
            className="h-12 w-full rounded-xl border border-[#c1c9c7] bg-white pl-11 pr-4 text-sm font-medium text-[#191c1d] outline-none transition placeholder:text-[#687370] focus:border-[#00685f] focus:ring-2 focus:ring-[#00685f]/10 disabled:cursor-not-allowed disabled:bg-[#f3f5f4] disabled:opacity-70"
          />
        </div>
      </div>

      {/* Submit */}
      <SubmitButton />
    </form>
  );
}