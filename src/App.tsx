import { Authenticated, Unauthenticated } from "convex/react";
import { Route, Routes } from "react-router";
import { ProtectedLayout } from "./TeacherLayout";
import Login from './sections/Login';
import Test from "./Test";

export default function App() {
  return (
    <>
      <Unauthenticated>
        <Login />
      </Unauthenticated>
      
      <Authenticated>
        <Routes>
          <Route path="admin" element={<ProtectedLayout />}>
            <Route index element={<Test />} />
          </Route>
        </Routes>
      </Authenticated>
    </>
  );
}