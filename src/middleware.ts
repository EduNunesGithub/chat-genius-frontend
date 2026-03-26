import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookie = request.headers.get("cookie") ?? "";

  const session = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/get-session`,
    { headers: { cookie } },
  )
    .then((res) => (res.ok ? res.json() : null))
    .catch(() => null);

  const hasSession = !!session?.session;
  const isAdmin = session?.user?.role === "admin";

  if (pathname.startsWith("/login")) {
    if (hasSession) return NextResponse.redirect(new URL("/chat", request.url));
    return NextResponse.next();
  }

  if (!hasSession) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/admin") && !isAdmin) {
    return NextResponse.redirect(new URL("/chat", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
