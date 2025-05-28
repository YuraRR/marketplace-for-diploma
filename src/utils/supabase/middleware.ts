import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function updateSession(request: NextRequest) {
  const response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async getAll() {
          // Return all cookies as an array of { name, value }
          const cookiesArr = request.cookies.getAll().map((cookie) => ({
            name: cookie.name,
            value: cookie.value,
          }));
          return cookiesArr;
        },
        setAll(
          cookies: { name: string; value: string; options?: Partial<import("cookie").CookieSerializeOptions> }[]
        ) {
          cookies.forEach(({ name, value, options }) => {
            response.cookies.set({ name, value, ...options });
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && request.nextUrl.pathname.startsWith("/cabinet")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}
