"use client";

import { Product } from "@/types/database.types";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/utils/formatPrice";
import nProgress from "nprogress";
import { ProductAvailability } from "@/components/common/ProductAvailability";

export const ProductGridItem = (product: Product) => {
  const router = useRouter();

  const handleProductClick = (id: number) => {
    nProgress.start();
    router.push(`/product/${[product.name]}/${id}`);
  };

  return (
    <div
      key={product.id}
      className="p-4 rounded-lg h-[400px] flex flex-col justify-between cursor-pointer bg-white shadow-md hover:scale-105 hover:shadow-lg duration-200"
      onClick={() => handleProductClick(product.id)}
    >
      <Image
        src={product.image_url}
        alt={product.name}
        width={"187"}
        height={"195"}
        className="object-contain w-full h-48 mb-2 rounded-lg"
      />

      <h3 className="font-bold">{product.name}</h3>
      <p className="max-w-full text-lg font-bold ">{formatPrice(product.price)}</p>
      <p className="overflow-hidden text-sm text-ellipsis">{product.specs}</p>
      <ProductAvailability availability={product.availability} />
    </div>
  );
};
