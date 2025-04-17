import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    dynamicIO: true,
    optimizePackageImports: ["@chakra-ui/react"],
  },
};

export default nextConfig;
