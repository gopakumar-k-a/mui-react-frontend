export interface UpdatePasswordCredentials {
    currentPassword: string;
    newPassword: string;
    confirmPassword:string;
  }
  
export interface UpdatePasswordResponse {
    message: string;
    success: boolean;
  }


  export interface FormDataPayload {
    text: string;
    email: string;
    password: string;
    date: string;
    number: string | number; 
    checkbox: boolean;
    radio: string;
    textarea: string;
    select: string;
  }
  