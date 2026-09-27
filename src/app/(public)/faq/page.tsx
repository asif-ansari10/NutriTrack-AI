"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is NutriTrack AI?",
    answer:
      "NutriTrack AI is an AI-powered nutrition and wellness platform that helps you track meals, calories, protein, carbohydrates, fat, fiber, activity, weight, and overall progress in one place.",
  },
  {
    question: "How does the AI Food Scanner work?",
    answer:
      "You can upload or capture a photo of your meal. The AI analyzes the image to identify likely foods and estimate calories and macronutrients. You can review and edit the information before saving the meal.",
  },
  {
    question: "Can I manually add my meals?",
    answer:
      "Yes. You can manually add meals and enter the food information yourself. AI scanning is designed to make meal logging faster, but you remain in control of what gets saved.",
  },
  {
    question: "Can NutriTrack AI track Indian food?",
    answer:
      "Yes. NutriTrack AI is designed to support everyday foods and meals, including Indian cuisine. You can log individual foods, complete meals, and use AI-assisted food analysis where available.",
  },
  {
    question: "What nutrition information can I track?",
    answer:
      "NutriTrack AI can track calories, protein, carbohydrates, fat, and fiber. Your daily targets can be personalized based on the information in your profile.",
  },
  {
    question: "Can I track my weight?",
    answer:
      "Yes. You can record your weight over time and review your weight history and progress rather than replacing previous measurements.",
  },
  {
    question: "Does NutriTrack AI track activity and workouts?",
    answer:
      "Yes. You can record activities and workouts so your nutrition and activity information can be viewed together.",
  },
  {
    question: "What is the AI Coach?",
    answer:
      "The AI Coach provides general nutrition and wellness guidance using information from your goals, meals, activity, and progress when available.",
  },
  {
    question: "Is the AI Food Scanner always accurate?",
    answer:
      "AI food analysis provides estimates rather than laboratory measurements. You should review the detected foods, portions, and nutrition information and make corrections when necessary.",
  },
  {
    question: "Do I need an account to use NutriTrack AI?",
    answer:
      "Yes. An account is required for the private tracking experience because your meals, nutrition information, activity, and progress need to be associated with your profile.",
  },
  {
    question: "Is NutriTrack AI a medical or diagnostic service?",
    answer:
      "No. NutriTrack AI is a wellness and educational tool. It does not provide medical diagnosis or replace advice from a qualified healthcare professional.",
  },
  {
    question: "Is my nutrition data private?",
    answer:
      "Your account and nutrition information are associated with your authenticated account. For complete details about how information is collected, stored, processed, and retained, please review the Privacy Policy.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-[#bec9c6]/20 bg-[#f8f9fa] py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#00685f]">
            FAQ
          </span>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#191c1d] sm:text-5xl">
            Frequently asked questions
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#3e4947] sm:text-lg">
            Find answers about food scanning, nutrition tracking, activity,
            accounts, AI coaching, and how NutriTrack AI works.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#f3f4f5] py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={faq.question}
                  className={`
                    overflow-hidden rounded-2xl border
                    bg-white transition-all duration-200
                    ${
                      isOpen
                        ? "border-[#00685f]/30 shadow-sm"
                        : "border-[#bec9c6]/30"
                    }
                  `}
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
                  >
                    <span
                      className={`
                        text-sm font-semibold sm:text-base
                        ${
                          isOpen
                            ? "text-[#00685f]"
                            : "text-[#191c1d]"
                        }
                      `}
                    >
                      {faq.question}
                    </span>

                    <span
                      className={`
                        flex h-8 w-8 shrink-0 items-center justify-center
                        rounded-full transition-all duration-200
                        ${
                          isOpen
                            ? "bg-[#00685f] text-white"
                            : "bg-[#f3f4f5] text-[#3e4947]"
                        }
                      `}
                    >
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </span>
                  </button>

                  <div
                    className={`
                      grid transition-all duration-200
                      ${
                        isOpen
                          ? "grid-rows-[1fr]"
                          : "grid-rows-[0fr]"
                      }
                    `}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-[#bec9c6]/20 px-5 pb-5 pt-4 sm:px-6">
                        <p className="text-sm leading-7 text-[#3e4947] sm:text-base">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Still have questions */}
          <div className="mt-12 rounded-3xl bg-[#00685f] px-6 py-10 text-center text-white sm:px-10">
            <h2 className="text-2xl font-bold">
              Still have questions?
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#d8f8f2]">
              If you couldn't find the answer you're looking for, our support
              team can help with account and product questions.
            </p>

            <a
              href="/support"
              className="mt-6 inline-flex rounded-full bg-white px-6 py-3 font-semibold text-[#00685f] transition hover:bg-[#f3f4f5]"
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}