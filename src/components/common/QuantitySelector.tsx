"use client";

import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { ChangeEvent } from "react";

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "default";
}

const buttonVariants = cva("flex items-center border border-gray-300 rounded-lg  max-w-[130px] overflow-hidden", {
  variants: {
    size: {
      sm: "h-[37px]",
      default: "h-[53px]",
    },
  },
});

export const QuantitySelector = ({
  quantity,
  onQuantityChange,
  min = 1,
  max = 99,
  size = "default",
}: QuantitySelectorProps) => {
  const handleIncrement = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value) && value >= min && value <= max) {
      onQuantityChange(value);
    }
  };

  return (
    <div className={cn(buttonVariants({ size }))}>
      <button
        onClick={handleDecrement}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
        className="w-10 h-full text-2xl font-bold text-gray-700 transition-colors hover:bg-gray-200 disabled:opacity-50"
      >
        −
      </button>
      <input
        type="text"
        value={quantity}
        onChange={handleInputChange}
        className="w-10 h-full font-bold text-center border-none text-md focus:outline-none focus:ring-2 focus:ring-green-500"
        aria-label="Quantity"
      />
      <button
        onClick={handleIncrement}
        disabled={quantity >= max}
        aria-label="Increase quantity"
        className="w-10 h-full text-2xl font-bold text-gray-700 transition-colors hover:bg-gray-200 disabled:opacity-50"
      >
        +
      </button>
    </div>
  );
};
