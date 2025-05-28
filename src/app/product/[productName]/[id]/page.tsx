import { Product } from "@/types/database.types";
import { ProductPage } from "../components/ProductPage";
import { createClient } from "@/utils/supabase/server";

async function getProduct(id: number): Promise<Product | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("products").select("*").eq("id", id).single();

  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }

  return data;
}

export default async function ProductPageWrapper({ params }: { params: { id: number } }) {
  const product = await getProduct(params.id);

  if (!product) {
    return <div className="p-4 text-center">Товар не знайдено</div>;
  }

  return <ProductPage product={product} />;
}
