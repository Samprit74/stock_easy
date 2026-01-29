// src/services/authStorage.ts

const TOKEN_KEY = "stockeasy_token";
const USER_KEY = "stockeasy_user";

/* =======================
   TOKEN
======================= */

export function saveToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

/* =======================
   USER
======================= */

export type StoredUser = {
  username: string;
  role: string;
};

export function saveUser(user: StoredUser) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUser(): StoredUser | null {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function clearUser() {
  localStorage.removeItem(USER_KEY);
}

/* =======================
   FULL CLEAR
======================= */

export function clearAuth() {
  clearToken();
  clearUser();
}
