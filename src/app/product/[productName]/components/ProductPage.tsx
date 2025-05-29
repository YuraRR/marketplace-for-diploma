"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/database.types";
import { formatPrice } from "@/utils/formatPrice";
import { ProductAvailability } from "@/components/common/ProductAvailability";
import { QuantitySelector } from "@/components/common/QuantitySelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import nProgress from "nprogress";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { addToCart, updateQuantity } from "@/store/slices/cartSlice";
import { ProductBrandLogo } from "@/app/product/[productName]/components/ProductBrandLogo";
import { MiniCart } from "@/app/product/[productName]/components/MiniCart";
import Link from "next/link";

export const ProductPage = ({ product }: { product: Product }) => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cart);
  const [quantity, setQuantity] = useState(1);
  const [inCart, setInCart] = useState(false);
  const price = product.price || 0;

  const cartItem = items.find((item) => item.id === product.id);

  useEffect(() => {
    nProgress.done();
  }, []);

  useEffect(() => {
    if (cartItem) {
      setInCart(true);
      setQuantity(cartItem.quantity);
    } else {
      setInCart(false);
      setQuantity(1);
    }
  }, [cartItem]);

  const handleAddToCart = () => {
    if (cartItem) {
      dispatch(updateQuantity({ id: product.id, quantity }));
    } else {
      dispatch(
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: quantity,
          image_url: product.image_url || "/placeholder-image.jpg",
          availability: product.availability,
        })
      );
    }
    setInCart(true);
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
    if (cartItem) {
      dispatch(updateQuantity({ id: product.id, quantity: newQuantity }));
    }
  };

  return (
    <section className="flex flex-col gap-10 w-full min-h-[600px] mx-auto bg-white rounded-lg shadow-lg md:flex-row p-[30px]">
      <picture className="max-w-[450px] max-h-[450px] p-6">
        <Image
          src={product.image_url || "/placeholder-image.jpg"}
          alt={product.name}
          width={350}
          height={350}
          className="object-contain max-w-[350px] max-h-[350px]"
        />
      </picture>

      <div className="flex flex-col w-full gap-3">
        <h1 className="mt-2 text-2xl font-bold">{product.name}</h1>
        <p className="text-2xl font-semibold">{formatPrice(price)}</p>

        <ul className="mt-4 space-y-2">
          <li>
            <b>Опис:</b>
            <span className="ml-1 text-light-gray">{product.description}</span>
          </li>
          <li>
            <b>Характеристики:</b>
            <span className="ml-1 text-light-gray">{product.specs}</span>
          </li>
        </ul>

        <ProductAvailability availability={product.availability} />
        <div className="flex items-center gap-4 mt-4">
          <QuantitySelector quantity={quantity} onQuantityChange={handleQuantityChange} min={1} max={100} />
          <Button color="green" onClick={handleAddToCart} size={"xl"}>
            <FontAwesomeIcon icon={faCartShopping} className="mr-1 size-4" />
            <span>Додати у кошик</span>
          </Button>
        </div>

        <Separator />
        <div className="flex flex-col gap-4 mt-4">
          <span className="text-xs text-light-gray">Гарантовано безпечне оформлення замовлення</span>
          <Image src={"/images/paymants.png"} alt="paymants" width={300} height={28} />
        </div>
      </div>

      <div className="flex flex-col gap-4 max-w-[300px] w-full">
        <section className="flex flex-col gap-3 p-5 rounded-lg bg-light-gray-bg">
          <ul className="space-y-2">
            <li>
              <Link href={`/products/${product.category}`}>
                Категорія: <span className="text-blue-900 hover:underline">{product.category}</span>
              </Link>
            </li>
            <li>
              <Link href={`/products?sellers=${product.seller}`}>
                Продавець: <span className="text-blue-900 hover:underline">{product.seller}</span>
              </Link>
            </li>
            <li>
              <Link href={`/products?brands=${product.brand}`}>
                Бренд: <span className="text-blue-900 hover:underline">{product.brand}</span>
              </Link>
            </li>
          </ul>
          <ProductBrandLogo brand={product.brand} />
        </section>

        {inCart && cartItem && <MiniCart cartItem={cartItem} setQuantity={setQuantity} setInCart={setInCart} />}
      </div>
    </section>
  );
};
