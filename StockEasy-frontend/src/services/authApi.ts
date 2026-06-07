import { httpRequest } from "./httpClient";
import type { AuthResponse, LoginRequest, RegisterRequest } from "@/types";

export function login(payload: LoginRequest): Promise<AuthResponse> {
  return httpRequest<AuthResponse>("/auth/login", {
    method: "POST",
    body: payload,
  });
}

export function register(payload: RegisterRequest): Promise<void> {
  return httpRequest<void>("/auth/register", {
    method: "POST",
    body: payload,
  });
}
