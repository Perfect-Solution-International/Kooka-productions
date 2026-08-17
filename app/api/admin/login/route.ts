import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE_SECONDS,
  createSessionToken,
} from "@/lib/adminAuth";
import { errorResponse, readJson } from "@/lib/api/responses";
import { verifyCredentials } from "@/services/user.service";

export async function POST(request: Request) {
  try {
    await verifyCredentials(await readJson(request));
  } catch (error) {
    return errorResponse(error);
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
  });
  return response;
}
