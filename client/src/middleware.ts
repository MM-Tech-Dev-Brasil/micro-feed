import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PRIVATE_ROUTES = ["/feed"];
const AUTH_ROUTES = ["/auth/login", "/auth/register"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  const isPrivate = PRIVATE_ROUTES.some(route => pathname.startsWith(route));
  const isAuthRoute = AUTH_ROUTES.some(route => pathname.startsWith(route));

  if (pathname === "/") {
    const redirectUrl = token ? "/feed" : "/auth/login";
    return NextResponse.redirect(new URL(redirectUrl, req.url));
  }
  if (isPrivate && !token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/feed", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/feed/:path*",
    "/auth/:path*",
  ],
};
