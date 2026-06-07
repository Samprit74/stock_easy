export class ApiError extends Error {
  public readonly status: number;
  public readonly code: string | null;
  public readonly fieldErrors: Record<string, string>;

  constructor(
    status: number,
    message: string,
    code: string | null = null,
    fieldErrors: Record<string, string> = {}
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.fieldErrors = fieldErrors;
  }

  isClientError(): boolean {
    return this.status >= 400 && this.status < 500;
  }

  isServerError(): boolean {
    return this.status >= 500;
  }

  isValidation(): boolean {
    return this.status === 400 && Object.keys(this.fieldErrors).length > 0;
  }
}

export class NetworkError extends Error {
  constructor(message = "Network error. Please check your connection.") {
    super(message);
    this.name = "NetworkError";
  }
}

export class AuthError extends ApiError {
  constructor(message = "Session expired. Please login again.") {
    super(401, message, "AUTH_EXPIRED");
    this.name = "AuthError";
  }
}

export function isApiError(e: unknown): e is ApiError {
  return e instanceof ApiError;
}

export function isAuthError(e: unknown): e is AuthError {
  return e instanceof AuthError;
}

export function isNetworkError(e: unknown): e is NetworkError {
  return e instanceof NetworkError;
}

export function getErrorMessage(e: unknown, fallback = "Something went wrong"): string {
  if (isApiError(e)) return e.message;
  if (isNetworkError(e)) return e.message;
  if (e instanceof Error) return e.message;
  return fallback;
}
