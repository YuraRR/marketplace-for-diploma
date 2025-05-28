export type FiltersType = {
  category: string;
  brands: string[];
  sellers: string[];
  colors: string[];
  variations: string[];
  priceRange: [number, number];
};

type ArrayFilterKeys<T> = {
  [K in keyof T]: T[K] extends string[] ? K : never;
}[keyof T];

export type FilterKey = ArrayFilterKeys<FiltersType>;

export type FiltersProps = {
  filters: FiltersType;
  uniqueCategories: string[];
  uniqueBrands: string[];
  uniqueSellers: string[];
  uniqueColors: string[];
  uniqueMemory: string[];
};
