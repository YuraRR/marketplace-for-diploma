"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { debounce } from "lodash";
import { FiltersType, FilterKey } from "@/types/filters.types";
import PriceSlider from "./PriceSlider";
import { FilterItemsSection } from "./FilterItemsSection";

interface ProductsFiltersProps {
  filters: FiltersType;
  uniqueBrands: string[];
  uniqueSellers: string[];
  uniqueColors: string[];
  uniqueVariations: string[];
  initialCurrentPage: number;
  initialProductsPerPage: number;
  initialSortBy: "price_asc" | "price_desc" | "popularity";
}

export const ProductsFilters = ({
  filters: initialFilters,
  uniqueBrands,
  uniqueSellers,
  uniqueColors,
  uniqueVariations,
  initialCurrentPage,
  initialProductsPerPage,
  initialSortBy,
}: ProductsFiltersProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const currentCategory = pathname.split("/products/")[1] || "";

  const defaultFilters: FiltersType = {
    category: "",
    brands: [],
    sellers: [],
    colors: [],
    variations: [],
    priceRange: [0, 100000],
  };

  const [filters, setFilters] = useState<FiltersType>(initialFilters);
  const [tempFilters, setTempFilters] = useState<FiltersType>(initialFilters);

  const debouncedUpdateURL = useCallback(
    debounce((filters: FiltersType, currentPage: number, productsPerPage: number, sortBy: string) => {
      const params = new URLSearchParams();
      filters.brands.forEach((brand) => params.append("brands", brand));
      filters.sellers.forEach((seller) => params.append("sellers", seller));
      filters.colors.forEach((color) => params.append("colors", color));
      filters.variations.forEach((variation) => params.append("variations", variation));
      if (filters.priceRange[0] !== defaultFilters.priceRange[0])
        params.set("priceMin", filters.priceRange[0].toString());
      if (filters.priceRange[1] !== defaultFilters.priceRange[1])
        params.set("priceMax", filters.priceRange[1].toString());
      if (currentPage !== 1) params.set("page", currentPage.toString());
      if (productsPerPage !== 24) params.set("perPage", productsPerPage.toString());
      if (sortBy !== "price_asc") params.set("sortBy", sortBy);

      router.push(`/products/${currentCategory}${params.toString() ? `?${params.toString()}` : ""}`, {
        scroll: false,
      });
    }, 100),
    [router, currentCategory]
  );

  useEffect(() => {
    debouncedUpdateURL(filters, initialCurrentPage, initialProductsPerPage, initialSortBy);
  }, [filters, initialCurrentPage, initialProductsPerPage, initialSortBy, debouncedUpdateURL]);

  const handleFilterChange = (key: FilterKey, value: string) => {
    setTempFilters((prev) => {
      const currentValue = prev[key];
      if (Array.isArray(currentValue)) {
        // Toggle value, ensuring no duplicates
        const updatedValue = currentValue.includes(value)
          ? currentValue.filter((item) => item !== value)
          : [...new Set([...currentValue, value])]; // Use Set to prevent duplicates
        return {
          ...prev,
          [key]: updatedValue,
        };
      }
      return prev;
    });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = Number(e.target.value);
    setTempFilters((prev) => {
      const newRange = [...prev.priceRange] as [number, number];
      newRange[index] = value;
      if (index === 0 && value > newRange[1]) newRange[1] = value;
      if (index === 1 && value < newRange[0]) newRange[0] = value;
      return { ...prev, priceRange: newRange };
    });
  };

  const handleApplyFilters = () => {
    setFilters(tempFilters);
  };

  const handleResetFilters = () => {
    const resetFilters: FiltersType = {
      ...defaultFilters,
      category: filters.category || currentCategory,
    };
    setFilters(resetFilters);
    setTempFilters(resetFilters);
  };

  return (
    <section className="p-[30px] bg-light-gray-bg rounded-lg w-[300px]">
      <h2 className="mb-4 text-xl font-bold text-gray-800">Фільтри</h2>

      <PriceSlider priceRange={tempFilters.priceRange} handlePriceChange={handlePriceChange} />

      {uniqueBrands.length > 0 && (
        <FilterItemsSection
          filters={tempFilters}
          handleFilterChange={handleFilterChange}
          title="Виробник"
          items={uniqueBrands}
          filterKey="brands"
        />
      )}

      {uniqueSellers.length > 0 && (
        <FilterItemsSection
          filters={tempFilters}
          handleFilterChange={handleFilterChange}
          title="Продавець"
          items={uniqueSellers}
          filterKey="sellers"
        />
      )}

      {uniqueColors.length > 0 && (
        <FilterItemsSection
          filters={tempFilters}
          handleFilterChange={handleFilterChange}
          title="Колір"
          items={uniqueColors}
          filterKey="colors"
        />
      )}

      {uniqueVariations.length > 0 && (
        <FilterItemsSection
          filters={tempFilters}
          handleFilterChange={handleFilterChange}
          title="Пам’ять"
          items={uniqueVariations}
          filterKey="variations"
        />
      )}

      <div className="flex gap-2 mt-4">
        <button
          onClick={handleApplyFilters}
          className="w-full px-4 py-2 text-white rounded-lg bg-light-green hover:bg-green-600"
        >
          Застосувати
        </button>
        <button
          onClick={handleResetFilters}
          className="w-full px-4 py-2 text-gray-800 border rounded-lg hover:bg-gray-200"
        >
          Скинути
        </button>
      </div>
    </section>
  );
};
