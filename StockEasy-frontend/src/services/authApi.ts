import { apiRequest } from "./api";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  role: "ADMIN" | "STAFF";
}

export interface AuthResponse {
  token: string;
  username: string;
  role: string;
}

export function loginApi(payload: LoginRequest): Promise<AuthResponse> {
  return apiRequest<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function registerApi(payload: RegisterRequest): Promise<void> {
  return apiRequest<void>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
