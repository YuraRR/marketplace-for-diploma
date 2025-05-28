import { DualRangeSlider } from "@/components/ui/dual-range-slider";

interface PriceSliderProps {
  priceRange: [number, number];
  handlePriceChange: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void;
}

export const PriceSlider = ({ priceRange, handlePriceChange }: PriceSliderProps) => {
  const handlePriceRangeChange = (newRange: [number, number]) => {
    const createSyntheticEvent = (value: number): React.ChangeEvent<HTMLInputElement> => {
      return {
        target: { value: value.toString() } as HTMLInputElement,
      } as React.ChangeEvent<HTMLInputElement>;
    };

    handlePriceChange(createSyntheticEvent(newRange[0]), 0);
    handlePriceChange(createSyntheticEvent(newRange[1]), 1);
  };

  return (
    <div className="flex flex-col mb-4">
      <DualRangeSlider
        value={priceRange}
        onValueChange={handlePriceRangeChange}
        min={0}
        max={100000}
        step={10}
        className="mt-2 cursor-pointer"
      />
      <div className="flex items-center justify-between gap-2 mt-4">
        <div className="flex items-center gap-1 px-2 bg-white rounded-lg focus-within:ring-2 focus-within:ring-light-green">
          <span>₴</span>
          <input
            type="number"
            value={priceRange[0]}
            min={0}
            max={priceRange[1]}
            onChange={(e) => handlePriceChange(e, 0)}
            className="w-full py-2 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
        <span>-</span>
        <div className="flex items-center gap-1 px-2 bg-white rounded-lg focus-within:ring-2 focus-within:ring-light-green">
          <span>₴</span>
          <input
            type="number"
            value={priceRange[1]}
            min={priceRange[0]}
            max={100000}
            onChange={(e) => handlePriceChange(e, 1)}
            className="w-full py-2 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
      </div>
    </div>
  );
};

export default PriceSlider;
