"use server";
import { getUserOrders } from "../actions";

import { Order } from "@/types/database.types";
import { OrderCard } from "@/app/cabinet/my-orders/components/OrderCard";
import { getUserAuthId } from "@/utils/supabase";
import { createClient } from "@/utils/supabase/server";

export default async function OrdersPage() {
  const supabase = await createClient();
  const authId = await getUserAuthId(supabase);
  const rawOrders = await getUserOrders(authId);
  const orders: Order[] = rawOrders.map((order: Partial<Order>) => ({
    id: order.id ?? "",
    user_id: order.user_id ?? "",
    first_name: order.first_name ?? "",
    last_name: order.last_name ?? "",
    total: order.total ?? 0,
    status: order.status ?? "",
    products: order.products ?? [],
    created_at: order.created_at ?? "",
  }));

  console.log("Orders: ", orders);
  if (!orders || orders.length === 0) {
    return <div className="text-center text-gray-500">Замовлення не знайдено.</div>;
  }

  return (
    <div className="flex flex-col w-full gap-4 p-6">
      <h1 className="mb-4 text-2xl font-bold">Мої замовлення</h1>
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}
