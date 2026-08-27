import { useState, ReactNode } from "react";
import { useConvexAuth } from "convex/react";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading: authLoading } = useConvexAuth();
  const [error, setError] = useState<Error | null>(null);

  const teacher = useQuery(api.teachers.queries.getCurrentTeacher);

  const isLoading = authLoading || (isAuthenticated && teacher === undefined && !error);

  if (isAuthenticated && teacher === undefined && !error) {
    return <></>;
  }

  if (isAuthenticated && teacher === null) {
    setError(new Error("No teacher found for this account"));
  }

  return (
    <AuthContext.Provider
      value={{
        teacher: teacher ?? null,
        isLoading,
        isAuthenticated,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}