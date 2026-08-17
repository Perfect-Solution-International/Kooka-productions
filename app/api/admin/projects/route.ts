import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { createShowreel, listShowreel, parseShowreelInput } from "@/lib/showreelStore";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ items: listShowreel() });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const input = parseShowreelInput(body);
  if (!input) {
    return NextResponse.json(
      { error: "Title, blurb and image are required." },
      { status: 400 },
    );
  }

  const item = createShowreel(input);
  return NextResponse.json({ item }, { status: 201 });
}
