const ROOT_DOMAIN = "glennesports.app";

const subdomainRoutes = {
  about: "/about",
  careers: "/careers",
  complaints: "/complaints",
  support: "/support",
  terms: "/terms",
} as const;

export type SubdomainKey = keyof typeof subdomainRoutes;

export function getRootDomain() {
  return process.env.NEXT_PUBLIC_ROOT_DOMAIN?.trim() || ROOT_DOMAIN;
}

export function getBaseUrl() {
  return `https://${getRootDomain()}`;
}

export function getSubdomainUrl(subdomain: SubdomainKey) {
  return `https://${subdomain}.${getRootDomain()}`;
}

export function getSubdomainPath(subdomain: SubdomainKey) {
  return subdomainRoutes[subdomain];
}

export function getSubdomainRouteEntries() {
  return Object.entries(subdomainRoutes) as [SubdomainKey, (typeof subdomainRoutes)[SubdomainKey]][];
}
