"use server";

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export type FormValues = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  post_office?: string;
};

export async function updateUserProfile(data: FormValues) {
  const supabase = await createClient();
  const cookieStore = await cookies();
  const cachedUser = cookieStore.get("supabase-user")?.value;

  let user;
  if (cachedUser) {
    user = JSON.parse(cachedUser);
    console.log("Using cached user:", user.id);
  } else {
    console.log("Fetching user from Supabase");
    const {
      data: { user: fetchedUser },
    } = await supabase.auth.getUser();
    if (!fetchedUser) throw new Error("User not authenticated");
    user = fetchedUser;
    cookieStore.set("supabase-user", JSON.stringify(user), { maxAge: 3600 });
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone,
      city: data.city,
      address: data.address,
      post_office: data.post_office,
    })
    .eq("auth_id", user.id);

  if (error) throw new Error(error.message);
}

export async function getUserOrders(authId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .select("id, created_at, total, products, status")
    .eq("user_auth_id", authId);

  if (error) {
    console.error("Error fetching orders:", error.message);
    return [];
  }

  return data || [];
}
