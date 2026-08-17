import { listShowreel, type ShowreelItem } from "@/lib/showreelStore";

export type { ShowreelItem };

/*
 * Reads the JSON store fresh on every call — pages that render this must opt
 * into dynamic rendering (`export const dynamic = "force-dynamic"`) so admin
 * edits show up without a rebuild.
 */
export function getShowreel(): ShowreelItem[] {
  return listShowreel();
}
