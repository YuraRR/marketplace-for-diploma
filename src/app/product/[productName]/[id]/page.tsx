import { Product } from "@/types/database.types";
import { ProductPage } from "../components/ProductPage";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

async function getProduct(id: number): Promise<Product | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("products").select("*").eq("id", id).single();

  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }

  return data;
}

type PageProps = {
  params: Promise<{ productName: string; id: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params; // Resolve the promise
  if (!resolvedParams?.id || !resolvedParams?.productName) {
    return {
      title: "Polytech",
    };
  }

  const productId = parseInt(resolvedParams.id, 10);
  if (isNaN(productId)) {
    return {
      title: "Invalid Product | Polytech",
    };
  }

  const product = await getProduct(productId);

  return {
    title: product ? `${product.name} | Polytech` : "Product Not Found | Polytech",
  };
}

export default async function ProductPageWrapper({ params }: PageProps) {
  const resolvedParams = await params; // Resolve the promise
  if (!resolvedParams?.id) {
    notFound();
  }

  const productId = parseInt(resolvedParams.id, 10);
  if (isNaN(productId)) {
    notFound();
  }

  const product = await getProduct(productId);

  if (!product) {
    notFound();
  }

  return <ProductPage product={product} />;
}
