import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loadStripe } from "@stripe/stripe-js";
import { createOrder } from "@/utils/supabase/actions";
import { CartItemType } from "@/types/cart.types";

interface OrderValues {
  first_name: string;
  last_name: string;
  city: string;
  address: string;
  phone: string;
  email?: string;
  comment?: string;
}

interface OrderSubmissionProps {
  values: OrderValues;
  products: CartItemType[];
  userAuthId: string;
  paymentMethod: "directBankTransfer" | "cashOnDelivery";
  router: ReturnType<typeof useRouter>;
}

export const handleOrderSubmission = async ({
  values,
  products,
  userAuthId,
  paymentMethod,
  router,
}: OrderSubmissionProps) => {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

  try {
    if (!products || products.length === 0) {
      toast.error("Кошик порожній. Додайте товари перед оформленням.");
      return;
    }

    const total = products.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (paymentMethod === "cashOnDelivery") {
      await createOrder({
        ...values,
        products: products,
        user_auth_id: userAuthId,
        total,
        status: "pending",
      });
      router.push("/checkout/success");
    } else {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ products }),
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (!response.ok || data.error) {
        throw new Error(data.error || "Помилка створення сесії оплати");
      }

      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error("Stripe error");
      }

      await createOrder({
        ...values,
        total,
        user_auth_id: userAuthId,
        products: products,
        status: "pending",
      });

      const { error } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (error) {
        throw new Error(error.message);
      }
    }
  } catch (error: unknown) {
    console.error("Form submission error:", error);
    const errorMessage = error instanceof Error ? error.message : "Не вдалося відправити форму. Спробуйте ще раз.";
    toast.error(errorMessage);
  }
};
