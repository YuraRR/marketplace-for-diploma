import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import { Order } from "@/types/database.types";

export const OrderCard = ({ order }: { order: Order }) => {
  return (
    <div className="flex flex-col w-full gap-3 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold">Замовлення #{order.id}</h3>
          <p className="text-sm text-gray-500">Дата: {new Date(order.created_at).toLocaleDateString("uk-UA")}</p>
        </div>
        <div className="flex flex-col gap-1 text-right">
          <p className="text-base font-medium">{formatPrice(order.total)}</p>
          <p className="text-sm text-gray-500">Статус: {order.status}</p>
        </div>
      </div>
      <div className="pt-3 border-t border-gray-200">
        <h4 className="mb-2 text-sm font-semibold">Товари:</h4>
        <div className="flex flex-col gap-2">
          {order.products.map((item) => (
            <div key={item.id} className="flex items-center gap-3 p-2 rounded-md bg-gray-50">
              <Image
                src={item.image_url}
                alt={item.name}
                width={32}
                height={32}
                className="object-cover rounded"
              />
              <div className="flex-1">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-gray-500">
                  {formatPrice(item.price)} x {item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
