import {
  Box,
  CircleSlash,
  CircleX,
  Layers,
  Moon,
  Sparkle,
  Sun,
  type LucideIcon,
} from "lucide-react";
import type { ProducerPartner } from "@/data/partners";

export const partnerGlyphs: Record<ProducerPartner["glyph"], LucideIcon> = {
  moon: Moon,
  sun: Sun,
  box: Box,
  "circle-x": CircleX,
  layers: Layers,
  "circle-slash": CircleSlash,
  sparkle: Sparkle,
};

/** Marks that read as solid shapes rather than hairline outlines. */
export const filledGlyphs: ReadonlySet<ProducerPartner["glyph"]> = new Set([
  "moon",
  "box",
  "layers",
  "sparkle",
]);
