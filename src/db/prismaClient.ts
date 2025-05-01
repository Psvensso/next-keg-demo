import * as dotenv from "dotenv";
import { PrismaClient } from "./generated";
const environment = process.env.NODE_ENV || "development";
const envFileName = `.env.${environment}`;
dotenv.config({ path: envFileName });
console.log(envFileName);
const prismaClient = new PrismaClient({
  log: environment === "development" ? ["warn", "error"] : [],
});

const globalForPrisma = global as unknown as { prisma: typeof prismaClient };

if (process.env.NODE_ENV !== "production")
  globalForPrisma.prisma = prismaClient;

export default prismaClient;
