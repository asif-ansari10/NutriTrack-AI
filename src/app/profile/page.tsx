import type { ReactNode } from "react";
import {
  User,
  LockKeyhole,
  LogOut,
  Save,
  ShieldCheck,
  Target,
  CalendarDays,
  Ruler,
  Scale,
} from "lucide-react";

import {
  updateProfile,
  requestPasswordReset,
  logout,
} from "./actions";

import { createClient } from "@/lib/supabase/server";
import ProtectedAppShell from "@/components/navigation/ProtectedAppShell";
/* =========================================================
   HELPERS
========================================================= */

function getInitials(name: string) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

  return initials || "U";
}

function formatGoal(goal: string | null) {
  if (goal === "lose") return "Fat Loss";
  if (goal === "gain") return "Weight Gain";
  return "Maintain Weight";
}

function formatActivity(activity: string | null) {
  const values: Record<string, string> = {
    sedentary: "Sedentary",
    light: "Lightly Active",
    moderate: "Moderately Active",
    active: "Active",
    very_active: "Very Active",
  };

  return values[activity || ""] || "Not specified";
}

/* =========================================================
   PAGE
========================================================= */

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{
    error?: string;
    success?: string;
  }>;
}) {
  const params = await searchParams;

  const supabase = await createClient();

  /* -------------------------------------------------------
     AUTH USER
  ------------------------------------------------------- */

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  /* -------------------------------------------------------
     PROFILE
  ------------------------------------------------------- */

  const { data: profile, error: profileError } =
    await supabase
      .from("profiles")
      .select(
        `
          id,
          full_name,
          goal,
          gender,
          date_of_birth,
          height_cm,
          current_weight_kg,
          target_weight_kg,
          activity_level,
          daily_calorie_target,
          protein_target_g,
          carbs_target_g,
          fat_target_g
        `
      )
      .eq("id", user.id)
      .single();

  if (profileError || !profile) {
    return (
      <ProtectedAppShell>
        <main className="min-h-screen bg-[#f8f9fa]">
          <div className="mx-auto w-full max-w-[1400px] px-4 py-8 sm:px-6 lg:px-10">
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
              Unable to load your profile.
            </div>
          </div>
        </main>
      </ProtectedAppShell>
    );
  }

  const initials = getInitials(
    profile.full_name || user.email || "User"
  );

  /* =======================================================
     UI
  ======================================================= */

  return (
    <ProtectedAppShell>
      <main className="min-h-screen bg-[#f8f9fa] text-[#191c1d]">
        <div className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 md:px-8 lg:px-10 xl:px-8 xl:py-8">

          {/* =================================================
              PAGE HEADER
          ================================================= */}

          <div className="mb-7 sm:mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-[#191c1d] sm:text-4xl">
              Profile & Settings
            </h1>

            <p className="mt-2 text-sm text-[#3e4947] sm:text-base">
              Manage your account details and preferences.
            </p>
          </div>

          {/* =================================================
              SUCCESS / ERROR MESSAGES
          ================================================= */}

          {params.error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {params.error}
            </div>
          )}

          {params.success && (
            <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
              {params.success}
            </div>
          )}

          {/* =================================================
              MAIN GRID
          ================================================= */}

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">

            {/* =================================================
                LEFT PROFILE SUMMARY
            ================================================= */}

            <div className="lg:col-span-4">

              <div className="rounded-2xl bg-white p-6 text-center shadow-[0_4px_20px_rgba(0,0,0,0.04)] sm:p-8">

                {/* Avatar */}
                <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-[#00685f] text-4xl font-bold text-white shadow-[0_8px_24px_rgba(0,78,71,0.18)] sm:h-32 sm:w-32 sm:text-5xl">
                  {initials}
                </div>

                {/* Name */}
                <h2 className="mt-5 break-words text-2xl font-bold text-[#191c1d]">
                  {profile.full_name || "User"}
                </h2>

                {/* Email */}
                <p className="mt-1 break-all text-sm text-[#3e4947]">
                  {user.email}
                </p>

                {/* Current Goal */}
                <div className="mt-6 rounded-xl border border-[#e1e3e4] bg-[#f3f4f5] p-4">

                  <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00685f]">
                    <Target size={15} />
                    Current Goal
                  </div>

                  <p className="mt-1 text-lg font-semibold text-[#191c1d]">
                    {formatGoal(profile.goal)}
                  </p>

                </div>

                {/* Nutrition */}
                <div className="mt-4 grid grid-cols-2 gap-3">

                  <div className="rounded-xl bg-[#f8f9fa] p-3">
                    <p className="text-xs font-medium text-[#4b5754]">
                      Calories
                    </p>

                    <p className="mt-1 text-lg font-bold text-[#191c1d]">
                      {profile.daily_calorie_target ?? "--"}
                    </p>
                  </div>

                  <div className="rounded-xl bg-[#f8f9fa] p-3">
                    <p className="text-xs font-medium text-[#4b5754]">
                      Protein
                    </p>

                    <p className="mt-1 text-lg font-bold text-[#191c1d]">
                      {profile.protein_target_g != null
                        ? `${profile.protein_target_g}g`
                        : "--"}
                    </p>
                  </div>

                </div>

                {/* Extra nutrition on mobile/desktop */}
                <div className="mt-3 grid grid-cols-2 gap-3">

                  <div className="rounded-xl bg-[#f8f9fa] p-3">
                    <p className="text-xs font-medium text-[#4b5754]">
                      Carbs
                    </p>

                    <p className="mt-1 text-lg font-bold text-[#191c1d]">
                      {profile.carbs_target_g != null
                        ? `${profile.carbs_target_g}g`
                        : "--"}
                    </p>
                  </div>

                  <div className="rounded-xl bg-[#f8f9fa] p-3">
                    <p className="text-xs font-medium text-[#4b5754]">
                      Fat
                    </p>

                    <p className="mt-1 text-lg font-bold text-[#191c1d]">
                      {profile.fat_target_g != null
                        ? `${profile.fat_target_g}g`
                        : "--"}
                    </p>
                  </div>

                </div>

                {/* Activity summary */}
                <div className="mt-4 rounded-xl bg-[#f8f9fa] p-4 text-left">

                  <p className="text-xs font-semibold uppercase tracking-wide text-[#687370]">
                    Activity Level
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#191c1d]">
                    {formatActivity(profile.activity_level)}
                  </p>

                </div>

              </div>
            </div>

            {/* =================================================
                RIGHT CONTENT
            ================================================= */}

            <div className="space-y-6 lg:col-span-8">

              {/* =================================================
                  PERSONAL INFORMATION
              ================================================= */}

              <form
                action={updateProfile}
                className="overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
              >

                {/* Header */}
                <div className="border-b border-[#e1e3e4] p-5 sm:p-6">

                  <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#91f4e6] text-[#005049]">
                      <User size={21} />
                    </div>

                    <div className="min-w-0">
                      <h2 className="text-xl font-bold text-[#191c1d]">
                        Personal Information
                      </h2>

                      <p className="mt-0.5 text-sm text-[#4b5754]">
                        Update your health and account details.
                      </p>
                    </div>

                  </div>

                </div>

                {/* Form fields */}
                <div className="grid grid-cols-1 gap-5 p-5 sm:p-6 md:grid-cols-2">

                  {/* Full Name */}
                  <Field
                    label="Full Name"
                    name="full_name"
                    defaultValue={profile.full_name || ""}
                  />

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-[#3e4947]"
                    >
                      Email Address
                    </label>

                    <input
                      id="email"
                      type="email"
                      value={user.email || ""}
                      readOnly
                      className="h-12 w-full cursor-not-allowed rounded-xl border border-[#d5dcda] bg-[#f1f3f3] px-4 text-sm text-[#191c1d] outline-none"
                    />

                    <p className="mt-1.5 text-xs text-[#687370]">
                      Email is managed by your authentication account.
                    </p>
                  </div>

                  {/* Goal */}
                  <SelectField
                    label="Goal"
                    name="goal"
                    defaultValue={profile.goal || ""}
                    options={[
                      ["lose", "Lose Fat"],
                      ["maintain", "Maintain Weight"],
                      ["gain", "Gain Weight"],
                    ]}
                  />

                  {/* Gender */}
                  <SelectField
                    label="Gender"
                    name="gender"
                    defaultValue={profile.gender || ""}
                    options={[
                      ["male", "Male"],
                      ["female", "Female"],
                      ["other", "Other"],
                    ]}
                  />

                  {/* Date of Birth */}
                  <div>
                    <label
                      htmlFor="date_of_birth"
                      className="mb-2 block text-sm font-medium text-[#3e4947]"
                    >
                      Date of Birth
                    </label>

                    <div className="relative">

                      <CalendarDays
                        size={18}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#687370]"
                      />

                      <input
                        id="date_of_birth"
                        type="date"
                        name="date_of_birth"
                        defaultValue={
                          profile.date_of_birth || ""
                        }
                        required
                        className="h-12 w-full cursor-pointer rounded-xl border border-[#c1c9c7] bg-white pl-11 pr-4 text-sm font-medium text-[#191c1d] outline-none transition focus:border-[#00685f] focus:ring-2 focus:ring-[#00685f]/10"
                      />

                    </div>
                  </div>

                  {/* Height */}
                  <NumberField
                    label="Height (cm)"
                    name="height_cm"
                    defaultValue={profile.height_cm ?? ""}
                    icon={<Ruler size={18} />}
                  />

                  {/* Current Weight */}
                  <NumberField
                    label="Current Weight (kg)"
                    name="current_weight_kg"
                    defaultValue={
                      profile.current_weight_kg ?? ""
                    }
                    step="0.1"
                    icon={<Scale size={18} />}
                  />

                  {/* Target Weight */}
                  <NumberField
                    label="Target Weight (kg)"
                    name="target_weight_kg"
                    defaultValue={
                      profile.target_weight_kg ?? ""
                    }
                    step="0.1"
                    icon={<Target size={18} />}
                  />

                  {/* Activity */}
                  <div className="md:col-span-2">

                    <SelectField
                      label="Activity Level"
                      name="activity_level"
                      defaultValue={
                        profile.activity_level || ""
                      }
                      options={[
                        ["sedentary", "Sedentary"],
                        ["light", "Lightly Active"],
                        ["moderate", "Moderately Active"],
                        ["active", "Active"],
                        ["very_active", "Very Active"],
                      ]}
                    />

                  </div>

                </div>

                {/* Save */}
                <div className="border-t border-[#e1e3e4] bg-[#fafbfb] p-5 sm:flex sm:justify-end sm:p-6">

                  <button
                    type="submit"
                    className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#004e47] px-6 text-sm font-semibold text-white transition hover:bg-[#003f3a] active:scale-[0.99] sm:w-auto"
                  >
                    <Save size={18} />
                    Save Changes
                  </button>

                </div>

              </form>

              {/* =================================================
                  SECURITY
              ================================================= */}

              <div className="rounded-2xl bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] sm:p-6">

                <div className="flex items-start gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#91f4e6] text-[#005049]">
                    <LockKeyhole size={21} />
                  </div>

                  <div className="min-w-0">

                    <h2 className="text-xl font-bold text-[#191c1d]">
                      Security & Password
                    </h2>

                    <p className="mt-1 text-sm leading-6 text-[#4b5754]">
                      We'll send a secure password reset link
                      to your registered email address.
                    </p>

                  </div>

                </div>

                <form
                  action={requestPasswordReset}
                  className="mt-6"
                >
                  <button
                    type="submit"
                    className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#e7e8e9] px-5 text-sm font-semibold text-[#191c1d] transition hover:bg-[#dfe1e2] active:scale-[0.99] sm:w-auto"
                  >
                    <LockKeyhole size={18} />
                    Change Password
                  </button>
                </form>

              </div>

              {/* =================================================
                  ACCOUNT / LOGOUT
              ================================================= */}

              <div className="rounded-2xl bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] sm:p-6">

                <div className="mb-5 flex items-center gap-3">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
                    <ShieldCheck size={20} />
                  </div>

                  <div>
                    <h2 className="font-bold text-[#191c1d]">
                      Account
                    </h2>

                    <p className="text-sm text-[#687370]">
                      Manage your session.
                    </p>
                  </div>

                </div>

                <form action={logout}>
                  <button
                    type="submit"
                    className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-50 text-sm font-semibold text-red-600 transition hover:bg-red-100 active:scale-[0.99]"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </form>

              </div>

            </div>
          </div>

        </div>
      </main>
    </ProtectedAppShell>
  );
}

/* =========================================================
   TEXT FIELD
========================================================= */

function Field({
  label,
  name,
  defaultValue,
}: {
  label: string;
  name: string;
  defaultValue: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-[#3e4947]"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type="text"
        defaultValue={defaultValue}
        required
        className="h-12 w-full rounded-xl border border-[#c1c9c7] bg-white px-4 text-sm font-medium text-[#191c1d] outline-none transition placeholder:text-[#687370] focus:border-[#00685f] focus:ring-2 focus:ring-[#00685f]/10"
      />
    </div>
  );
}

/* =========================================================
   NUMBER FIELD
========================================================= */

function NumberField({
  label,
  name,
  defaultValue,
  step = "1",
  icon,
}: {
  label: string;
  name: string;
  defaultValue: number | string;
  step?: string;
  icon: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-[#3e4947]"
      >
        {label}
      </label>

      <div className="relative">

        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#687370]">
          {icon}
        </span>

        <input
          id={name}
          name={name}
          type="number"
          step={step}
          defaultValue={defaultValue}
          required
          className="h-12 w-full rounded-xl border border-[#c1c9c7] bg-white pl-11 pr-4 text-sm font-medium text-[#191c1d] outline-none transition focus:border-[#00685f] focus:ring-2 focus:ring-[#00685f]/10"
        />

      </div>
    </div>
  );
}

/* =========================================================
   SELECT FIELD
========================================================= */

function SelectField({
  label,
  name,
  defaultValue,
  options,
}: {
  label: string;
  name: string;
  defaultValue: string;
  options: [string, string][];
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-[#3e4947]"
      >
        {label}
      </label>

      <select
        id={name}
        name={name}
        defaultValue={defaultValue}
        required
        className="h-12 w-full cursor-pointer rounded-xl border border-[#c1c9c7] bg-white px-4 text-sm font-medium text-[#191c1d] outline-none transition focus:border-[#00685f] focus:ring-2 focus:ring-[#00685f]/10"
      >
        <option value="">
          Select {label.toLowerCase()}
        </option>

        {options.map(([value, text]) => (
          <option
            key={value}
            value={value}
          >
            {text}
          </option>
        ))}
      </select>
    </div>
  );
}