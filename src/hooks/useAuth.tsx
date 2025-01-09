import { AuthContext } from "context/AuthContextProvider";
import { useContext } from "react";
import { AuthContextType } from "context/AuthContextProvider";

  export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
  };