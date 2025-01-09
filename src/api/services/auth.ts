import { publicClient } from "../axiosInstance";
import {
  AuthTokens,
  LoginCredentials,
  LoginResponse,
  RegisterCredentials,
  RegisterResponse,
} from "../../types/auth";
const TOKEN_STORAGE_KEY =
  process.env.REACT_APP_TOKEN_STORAGE_KEY || "authToken";
const AUTH_API_URL = "/auth";

export const authApiService = {
  setTokens(tokens: AuthTokens): void {
    localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(tokens));
  },

  getTokens(): AuthTokens | null {
    const tokens = localStorage.getItem(TOKEN_STORAGE_KEY);
    return tokens ? JSON.parse(tokens) : null;
  },

  clearTokens(): void {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  },

  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await publicClient.post<LoginResponse>(
      `${AUTH_API_URL}/login`,
      credentials
    );
    // authService.setTokens(response.data);
    return response.data;
  },
  register: async (
    credentials: RegisterCredentials
  ): Promise<RegisterResponse> => {
    try {
      const response = await publicClient.post<RegisterResponse>(
        `${AUTH_API_URL}/register`,
        credentials
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  refreshToken: async (): Promise<string | null> => {
    try {
      const response = await publicClient.post<LoginResponse>("/auth/refresh");
      const { accessToken } = response.data;

      return accessToken;
    } catch (error) {
      throw error;
    }
  },
};
