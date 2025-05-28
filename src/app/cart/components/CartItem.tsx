import { ProductAvailability } from "@/components/common/ProductAvailability";
import { QuantitySelector } from "@/components/common/QuantitySelector";
import { removeFromCart, updateQuantity } from "@/store/slices/cartSlice";
import { useAppDispatch } from "@/store/store";
import { CartItemType } from "@/types/cart.types";
import { formatPrice } from "@/utils/formatPrice";

import Image from "next/image";
import Link from "next/link";

export const CartItem = ({ item }: { item: CartItemType }) => {
  const dispatch = useAppDispatch();

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity < 1) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateQuantity({ id, quantity }));
    }
  };
  return (
    <div className="flex p-4 items-center justify-between gap-6 rounded-lg bg-white-bg max-h-[282px]">
      <Link href={`/product/${item.id}`}>
        <Image
          src={item.image_url || "/placeholder-image.jpg"}
          alt={item.name}
          width={150}
          height={200}
          className="object-contain max-h-[200px]"
        />
      </Link>

      <div className="flex-1 ml-4 space-y-3">
        <h3 className="font-semibold text-md">{item.name}</h3>
        <p className="text-lg font-semibold text-red-600">{formatPrice(item.price)}</p>
        <QuantitySelector
          quantity={item.quantity}
          onQuantityChange={(newQuantity) => handleQuantityChange(item.id, newQuantity)}
          min={0}
          max={100}
          size="sm"
        />
        <ProductAvailability availability={item.availability} />
      </div>
    </div>
  );
};
