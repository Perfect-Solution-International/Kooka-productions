import { NextResponse } from "next/server";
import { errorResponse } from "@/lib/api/responses";
import { getShowreelBySlug } from "@/services/showreel.service";

type RouteContext = { params: Promise<{ slug: string }> };

/* Public read endpoint, keyed by the same slug the detail page uses. */
export async function GET(_request: Request, context: RouteContext) {
  try {
    const { slug } = await context.params;
    const item = await getShowreelBySlug(slug);
    if (!item) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }
    return NextResponse.json({ item });
  } catch (error) {
    return errorResponse(error);
  }
}
