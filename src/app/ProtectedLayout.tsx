import { Outlet } from "react-router";
import { Header } from "@ui/Header";
import { useAuth } from "./AuthContext";
import { AuthLoadingScreen } from "@shared/components/AuthLoadingScreen";
import { AuthErrorScreen } from "@shared/components/AuthErrorScreen";

export function ProtectedLayout() {
  const { teacher, isLoading, error } = useAuth();

  if (isLoading) return <AuthLoadingScreen />;
  if (error) return <AuthErrorScreen error={error} />;
  if (!teacher) return <AuthErrorScreen error={new Error("No teacher found")} />;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />
      <main>
        <Outlet context={teacher} />
      </main>
    </div>
  );
}