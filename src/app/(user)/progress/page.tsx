import ProgressPage from "@/components/progress/ProgressPage";
import ProtectedAppShell from "@/components/navigation/ProtectedAppShell";
import { createClient } from "@/lib/supabase/server";
import { getProgressData } from "@/lib/progress/getProgressData";

interface PageProps {
  searchParams: Promise<{
    month?: string;
  }>;
}

function getCurrentMonth() {
  const now = new Date();

  return `${now.getFullYear()}-${String(
    now.getMonth() + 1
  ).padStart(2, "0")}`;
}

export default async function ProgressRoute({
  searchParams,
}: PageProps) {
  const params = await searchParams;

  // =========================================================
  // CHECK AUTH FIRST
  // =========================================================

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // =========================================================
  // NOT LOGGED IN
  // =========================================================

  if (!user) {
    return (
      <ProtectedAppShell>
        <main className="min-h-screen bg-[#f8f9fa] text-[#191c1d]">
          <div className="mx-auto w-full max-w-[1500px] px-4 py-6 sm:px-6 md:px-8 lg:px-10 xl:px-8 xl:py-8">
            <div className="rounded-[24px] bg-white p-8 text-center shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
              <h1 className="text-2xl font-bold text-[#191c1d]">
                Your Progress
              </h1>

              <p className="mt-2 text-sm text-[#6e7977]">
                Please log in to view your progress.
              </p>

              <a
                href="/login"
                className="
                  mt-6 inline-flex h-11
                  items-center justify-center
                  rounded-xl
                  bg-[#004e47]
                  px-6
                  text-sm font-semibold
                  text-white
                  transition-colors
                  hover:bg-[#003f3a]
                "
              >
                Sign In
              </a>
            </div>
          </div>
        </main>
      </ProtectedAppShell>
    );
  }

  // =========================================================
  // GET MONTH
  // =========================================================

  const month = params.month || getCurrentMonth();

  // =========================================================
  // LOAD REAL PROGRESS DATA
  // =========================================================

  const data = await getProgressData(month);

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <ProtectedAppShell>
      <main className="min-h-screen bg-[#f8f9fa] text-[#191c1d]">
        <div className="mx-auto w-full max-w-[1500px] px-4 py-6 sm:px-6 md:px-8 lg:px-10 xl:px-8 xl:py-8">
          <ProgressPage
            month={month}
            data={data}
          />
        </div>
      </main>
    </ProtectedAppShell>
  );
}