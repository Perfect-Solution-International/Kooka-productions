import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@/lib/generated/prisma/client";

/*
 * Prisma 7 drives MySQL through a driver adapter rather than a bundled engine,
 * so the connection string is handed to the adapter instead of the client.
 */
function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  return new PrismaClient({
    adapter: new PrismaMariaDb(connectionString),
  });
}

/*
 * `next dev` re-evaluates modules on every hot reload, which would open a new
 * pool each time. Parking the client on globalThis keeps a single pool alive.
 */
const globalForPrisma = globalThis as typeof globalThis & {
  prismaClient?: PrismaClient;
};

export const prisma: PrismaClient = globalForPrisma.prismaClient ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prismaClient = prisma;
}
