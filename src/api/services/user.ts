import { privateClient } from "../axiosInstance";
import { UpdatePasswordCredentials, UpdatePasswordResponse } from "../../types/user";
import { normalResponse } from "types/apiType";
const USER_API_URL = "/user";

export const userApiService = {
  updatePassword: async (
    credentials: UpdatePasswordCredentials
  ): Promise<normalResponse> => {
    try {
      const response = await privateClient.put<normalResponse>(
        `${USER_API_URL}/change-password`,
        credentials
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
