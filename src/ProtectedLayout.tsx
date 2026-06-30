import { Outlet } from "react-router";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { Teacher } from "../convex/teachers/types";
import { Header } from "./components/UI/Header";



export function ProtectedLayout() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const teacher = useQuery(api.teachers.queries.getCurrentTeacher);

  if (isLoading) return <p>Loading...</p>;
  if (!isAuthenticated || !teacher) return <div>Error</div>;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />
      <main>
        <Outlet context={teacher satisfies Teacher} />
      </main>
    </div>
  );
}