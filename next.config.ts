import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    dynamicIO: true,
    useCache: true,
    optimizePackageImports: ["@chakra-ui/react"],
  },
};

export default nextConfig;
