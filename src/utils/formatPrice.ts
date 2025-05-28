export const formatPrice = (price: number): string => {
  const fixedPrice = Math.max(Math.floor(price / 10) * 10 - 1, 0);
  return fixedPrice.toLocaleString("uk-UA").replace(/\s+/g, " ") + " ₴";
};
