/*
 * Admin routes answer failures with `{ error }`. Reading it back needs the
 * same narrowing everywhere, so it lives here instead of in each form.
 */
export async function readErrorMessage(
  response: Response,
  fallback: string,
): Promise<string> {
  const body: unknown = await response.json().catch(() => null);

  if (
    typeof body === "object" &&
    body !== null &&
    "error" in body &&
    typeof body.error === "string"
  ) {
    return body.error;
  }

  return fallback;
}

export type UploadResult = { path: string } | { error: string };

/*
 * One request per file: the upload route takes a single `file` part, so a
 * multi-select is fanned out by the caller rather than batched here.
 */
export async function uploadFile(file: File): Promise<UploadResult> {
  const body = new FormData();
  body.append("file", file);

  const response = await fetch("/api/admin/upload", { method: "POST", body });

  if (!response.ok) {
    return { error: await readErrorMessage(response, "File upload failed.") };
  }

  const { path } = (await response.json()) as { path: string };
  return { path };
}
