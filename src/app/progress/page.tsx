import ProgressPage from "@/components/progress/ProgressPage";
import { getProgressData } from "@/lib/progress/getProgressData";
import AppShell from "@/components/navigation/AppShell";

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

  const month =
    params.month ||
    getCurrentMonth();

  const data =
    await getProgressData(month);

  return (
    <AppShell>
    <ProgressPage
      month={month}
      data={data}
    />
    </AppShell>
  );
}