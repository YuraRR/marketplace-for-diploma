"use server";

import { revalidatePath } from "next/cache";
import { Product } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";
import { getUserAuthId } from "@/utils/supabase";

export async function addProduct(formData: FormData) {
  try {
    const supabase = await createClient();
    const userAuthId = await getUserAuthId(supabase);

    // Get shop_name from sellers table
    const { data: shopData, error: shopError } = await supabase
      .from("sellers")
      .select("shop_name")
      .eq("user_id", userAuthId)
      .single();

    if (shopError || !shopData) {
      console.error("Error fetching shop_name:", shopError);
      throw new Error("Магазин не знайдено");
    }

    // Parse and validate form data
    const priceRaw = formData.get("price") as string;
    const price = priceRaw ? parseFloat(priceRaw) : 0;
    console.log("Parsed price:", price);
    if (isNaN(price)) {
      console.error("Invalid price value:", priceRaw);
      throw new Error("Ціна має бути дійсним числом");
    }

    const product: Omit<Product, "id"> = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price,
      category: formData.get("category") as string,
      image_url: formData.get("image_url") as string,
      specs: formData.get("specs") as string,
      availability: formData.get("availability") as string,
      colors: (formData.get("colors") as string) || null,
      variations: (formData.get("variations") as string) || null,
      brand: formData.get("brand") as string,
      seller: shopData.shop_name,
      created_at: new Date().toISOString(),
    };

    // Validate required fields
    if (!product.name || !product.category || !product.availability || !product.brand) {
      throw new Error("Обовʼязкові поля (name, category, availability, brand) не заповнені");
    }

    // Get max ID for new product
    const { data: maxIdData, error: maxIdError } = await supabase
      .from("products")
      .select("id")
      .order("id", { ascending: false })
      .limit(1);

    if (maxIdError) {
      console.error("Error fetching max ID:", maxIdError);
      throw new Error("Не вдалося отримати максимальний ID");
    }

    const newId = maxIdData && maxIdData.length > 0 ? maxIdData[0].id + 1 : 1;

    // Insert product
    const { data, error } = await supabase
      .from("products")
      .insert([{ id: newId, ...product }])
      .select()
      .single();

    if (error) {
      console.error("Error inserting product:", error);
      throw new Error("Не вдалося створити товар: " + error.message);
    }

    console.log("Product created:", data);
    revalidatePath("/cabinet/my-shop");
    return data;
  } catch (error) {
    console.error("Error in addProduct:", error);
    throw new Error("Не вдалося створити товар: " + (error instanceof Error ? error.message : "Невідома помилка"));
  }
}
