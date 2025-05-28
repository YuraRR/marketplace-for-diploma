"use server";

import { redirect } from "next/navigation";
import { SellerInsert } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";
import { getUserAuthId } from "@/utils/supabase";

export async function createShop(formData: FormData) {
  const supabase = await createClient();
  const userAuthId = await getUserAuthId(supabase);

  const values: SellerInsert = {
    user_id: userAuthId,
    shop_name: formData.get("shop_name") as string,
    description: (formData.get("description") as string) || null,
    address: (formData.get("address") as string) || null,
  };

  console.log("Values to insert into sellers:", JSON.stringify(values, null, 2));

  const { data, error } = await supabase.from("sellers").insert([values]).select();

  if (error) {
    console.error("Error inserting shop into Supabase:", JSON.stringify(error, null, 2));
    throw new Error("Не вдалося створити магазин: " + error.message);
  }

  console.log("Shop created in Supabase:", data);

  redirect("/cabinet/my-shop");
}
