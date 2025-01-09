import { AxiosError } from "axios";
import { useState } from "react";
import { ApiError } from "types/apiType";


type ApiErrorHandler = {
  handleApiError: (error: unknown) => void;
  apiErrors: string[];
  clearApiErrors: () => void;
};

export const useApiErrorHandler = (): ApiErrorHandler => {
  const [apiErrors, setApiErrors] = useState<string[]>([]);

  const handleApiError = (error: unknown) => {
    const apiError = error as AxiosError<ApiError>;

    if (apiError.response) {
      const { status, data } = apiError.response;

      if (data) {
        if (Array.isArray(data.errors)) {
          setApiErrors(data.errors);
        } else if (data.error) {
          setApiErrors([data.error]);
        } else {
          setApiErrors([`Error ${status}: ${apiError.response.statusText || "Unexpected error"}`]);
        }
      } else {
        setApiErrors([`Error ${status}: ${apiError.response.statusText || "Unexpected error"}`]);
      }
    } else if (apiError.request) {
      setApiErrors(["No response from server. Please check your network connection."]);
    } else {
      setApiErrors([apiError.message || "An unexpected error occurred"]);
    }

    console.error("Error during API call:", apiError);
  };

  const clearApiErrors = () => setApiErrors([]);

  return { handleApiError, apiErrors, clearApiErrors };
};
