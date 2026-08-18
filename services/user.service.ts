import { compare, hash } from "bcryptjs";
import { prisma } from "@/lib/db";
import { ServiceError } from "@/lib/errors";
import { loginSchema } from "@/lib/validation/auth";
import { userCreateSchema, userUpdateSchema } from "@/lib/validation/user";
import { parseInput } from "@/services/parse";

const BCRYPT_ROUNDS = 12;

export type AdminUser = {
  id: string;
  email: string;
  role: string;
};

/*
 * The password hash is never part of this shape, so it cannot ride along into
 * a JSON response by accident.
 */
export type AdminUserRecord = AdminUser & {
  createdAt: Date;
  updatedAt: Date;
};

const publicFields = {
  id: true,
  email: true,
  role: true,
  createdAt: true,
  updatedAt: true,
} as const;

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

export async function listUsers(): Promise<AdminUserRecord[]> {
  return prisma.user.findMany({ select: publicFields, orderBy: { createdAt: "asc" } });
}

export async function getUser(id: string): Promise<AdminUserRecord> {
  const user = await prisma.user.findUnique({ where: { id }, select: publicFields });
  if (!user) {
    throw new ServiceError("NOT_FOUND", "User not found.");
  }
  return user;
}

export async function createUser(body: unknown): Promise<AdminUserRecord> {
  const input = parseInput(userCreateSchema, body);
  await assertEmailFree(input.email);

  return prisma.user.create({
    data: {
      email: input.email,
      passwordHash: await hash(input.password, BCRYPT_ROUNDS),
      ...(input.role ? { role: input.role } : {}),
    },
    select: publicFields,
  });
}

export async function updateUser(id: string, body: unknown): Promise<AdminUserRecord> {
  const input = parseInput(userUpdateSchema, body);
  await getUser(id);

  if (input.email) {
    await assertEmailFree(input.email, id);
  }

  return prisma.user.update({
    where: { id },
    data: {
      ...(input.email ? { email: input.email } : {}),
      ...(input.role ? { role: input.role } : {}),
      ...(input.password ? { passwordHash: await hash(input.password, BCRYPT_ROUNDS) } : {}),
    },
    select: publicFields,
  });
}

export async function removeUser(id: string): Promise<void> {
  await getUser(id);

  /*
   * Deleting the last account would lock everyone out of the admin panel with
   * no route back in, so the final row is not deletable.
   */
  if ((await prisma.user.count()) <= 1) {
    throw new ServiceError("CONFLICT", "The last remaining account cannot be deleted.");
  }

  await prisma.user.delete({ where: { id } });
}

async function assertEmailFree(email: string, exceptId?: string): Promise<void> {
  const existing = await prisma.user.findUnique({ where: { email }, select: { id: true } });
  if (existing && existing.id !== exceptId) {
    throw new ServiceError("CONFLICT", "That email is already registered.");
  }
}
