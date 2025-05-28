import { useState, useCallback, useEffect } from "react";
import debounce from "lodash/debounce";
import nProgress from "nprogress";
import { createClient } from "@/utils/supabase/client";

export const useSearchProducts = (initialQuery = "") => {
  const supabase = createClient();

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<{ id: number; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = useCallback(
    debounce(async (value: string) => {
      if (!value.trim()) {
        setResults([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const searchPattern = `%${value}%`;
        const { data, error } = await supabase
          .from("products")
          .select("id, name")
          .or(`name.ilike.${searchPattern},category.ilike.${searchPattern}`)
          .limit(5);

        if (error || !data) {
          setResults([]);
        } else {
          setResults(data.map((item) => ({ id: item.id, name: item.name })));
        }
      } catch {
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    [supabase]
  );

  useEffect(() => {
    if (isLoading) {
      nProgress.start();
    } else {
      nProgress.done();
    }
  }, [isLoading]);

  return { query, setQuery, results, isLoading, handleSearch };
};
