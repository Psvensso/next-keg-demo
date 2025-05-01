import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    dynamicIO: true,
    useCache: true,
    optimizePackageImports: ["@chakra-ui/react"],
    workerThreads: false,
    cpus: 4, // limits concurrency so Prisma demo server dont go crazy with pooling issues
  },
};

export default nextConfig;
