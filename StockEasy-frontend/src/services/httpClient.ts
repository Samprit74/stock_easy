import { ApiError, AuthError, NetworkError } from "./errors";
import { clearAuth, getToken } from "./authStorage";

const BASE_URL = "http://localhost:8082/api";

export type QueryValue = string | number | boolean | null | undefined;
export type QueryParams = Record<string, QueryValue>;

export interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: unknown;
  query?: QueryParams;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

function buildUrl(endpoint: string, query?: QueryParams): string {
  const url = new URL(`${BASE_URL}${endpoint}`);
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v !== null && v !== undefined) {
        url.searchParams.append(k, String(v));
      }
    }
  }
  return url.toString();
}

function buildHeaders(extra?: Record<string, string>): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(extra || {}),
  };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function parseResponse<T>(res: Response): Promise<T> {
  const text = await res.text();
  if (!text) return undefined as T;
  try {
    return JSON.parse(text) as T;
  } catch {
    return text as unknown as T;
  }
}

function buildError(res: Response, body: unknown): ApiError {
  const obj = (body && typeof body === "object" ? body : {}) as {
    message?: string;
    status?: number;
    code?: string;
    errors?: Record<string, string>;
  };
  return new ApiError(
    res.status,
    obj.message || `Request failed: ${res.status} ${res.statusText}`,
    obj.code || null,
    obj.errors || {}
  );
}

export async function httpRequest<T = unknown>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = "GET", body, query, headers, signal } = options;
  const url = buildUrl(endpoint, query);

  let res: Response;
  try {
    res = await fetch(url, {
      method,
      headers: buildHeaders(headers),
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch (e) {
    if (e instanceof DOMException && e.name === "AbortError") throw e;
    throw new NetworkError(e instanceof Error ? e.message : undefined);
  }

  if (res.status === 401 || res.status === 403) {
    clearAuth();
    if (typeof window !== "undefined" && !window.location.pathname.startsWith("/login")) {
      window.location.href = "/login";
    }
    throw new AuthError();
  }

  const parsed = await parseResponse<unknown>(res);

  if (!res.ok) {
    throw buildError(res, parsed);
  }

  return parsed as T;
}

export const apiBaseUrl = BASE_URL;
