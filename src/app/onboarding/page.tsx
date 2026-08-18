"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
} from "lucide-react";
import { completeOnboarding } from "./actions";

type Goal = "lose" | "maintain" | "gain";

type Gender = "male" | "female" | "other";

type Activity =
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "very_active";

interface OnboardingData {
  goal: Goal;
  gender: Gender | "";
  dateOfBirth: string;
  height: string;
  currentWeight: string;
  targetWeight: string;
  activity: Activity | "";
}

const initialData: OnboardingData = {
  goal: "lose",
  gender: "",
  dateOfBirth: "",
  height: "",
  currentWeight: "",
  targetWeight: "",
  activity: "",
};

const goals = [
  {
    id: "lose" as Goal,
    title: "Lose Fat",
    description:
      "Create a sustainable calorie deficit.",
    icon: "🔥",
  },
  {
    id: "maintain" as Goal,
    title: "Maintain",
    description:
      "Maintain your current weight.",
    icon: "⚖️",
  },
  {
    id: "gain" as Goal,
    title: "Gain",
    description:
      "Build weight and muscle with a calorie surplus.",
    icon: "💪",
  },
];

const genders = [
  {
    id: "male" as Gender,
    label: "Male",
    icon: "♂",
  },
  {
    id: "female" as Gender,
    label: "Female",
    icon: "♀",
  },
  {
    id: "other" as Gender,
    label: "Other",
    icon: "⚧",
  },
];

const activities = [
  {
    id: "sedentary" as Activity,
    title: "Sedentary",
    description:
      "Little or no exercise",
    icon: "🪑",
  },
  {
    id: "light" as Activity,
    title: "Lightly Active",
    description:
      "Exercise 1–3 days per week",
    icon: "🚶",
  },
  {
    id: "moderate" as Activity,
    title: "Moderately Active",
    description:
      "Exercise 3–5 days per week",
    icon: "🏃",
  },
  {
    id: "active" as Activity,
    title: "Very Active",
    description:
      "Hard exercise 6–7 days per week",
    icon: "🏋️",
  },
  {
    id: "very_active" as Activity,
    title: "Extremely Active",
    description:
      "Intense training or physical job",
    icon: "🔥",
  },
];

export default function OnboardingPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);

  const [data, setData] =
    useState<OnboardingData>(
      initialData
    );

  const [error, setError] = useState("");

  const updateData = <
    K extends keyof OnboardingData
  >(
    field: K,
    value: OnboardingData[K]
  ) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setError("");
  };

  const validateStep = () => {
    setError("");

    if (step === 1) {
      if (!data.goal) {
        setError(
          "Please select your goal."
        );
        return false;
      }
    }

    if (step === 2) {
      if (!data.gender) {
        setError(
          "Please select your gender."
        );
        return false;
      }

      if (!data.dateOfBirth) {
        setError(
          "Please enter your date of birth."
        );
        return false;
      }

      const dob = new Date(
        data.dateOfBirth
      );

      const today = new Date();

      let age =
        today.getFullYear() -
        dob.getFullYear();

      const month =
        today.getMonth() -
        dob.getMonth();

      if (
        month < 0 ||
        (month === 0 &&
          today.getDate() <
            dob.getDate())
      ) {
        age--;
      }

      if (age < 13 || age > 100) {
        setError(
          "Age must be between 13 and 100."
        );
        return false;
      }
    }

    if (step === 3) {
      const height = Number(
        data.height
      );

      const currentWeight = Number(
        data.currentWeight
      );

      const targetWeight = Number(
        data.targetWeight
      );

      if (
        !height ||
        height < 100 ||
        height > 250
      ) {
        setError(
          "Please enter a valid height between 100 and 250 cm."
        );
        return false;
      }

      if (
        !currentWeight ||
        currentWeight < 30 ||
        currentWeight > 300
      ) {
        setError(
          "Please enter a valid current weight."
        );
        return false;
      }

      if (
        !targetWeight ||
        targetWeight < 30 ||
        targetWeight > 300
      ) {
        setError(
          "Please enter a valid target weight."
        );
        return false;
      }

      if (
        data.goal === "lose" &&
        targetWeight >= currentWeight
      ) {
        setError(
          "For fat loss, your target weight should be lower than your current weight."
        );
        return false;
      }

      if (
        data.goal === "gain" &&
        targetWeight <= currentWeight
      ) {
        setError(
          "For weight gain, your target weight should be higher than your current weight."
        );
        return false;
      }
    }

    if (step === 4) {
      if (!data.activity) {
        setError(
          "Please select your activity level."
        );
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;

    if (step < 4) {
      setStep((prev) => prev + 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
      setError("");

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      router.back();
    }
  };

  const getTitle = () => {
    switch (step) {
      case 1:
        return "What's your goal?";

      case 2:
        return "Tell us about yourself";

      case 3:
        return "Your body measurements";

      case 4:
        return "How active are you?";

      default:
        return "";
    }
  };

  const getDescription = () => {
    switch (step) {
      case 1:
        return "This helps us calculate your daily nutritional needs.";

      case 2:
        return "We'll use this information to personalize your nutrition plan.";

      case 3:
        return "Your measurements help us estimate your calorie and nutrition targets.";

      case 4:
        return "Tell us about your usual activity level so we can estimate your daily calorie burn.";

      default:
        return "";
    }
  };

  return (
    <main className="min-h-[100dvh] bg-[#f8f9fa] text-[#191c1d]">

      <div className="mx-auto flex min-h-[100dvh] w-full max-w-3xl flex-col px-5 sm:px-8 lg:px-10">

        {/* HEADER */}
        <header className="flex h-16 shrink-0 items-center sm:h-20">
          <button
            type="button"
            onClick={handleBack}
            className="flex h-11 w-11 items-center justify-center rounded-full text-[#3e4947] transition hover:bg-[#e7e8e9] active:scale-95"
            aria-label="Go back"
          >
            <ArrowLeft size={24} />
          </button>
        </header>

        <section className="flex flex-1 flex-col pb-8">

          {/* PROGRESS */}
          <div className="mb-8 sm:mb-10">

            <div className="mb-3 flex items-center justify-between">

              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#3e4947]">
                Step {step} of 4
              </span>

              <span className="text-xs text-[#6e7977]">
                {step * 25}%
              </span>

            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-[#e1e3e4]">
              <div
                className="h-full rounded-full bg-[#00685f] transition-all duration-300"
                style={{
                  width: `${step * 25}%`,
                }}
              />
            </div>

          </div>

          {/* TITLE */}
          <div className="mb-8 sm:mb-10">

            <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              {getTitle()}
            </h1>

            <p className="mt-3 max-w-2xl text-base leading-6 text-[#3e4947] sm:text-lg sm:leading-7">
              {getDescription()}
            </p>

          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <div className="flex flex-col gap-4">

              {goals.map((goal) => {
                const selected =
                  data.goal === goal.id;

                return (
                  <button
                    key={goal.id}
                    type="button"
                    onClick={() =>
                      updateData(
                        "goal",
                        goal.id
                      )
                    }
                    className={`flex min-h-[100px] w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all sm:min-h-[120px] sm:p-5 ${
                      selected
                        ? "border-2 border-[#00685f] bg-[#00685f]/[0.04] shadow-sm"
                        : "border-[#bec9c6] bg-white hover:border-[#00685f]/50"
                    }`}
                  >

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e7e8e9] text-2xl sm:h-14 sm:w-14 sm:text-3xl">
                      {goal.icon}
                    </div>

                    <div className="min-w-0 flex-1">

                      <h2 className="text-lg font-semibold sm:text-xl">
                        {goal.title}
                      </h2>

                      <p className="mt-1 text-sm text-[#3e4947] sm:text-base">
                        {goal.description}
                      </p>

                    </div>

                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                        selected
                          ? "bg-[#00685f] text-white"
                          : "border-2 border-[#bec9c6]"
                      }`}
                    >
                      {selected && (
                        <Check size={17} />
                      )}
                    </div>

                  </button>
                );
              })}

            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-8">

              {/* Gender */}
              <div>

                <label className="mb-3 block text-sm font-semibold">
                  Gender
                </label>

                <div className="grid grid-cols-3 gap-3">

                  {genders.map(
                    (gender) => {
                      const selected =
                        data.gender ===
                        gender.id;

                      return (
                        <button
                          key={gender.id}
                          type="button"
                          onClick={() =>
                            updateData(
                              "gender",
                              gender.id
                            )
                          }
                          className={`flex min-h-[100px] flex-col items-center justify-center gap-2 rounded-2xl border transition active:scale-[0.98] ${
                            selected
                              ? "border-2 border-[#00685f] bg-[#00685f]/[0.04]"
                              : "border-[#bec9c6] bg-white hover:border-[#00685f]/50"
                          }`}
                        >
                          <span className="text-2xl">
                            {gender.icon}
                          </span>

                          <span className="text-sm font-medium">
                            {gender.label}
                          </span>
                        </button>
                      );
                    }
                  )}

                </div>

              </div>

              {/* DOB */}
              <div>

                <label
                  htmlFor="dateOfBirth"
                  className="mb-3 block text-sm font-semibold"
                >
                  Date of birth
                </label>

                <input
                  id="dateOfBirth"
                  type="date"
                  value={
                    data.dateOfBirth
                  }
                  onChange={(e) =>
                    updateData(
                      "dateOfBirth",
                      e.target.value
                    )
                  }
                  max={new Date()
                    .toISOString()
                    .split("T")[0]}
                  className="h-14 w-full rounded-xl border border-[#bec9c6] bg-white px-4 text-base outline-none transition focus:border-[#00685f] focus:ring-2 focus:ring-[#00685f]/20"
                />

              </div>

            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-6">

              {/* Height */}
              <div>

                <label
                  htmlFor="height"
                  className="mb-3 block text-sm font-semibold"
                >
                  Height
                </label>

                <div className="relative">

                  <input
                    id="height"
                    type="number"
                    min="100"
                    max="250"
                    value={data.height}
                    onChange={(e) =>
                      updateData(
                        "height",
                        e.target.value
                      )
                    }
                    placeholder="e.g. 180"
                    className="h-14 w-full rounded-xl border border-[#bec9c6] bg-white px-4 pr-16 text-base outline-none focus:border-[#00685f] focus:ring-2 focus:ring-[#00685f]/20"
                  />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#6e7977]">
                    cm
                  </span>

                </div>

              </div>

              {/* Current */}
              <div>

                <label
                  htmlFor="currentWeight"
                  className="mb-3 block text-sm font-semibold"
                >
                  Current Weight
                </label>

                <div className="relative">

                  <input
                    id="currentWeight"
                    type="number"
                    min="30"
                    max="300"
                    step="0.1"
                    value={
                      data.currentWeight
                    }
                    onChange={(e) =>
                      updateData(
                        "currentWeight",
                        e.target.value
                      )
                    }
                    placeholder="e.g. 85"
                    className="h-14 w-full rounded-xl border border-[#bec9c6] bg-white px-4 pr-16 text-base outline-none focus:border-[#00685f] focus:ring-2 focus:ring-[#00685f]/20"
                  />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#6e7977]">
                    kg
                  </span>

                </div>

              </div>

              {/* Target */}
              <div>

                <label
                  htmlFor="targetWeight"
                  className="mb-3 block text-sm font-semibold"
                >
                  Target Weight
                </label>

                <div className="relative">

                  <input
                    id="targetWeight"
                    type="number"
                    min="30"
                    max="300"
                    step="0.1"
                    value={
                      data.targetWeight
                    }
                    onChange={(e) =>
                      updateData(
                        "targetWeight",
                        e.target.value
                      )
                    }
                    placeholder={
                      data.goal === "lose"
                        ? "e.g. 75"
                        : data.goal ===
                            "gain"
                          ? "e.g. 90"
                          : "Your target weight"
                    }
                    className="h-14 w-full rounded-xl border border-[#bec9c6] bg-white px-4 pr-16 text-base outline-none focus:border-[#00685f] focus:ring-2 focus:ring-[#00685f]/20"
                  />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#6e7977]">
                    kg
                  </span>

                </div>

              </div>

              <div className="rounded-xl border border-[#bec9c6] bg-white p-4 text-sm leading-5 text-[#3e4947]">
                Your measurements are used to estimate your daily calorie and macronutrient requirements.
              </div>

            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="flex flex-col gap-3">

              {activities.map(
                (activity) => {
                  const selected =
                    data.activity ===
                    activity.id;

                  return (
                    <button
                      key={activity.id}
                      type="button"
                      onClick={() =>
                        updateData(
                          "activity",
                          activity.id
                        )
                      }
                      className={`flex min-h-[82px] w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all ${
                        selected
                          ? "border-2 border-[#00685f] bg-[#00685f]/[0.04] shadow-sm"
                          : "border-[#bec9c6] bg-white hover:border-[#00685f]/50"
                      }`}
                    >

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e7e8e9] text-xl">
                        {activity.icon}
                      </div>

                      <div className="min-w-0 flex-1">

                        <h2 className="font-semibold">
                          {activity.title}
                        </h2>

                        <p className="mt-1 text-sm text-[#6e7977]">
                          {activity.description}
                        </p>

                      </div>

                      <div
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                          selected
                            ? "bg-[#00685f] text-white"
                            : "border-2 border-[#bec9c6]"
                        }`}
                      >
                        {selected && (
                          <Check size={17} />
                        )}
                      </div>

                    </button>
                  );
                }
              )}

            </div>
          )}

          {/* ERROR */}
          {error && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* BUTTON */}
          <div className="mt-8 pt-4 sm:mt-12">

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex h-14 w-full items-center justify-center rounded-xl bg-[#00685f] px-6 text-base font-semibold text-white shadow-sm transition hover:bg-[#005049] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#00685f] focus:ring-offset-2 sm:text-lg"
              >
                Continue
              </button>
            ) : (
              <form
                action={completeOnboarding}
                onSubmit={(e) => {
                  if (!validateStep()) {
                    e.preventDefault();
                  }
                }}
              >
                <input
                  type="hidden"
                  name="goal"
                  value={data.goal}
                />

                <input
                  type="hidden"
                  name="gender"
                  value={data.gender}
                />

                <input
                  type="hidden"
                  name="date_of_birth"
                  value={data.dateOfBirth}
                />

                <input
                  type="hidden"
                  name="height"
                  value={data.height}
                />

                <input
                  type="hidden"
                  name="current_weight"
                  value={
                    data.currentWeight
                  }
                />

                <input
                  type="hidden"
                  name="target_weight"
                  value={
                    data.targetWeight
                  }
                />

                <input
                  type="hidden"
                  name="activity"
                  value={data.activity}
                />

                <button
                  type="submit"
                  className="flex h-14 w-full items-center justify-center rounded-xl bg-[#00685f] px-6 text-base font-semibold text-white shadow-sm transition hover:bg-[#005049] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#00685f] focus:ring-offset-2 sm:text-lg"
                >
                  Calculate My Nutrition Plan
                </button>
              </form>
            )}

            <p className="mt-3 text-center text-xs text-[#6e7977]">
              {step === 4
                ? "Almost there! We'll create your personalized plan."
                : "You can change these details later in your profile."}
            </p>

          </div>

        </section>
      </div>
    </main>
  );
}