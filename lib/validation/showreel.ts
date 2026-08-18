import { z } from "zod";
import {
  longText,
  optionalText,
  optionalUrlPath,
  publishFields,
  requiredText,
  slugField,
  urlPath,
} from "@/lib/validation/common";

/*
 * Gallery entries accept either a bare path (what the admin form posts today)
 * or an object carrying alt text, so richer captions can be added without a
 * breaking API change.
 */
const galleryEntrySchema = z.union([
  urlPath,
  z.object({ url: urlPath, alt: optionalText }),
]);

export const showreelCreateSchema = z.object({
  slug: slugField.optional(),
  title: requiredText,
  type: requiredText,
  location: requiredText,
  year: requiredText,
  blurb: longText,
  image: urlPath,
  video: optionalUrlPath,
  href: optionalUrlPath,
  gallery: z.array(galleryEntrySchema).optional(),
  ...publishFields,
});

export const showreelUpdateSchema = showreelCreateSchema.partial();

export type ShowreelCreateInput = z.infer<typeof showreelCreateSchema>;
export type ShowreelUpdateInput = z.infer<typeof showreelUpdateSchema>;
export type ShowreelGalleryEntry = z.infer<typeof galleryEntrySchema>;
