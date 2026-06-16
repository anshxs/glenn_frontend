import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  getRootDomain,
  getSubdomainPath,
  getSubdomainRouteEntries,
  type SubdomainKey,
} from '@/lib/subdomains';

function getHostname(request: NextRequest) {
  return request.headers.get('host')?.split(':')[0].toLowerCase() ?? '';
}

function getSubdomainFromHost(hostname: string) {
  const rootDomain = getRootDomain().toLowerCase();

  if (!hostname.endsWith(rootDomain)) {
    return null;
  }

  const suffix = `.${rootDomain}`;

  if (!hostname.endsWith(suffix)) {
    return null;
  }

  const candidate = hostname.slice(0, -suffix.length);

  return getSubdomainRouteEntries().some(([subdomain]) => subdomain === candidate)
    ? (candidate as SubdomainKey)
    : null;
}

export function middleware(request: NextRequest) {
  const hostname = getHostname(request);
  const subdomain = getSubdomainFromHost(hostname);
  const { pathname } = request.nextUrl;

  if (subdomain && pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = getSubdomainPath(subdomain);
    return NextResponse.rewrite(url);
  }

  for (const [mappedSubdomain, mappedPath] of getSubdomainRouteEntries()) {
    if (pathname === mappedPath) {
      const url = new URL(request.url);
      url.hostname = `${mappedSubdomain}.${getRootDomain()}`;
      url.pathname = '/';
      return NextResponse.redirect(url, 308);
    }
  }

  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  // Add CORS headers to all API responses
  const response = NextResponse.next();
  
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|logos.svg|logo.png).*)',
  ],
};
