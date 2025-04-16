import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: [],
  },
  images: {
    domains: ["mui.com"],
  },
};

export default nextConfig;
