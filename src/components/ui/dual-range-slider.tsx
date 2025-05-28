"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

interface DualRangeSliderProps extends React.ComponentProps<typeof SliderPrimitive.Root> {
  value: [number, number];
  onValueChange: (value: [number, number]) => void;
  min?: number;
  max?: number;
  step?: number;
  formatLabel?: (value: number) => string;
}

const DualRangeSlider = React.forwardRef<HTMLDivElement, DualRangeSliderProps>(
  ({ className, value, onValueChange, min = 0, max = 2500, step = 10, formatLabel, ...props }, ref) => {
    return (
      <SliderPrimitive.Root
        ref={ref}
        className={cn("relative flex w-full touch-none select-none items-center", className)}
        value={value}
        onValueChange={onValueChange}
        min={min}
        max={max}
        step={step}
        {...props}
      >
        <SliderPrimitive.Track className="relative w-full h-2 overflow-hidden bg-gray-200 rounded-full grow">
          <SliderPrimitive.Range className="absolute h-full bg-light-green" />
        </SliderPrimitive.Track>
        {value.map((_, index) => (
          <SliderPrimitive.Thumb
            key={index}
            className="block w-4 h-4 transition-colors bg-white border-2 rounded-full shadow border-light-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-green disabled:pointer-events-none disabled:opacity-50"
          >
            {formatLabel && (
              <span className="absolute text-xs text-gray-700 -translate-x-1/2 -top-6 left-1/2">
                {formatLabel(value[index])}
              </span>
            )}
          </SliderPrimitive.Thumb>
        ))}
      </SliderPrimitive.Root>
    );
  }
);

DualRangeSlider.displayName = "DualRangeSlider";

export { DualRangeSlider };
