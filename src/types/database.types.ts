import { CartItemType } from "@/types/cart.types";

export type Database = {
  public: {
    Tables: {
      sellers: {
        Row: {
          id: number;
          user_id: string;
          shop_name: string;
          description: string | null;
          address: string | null;
          created_at: string;
        };
        Insert: {
          user_id: string;
          shop_name: string;
          description?: string | null;
          address?: string | null;
          created_at?: string;
        };
      };
      products: {
        Row: {
          id: number;
          name: string;
          description: string;
          price: number;
          category: string;
          image_url: string;
          specs: string;
          availability: string;
          colors: string | null;
          variations: string | null;
          brand: string;
          seller: string;
          created_at: string;
          quantity?: number;
        };
      };
      profiles: {
        Row: {
          id: number;
          auth_id: string;
          first_name: string;
          last_name: string;
          city: string;
          email: string;
          phone: string;
          address: string;
          post_office?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          first_name: string;
          last_name: string;
          total: number;
          status: string;
          products: Product[];
          created_at: string;
        };
        Insert: {
          first_name: string;
          last_name: string;
          city: string;
          address: string;
          phone: string;
          email?: string;
          comment?: string;
          total: number;
          products: Array<CartItemType>;
          status: string;
          user_auth_id: string;
        };
      };
    };
  };
};

export type Product = Database["public"]["Tables"]["products"]["Row"];
export type Seller = Database["public"]["Tables"]["sellers"]["Row"];
export type SellerInsert = Database["public"]["Tables"]["sellers"]["Insert"];

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export type Order = Database["public"]["Tables"]["orders"]["Row"];
export type OrderInsert = Database["public"]["Tables"]["orders"]["Insert"];
