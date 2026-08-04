import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getRootDomain, getSubdomainPath, type SubdomainKey } from "@/lib/subdomains";

const rootDomain = getRootDomain();
const activeSubdomains = new Set<SubdomainKey>(["about", "careers", "complaints"]);

function extractHost(request: NextRequest) {
  return request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? "";
}

function normalizeHost(host: string) {
  return host.split(":")[0].trim().toLowerCase();
}

function getSubdomain(host: string) {
  if (!host.endsWith(`.${rootDomain}`)) {
    return null;
  }

  return host.slice(0, -(`.${rootDomain}`).length) || null;
}

export function middleware(request: NextRequest) {
  const host = normalizeHost(extractHost(request));
  const pathname = request.nextUrl.pathname;

  if (!host || host === rootDomain || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const subdomain = getSubdomain(host);

  if (!subdomain) {
    return NextResponse.next();
  }

  if (!activeSubdomains.has(subdomain as SubdomainKey)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const targetPath = getSubdomainPath(subdomain as SubdomainKey);

  if (pathname === "/") {
    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = targetPath;
    return NextResponse.rewrite(rewriteUrl);
  }

  if (pathname !== targetPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest).*)",
  ],
};
