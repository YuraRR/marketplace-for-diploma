"use client";

import { fetchUniques } from "@/utils/supabase/actions/fetchUniques";
import Link from "next/link";
import { useEffect, useState } from "react";

export const CategoriesList = () => {
  const [uniques, setUniques] = useState({ category: [] as string[] });

  useEffect(() => {
    const loadUniques = async () => {
      const uniqueValues = await fetchUniques();
      setUniques(uniqueValues);
    };
    loadUniques();
  }, []);
  return (
    <div className="col-span-1 py-4 overflow-y-hidden bg-white rounded-lg shadow-md">
      <ul className="mt-1 text-gray-800 ">
        {uniques.category.slice(0, 11).map((category) => (
          <li key={category}>
            <Link href={`/products/${category}`} className="px-13 block py-1.5 rounded-md hover:bg-gray-100">
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
