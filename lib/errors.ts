export type ServiceErrorCode = "VALIDATION" | "NOT_FOUND" | "CONFLICT" | "UNAUTHORIZED";

/*
 * Services throw this instead of returning null so route handlers can map a
 * failure to a status code without every caller re-inventing the branch.
 */
export class ServiceError extends Error {
  readonly code: ServiceErrorCode;
  readonly details?: unknown;

  constructor(code: ServiceErrorCode, message: string, details?: unknown) {
    super(message);
    this.name = "ServiceError";
    this.code = code;
    this.details = details;
  }
}

export function isServiceError(error: unknown): error is ServiceError {
  return error instanceof ServiceError;
}

const statusByCode: Record<ServiceErrorCode, number> = {
  VALIDATION: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
};

export function statusForCode(code: ServiceErrorCode): number {
  return statusByCode[code];
}
