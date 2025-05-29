"use client";
import { BrandLogoResponse, fetchBrandLogo } from "@/lib/api/fetchBrandLogo";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type ProductLogoProps = {
  brand: string;
};

export const ProductBrandLogo = ({ brand }: ProductLogoProps) => {
  const [brandLogo, setBrandLogo] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const logoCache = useRef<Map<string, string>>(new Map());

  useEffect(() => {
    const loadBrandLogo = async () => {
      setLoaded(false);
      if (!brand) return;

      if (logoCache.current.has(brand)) {
        setBrandLogo(logoCache.current.get(brand)!);
        return;
      }

      const response: BrandLogoResponse = await fetchBrandLogo(brand);
      if (response.logo) {
        logoCache.current.set(brand, response.logo);
        setBrandLogo(response.logo);
      } else if (response.error) {
        setBrandLogo(null);
      }
    };
    loadBrandLogo();
  }, [brand]);

  useEffect(() => {
    setLoaded(false);
  }, [brandLogo]);

  return (
    <div
      className={`mx-auto rounded-lg max-h-[70px] max-w-[150px] transition-opacity duration-300 ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
      style={{ width: 160, height: 60 }}
    >
      <Image
        src={brandLogo || "/placeholder-image.jpg"}
        alt="brand logo"
        width={160}
        height={60}
        className="object-contain w-full h-full"
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};
