import { NextResponse } from "next/server";
import { isServiceError, statusForCode } from "@/lib/errors";

export function unauthorized(): NextResponse {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

/*
 * Service failures carry their own status; anything else is a bug and must not
 * leak its message to the client.
 */
export function errorResponse(error: unknown): NextResponse {
  if (isServiceError(error)) {
    return NextResponse.json(
      { error: error.message, details: error.details ?? null },
      { status: statusForCode(error.code) },
    );
  }

  console.error(error);
  return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
}

export async function readJson(request: Request): Promise<unknown> {
  return request.json().catch(() => null);
}
