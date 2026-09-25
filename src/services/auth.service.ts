import api from "@/lib/api";
import type {
  AuthResponse,
  User,
} from "@/types/auth";

interface RegisterPayload {
  name: string;
  email?: string;
  phone?: string;
  password: string;
}

interface LoginPayload {
  email?: string;
  phone?: string;
  password: string;
}

interface MeResponse {
  success: boolean;
  message: string;
  data: User;
}

export const registerUser = async (
  payload: RegisterPayload
) => {
  const response = await api.post<AuthResponse>(
    "/auth/register",
    payload
  );

  return response.data;
};

export const loginUser = async (
  payload: LoginPayload
) => {
  const response = await api.post<AuthResponse>(
    "/auth/login",
    payload
  );

  return response.data;
};

export const getMe = async (): Promise<User> => {
  const response =
    await api.get<MeResponse>("/auth/me");

  return response.data.data;
};