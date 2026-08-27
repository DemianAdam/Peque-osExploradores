import { createContext, useContext } from "react";
import { Teacher } from "@shared/types/convex";

interface AuthContextValue {
  teacher: Teacher | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: Error | null;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}