"use client";

import { Button } from "@/components/ui/button";
import { removeFromCart } from "@/store/slices/cartSlice";
import { useAppDispatch } from "@/store/store";
import { formatPrice } from "@/utils/formatPrice";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface MiniCartProps {
  cartItem: {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image_url: string;
  };
  setInCart?: (inCart: boolean) => void;
  setQuantity?: (quantity: number) => void;
}

export const MiniCart = ({ cartItem, setInCart, setQuantity }: MiniCartProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(cartItem.id));

    if (setInCart) setInCart(false);
    if (setQuantity) setQuantity(1);
  };

  return (
    <div className="flex flex-col w-full gap-4 p-5 border border-green-300 rounded-lg">
      <h2 className="text-lg font-semibold">Кошик</h2>
      <div className="flex items-center w-full gap-2 mt-2">
        <Image
          src={cartItem.image_url}
          height={52}
          width={52}
          alt="cartProduct"
          className="object-contain max-w-12 max-h-12"
        />
        <div className="flex items-start justify-between w-full">
          <div>
            <p className="text-sm font-bold">{cartItem.name}</p>
            <p className="text-sm">
              {cartItem.quantity} x {formatPrice(cartItem.price)}
            </p>
          </div>
          <button onClick={handleRemoveFromCart}>
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>
      </div>
      <span className="flex items-center justify-between">
        <span className="text-light-gray">Повна вартість:</span>
        <span className="font-bold">{formatPrice(cartItem.price * cartItem.quantity)}</span>
      </span>
      <div className="flex w-full gap-2 *:w-1/2">
        <Button color="darkGray" className="text-md" onClick={() => router.push("/cart")}>
          Кошик
        </Button>
        <Button color="green" className="text-md" onClick={() => router.push("/checkout")}>
          Купити
        </Button>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <span className="text-xs text-light-gray">Гарантовано безпечне оформлення замовлення</span>
        <Image src={"/images/paymants.png"} alt="paymants" width={300} height={28} />
      </div>
    </div>
  );
};
