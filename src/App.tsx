import { Authenticated, Unauthenticated } from "convex/react";
import { Route, Routes } from "react-router";
import { ProtectedLayout } from "./app/ProtectedLayout";
import LoginPage from "./features/auth/pages/LoginPage";
import DashboardPage from "./features/dashboard/pages/DashboardPage";
import ChildrenPage from "./features/children/pages/ChildrenPage";
import ChildrenCreator from "./features/children/pages/ChildrenCreator";
import GroupsPage from "./features/groups/pages/GroupsPage";
import GroupCreator from "./features/groups/pages/GroupCreator";
import TeachersPage from "./features/teachers/pages/TeachersPage";
import FeesPage from "./features/fees/pages/FeesPage";
import PaymentsPage from "./features/payments/pages/PaymentsPage";
import PaymentCreator from "./features/payments/pages/PaymentCreator";
import InvoicesPage from "./features/invoices/pages/InvoicesPage";
import InvoiceCreator from "./features/invoices/pages/InvoiceCreator";
import PayslipsPage from "./features/payslips/pages/PayslipsPage";

export default function App() {
  return (
    <>
      <Unauthenticated>
        <Routes>
          <Route index element={<LoginPage />} />
        </Routes>
      </Unauthenticated>

      <Authenticated>
        <Routes>
          <Route path="/" element={<ProtectedLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="chicos" element={<ChildrenPage />} />
            <Route path="chicos/nuevo" element={<ChildrenCreator />} />
            <Route path="cuotas" element={<FeesPage />} />
            <Route path="pagos" element={<PaymentsPage />} />
            <Route path="pagos/nuevo" element={<PaymentCreator />} />
            <Route path="seños" element={<TeachersPage />} />
            <Route path="gastos" element={<InvoicesPage />} />
            <Route path="gastos/nuevo" element={<InvoiceCreator />} />
            <Route path="liquidaciones" element={<PayslipsPage />} />
            <Route path="grupos" element={<GroupsPage />} />
            <Route path="grupos/nuevo" element={<GroupCreator />} />
          </Route>
        </Routes>
      </Authenticated>
    </>
  );
}