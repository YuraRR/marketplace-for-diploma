"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProductsSortingProps {
  initialSortBy: "price_asc" | "price_desc" | "popularity";
  initialProductsPerPage: number;
  currentPage: number;
  totalProducts: number;
}

export const ProductsSorting = ({
  initialSortBy,
  initialProductsPerPage,
  currentPage,
  totalProducts,
}: ProductsSortingProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedPerPage, setSelectedPerPage] = useState(initialProductsPerPage);
  const [sortBy, setSortBy] = useState<"price_asc" | "price_desc" | "popularity">(initialSortBy);
  const [productsPerPage, setProductsPerPage] = useState(initialProductsPerPage);

  useEffect(() => {
    setSortBy(initialSortBy);
    setProductsPerPage(initialProductsPerPage);
    setSelectedPerPage(initialProductsPerPage);
  }, [initialSortBy, initialProductsPerPage]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortBy = e.target.value as "price_asc" | "price_desc" | "popularity";
    setSortBy(newSortBy);

    const params = new URLSearchParams(searchParams.toString());
    if (newSortBy !== "price_asc") {
      params.set("sortBy", newSortBy);
    } else {
      params.delete("sortBy");
    }
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePerPageChange = (value: number) => {
    setProductsPerPage(value);
    setSelectedPerPage(value);

    const params = new URLSearchParams(searchParams.toString());
    if (value !== 24) {
      params.set("perPage", value.toString());
    } else {
      params.delete("perPage");
    }
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startIndex = (currentPage - 1) * productsPerPage + 1;
  const endIndex = Math.min(currentPage * productsPerPage, totalProducts);
  const rangeText = totalProducts > 0 ? `${startIndex} - ${endIndex} з ${totalProducts} товарів` : "0 товарів";

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-700">{rangeText}</span>
        <div className="flex items-center gap-2">
          <label htmlFor="perPage" className="text-sm text-gray-700">
            Показати:
          </label>
          <div className="flex items-center *:p-2 *:bg-light-gray-bg *:hover:bg-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => handlePerPageChange(24)}
              className={cn({ "bg-gray-300 font-bold": selectedPerPage === 24 })}
            >
              24
            </button>
            <button
              onClick={() => handlePerPageChange(48)}
              className={cn({ "bg-gray-300 font-bold": selectedPerPage === 48 })}
            >
              48
            </button>
            <button
              onClick={() => handlePerPageChange(72)}
              className={cn({ "bg-gray-300 font-bold": selectedPerPage === 72 })}
            >
              72
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="sortBy" className="text-sm text-gray-700">
          Сортувати:
        </label>
        <Select
          onValueChange={(value) =>
            handleSortChange({ target: { value } } as React.ChangeEvent<HTMLSelectElement>)
          }
          defaultValue={sortBy}
        >
          <SelectTrigger className="bg-light-gray-bg">
            <SelectValue placeholder="від дешевих до дорогих" />
          </SelectTrigger>
          <SelectContent className="*:cursor-pointer *:bg-white">
            <SelectItem className="hover:bg-light-gray-bg" value="price_asc">
              від дешевих до дорогих
            </SelectItem>
            <SelectItem className="hover:bg-light-gray-bg" value="price_desc">
              від дорогих до дешевих
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
