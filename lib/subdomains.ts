const ROOT_DOMAIN = "glennesports.app";

const subdomainPaths = {
  about: "/about",
  careers: "/careers",
  complaints: "/complaints",
  support: "/complaints",
  policy: "/policy",
} as const;

export type SubdomainKey = keyof typeof subdomainPaths;

export function getRootDomain() {
  return process.env.NEXT_PUBLIC_ROOT_DOMAIN?.trim() || ROOT_DOMAIN;
}

export function getBaseUrl() {
  return `https://${getRootDomain()}`;
}

export function getSubdomainPath(subdomain: SubdomainKey) {
  return subdomainPaths[subdomain];
}

export function getSubdomainUrl(subdomain: SubdomainKey) {
  const root = getRootDomain();
  if (typeof window !== "undefined" && window.location.hostname.includes("localhost")) {
    return subdomainPaths[subdomain];
  }
  return `https://${subdomain}.${root}`;
}

export function getHomeUrl() {
  const root = getRootDomain();
  if (typeof window !== "undefined" && window.location.hostname.includes("localhost")) {
    return "/";
  }
  return `https://${root}`;
}

export function getSubdomainRouteEntries() {
  return Object.entries(subdomainPaths) as [SubdomainKey, (typeof subdomainPaths)[SubdomainKey]][];
}
