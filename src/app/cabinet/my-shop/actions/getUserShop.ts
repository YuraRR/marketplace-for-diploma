"use server";
import { getUserAuthId } from "@/utils/supabase";
import { createClient } from "@/utils/supabase/server";

export async function getUserShop() {
  const supabase = await createClient();
  const userAuthId = await getUserAuthId(supabase);
  if (!userAuthId) return { shop: null, products: [] };
  console.log("User Auth ID:", userAuthId);
  const { data: shopData, error: shopError } = await supabase
    .from("sellers")
    .select("*")
    .eq("user_id", userAuthId)
    .single();

  if (shopError) {
    console.log("Error fetching shop:", shopError);
    return { shop: null, products: [] };
  }

  if (!shopData) {
    return { shop: null, products: [] };
  }

  const { data: productsData, error: productsError } = await supabase
    .from("products")
    .select("*")
    .eq("seller", shopData.shop_name);

  if (productsError) {
    console.error("Error fetching products:", productsError);
    return { shop: shopData, products: [] };
  }

  return { shop: shopData, products: productsData };
}
