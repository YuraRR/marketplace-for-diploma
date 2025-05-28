import { createClient } from "@/utils/supabase/client";

interface UniqueValues {
  category: string[];
  brands: { name: string; count: number }[];
  sellers: string[];
  colors: string[];
  variations: string[];
}

export async function fetchUniques(category?: string): Promise<UniqueValues> {
  try {
    const supabase = createClient();

    const baseQuery = supabase.from("products").select("category, brand, seller, colors, variations");
    const query = category ? baseQuery.eq("category", category) : baseQuery;

    const { data, error } = await query;

    if (error) {
      console.error("Помилка при завантаженні даних для унікальних значень:", error);
      return {
        category: [],
        brands: [],
        sellers: [],
        colors: [],
        variations: [],
      };
    }

    const categories = Array.from(new Set(data?.map((item) => item.category).filter(Boolean)));
    const brands = Object.entries(
      data?.reduce((acc, item) => {
        const brand = item.brand;
        if (brand) {
          acc[brand] = (acc[brand] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>) || {}
    ).map(([name, count]) => ({ name, count }));
    const sellers = Array.from(new Set(data?.map((item) => item.seller).filter(Boolean)));
    const colors = Array.from(new Set(data?.flatMap((item) => item.colors || []).filter(Boolean)));
    const variations = Array.from(new Set(data?.flatMap((item) => item.variations || []).filter(Boolean)));

    console.log("DEBUG: fetchUniques result:", {
      categories: categories.length,
      brands: brands.length,
      sellers: sellers.length,
      colors: colors.length,
      variations: variations.length,
    });

    return {
      category: categories,
      brands,
      sellers,
      colors,
      variations,
    };
  } catch (error) {
    console.error("Помилка при завантаженні унікальних значень:", error);
    return {
      category: [],
      brands: [],
      sellers: [],
      colors: [],
      variations: [],
    };
  }
}
