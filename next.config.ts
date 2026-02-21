import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable trailing slash to prevent 307 redirects on API routes
  trailingSlash: false,
  // Skip trailing slash redirect
  skipTrailingSlashRedirect: true,
  // Ensure API routes are not rewritten
  async rewrites() {
    return [];
  },
  async redirects() {
    return [];
  },
};

export default nextConfig;
