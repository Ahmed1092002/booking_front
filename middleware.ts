import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/", "/login", "/register", "/hotels"];
const authRoutes = ["/login", "/register"];
const customerRoutes = ["/my-bookings"];
const sellerRoutes = ["/dashboard"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token");
  const userInfo = request.cookies.get("user-info");
  const { pathname } = request.nextUrl;

  // Check if route is public
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith("/hotels/")
  );

  const isAuthRoute = authRoutes.includes(pathname);

  // If user is authenticated and tries to access auth routes, redirect to hotels
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/hotels", request.url));
  }

  // If route is public, allow access
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Protected routes - require authentication
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Role-based access control
  if (userInfo) {
    try {
      const user = JSON.parse(userInfo.value);
      const roles = user.roles || [];

      // Check seller routes
      if (sellerRoutes.some((route) => pathname.startsWith(route))) {
        if (!roles.includes("ROLE_SELLER")) {
          return NextResponse.redirect(new URL("/hotels", request.url));
        }
      }

      // Check customer routes
      if (customerRoutes.some((route) => pathname.startsWith(route))) {
        if (!roles.includes("ROLE_CUSTOMER")) {
          return NextResponse.redirect(new URL("/hotels", request.url));
        }
      }
    } catch (error) {
      console.error("Error parsing user info:", error);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
