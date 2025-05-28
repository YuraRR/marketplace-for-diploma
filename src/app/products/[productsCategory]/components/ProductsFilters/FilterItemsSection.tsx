import { FilterKey } from "@/types/filters.types";
import { FilterItem } from "./FilterItem";

import { useState } from "react";

type Filters = { [key in FilterKey]: string[] }; // Define the type for filters

interface FilterItemsSectionProps {
  filters: Filters;
  handleFilterChange: (key: FilterKey, value: string) => void;
  title: string;
  items: string[];
  filterKey: FilterKey;
  className?: string; // Optional className prop
}

export const FilterItemsSection = ({
  filters,
  handleFilterChange,
  title,
  items,
  filterKey,
  className,
}: FilterItemsSectionProps) => {
  const [showAllBrands, setShowAllBrands] = useState(false); // Initialize showAllBrands state

  const displayedItems = showAllBrands || filterKey !== "brands" ? items : items.slice(0, 10);

  return (
    <div className="mb-4">
      <h3 className="mb-2 font-semibold text-gray-800">{title}</h3>
      <div className={`flex flex-wrap gap-1 ${className}`}>
        {displayedItems.map((item) => (
          <FilterItem
            key={item}
            id={`${filterKey}-${item}`}
            label={item}
            checked={filters[filterKey].includes(item)}
            onChange={() => handleFilterChange(filterKey, item)}
          />
        ))}
      </div>

      {filterKey === "brands" && items.length > 10 && !showAllBrands && (
        <button onClick={() => setShowAllBrands(true)} className="mt-2 text-sm text-light-green hover:underline">
          Показати всі ({items.length})
        </button>
      )}
    </div>
  );
};
