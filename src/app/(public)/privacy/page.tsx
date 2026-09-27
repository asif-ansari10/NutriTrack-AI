import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "Read the NutriTrack AI Privacy Policy to understand how account, nutrition, activity, weight, and support information may be collected and used.",
  path: "/privacy",
  keywords: [
    "NutriTrack AI privacy policy",
    "NutriTrack privacy",
    "nutrition app privacy",
  ],
});


const sections = [
  {
    title: "1. Information We Collect",
    content: (
      <>
        <p>
          When you use NutriTrack AI, we may collect information that you
          provide when creating or using your account.
        </p>

        <ul>
          <li>Name and account information</li>
          <li>Email address</li>
          <li>Profile information</li>
          <li>Nutrition and meal information</li>
          <li>Activity and workout information</li>
          <li>Weight and progress information</li>
          <li>Information you provide when contacting support</li>
        </ul>

        <p>
          Some information may also be generated from your use of features,
          such as nutrition calculations, progress summaries, and AI-assisted
          food analysis.
        </p>
      </>
    ),
  },
  {
    title: "2. How We Use Information",
    content: (
      <>
        <p>Information may be used to:</p>

        <ul>
          <li>Provide and operate NutriTrack AI</li>
          <li>Create and maintain your account</li>
          <li>Store and display your nutrition records</li>
          <li>Calculate nutrition targets</li>
          <li>Provide AI-assisted features</li>
          <li>Track your progress and activity</li>
          <li>Respond to support requests</li>
          <li>Improve the reliability and functionality of the service</li>
          <li>Protect the service against misuse and unauthorized activity</li>
        </ul>
      </>
    ),
  },
  {
    title: "3. AI Features",
    content: (
      <>
        <p>
          NutriTrack AI may use artificial intelligence to assist with features
          such as food image analysis and nutrition conversations.
        </p>

        <p>
          AI-generated results may contain errors. Food identification,
          portions, calories, and nutrition values should be reviewed before
          being relied upon for personal tracking.
        </p>

        <p>
          AI features are not a substitute for professional medical,
          nutritional, or healthcare advice.
        </p>
      </>
    ),
  },
  {
    title: "4. Account Information",
    content: (
      <>
        <p>
          You are responsible for maintaining the security of your account
          credentials and for activity performed through your account.
        </p>

        <p>
          If you believe your account has been accessed without authorization,
          contact us through the Support page as soon as possible.
        </p>
      </>
    ),
  },
  {
    title: "5. Data Storage and Security",
    content: (
      <>
        <p>
          We use technical and organizational measures intended to protect
          information stored by the service.
        </p>

        <p>
          Authentication and database access controls are used to help protect
          account information and user-specific data.
        </p>

        <p>
          However, no internet-based service can guarantee absolute security.
        </p>
      </>
    ),
  },
  {
    title: "6. Information Sharing",
    content: (
      <>
        <p>
          We do not use your information for purposes unrelated to operating,
          supporting, securing, or improving the service except where permitted
          or required by applicable law.
        </p>

        <p>
          Information may be processed by service providers that help us
          operate NutriTrack AI, such as infrastructure, authentication,
          database, email, analytics, or AI service providers.
        </p>
      </>
    ),
  },
  {
    title: "7. Support Communications",
    content: (
      <>
        <p>
          When you contact support, we may process the name, email address,
          subject, category, and message you provide so that we can respond to
          your request.
        </p>
      </>
    ),
  },
  {
    title: "8. Your Choices",
    content: (
      <>
        <p>
          Depending on the features available to you, you may be able to
          update or correct information in your account.
        </p>

        <p>
          You can contact support if you have questions about your personal
          information or account.
        </p>
      </>
    ),
  },
  {
    title: "9. Children's Privacy",
    content: (
      <p>
        NutriTrack AI is not intended for children where use of the service is
        prohibited by applicable law. We do not knowingly collect personal
        information from children in circumstances where such collection is
        prohibited.
      </p>
    ),
  },
  {
    title: "10. Changes to This Policy",
    content: (
      <p>
        We may update this Privacy Policy when our service, practices, or legal
        requirements change. Updated versions will be published on this page
        with an updated effective date.
      </p>
    ),
  },
  {
    title: "11. Contact Us",
    content: (
      <p>
        If you have questions about this Privacy Policy or your personal
        information, please contact us through the NutriTrack AI Support page.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <div className="bg-[#f8f9fa]">
      <section className="border-b border-[#bec9c6]/20 bg-[#f3f4f5] py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#00685f]">
            Legal
          </span>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Privacy Policy
          </h1>

          <p className="mt-4 text-sm text-[#687370]">
            Effective date: September 27, 2026
          </p>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#3e4947] sm:text-base">
            This Privacy Policy explains how NutriTrack AI may collect, use,
            store, and protect information when you use our website and
            services.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="rounded-3xl border border-[#bec9c6]/30 bg-white p-6 shadow-sm sm:p-10">
          <div className="space-y-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-xl font-bold text-[#191c1d] sm:text-2xl">
                  {section.title}
                </h2>

                <div className="mt-4 space-y-4 text-sm leading-7 text-[#3e4947]">
                  {section.content}
                </div>
              </section>
            ))}
          </div>
        </div>

        <p className="mt-6 text-center text-xs leading-5 text-[#687370]">
          This page provides general information about privacy practices and
          should be reviewed and adapted to your actual data-processing
          practices and applicable legal requirements.
        </p>
      </main>
    </div>
  );
}