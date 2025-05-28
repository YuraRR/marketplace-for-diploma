"use server";
import OrderFormClient from "@/app/checkout/components/OrderForm";
import { getUserAuthId } from "@/utils/supabase";
import { getUserProfile } from "@/utils/supabase/actions";
import { createClient } from "@/utils/supabase/server";

export default async function OrderPage() {
  const supabase = await createClient();
  const profile = await getUserProfile(supabase);
  const userAuthId = await getUserAuthId(supabase);

  console.log("ID: ", userAuthId);
  return (
    <section className="w-full">
      <OrderFormClient userAuthId={userAuthId} profile={profile} />
    </section>
  );
}
