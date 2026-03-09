import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "*.replit.dev",
    "*.spock.replit.dev",
    "*.replit.app",
    "127.0.0.1",
    "localhost",
  ],
  devIndicators: false,
};

export default nextConfig;
