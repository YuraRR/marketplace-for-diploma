"use client";

import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/store/store";
import { CartItem } from "@/app/cart/components/CartItem";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/utils/formatPrice";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ClientCartPage() {
  const [isMounted, setIsMounted] = useState(false);

  const { items } = useAppSelector((state) => state.cart);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingEstimate = 200.0;
  const taxEstimate = subtotal * 0.13;
  const orderTotal = subtotal + shippingEstimate + taxEstimate;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return;
  }

  return (
    <div className="w-full ">
      <div className="flex flex-col w-full gap-8 mx-auto md:flex-row">
        <section className="flex flex-col flex-1 gap-4 p-4 bg-white rounded-lg shadow">
          {items.length === 0 ? (
            <p className="mt-8 text-xl text-center text-gray-500">Ваша корзина порожня</p>
          ) : (
            items.map((item) => <CartItem key={item.id} item={item} />)
          )}
        </section>
        <section className="w-full max-w-[401px] h-full p-8 shadow bg-white border-2 rounded-lg border-light-green">
          <div className="flex flex-col gap-4">
            <h2 className="mb-4 text-xl font-bold">Підсумок замовлення</h2>
            <div className="flex justify-between">
              <span>Підсумок:</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span>Доставка:</span>
              <span>{formatPrice(shippingEstimate)}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span>
                Податок <b className="text-sm text-light-gray">(13%)</b>:
              </span>
              <span>{formatPrice(taxEstimate)}</span>
            </div>
            <Separator />
            <div className="flex justify-between mt-4 font-bold">
              <span>ЗАГАЛЬНА ВАРТІСТЬ:</span>
              <span>{formatPrice(orderTotal)}</span>
            </div>
            <Button color="green">
              <Link href={"/checkout"}>ОФОРМИТИ ЗАМОВЛЕННЯ</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
