import { Outlet } from "react-router";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { Teacher } from "../convex/teachers/types";

export function ProtectedLayout() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const teacher = useQuery(api.teachers.queries.getCurrentTeacher);

  console.log(teacher?._id)
  if (isLoading) return <p>Loading...</p>;
  if (!isAuthenticated || !teacher) return <div>Error</div>;

  return <Outlet context={teacher satisfies Teacher} />;
}