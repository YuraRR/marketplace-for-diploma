"use client";
import { clearCart } from "@/store/slices/cartSlice";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/store";

export default function SuccessPageClient() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <section className="w-full p-12 mt-4 text-center bg-white rounded-lg">
      <h1 className="text-2xl font-bold text-green-600">Замовлення успішно оформлено!</h1>
      <p className="mt-4 text-gray-600">
        Дякуємо за покупку. Ви отримаєте підтвердження на вашу електронну пошту.
      </p>
      <div className="mt-6">
        <Link href="/">
          <Button className="text-white bg-green-600 hover:bg-green-700">Повернутися на головну</Button>
        </Link>
      </div>
    </section>
  );
}
