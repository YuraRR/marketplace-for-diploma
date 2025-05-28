import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-04-30.basil",
});

export async function POST(request: Request) {
  try {
    const { products } = await request.json();
    console.log("Received items:", products);

    if (!products || products.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    for (const item of products) {
      if (!item.name || !item.price || !item.quantity) {
        return NextResponse.json({ error: `Invalid item: ${JSON.stringify(item)}` }, { status: 400 });
      }
    }

    // Определяем тип для items
    type CheckoutItem = {
      name: string;
      price: number;
      quantity: number;
      image_url?: string;
    };
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: products.map((item: CheckoutItem) => ({
        price_data: {
          currency: "uah",
          product_data: {
            name: item.name,
            ...(item.image_url ? { images: [item.image_url] } : {}),
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${request.headers.get("origin")}/checkout/success`,
      cancel_url: `${request.headers.get("origin")}/checkout`,
    });

    console.log("Created session:", session);
    return NextResponse.json({ sessionId: session.id });
  } catch (error: unknown) {
    let errorMessage = "Unknown error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error("Error creating checkout session:", errorMessage, error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
