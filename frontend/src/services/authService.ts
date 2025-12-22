import instance from "../config/axios";
import type {
  LoginPayload,
  RegisterPayload,
  AuthResponse,
} from "../types/Auth";

function toAuthResponse(d: any): AuthResponse {
  return {
    accessToken: String(d.accessToken ?? ""),
    refreshToken: String(d.refreshToken ?? ""),
    userId: Number(d.userId),
    username: String(d.username ?? ""),
    email: String(d.email ?? ""),
  };
}

export const authService = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const res = await instance.post("/auth/login", payload);
    if (!res.data?.data) throw new Error("Login failed");
    return toAuthResponse(res.data.data);
  },

  async register(payload: RegisterPayload): Promise<{
    username: string;
    email: string;
  }> {
    const res = await instance.post("/auth/register", payload);
    if (!res.data?.data) throw new Error("Register failed");
    return {
      username: res.data.data.username,
      email: res.data.data.email,
    };
  },

  async refresh(refreshToken: string): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const res = await instance.post("/auth/refresh", { refreshToken });
    if (!res.data?.data) throw new Error("Refresh failed");
    return {
      accessToken: res.data.data.accessToken,
      refreshToken: res.data.data.refreshToken,
    };
  },

  async logout(refreshToken: string): Promise<void> {
    await instance.post("/auth/logout", { refreshToken });
  },
};
