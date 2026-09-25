export type UserRole = "USER" | "ADMIN";

export interface User {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}