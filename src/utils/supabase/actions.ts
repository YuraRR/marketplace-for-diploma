import { OrderInsert, Product, Profile } from "@/types/database.types";
import { getUserAuthId } from "@/utils/supabase";
import { createClient } from "@/utils/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";

export const getUserProfile = async (supabase: SupabaseClient) => {
  const authId = await getUserAuthId(supabase);

  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("first_name, last_name, email, phone, city, address, post_office")
      .eq("auth_id", authId)
      .single();

    if (error) {
      console.error("Помилка отримання профілю:", error.message);
      throw new Error("Не вдалося завантажити дані профілю");
    }

    if (!data) {
      throw new Error("Профіль не знайдено");
    }

    return data as Profile;
  } catch (error) {
    console.error("Помилка в getUserProfile:", error);
    throw error;
  }
};

export const createOrder = async (orderData: OrderInsert) => {
  const supabase = createClient();
  const { data, error } = await supabase.from("orders").insert([{ ...orderData }]);

  if (error) {
    console.error("Error inserting order into Supabase:", error.message);
    throw new Error("Не вдалося зберегти замовлення в базі даних");
  }

  console.log("Order created in Supabase:", data);
  return data;
};

export const createProduct = async (supabase: SupabaseClient, product: Product) => {
  const { data: maxIdData, error: maxIdError } = await supabase
    .from("products")
    .select("id")
    .order("id", { ascending: false })
    .limit(1);

  if (maxIdError) {
    console.error("Error fetching max id from Supabase:", JSON.stringify(maxIdError, null, 2));
    throw new Error("Не вдалося отримати максимальний id з бази даних");
  }

  const newId = maxIdData && maxIdData.length > 0 ? maxIdData[0].id + 1 : 1;

  const { ...productDataWithoutId } = product;
  const productWithNewId = { ...productDataWithoutId, id: newId };

  console.log("Inserting product into Supabase:", JSON.stringify(productWithNewId, null, 2));
  const { data, error } = await supabase.from("products").insert([productWithNewId]);

  if (error) {
    console.error("Error inserting product into Supabase:", JSON.stringify(error, null, 2));
    throw new Error("Не вдалося зберегти товар в базі даних");
  }

  console.log("Product created in Supabase:", data);
  return data;
};
