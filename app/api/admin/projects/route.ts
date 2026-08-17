import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { createFootprint, listFootprint, parseFootprintInput } from "@/lib/footprintStore";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ items: listFootprint() });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const input = parseFootprintInput(body);
  if (!input) {
    return NextResponse.json(
      { error: "Title, blurb and image are required." },
      { status: 400 },
    );
  }

  const item = createFootprint(input);
  return NextResponse.json({ item }, { status: 201 });
}
