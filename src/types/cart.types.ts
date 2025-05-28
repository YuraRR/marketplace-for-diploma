export interface CartItemType {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image_url: string;
  availability: string;
}

export interface CartState {
  items: CartItemType[];
}
