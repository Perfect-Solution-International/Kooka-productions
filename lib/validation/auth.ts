import { z } from "zod";

export const loginSchema = z.object({
  email: z.email().max(255).optional(),
  password: z.string().min(1).max(255),
});

export type LoginInput = z.infer<typeof loginSchema>;
