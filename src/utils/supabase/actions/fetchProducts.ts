import { Product } from "@/types/database.types";
import { FiltersType } from "@/types/filters.types";
import { createClient } from "@/utils/supabase/client";

interface FetchProductsParams {
  filters: FiltersType;
  currentPage: number;
  productsPerPage: number;
  sortBy: "price_asc" | "price_desc" | "popularity";
}

interface FetchProductsResponse {
  products: Product[];
  total: number;
}

export async function fetchProducts({
  filters,
  currentPage,
  productsPerPage,
  sortBy,
}: FetchProductsParams): Promise<FetchProductsResponse> {
  try {
    const supabase = await createClient();
    let query = supabase.from("products").select("*", { count: "exact" });

    if (filters.category) {
      const searchPattern = `%${filters.category}%`;
      query = query.or(`name.ilike.${searchPattern},category.ilike.${searchPattern}`);
    }

    if (filters.brands.length > 0) {
      query = query.in("brand", filters.brands);
    }

    if (filters.sellers.length > 0) {
      query = query.in("seller", filters.sellers);
    }

    if (filters.colors.length > 0) {
      // Use jsonb @> operator for filtering colors
      query = query.or(filters.colors.map((color) => `colors@>'["${color}"]'`).join(","));
    }

    if (filters.variations.length > 0) {
      // Use jsonb @> operator for filtering variations
      query = query.or(filters.variations.map((variation) => `variations@>'["${variation}"]'`).join(","));
    }

    query = query.gte("price", filters.priceRange[0]).lte("price", filters.priceRange[1]);

    if (sortBy === "price_asc") {
      query = query.order("price", { ascending: true });
    } else if (sortBy === "price_desc") {
      query = query.order("price", { ascending: false });
    } else if (sortBy === "popularity") {
      query = query.order("popularity", { ascending: false });
    }

    const from = (currentPage - 1) * productsPerPage;
    const to = from + productsPerPage - 1;
    query = query.range(from, to);

    console.log("DEBUG: fetchProducts query:", {
      filters,
      currentPage,
      productsPerPage,
      sortBy,
    });

    const { data, error, count } = await query;

    if (error) {
      console.error("Помилка при завантаженні продуктів:", error);
      return { products: [], total: 0 };
    }

    return {
      products: data as Product[],
      total: count || 0,
    };
  } catch (error) {
    console.error("Помилка при виконанні запиту:", error);
    return { products: [], total: 0 };
  }
}
