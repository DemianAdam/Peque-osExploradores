import {  Authenticated, Unauthenticated } from "convex/react";
import { Route, Routes } from "react-router";
import { ProtectedLayout } from "./ProtectedLayout";

import Login from './sections/Login';
import Dashboard from "./sections/Dashboard";
import Childrens from "./sections/Childrens";
import Payments from "./sections/Payments";
import Teachers from "./sections/Teachers";
import Invoices from "./sections/Invoices";
import Payslips from "./sections/Payslips";



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
            <Route path="children" element={<Childrens />} />
            <Route path="payments" element={<Payments />} />
            <Route path="teachers" element={<Teachers />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="payslips" element={<Payslips />} />
          </Route>
        </Routes>
      </Authenticated>
      
    </>
  );
}