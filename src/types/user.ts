export interface UpdatePasswordCredentials {
    currentPassword: string;
    newPassword: string;
    confirmPassword:string;
  }
  
export interface UpdatePasswordResponse {
    message: string;
    success: boolean;
  }

  