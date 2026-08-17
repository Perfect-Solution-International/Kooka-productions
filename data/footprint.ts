import { listFootprint, type FootprintItem } from "@/lib/footprintStore";

export type { FootprintItem };

/*
 * Reads the JSON store fresh on every call — pages that render this must opt
 * into dynamic rendering (`export const dynamic = "force-dynamic"`) so admin
 * edits show up without a rebuild.
 */
export function getFootprint(): FootprintItem[] {
  return listFootprint();
}
