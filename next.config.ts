import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable trailing slash to prevent 307 redirects on API routes
  trailingSlash: false,
  // Skip trailing slash redirect
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
