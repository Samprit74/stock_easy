import { httpRequest } from "./httpClient";
import type {
  Page,
  PageResponse,
  UpdateProfileRequest,
  UpdateRoleRequest,
  UserResponse,
} from "@/types";

function toPage<T>(res: PageResponse<T>, fallbackPage: number): Page<T> {
  return {
    items: res.content ?? [],
    currentPage: res.number ?? fallbackPage,
    totalPages: res.totalPages ?? 0,
    totalItems: res.totalElements ?? 0,
  };
}

export function getMe(): Promise<UserResponse> {
  return httpRequest<UserResponse>("/users/me");
}

export function updateMe(payload: UpdateProfileRequest): Promise<UserResponse> {
  return httpRequest<UserResponse>("/users/me", {
    method: "PUT",
    body: payload,
  });
}

export function listUsers(page = 0, size = 10): Promise<Page<UserResponse>> {
  return httpRequest<PageResponse<UserResponse>>("/users", {
    query: { page, size },
  }).then((res) => toPage(res, page));
}

export function updateUserRole(
  userId: number,
  payload: UpdateRoleRequest
): Promise<UserResponse> {
  return httpRequest<UserResponse>(`/users/${userId}/role`, {
    method: "PUT",
    body: payload,
  });
}

export function deleteUser(userId: number): Promise<void> {
  return httpRequest<void>(`/users/${userId}`, { method: "DELETE" });
}
