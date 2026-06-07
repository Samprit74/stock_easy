import type { Role } from "./api";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  role: Role;
}

export interface AuthResponse {
  token: string;
  username: string;
  role: string;
}

export interface StoredUser {
  username: string;
  role: string;
}
