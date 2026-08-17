import { NextResponse } from "next/server";
import { errorResponse } from "@/lib/api/responses";
import { listShowreel } from "@/services/showreel.service";

/*
 * Public read endpoint: no session required, and it serves the same cached,
 * published-only list the site renders from. Drafts stay behind
 * /api/admin/showreel.
 */
export async function GET() {
  try {
    return NextResponse.json({ items: await listShowreel() });
  } catch (error) {
    return errorResponse(error);
  }
}
