"use server";
import { addProduct } from "@/app/cabinet/my-shop/actions/addProduct";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    await addProduct(formData);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Помилка" }, { status: 500 });
  }
}
