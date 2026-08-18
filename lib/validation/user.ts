import { z } from "zod";

/*
 * The floor is deliberately higher than the login schema's `min(1)`: that one
 * validates a guess against an existing hash, this one mints a new credential.
 */
const passwordField = z
  .string()
  .min(10, "Password must be at least 10 characters.")
  .max(255);

/** Sized for the VARCHAR(191) column behind it. */
const nameField = z.string().trim().min(1).max(191);

export const userCreateSchema = z.object({
  name: nameField,
  email: z.email().max(255),
  password: passwordField,
});

/*
 * Password is omitted, not emptied, when an edit only touches the name or the
 * email — an empty string would otherwise hash into a usable credential.
 */
export const userUpdateSchema = z.object({
  name: nameField.optional(),
  email: z.email().max(255).optional(),
  password: passwordField.optional(),
});

export type UserCreateInput = z.infer<typeof userCreateSchema>;
export type UserUpdateInput = z.infer<typeof userUpdateSchema>;
