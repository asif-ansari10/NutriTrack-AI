import { createClient } from "@/lib/supabase/server";
import { MobileNavigation } from "./NavigationLinks";

export default async function MobileNav() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <MobileNavigation
      isLoggedIn={!!user}
    />
  );
}