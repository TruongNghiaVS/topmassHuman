import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// List of routes that require authorization
const protectedRoutes = ["/hr-center"];

export function middleware(request: NextRequest) {
  // Check if the requested route is one of the protected routes
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // If it's not a protected route, allow the request
  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // Example: Check for the presence of an authorization token (e.g., from a cookie)
  const token = request.cookies.get("token")?.value;

  // If token is not present or invalid, redirect to login page
  if (!token) {
    return NextResponse.redirect(new URL("/dang-nhap", request.url));
  }

  // If user is authorized, allow the request to proceed
  return NextResponse.next();
}

// Configure which routes the middleware should apply to
export const config = {
  matcher: ["/hr-center/:path*"],
};
