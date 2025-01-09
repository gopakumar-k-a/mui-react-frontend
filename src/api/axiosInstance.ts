import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;
const TOKEN_STORAGE_KEY =
  process.env.REACT_APP_TOKEN_STORAGE_KEY || "authToken";

export const publicClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const privateClient: AxiosInstance = axios.create({
  baseURL: BASE_URL
});

privateClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);


privateClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error("Interceptor error:", error);

    if (error.response) {
      console.log("Response Data:", error.response.data);
      console.log("Response Status:", error.response.status);
    }

    const originalRequest = error.config;

    // Check for token expiration
    if (
      error.response?.status === 403 &&
      error.response?.data?.error === "jwt expired" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Call the refresh token endpoint
        const response = await axios.post(
          `${BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true } // Ensure cookies are sent for refresh
        );

        const { accessToken } = response.data;

        // Store the new access token
        localStorage.setItem(TOKEN_STORAGE_KEY, accessToken);

        // Update the original request with the new token
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

        // Retry the original request
        return privateClient(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);

        // Redirect to login on failure
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// privateClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     console.error('Interceptor error:', error);

//     if (error.response) {
//       console.log('Response Data:', error.response.data);
//       console.log('Response Status:', error.response.status);
//     } else {
//       console.log('Error without response:', error.message);
//     }

//     const originalRequest = error.config;

//     if (
//       error.response?.status === 403 &&
//       error.response?.data?.message === "jwt expired" &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;

//       try {
//         console.log("Attempting to refresh token...");

//         const response = await axios.post(
//           `${BASE_URL}/api/auth/refresh`,
//           {},
//           { withCredentials: true }
//         );

//         const { accessToken } = response.data;
//         console.log("New access token:", accessToken);

//         localStorage.setItem(TOKEN_STORAGE_KEY, accessToken);

//         originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
//         return privateClient(originalRequest); // Retry the original request
//       } catch (refreshError) {
//         console.error("Token refresh failed:", refreshError);
//         localStorage.removeItem(TOKEN_STORAGE_KEY);
//         window.location.href = "/login";
//         return Promise.reject(refreshError);
//       }
//     }

//     console.error("Interceptor error:", error);
//     return Promise.reject(error);
//   }
// );



