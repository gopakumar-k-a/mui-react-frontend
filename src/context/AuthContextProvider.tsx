import React, { createContext, useState, ReactNode, useEffect } from "react";
import { User } from "types/auth";
export interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string, user?: User) => void;
  logout: () => void;
  token: string | null;
  userData: User | null;
}
const TOKEN_STORAGE_KEY =
  process.env.REACT_APP_TOKEN_STORAGE_KEY || "authToken";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null; 
  });
  
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);

    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, []);

  const login = (token: string, user: User | null = null) => {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
    setToken(token);
    if (user) {
      const userData = {
        name: user.name || "",
        username: user.userName || "",
      };
      localStorage.setItem("user", JSON.stringify(userData));
      setUserData(user);
    }

    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem("user"); 
    setToken(null);
    setUserData(null);
    setIsAuthenticated(false);
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, token, userData }}
    >
      {children}
    </AuthContext.Provider>
  );
};
