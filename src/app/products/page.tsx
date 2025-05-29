"use server";
import { ProductsFilters } from "@/app/products/[productsCategory]/components/ProductsFilters/ProductsFilters";
import { ProductsGrid } from "@/app/products/[productsCategory]/components/ProductsGrid";
import { ProductsPagination } from "@/app/products/[productsCategory]/components/ProductsPagination";
import { ProductsSorting } from "@/app/products/[productsCategory]/components/ProductsSorting";
import { getProductsData } from "@/app/products/hooks/getProductsData";
import { Metadata } from "next";

interface ProductsPageProps {
  params: Promise<{ productsCategory: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: ProductsPageProps): Promise<Metadata> {
  const resolvedSearchParams = await params;
  console.log("Resolved Search Params:", resolvedSearchParams);
  const category = resolvedSearchParams.productsCategory
    ? decodeURI(resolvedSearchParams.productsCategory)
    : "Товари";
  return {
    title: `${category.charAt(0).toUpperCase() + category.slice(1)} | Polytech`,
  };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedSearchParams = await searchParams;

  const data = await getProductsData({
    params: {},
    searchParams: resolvedSearchParams,
  });

  const totalPages = Math.ceil(data.initialTotal / data.productsPerPage);

  return (
    <section className="flex flex-col gap-4 p-6 mx-auto bg-white rounded-lg md:flex-row">
      <ProductsFilters
        filters={data.filters}
        uniqueBrands={data.initialUniques.brands.map((b) => b.name)}
        uniqueSellers={data.initialUniques.sellers}
        uniqueColors={data.initialUniques.colors}
        uniqueVariations={data.initialUniques.variations}
        initialCurrentPage={data.currentPage}
        initialProductsPerPage={data.productsPerPage}
        initialSortBy={data.sortBy}
      />
      <div className="flex flex-col w-full gap-4">
        <ProductsSorting
          initialSortBy={data.sortBy}
          initialProductsPerPage={data.productsPerPage}
          currentPage={data.currentPage}
          totalProducts={data.initialTotal}
        />
        <ProductsGrid initialProducts={data.initialProducts} />
        <ProductsPagination
          currentPage={data.currentPage}
          totalPages={totalPages}
          productsPerPage={data.productsPerPage}
          sortBy={data.sortBy}
        />
      </div>
    </section>
  );
}
