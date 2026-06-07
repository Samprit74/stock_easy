import type { Role } from "./api";

export interface UserResponse {
  id: number;
  username: string;
  role: Role;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  businessName: string | null;
  country: string | null;
  state: string | null;
  city: string | null;
  streetAddress: string | null;
  pinCode: string | null;
  gstNumber: string | null;
  aadhaarNumber: string | null;
  panCardNumber: string | null;
  drugLicenseNumber: string | null;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  businessName?: string;
  country?: string;
  state?: string;
  city?: string;
  streetAddress?: string;
  pinCode?: string;
  gstNumber?: string;
  aadhaarNumber?: string;
  panCardNumber?: string;
  drugLicenseNumber?: string;
}

export interface UpdateRoleRequest {
  role: Role;
}
