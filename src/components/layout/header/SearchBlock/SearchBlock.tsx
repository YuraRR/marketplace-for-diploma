"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSearchProducts } from "@/hooks/useSearchProducts";
import { SearchInput } from "./SearchInput";
import { SearchResults } from "./SearchResults";
import { useBackdrop } from "@/hooks/useBackdrop";

export const SearchBlock = () => {
  const router = useRouter();
  const { query, setQuery, results, isLoading, handleSearch } = useSearchProducts();
  const [isFocused, setIsFocused] = useState(false);
  const { open, close } = useBackdrop();
  const searchBlockRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products/""/?search=${encodeURIComponent(query)}`);
      setIsFocused(false);
      close();
    }
  };

  const handleFocus = () => {
    if (!isFocused) {
      setIsFocused(true);
      open();
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (searchBlockRef.current && !searchBlockRef.current.contains(e.relatedTarget as Node)) {
      setIsFocused(false);
      close();
    }
  };

  return (
    <div
      ref={searchBlockRef}
      tabIndex={0}
      className={`relative flex items-center rounded-lg search-container ${isFocused ? "z-50" : "z-10"}`}
      onClick={handleFocus}
      onBlur={handleBlur}
    >
      <SearchInput
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        isFocused={isFocused}
        setIsFocused={setIsFocused}
        handleFocus={handleFocus}
      />
      {isFocused && (
        <SearchResults
          results={results}
          onResultClick={() => {
            setIsFocused(false);
            close();
          }}
        />
      )}
    </div>
  );
};
