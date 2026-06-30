import {  Authenticated, Unauthenticated } from "convex/react";
import { Route, Routes } from "react-router";
import { ProtectedLayout } from "./ProtectedLayout";

import Login from './sections/Login';
import Dashboard from "./sections/Dashboard";



export default function App() {
  return (
    <>
      <Unauthenticated>
        <Routes>
          <Route index element={<Login />} />
        </Routes>
      </Unauthenticated>

      <Authenticated>
        <Routes>
          <Route path="/" element={<ProtectedLayout />}>
            <Route index element={<Dashboard />} />
          </Route>
        </Routes>
      </Authenticated>
      
    </>
  );
}