"use server";
import { createClient } from "@/utils/supabase/server";
import ProfileForm from "./components/ProfileForm";
import { getUserProfile } from "@/utils/supabase/actions";

export default async function ProfilePage() {
  const supabase = await createClient();
  const profile = await getUserProfile(supabase);

  return <ProfileForm profileData={profile} />;
}
