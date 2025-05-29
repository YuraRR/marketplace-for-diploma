"use client";

import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/store";
import { formatPrice } from "@/utils/formatPrice";

import Image from "next/image";

import { useEffect, useState } from "react";

export const OrderBlock = () => {
  const [mounted, setMounted] = useState(false);
  const { items } = useAppSelector((state) => state.cart);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingEstimate = 9.5;
  const taxEstimate = subtotal * 0.13;
  const orderTotal = subtotal + shippingEstimate + taxEstimate;

  return (
    <div className="w-full  shadow max-w-[500px] ">
      <div className="space-y-2 bg-[#EDEFF5] p-6">
        <h2 className="text-sm text-light-gray">Товар</h2>
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-2 p-3 text-sm bg-white rounded-lg">
            <Image
              src={item.image_url}
              alt={item.name}
              width={50}
              height={50}
              className="object-contain max-h-[60px]"
            />
            <div className="flex flex-col">
              <span>{item.name}</span>
              <span className="text-light-gray">x {item.quantity}</span>
            </div>
            <span className="ml-auto">{formatPrice(item.price)}</span>
          </div>
        ))}

        <div className="flex justify-between my-5 font-bold">
          <span>До сплати:</span>
          <span>{formatPrice(orderTotal)}</span>
        </div>
        <Button color="green" type="submit" className="w-full">
          Замовлення підтверджую
        </Button>
      </div>
    </div>
  );
};
