import { useState } from "react";

const expectedUsername = import.meta.env.VITE_ADMIN_USERNAME as string;
const expectedPassword = import.meta.env.VITE_ADMIN_PASSWORD as string;

export function useAuth() {
  const initialAuthState = localStorage.getItem("isAuthenticated") === "true";
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAuthState);

  const login = (username: string, password: string) => {
    console.log(username, password, expectedUsername, expectedPassword);
    
    if (username === expectedUsername && password === expectedPassword) {
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
    } else {
      setIsAuthenticated(false);
      localStorage.removeItem("isAuthenticated");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  return { isAuthenticated, login, logout };
}
