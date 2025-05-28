import { getUserProfile } from "@/utils/supabase/actions";
import { ProfileSidebar } from "./components/ProfileSidebar";
import { createClient } from "@/utils/supabase/server";

export default async function CabinetLayout({ children }: { children: React.ReactNode }) {
  // Получаем данные профиля
  const supabase = await createClient();
  const profile = await getUserProfile(supabase);

  return (
    <section className="w-full p-12 mx-auto mt-4 bg-white rounded-lg">
      <div className="flex">
        {/* Sidebar */}
        <ProfileSidebar profileData={profile} />

        {/* Main Content */}
        <div className="w-full px-16 py-4">{children}</div>
      </div>
    </section>
  );
}
