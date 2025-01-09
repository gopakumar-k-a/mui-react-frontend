import { privateClient } from "../axiosInstance";
import { UpdatePasswordCredentials } from "../../types/user";
import { FormDataPayload } from "../../types/user";
import { FormSubmit, normalResponse } from "types/apiType";
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

  uploadForm: async (fileData: FormData): Promise<FormData> => {
    try {
      const response = await privateClient.post<FormData>(
        `${USER_API_URL}/upload-files`,
        fileData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
