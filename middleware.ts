import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getRootDomain, getSubdomainPath, type SubdomainKey } from "@/lib/subdomains";

const rootDomain = getRootDomain();
const wwwUrl = `https://www.${rootDomain}`;
const apexUrl = `https://${rootDomain}`;
const activeSubdomains = new Set<string>(["about", "careers", "complaints", "support", "policy"]);

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

  const sub = host.slice(0, -(`.${rootDomain}`).length).trim();
  return sub || null;
}

export function middleware(request: NextRequest) {
  const host = normalizeHost(extractHost(request));
  const pathname = request.nextUrl.pathname;

  // Pass through internal Next.js assets, API routes, and static files
  if (
    !host ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Handle apex and www domains normally
  if (host === rootDomain || host === `www.${rootDomain}`) {
    return NextResponse.next();
  }

  const subdomain = getSubdomain(host);

  if (!subdomain) {
    return NextResponse.next();
  }

  if (!activeSubdomains.has(subdomain)) {
    return NextResponse.redirect(new URL("/", wwwUrl));
  }

  const targetPath = getSubdomainPath(subdomain as SubdomainKey);

  // When visiting subdomain root e.g. careers.glennesports.app/ -> rewrite to /careers
  if (pathname === "/") {
    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = targetPath;
    return NextResponse.rewrite(rewriteUrl);
  }

  // If a user on a subdomain requests a path that starts with another section, route them properly
  if (pathname !== targetPath && !pathname.startsWith(`${targetPath}/`)) {
    // If the path corresponds to another active section (e.g. /about on careers.glennesports.app)
    const matchedSub = Array.from(activeSubdomains).find(
      (sub) => pathname === `/${sub}` || pathname.startsWith(`/${sub}/`)
    );

    if (matchedSub) {
      return NextResponse.redirect(new URL(pathname, `https://${matchedSub}.${rootDomain}`));
    }

    return NextResponse.redirect(new URL(pathname, wwwUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest).*)",
  ],
};
