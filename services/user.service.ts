import { compare, hash } from "bcryptjs";
import { prisma } from "@/lib/db";
import { ServiceError } from "@/lib/errors";
import { loginSchema } from "@/lib/validation/auth";
import { parseInput } from "@/services/parse";

const BCRYPT_ROUNDS = 12;

export type AdminUser = {
  id: string;
  email: string;
  role: string;
};

/**
 * Verifies a login. When no email is supplied the single seeded admin is used,
 * which keeps the existing password-only login form working.
 */
export async function verifyCredentials(body: unknown): Promise<AdminUser> {
  const input = parseInput(loginSchema, body);

  const user = input.email
    ? await prisma.user.findUnique({ where: { email: input.email } })
    : await prisma.user.findFirst({ orderBy: { createdAt: "asc" } });

  /*
   * Hash a throwaway value when no user matched so a missing account and a
   * wrong password cost the same time.
   */
  const passwordHash = user?.passwordHash ?? (await hash("no-such-user", BCRYPT_ROUNDS));
  const matches = await compare(input.password, passwordHash);

  if (!user || !matches) {
    throw new ServiceError("UNAUTHORIZED", "Invalid credentials.");
  }

  return { id: user.id, email: user.email, role: user.role };
}

export async function createAdminUser(email: string, password: string): Promise<AdminUser> {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new ServiceError("CONFLICT", "That email is already registered.");
  }

  const user = await prisma.user.create({
    data: { email, passwordHash: await hash(password, BCRYPT_ROUNDS) },
  });
  return { id: user.id, email: user.email, role: user.role };
}

export async function changePassword(id: string, password: string): Promise<void> {
  const existing = await prisma.user.findUnique({ where: { id }, select: { id: true } });
  if (!existing) {
    throw new ServiceError("NOT_FOUND", "User not found.");
  }

  await prisma.user.update({
    where: { id },
    data: { passwordHash: await hash(password, BCRYPT_ROUNDS) },
  });
}
