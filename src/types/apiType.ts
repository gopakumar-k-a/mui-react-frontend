export interface ApiError {
  errors?: string[];
  error?: string;
  message?: string;
}

export interface normalResponse {
  message: string;
  success: string;
}

export interface FormSubmit extends normalResponse {
  formErrors: string[];
  fileErrors: string[];
}
