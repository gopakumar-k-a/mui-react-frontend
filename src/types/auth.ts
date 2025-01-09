import { AxiosError } from "axios";
import { ApiError, normalResponse } from "./apiType";
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  userName: string;
  name: string;
}
export interface RegisterCredentials {
  name: string;
  address: string;
  gender: string;
  userName: string;
  password: string;
}

export interface RegisterResponse extends normalResponse {
  accessToken: string;
}
export interface LoginCredentials {
  userName: string;
  password: string;
}

export interface LoginResponse extends normalResponse {
  accessToken: string;
  user:User
}
export type ApiErrorResponse = AxiosError<ApiError>;