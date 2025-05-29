"use client";

import { DropdownButton } from "@/components/common/DropdownButton";
import { useBackdrop } from "@/hooks/useBackdrop";
import { fetchUniques } from "@/utils/supabase/actions/fetchUniques";
import { useEffect, useState, useRef } from "react";

export const CatalogButton = () => {
  const { open, close } = useBackdrop();
  const [uniques, setUniques] = useState({ category: [] as string[] });
  const [isFocused, setIsFocused] = useState(false);
  const catalogButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadUniques = async () => {
      const uniqueValues = await fetchUniques();
      setUniques(uniqueValues);
    };
    loadUniques();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (catalogButtonRef.current && !catalogButtonRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isFocused) {
      open();
    } else {
      close();
    }
  }, [isFocused, open, close]);

  const handleButtonClick = () => {
    setIsFocused((prev) => !prev);
  };

  const catalogButtonData = {
    name: "Каталог",
    subMenu: uniques.category.map((category) => ({
      href: `/products/${encodeURIComponent(category)}`,
      name: category,
    })),
  };

  return (
    <div
      ref={catalogButtonRef}
      tabIndex={0}
      className={`${isFocused ? "z-50" : "z-10"}`}
      onClick={handleButtonClick}
    >
      <DropdownButton item={catalogButtonData} isFocused={isFocused} className="border-2 border-white" />
    </div>
  );
};
