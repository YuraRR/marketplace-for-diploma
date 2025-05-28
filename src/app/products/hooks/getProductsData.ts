"use server";
import { fetchProducts } from "@/utils/supabase/actions/fetchProducts";
import { fetchUniques } from "@/utils/supabase/actions/fetchUniques";
import { FiltersType } from "@/types/filters.types";

export async function getProductsData({
  params,
  searchParams,
}: {
  params: { productsCategory?: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const resolvedSearchParams = await searchParams;
  const category = params.productsCategory ? decodeURIComponent(params.productsCategory) : "";

  const defaultFilters: FiltersType = {
    category: "",
    brands: [],
    sellers: [],
    colors: [],
    variations: [],
    priceRange: [0, 100000],
  };

  // Helper function to parse array-like query params
  const parseArrayParam = (param: string | string[] | undefined): string[] => {
    let result: string[] = [];
    if (Array.isArray(param)) {
      result = param.flatMap((item) => item.split(",").map((v) => v.trim())).filter(Boolean);
    } else if (typeof param === "string") {
      result = param
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean);
    }
    // Remove duplicates
    const uniqueResult = [...new Set(result)];
    console.log(`DEBUG: Parsed ${param ? "param" : "empty"} into ${JSON.stringify(uniqueResult)}`);
    return uniqueResult;
  };

  const filters: FiltersType = {
    ...defaultFilters,
    category,
    brands: parseArrayParam(resolvedSearchParams.brands),
    sellers: parseArrayParam(resolvedSearchParams.sellers),
    colors: parseArrayParam(resolvedSearchParams.colors),
    variations: parseArrayParam(resolvedSearchParams.variations),
    priceRange: [
      typeof resolvedSearchParams.priceMin === "string" && Number.isFinite(Number(resolvedSearchParams.priceMin))
        ? Number(resolvedSearchParams.priceMin)
        : defaultFilters.priceRange[0],
      typeof resolvedSearchParams.priceMax === "string" && Number.isFinite(Number(resolvedSearchParams.priceMax))
        ? Number(resolvedSearchParams.priceMax)
        : defaultFilters.priceRange[1],
    ],
  };

  const currentPage =
    typeof resolvedSearchParams.page === "string" && Number.isFinite(parseInt(resolvedSearchParams.page))
      ? Number(resolvedSearchParams.page)
      : 1;
  const productsPerPage =
    typeof resolvedSearchParams.perPage === "string" && Number.isFinite(parseInt(resolvedSearchParams.perPage))
      ? Number(resolvedSearchParams.perPage)
      : 24;
  const sortBy = (
    typeof resolvedSearchParams.sortBy === "string" &&
    ["price_asc", "price_desc", "popularity"].includes(resolvedSearchParams.sortBy)
      ? resolvedSearchParams.sortBy
      : "price_asc"
  ) as "price_asc" | "price_desc" | "popularity";

  console.log("DEBUG: Filters applied:", JSON.stringify(filters, null, 2));

  const { products: initialProducts, total: initialTotal } = await fetchProducts({
    filters,
    currentPage,
    productsPerPage,
    sortBy,
  });

  const initialUniques = await fetchUniques(category);

  return {
    filters,
    initialProducts,
    initialTotal,
    initialUniques,
    currentPage,
    productsPerPage,
    sortBy,
  };
}
