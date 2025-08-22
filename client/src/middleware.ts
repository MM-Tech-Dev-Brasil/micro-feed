import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PRIVATE_ROUTES = ["/feed"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value; 
  const { pathname } = req.nextUrl;

  const isPrivate = PRIVATE_ROUTES.some(route => pathname.startsWith(route));

  if (isPrivate && !token) {
    const loginUrl = new URL("/auth/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/feed/:path*", "/dashboard/:path*", "/profile/:path*"],
};
