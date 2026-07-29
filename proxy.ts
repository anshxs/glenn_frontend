import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname === "/maintenance" ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/manifest.webmanifest" ||
    /\.[^/]+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  const maintenanceUrl = new URL("/maintenance", request.url);
  return NextResponse.redirect(maintenanceUrl);
}

export const config = {
  matcher: "/:path*",
};
