import { z } from "zod";

/*
 * The floor is deliberately higher than the login schema's `min(1)`: that one
 * validates a guess against an existing hash, this one mints a new credential.
 */
const passwordField = z
  .string()
  .min(10, "Password must be at least 10 characters.")
  .max(255);

const roleField = z.enum(["admin", "editor"]);

export const userCreateSchema = z.object({
  email: z.email().max(255),
  password: passwordField,
  role: roleField.optional(),
});

/*
 * Password is omitted, not emptied, when an edit only touches the email or the
 * role — an empty string would otherwise hash into a usable credential.
 */
export const userUpdateSchema = z.object({
  email: z.email().max(255).optional(),
  password: passwordField.optional(),
  role: roleField.optional(),
});

export type UserCreateInput = z.infer<typeof userCreateSchema>;
export type UserUpdateInput = z.infer<typeof userUpdateSchema>;
