import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Terms & Conditions",
  description:
    "Read the NutriTrack AI Terms & Conditions covering use of the website, nutrition tracking features, AI-assisted features, accounts, and services.",
  path: "/terms",
  keywords: [
    "NutriTrack AI terms",
    "NutriTrack terms and conditions",
    "nutrition app terms",
  ],
});

const sections = [
  {
    title: "1. Acceptance of These Terms",
    content: (
      <p>
        By accessing or using NutriTrack AI, you agree to these Terms &
        Conditions. If you do not agree with these terms, please do not use
        the service.
      </p>
    ),
  },
  {
    title: "2. About NutriTrack AI",
    content: (
      <>
        <p>
          NutriTrack AI is a nutrition and wellness tracking platform designed
          to help users record meals, nutrition information, activity, weight,
          and progress.
        </p>

        <p>
          The platform may also provide AI-assisted features such as food image
          analysis and nutrition guidance.
        </p>
      </>
    ),
  },
  {
    title: "3. Wellness Disclaimer",
    content: (
      <>
        <p>
          NutriTrack AI is intended for general wellness and educational
          purposes.
        </p>

        <p>
          It does not provide medical diagnosis, treatment, emergency medical
          advice, or a substitute for professional healthcare.
        </p>

        <p>
          You should consult a qualified healthcare professional regarding
          medical conditions, dietary restrictions, medications, allergies, or
          other health concerns.
        </p>
      </>
    ),
  },
  {
    title: "4. AI-Generated Information",
    content: (
      <>
        <p>
          Some NutriTrack AI features use artificial intelligence to generate
          estimates or responses.
        </p>

        <p>
          AI-generated information may be incomplete or inaccurate. Food
          identification, portion estimates, calorie values, and macronutrient
          estimates should be reviewed by you before being used in your
          personal tracking or decision-making.
        </p>
      </>
    ),
  },
  {
    title: "5. Your Account",
    content: (
      <>
        <p>
          Some features require you to create an account.
        </p>

        <p>
          You are responsible for providing accurate information and keeping
          your account credentials secure.
        </p>

        <p>
          You should notify us if you believe your account has been
          compromised or accessed without authorization.
        </p>
      </>
    ),
  },
  {
    title: "6. Acceptable Use",
    content: (
      <>
        <p>You agree not to:</p>

        <ul>
          <li>Use the service for unlawful purposes.</li>
          <li>Attempt to gain unauthorized access to the service.</li>
          <li>Interfere with the operation or security of the platform.</li>
          <li>Abuse automated systems or APIs.</li>
          <li>Upload malicious or harmful content.</li>
          <li>Attempt to access another user's account or information.</li>
          <li>Use the service to violate applicable laws or regulations.</li>
        </ul>
      </>
    ),
  },
  {
    title: "7. User-Provided Information",
    content: (
      <p>
        You are responsible for the information you enter into NutriTrack AI,
        including meal information, profile information, activity information,
        and other content you submit. You should ensure that the information
        you provide is appropriate and accurate to the best of your knowledge.
      </p>
    ),
  },
  {
    title: "8. Food and Nutrition Estimates",
    content: (
      <p>
        Nutrition values displayed by NutriTrack AI may be estimates. Actual
        nutritional values can vary based on ingredients, preparation methods,
        serving sizes, brands, and other factors. You should verify important
        nutrition information when accuracy is important.
      </p>
    ),
  },
  {
    title: "9. Intellectual Property",
    content: (
      <p>
        Unless otherwise stated, the NutriTrack AI website, software, branding,
        interface, text, graphics, and other original materials are owned by
        or licensed to NutriTrack AI and may not be copied, modified,
        distributed, or commercially exploited without appropriate
        authorization.
      </p>
    ),
  },
  {
    title: "10. Service Availability",
    content: (
      <p>
        We may modify, update, suspend, or discontinue parts of the service
        from time to time. We do not guarantee that the service will always be
        available, uninterrupted, or error-free.
      </p>
    ),
  },
  {
    title: "11. Third-Party Services",
    content: (
      <p>
        NutriTrack AI may rely on third-party services for infrastructure,
        authentication, databases, email delivery, AI processing, analytics,
        or other functionality. Use of third-party services may be subject to
        their respective terms and privacy policies.
      </p>
    ),
  },
  {
    title: "12. Limitation of Responsibility",
    content: (
      <p>
        To the extent permitted by applicable law, NutriTrack AI is not
        responsible for decisions you make solely based on AI-generated
        information, nutrition estimates, or general wellness information
        provided through the service.
      </p>
    ),
  },
  {
    title: "13. Account Termination",
    content: (
      <p>
        We may suspend or terminate access to an account where we reasonably
        believe the account is being used in violation of these Terms,
        applicable law, or the security or integrity of the service.
      </p>
    ),
  },
  {
    title: "14. Changes to These Terms",
    content: (
      <p>
        We may update these Terms & Conditions from time to time. Changes will
        be published on this page. Your continued use of the service after
        updated terms become effective may constitute acceptance of the
        updated terms where permitted by applicable law.
      </p>
    ),
  },
  {
    title: "15. Contact",
    content: (
      <p>
        If you have questions about these Terms & Conditions, please contact
        NutriTrack AI through the Support page.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <div className="bg-[#f8f9fa]">
      <section className="border-b border-[#bec9c6]/20 bg-[#f3f4f5] py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#00685f]">
            Legal
          </span>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Terms & Conditions
          </h1>

          <p className="mt-4 text-sm text-[#687370]">
            Effective date: September 27, 2026
          </p>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#3e4947] sm:text-base">
            These terms describe the rules and conditions that apply when you
            access or use NutriTrack AI.
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
          These terms are a general website/app terms template and should be
          reviewed and adapted to your actual business structure, services,
          payment model, jurisdiction, and applicable laws before publication.
        </p>
      </main>
    </div>
  );
}