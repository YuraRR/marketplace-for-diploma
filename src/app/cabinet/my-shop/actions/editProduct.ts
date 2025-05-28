"use server";

import { getUserAuthId } from "@/utils/supabase";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function editProduct(formData: FormData) {
  const supabase = await createClient();
  const userAuthId = await getUserAuthId(supabase);

  const { data: shopData, error: shopError } = await supabase
    .from("sellers")
    .select("shop_name")
    .eq("user_id", userAuthId)
    .single();

  if (shopError || !shopData) {
    throw new Error("Магазин не знайдено.");
  }
  const productId = parseInt(formData.get("id") as string);
  const updatedProduct = {
    name: formData.get("name") as string,
    description: (formData.get("description") as string) || null,
    price: parseFloat(formData.get("price") as string),
    category: formData.get("category") as string,
    image_url: (formData.get("image_url") as string) || null,
    specs: (formData.get("specs") as string) || null,
    availability: formData.get("availability") as string,
    colors: (formData.get("colors") as string) || null,
    variations: (formData.get("variations") as string) || null,
    brand: formData.get("brand") as string,
    seller: shopData.shop_name,
  };
  console.log("Updating product:", JSON.stringify(updatedProduct, null, 2));

  const { error } = await supabase
    .from("products")
    .update(updatedProduct)
    .eq("id", productId)
    .eq("seller", shopData.shop_name);

  if (error) {
    console.error("Error updating product:", JSON.stringify(error, null, 2));
    throw new Error("Не вдалося оновити товар: " + error.message);
  }

  revalidatePath("/cabinet/my-shop");
}
