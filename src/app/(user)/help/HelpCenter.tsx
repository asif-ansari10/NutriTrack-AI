"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";

import {
  Search,
  ChevronDown,
  Mail,
  MessageCircle,
  User,
  Send,
  HelpCircle,
} from "lucide-react";

import { sendSupportMessage } from "./actions";

/* =========================================================
   FAQ DATA
========================================================= */

const faqs = [
  {
    category: "Account & Login",
    question: "How do I reset my password?",
    answer:
      "Go to Profile → Security & Password → Change Password. We'll send a secure password reset link to your registered email address.",
  },

  {
    category: "Account & Login",
    question: "Why can't I log into my account?",
    answer:
      "Make sure you're using the correct email and password. If you forgot your password, use the Forgot Password option on the login page. If you're still unable to log in, contact our support team.",
  },

  {
    category: "Profile",
    question: "Can I change my personal information?",
    answer:
      "Yes. Go to Profile and edit your name, goal, gender, date of birth, height, current weight, target weight and activity level. Your nutrition targets will be recalculated when you save your changes.",
  },

  {
    category: "Nutrition",
    question: "How is my calorie target calculated?",
    answer:
      "NutriTrack AI uses your profile information including age, gender, height, weight, activity level and goal to calculate an estimated daily calorie target.",
  },

  {
    category: "Nutrition",
    question: "Can I change my weight goal?",
    answer:
      "Yes. Open Profile → Personal Information and change your goal and target weight. Your nutrition targets will be recalculated after saving.",
  },

  {
    category: "Meals",
    question: "How do I add a meal?",
    answer:
      "Use Scan Meal or the meal tracking features available in your dashboard to record your food and nutrition information.",
  },

  {
    category: "Activity",
    question: "Can I track my activities?",
    answer:
      "Yes. NutriTrack AI allows you to record activities including the activity type, duration and calories burned.",
  },

  {
    category: "Security",
    question: "Is my account information secure?",
    answer:
      "Your authentication is handled through Supabase Authentication. Your account information is protected by authenticated access and database security policies.",
  },

  {
    category: "Other",
    question: "I found a problem with the app. What should I do?",
    answer:
      "If you can't find a solution in the FAQs, use the Contact Support form below. Describe the problem clearly and our team will review it.",
  },
];

/* =========================================================
   SUBMIT BUTTON
========================================================= */

function SubmitSupportButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className={`flex h-12 w-full items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold text-white transition ${
        pending
          ? "cursor-not-allowed bg-[#6b8f8b]"
          : "cursor-pointer bg-[#004e47] hover:bg-[#003f3a] active:scale-[0.99]"
      }`}
    >
      {pending ? (
        <>
          {/* Loading Spinner */}
          <svg
            className="h-5 w-5 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="currentColor"
              strokeWidth="3"
              className="opacity-30"
            />

            <path
              d="M21 12a9 9 0 0 1-9 9"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>

          <span>Sending...</span>
        </>
      ) : (
        <>
          <Send size={18} />
          <span>Send Message</span>
        </>
      )}
    </button>
  );
}

/* =========================================================
   COMPONENT
========================================================= */

export default function HelpCenter({
  userName,
  userEmail,
  error,
  success,
}: {
  userName: string;
  userEmail: string;
  error?: string;
  success?: string;
}) {
  const [search, setSearch] = useState("");

  const [openFaq, setOpenFaq] =
    useState<number | null>(null);

  /* =======================================================
     FILTER FAQ
  ======================================================= */

  const filteredFaqs = faqs.filter((faq) => {
    const query = search.toLowerCase().trim();

    if (!query) {
      return true;
    }

    return (
      faq.question
        .toLowerCase()
        .includes(query) ||
      faq.answer
        .toLowerCase()
        .includes(query) ||
      faq.category
        .toLowerCase()
        .includes(query)
    );
  });

  return (
    <div className="mx-auto w-full max-w-6xl">

      {/* =================================================
          HEADER
      ================================================= */}

      <section className="rounded-3xl bg-[#004e47] px-5 py-10 text-white shadow-[0_8px_30px_rgba(0,78,71,0.12)] sm:px-8 sm:py-12 lg:px-12">

        <div className="mx-auto max-w-3xl text-center">

          {/* Icon */}

          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
            <HelpCircle size={28} />
          </div>

          {/* Brand */}

          <p className="text-sm font-semibold uppercase tracking-widest text-[#91f4e6]">
            NutriTrack AI
          </p>

          {/* Heading */}

          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            How can we help?
          </h1>

          {/* Description */}

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/80 sm:text-base">
            Find answers to common questions or send
            our support team a message.
          </p>

          {/* Search */}

          <div className="relative mx-auto mt-7 max-w-xl">

            <Search
              size={20}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#687370]"
            />

            <input
              type="search"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search for an answer..."
              aria-label="Search frequently asked questions"
              className="h-13 w-full rounded-xl border-0 bg-white px-12 text-sm font-medium text-[#191c1d] outline-none placeholder:text-[#687370] focus:ring-4 focus:ring-white/20"
            />

          </div>

        </div>

      </section>

      {/* =================================================
          SUCCESS / ERROR MESSAGE
      ================================================= */}

      {error && (
        <div
          role="alert"
          className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          {error}
        </div>
      )}

      {success && (
        <div
          role="status"
          className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700"
        >
          ✓ {success}
        </div>
      )}

      {/* =================================================
          CONTENT
      ================================================= */}

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">

        {/* =================================================
            FAQ SECTION
        ================================================= */}

        <section className="lg:col-span-7">

          <div className="rounded-2xl bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] sm:p-7">

            {/* FAQ Heading */}

            <div className="mb-6">

              <h2 className="text-2xl font-bold text-[#191c1d]">
                Frequently Asked Questions
              </h2>

              <p className="mt-1 text-sm text-[#4b5754]">
                Quick answers to common questions.
              </p>

            </div>

            {/* FAQ List */}

            <div className="space-y-3">

              {filteredFaqs.length === 0 ? (
                <div className="rounded-xl bg-[#f8f9fa] p-6 text-center">

                  <Search
                    size={28}
                    className="mx-auto text-[#687370]"
                  />

                  <p className="mt-3 font-semibold text-[#191c1d]">
                    No results found
                  </p>

                  <p className="mt-1 text-sm text-[#687370]">
                    Try searching for something else.
                  </p>

                </div>
              ) : (
                filteredFaqs.map(
                  (faq, index) => {
                    const isOpen =
                      openFaq === index;

                    return (
                      <div
                        key={faq.question}
                        className="overflow-hidden rounded-xl border border-[#e1e3e4]"
                      >

                        {/* Question */}

                        <button
                          type="button"
                          onClick={() =>
                            setOpenFaq(
                              isOpen
                                ? null
                                : index
                            )
                          }
                          aria-expanded={isOpen}
                          className="flex w-full cursor-pointer items-center justify-between gap-4 px-4 py-4 text-left transition hover:bg-[#f8f9fa] sm:px-5"
                        >

                          <div className="min-w-0">

                            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[#00685f]">
                              {faq.category}
                            </span>

                            <span className="block text-sm font-semibold text-[#191c1d] sm:text-base">
                              {faq.question}
                            </span>

                          </div>

                          <ChevronDown
                            size={19}
                            className={`shrink-0 text-[#687370] transition-transform ${
                              isOpen
                                ? "rotate-180"
                                : ""
                            }`}
                          />

                        </button>

                        {/* Answer */}

                        {isOpen && (
                          <div className="border-t border-[#e1e3e4] bg-[#fafbfb] px-4 py-4 text-sm leading-6 text-[#3e4947] sm:px-5">
                            {faq.answer}
                          </div>
                        )}

                      </div>
                    );
                  }
                )
              )}

            </div>

          </div>

        </section>

        {/* =================================================
            CONTACT SUPPORT
        ================================================= */}

        <section className="lg:col-span-5">

          <div className="rounded-2xl bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] sm:p-7">

            {/* Header */}

            <div className="mb-6 flex items-start gap-3">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#91f4e6] text-[#005049]">
                <MessageCircle size={21} />
              </div>

              <div>

                <h2 className="text-xl font-bold text-[#191c1d]">
                  Contact Support
                </h2>

                <p className="mt-1 text-sm leading-5 text-[#4b5754]">
                  Can't find what you're looking for?
                  Send us a message.
                </p>

              </div>

            </div>

            {/* =================================================
                SUPPORT FORM
            ================================================= */}

            <form
              action={sendSupportMessage}
              className="space-y-4"
            >

              {/* =================================================
                  NAME
              ================================================= */}

              <div>

                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-[#3e4947]"
                >
                  Name
                </label>

                <div className="relative">

                  <User
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#687370]"
                  />

                  <input
                    id="name"
                    name="name"
                    type="text"
                    defaultValue={userName}
                    required
                    maxLength={100}
                    className="h-12 w-full rounded-xl border border-[#c1c9c7] bg-white pl-11 pr-4 text-sm font-medium text-[#191c1d] outline-none transition focus:border-[#00685f] focus:ring-2 focus:ring-[#00685f]/10"
                  />

                </div>

              </div>

              {/* =================================================
                  EMAIL
              ================================================= */}

              <div>

                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-[#3e4947]"
                >
                  Email Address
                </label>

                <div className="relative">

                  <Mail
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#687370]"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={userEmail}
                    required
                    maxLength={255}
                    className="h-12 w-full rounded-xl border border-[#d5dcda] bg-[#f1f3f3] pl-11 pr-4 text-sm font-medium text-[#191c1d] outline-none"
                  />

                </div>

                <p className="mt-1.5 text-xs text-[#687370]">
                  We'll use this email to reply to you.
                </p>

              </div>

              {/* =================================================
                  CATEGORY
              ================================================= */}

              <div>

                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-medium text-[#3e4947]"
                >
                  Category
                </label>

                <select
                  id="category"
                  name="category"
                  required
                  defaultValue=""
                  className="h-12 w-full cursor-pointer rounded-xl border border-[#c1c9c7] bg-white px-4 text-sm font-medium text-[#191c1d] outline-none transition focus:border-[#00685f] focus:ring-2 focus:ring-[#00685f]/10"
                >

                  <option
                    value=""
                    disabled
                  >
                    Select an issue
                  </option>

                  <option value="Account & Login">
                    Account & Login
                  </option>

                  <option value="Profile">
                    Profile
                  </option>

                  <option value="Nutrition">
                    Nutrition
                  </option>

                  <option value="Meals">
                    Meals
                  </option>

                  <option value="Activity">
                    Activity
                  </option>

                  <option value="Security">
                    Security
                  </option>

                  <option value="Bug Report">
                    Bug Report
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>

              </div>

              {/* =================================================
                  SUBJECT
              ================================================= */}

              <div>

                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-[#3e4947]"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  maxLength={150}
                  placeholder="What can we help you with?"
                  className="h-12 w-full rounded-xl border border-[#c1c9c7] bg-white px-4 text-sm font-medium text-[#191c1d] outline-none transition placeholder:text-[#687370] focus:border-[#00685f] focus:ring-2 focus:ring-[#00685f]/10"
                />

              </div>

              {/* =================================================
                  MESSAGE
              ================================================= */}

              <div>

                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-[#3e4947]"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  required
                  minLength={10}
                  maxLength={3000}
                  rows={5}
                  placeholder="Describe your problem or question..."
                  className="w-full resize-none rounded-xl border border-[#c1c9c7] bg-white px-4 py-3 text-sm font-medium text-[#191c1d] outline-none transition placeholder:text-[#687370] focus:border-[#00685f] focus:ring-2 focus:ring-[#00685f]/10"
                />

                <p className="mt-1.5 text-xs text-[#687370]">
                  Please provide enough detail so we can
                  understand the problem.
                </p>

              </div>

              {/* =================================================
                  SUBMIT BUTTON
              ================================================= */}

              <SubmitSupportButton />

            </form>

          </div>

        </section>

      </div>

      {/* =================================================
          FOOTER
      ================================================= */}

      <div className="mt-6 pb-6 text-center">

        <p className="text-xs text-[#687370]">
          NutriTrack AI Support · We're here to help.
        </p>

      </div>

    </div>
  );
}