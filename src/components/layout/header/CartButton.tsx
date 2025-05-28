"use client";

import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useAppSelector } from "@/store/store";
import { useEffect, useState } from "react";
import { formatPrice } from "@/utils/formatPrice";

export const CartButton = () => {
  const { items } = useAppSelector((state) => state.cart);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const uniqueItemsCount = items.length;

  const totalPrice = formatPrice(items.reduce((sum, item) => sum + item.price * item.quantity, 0));

  if (!isMounted) {
    return null;
  }
  return (
    <Link
      href={"/cart"}
      className="flex items-center justify-end gap-4 transition-all duration-300 rounded-lg hover:bg-gray-700"
    >
      <button className="relative flex items-center justify-center p-3 transition-all duration-300 cursor-pointer w-11 h-11 hover:translate-y-0.5 active:translate-y-1">
        <FontAwesomeIcon icon={faShoppingCart} className="text-2xl text-white" />
        {uniqueItemsCount > 0 && (
          <span className="absolute flex items-center justify-center w-4 h-4 text-sm text-white rounded-full bottom-1 right-1 bg-light-green">
            {uniqueItemsCount}
          </span>
        )}
      </button>
      <div className="flex flex-col cursor-pointer">
        <span className="text-xs text-white">Кошик</span>
        <span className="w-24 font-bold text-white">{totalPrice}</span>
      </div>
    </Link>
  );
};
