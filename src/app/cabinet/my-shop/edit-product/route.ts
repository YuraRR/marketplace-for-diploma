import { editProduct } from "@/app/cabinet/my-shop/actions/editProduct";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    await editProduct(formData);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Помилка" }, { status: 500 });
  }
}
