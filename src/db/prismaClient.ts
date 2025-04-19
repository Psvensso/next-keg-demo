import { PrismaClient } from "./generated";

const prismaClient = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

const globalForPrisma = global as unknown as { prisma: typeof prismaClient };

if (process.env.NODE_ENV !== "production")
  globalForPrisma.prisma = prismaClient;

export default prismaClient;
