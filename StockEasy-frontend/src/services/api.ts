// src/services/api.ts

const BASE_URL = "http://localhost:8082/api";

/**
 * Generic API request helper
 * Matches Spring Boot REST APIs
 */
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    body: options.body,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "API request failed");
  }

  // Handle empty response (DELETE, etc.)
  if (response.status === 204) {
    return null as T;
  }

  return response.json() as Promise<T>;
}
