import * as dotenv from "dotenv";
import { PrismaClient } from "./generated";

const environment = process.env.NODE_ENV || "development";
dotenv.config({ path: ".env", override: true });

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

// Declare global type for Prisma
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Use existing client if it exists or create a new one
const prismaClient =
  global.prisma ||
  new PrismaClient({
    log: environment === "development" ? ["warn", "error"] : [],
  });

// Assign client to global object to reuse connection between hot reloads
if (process.env.NODE_ENV !== "production") {
  global.prisma = prismaClient;
}

export default prismaClient;
