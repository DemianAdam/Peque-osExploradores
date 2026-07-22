import {  Authenticated, Unauthenticated } from "convex/react";
import { Route, Routes } from "react-router";
import { ProtectedLayout } from "./ProtectedLayout";

import Login from './sections/Login';
import Dashboard from "./sections/Dashboard";

import Fees from "./sections/Fees";
import Payments from "./sections/Payments";
import Teachers from "./sections/Teachers";
import Invoices from "./sections/Invoices/Invoices";
import Payslips from "./sections/Payslips";
import Groups from "./sections/Groups/Groups";
import GroupCreator from "./sections/Groups/GroupCreator";
import ChildrenEditor from "./sections/Children/ChildrenEditor";
import Children from "./sections/Children/Children";
import ChildrenCreator from "./sections/Children/ChildrenCreator";
import InvoicesCreator from "./sections/Invoices/InvoicesCreator";



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
            <Route path="chicos" element={<Children />} />
            <Route path="chicos/editar/:id" element={<ChildrenEditor />} />
            <Route path="chicos/nuevo" element={<ChildrenCreator />} />
            <Route path="cuotas" element={<Fees />} />
            <Route path="pagos" element={<Payments />} />
            <Route path="seños" element={<Teachers />} />
            <Route path="gastos" element={<Invoices />} />
            <Route path="gastos/nuevo" element={<InvoicesCreator />} />
            <Route path="liquidaciones" element={<Payslips />} />
            <Route path="grupos" element={<Groups />} />
            <Route path="grupos/nuevo" element={<GroupCreator />} />

          </Route>
        </Routes>
      </Authenticated>
      
    </>
  );
}