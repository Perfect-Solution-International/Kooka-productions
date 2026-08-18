import { z } from "zod";
import { longText, publishFields, requiredText, slugField, urlPath } from "@/lib/validation/common";

export const homeSolutionCreateSchema = z.object({
  slug: slugField.optional(),
  title: requiredText,
  icon: requiredText,
  image: urlPath,
  description: longText,
  deliverables: z.array(requiredText).max(30),
  idealFor: z.array(requiredText).max(30),
  ...publishFields,
});

export const homeSolutionUpdateSchema = homeSolutionCreateSchema.partial();
