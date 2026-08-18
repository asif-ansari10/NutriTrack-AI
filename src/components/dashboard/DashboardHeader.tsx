interface DashboardHeaderProps {
  name: string;
  goal: string | null;
  authenticated: boolean;
}

function formatGoal(goal: string | null) {
  if (!goal) return "";

  if (goal === "lose") {
    return "🔥 FAT LOSS";
  }

  if (goal === "maintain") {
    return "⚖️ MAINTAIN";
  }

  if (goal === "gain") {
    return "💪 WEIGHT GAIN";
  }

  return goal.toUpperCase();
}

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";

  if (hour < 17) return "Good afternoon";

  return "Good evening";
}

export default function DashboardHeader({
  name,
  goal,
  authenticated,
}: DashboardHeaderProps) {
  const today = new Intl.DateTimeFormat(
    "en-US",
    {
      month: "short",
      day: "numeric",
    }
  ).format(new Date());

  const greeting = getGreeting();

  if (!authenticated) {
    return (
      <header className="mb-6 sm:mb-8">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#3e4947]">
          {today}
        </p>

        <h1 className="text-2xl font-bold tracking-tight text-[#191c1d] sm:text-3xl lg:text-4xl">
          Welcome to NutriTrack AI 👋
        </h1>

        <p className="mt-2 text-sm text-[#3e4947]">
          Sign in to start tracking your nutrition.
        </p>
      </header>
    );
  }

  return (
    <header className="mb-6 sm:mb-8">

      <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#3e4947]">
        Today, {today}
      </p>

      <div className="flex flex-wrap items-center gap-2 sm:gap-3">

        <h1 className="text-2xl font-bold tracking-tight text-[#191c1d] sm:text-3xl lg:text-4xl">
          {greeting},{" "}
          {name || "there"} 👋
        </h1>

        {goal && (
          <span className="flex items-center gap-1 rounded-full border border-[#00685f]/20 bg-[#00685f]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#004e47]">
            {formatGoal(goal)}
          </span>
        )}

      </div>

    </header>
  );
}