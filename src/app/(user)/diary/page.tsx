import ProtectedAppShell from "@/components/navigation/ProtectedAppShell";
import DiaryPage from "@/components/diary/DiaryPage";
import {
  getDiaryData,
} from "@/lib/diary/getDiaryData";
import { requireUser } from "@/lib/auth/requireUser";

interface PageProps {
  searchParams: Promise<{
    date?: string;
  }>;
}

function getTodayIndia(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
  }).format(new Date());
}

function isValidDate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export default async function DiaryRoute({
  searchParams,
}: PageProps) {
  const params = await searchParams;

  const today = getTodayIndia();

  const requestedDate =
    params.date || today;

  /*
   * Only accept a valid date.
   */
  const selectedDate =
    isValidDate(requestedDate) &&
    requestedDate <= today
      ? requestedDate
      : today;

  /*
   * Load diary data for the selected date.
   */
  const data =
    await getDiaryData(selectedDate);
await requireUser();
  return (
    <ProtectedAppShell>
      <DiaryPage
        date={selectedDate}
        data={data}
      />
    </ProtectedAppShell>
  );
}