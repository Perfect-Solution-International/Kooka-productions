import type { ZodType } from "zod";
import { ServiceError } from "@/lib/errors";

/*
 * Mutations take `unknown` and narrow through zod here, so no service body
 * ever has to trust the shape of a request payload.
 */
export function parseInput<T>(schema: ZodType<T>, body: unknown): T {
  const result = schema.safeParse(body);
  if (!result.success) {
    throw new ServiceError(
      "VALIDATION",
      "The submitted values are not valid.",
      result.error.issues,
    );
  }
  return result.data;
}
