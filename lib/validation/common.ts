import { z } from "zod";

/** Required copy: trimmed, non-empty, and short enough for a VARCHAR(255). */
export const requiredText = z.string().trim().min(1).max(255);

/** Long-form copy backed by a TEXT column. */
export const longText = z.string().trim().min(1).max(20_000);

/** A `public/` path or an absolute URL. */
export const urlPath = z.string().trim().min(1).max(512);

export const optionalUrlPath = urlPath.optional().nullable();

export const optionalText = z.string().trim().max(255).optional().nullable();

export const slugField = z
  .string()
  .trim()
  .min(1)
  .max(191)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase words separated by hyphens");

/*
 * Publish state and position accompany every content row. They are optional on
 * input so an admin form that only edits copy does not have to resend them.
 */
export const publishFields = {
  published: z.boolean().optional(),
  sortOrder: z.number().int().min(0).optional(),
};

/** Normalises "" from an HTML form to null, since the columns are nullable. */
export function emptyToNull(value: string | null | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}
