"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useFormStatus } from "react-dom";
import {
  Search,
  ChevronDown,
  Mail,
  MessageCircle,
  User,
  Send,
  HelpCircle,
  ExternalLink,
} from "lucide-react";

import { sendPublicSupportMessage } from "./actions";

const faqs = [
  {
    category: "Account & Login",
    question: "How do I reset my password?",
    answer:
      "Go to the login page and select Forgot Password. You will receive a secure password reset link at your registered email address.",
  },
  {
    category: "Account & Login",
    question: "Why can't I log into my account?",
    answer:
      "Make sure you are using the correct email and password. If you forgot your password, use the Forgot Password option. If the problem continues, contact support.",
  },
  {
    category: "Profile",
    question: "Can I change my personal information?",
    answer:
      "Yes. From your profile you can update information such as your name, goal, gender, date of birth, height, current weight, target weight, and activity level.",
  },
  {
    category: "Nutrition",
    question: "How is my calorie target calculated?",
    answer:
      "Your estimated calorie target can be based on information such as age, gender, height, weight, activity level, and your selected goal.",
  },
  {
    category: "Nutrition",
    question: "Can I change my weight goal?",
    answer:
      "Yes. You can update your goal and target weight from your profile. Your nutrition targets can then be recalculated.",
  },
  {
    category: "Meals",
    question: "How do I add a meal?",
    answer:
      "You can add meals through the meal tracking features in your NutriTrack AI account. You can also use the AI Food Scanner where available.",
  },
  {
    category: "AI Food Scanner",
    question: "How does the AI Food Scanner work?",
    answer:
      "Upload or capture a meal image and the AI can analyze the image to identify likely foods and estimate nutrition. You can review the information before saving it.",
  },
  {
    category: "Activity",
    question: "Can I track my activities?",
    answer:
      "Yes. You can record activities and workouts, including activity type, duration, and calories burned where applicable.",
  },
  {
    category: "Security",
    question: "Is my account information secure?",
    answer:
      "NutriTrack AI uses authenticated access and database security controls to protect account information. See our Privacy Policy for more information.",
  },
  {
    category: "Other",
    question: "I found a problem with the app. What should I do?",
    answer:
      "Search the FAQs first. If you cannot find a solution, use the Contact Support form on this page and describe the problem clearly.",
  },
];

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`flex h-12 w-full items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold text-white transition ${
        pending
          ? "cursor-not-allowed bg-[#6b8f8b]"
          : "bg-[#004e47] hover:bg-[#003f3a] active:scale-[0.99]"
      }`}
    >
      {pending ? (
        <>
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

export default function PublicSupportPage() {
  const searchParams = useSearchParams();

  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const error = searchParams.get("error");
  const success = searchParams.get("success");

  const filteredFaqs = faqs.filter((faq) => {
    const query = search.toLowerCase().trim();

    if (!query) return true;

    return (
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query) ||
      faq.category.toLowerCase().includes(query)
    );
  });

  return (
    <div className="bg-[#f8f9fa]">
      {/* =====================================================
          HERO / SEARCH
      ===================================================== */}

      <section className="bg-[#004e47] px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
            <HelpCircle size={28} />
          </div>

          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#91f4e6]">
            NutriTrack AI Support
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            How can we help?
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/80 sm:text-base">
            Find answers to common questions or send our support team a
            message.
          </p>

          {/* Search */}
          <div className="relative mx-auto mt-7 max-w-2xl">
            <Search
              size={20}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#687370]"
            />

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for an answer..."
              aria-label="Search frequently asked questions"
              className="h-14 w-full rounded-2xl border-0 bg-white px-12 text-sm font-medium text-[#191c1d] outline-none placeholder:text-[#687370] focus:ring-4 focus:ring-white/20"
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          MESSAGES
      ===================================================== */}

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
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

        {/* ===================================================
            CONTENT
        =================================================== */}

        <div className="grid gap-6 py-10 lg:grid-cols-12 lg:py-14">
          {/* =================================================
              FAQ
          ================================================= */}

          <section className="lg:col-span-7">
            <div className="rounded-3xl border border-[#bec9c6]/30 bg-white p-5 shadow-sm sm:p-7">
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-wider text-[#00685f]">
                  Knowledge base
                </p>

                <h2 className="mt-2 text-2xl font-bold text-[#191c1d]">
                  Frequently Asked Questions
                </h2>

                <p className="mt-1 text-sm text-[#4b5754]">
                  Quick answers to common questions.
                </p>
              </div>

              <div className="space-y-3">
                {filteredFaqs.length === 0 ? (
                  <div className="rounded-2xl bg-[#f3f4f5] p-8 text-center">
                    <Search
                      size={30}
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
                  filteredFaqs.map((faq, index) => {
                    const isOpen = openFaq === index;

                    return (
                      <div
                        key={faq.question}
                        className="overflow-hidden rounded-2xl border border-[#e1e3e4]"
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setOpenFaq(isOpen ? null : index)
                          }
                          aria-expanded={isOpen}
                          className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition hover:bg-[#f8f9fa] sm:px-5"
                        >
                          <div className="min-w-0">
                            <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-[#00685f]">
                              {faq.category}
                            </span>

                            <span className="block text-sm font-semibold text-[#191c1d] sm:text-base">
                              {faq.question}
                            </span>
                          </div>

                          <ChevronDown
                            size={19}
                            className={`shrink-0 text-[#687370] transition-transform duration-200 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {isOpen && (
                          <div className="border-t border-[#e1e3e4] bg-[#fafbfb] px-4 py-4 text-sm leading-6 text-[#3e4947] sm:px-5">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </section>

          {/* =================================================
              CONTACT SUPPORT
          ================================================= */}

          <section className="lg:col-span-5">
            <div className="rounded-3xl border border-[#bec9c6]/30 bg-white p-5 shadow-sm sm:p-7 lg:sticky lg:top-24">
              <div className="mb-6 flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#91f4e6] text-[#005049]">
                  <MessageCircle size={21} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-[#191c1d]">
                    Contact Support
                  </h2>

                  <p className="mt-1 text-sm leading-5 text-[#4b5754]">
                    Can't find what you're looking for? Send us a message.
                  </p>
                </div>
              </div>

              <form
                action={sendPublicSupportMessage}
                className="space-y-4"
              >
                {/* Name */}
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
                      required
                      maxLength={100}
                      placeholder="Your name"
                      className="h-12 w-full rounded-xl border border-[#c1c9c7] bg-white pl-11 pr-4 text-sm font-medium text-[#191c1d] outline-none transition focus:border-[#00685f] focus:ring-2 focus:ring-[#00685f]/10"
                    />
                  </div>
                </div>

                {/* Email */}
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
                      required
                      maxLength={255}
                      placeholder="you@example.com"
                      className="h-12 w-full rounded-xl border border-[#c1c9c7] bg-white pl-11 pr-4 text-sm font-medium text-[#191c1d] outline-none transition focus:border-[#00685f] focus:ring-2 focus:ring-[#00685f]/10"
                    />
                  </div>

                  <p className="mt-1.5 text-xs text-[#687370]">
                    We'll use this email to reply to you.
                  </p>
                </div>

                {/* Category */}
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
                    <option value="" disabled>
                      Select an issue
                    </option>

                    <option value="Account & Login">
                      Account & Login
                    </option>

                    <option value="Profile">Profile</option>

                    <option value="Nutrition">Nutrition</option>

                    <option value="Meals">Meals</option>

                    <option value="AI Food Scanner">
                      AI Food Scanner
                    </option>

                    <option value="Activity">Activity</option>

                    <option value="Security">Security</option>

                    <option value="Bug Report">Bug Report</option>

                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Subject */}
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

                {/* Message */}
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
                    Please provide enough detail so we can understand the
                    problem.
                  </p>
                </div>

                <SubmitButton />
              </form>
            </div>
          </section>
        </div>

        {/* Bottom help */}
        <div className="pb-10 text-center sm:pb-14">
          <p className="text-xs text-[#687370]">
            NutriTrack AI Support · We're here to help.
          </p>
        </div>
      </div>
    </div>
  );
}