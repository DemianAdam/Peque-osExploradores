import { useConvexAuth } from "convex/react";
import { Navigate, Route, Routes } from "react-router";
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
import { AuthLoadingScreen } from "./shared/components/AuthLoadingScreen";

export default function App() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  // Mientras Convex verifica la sesión, mostramos la pantalla de carga
  if (isLoading) {
    return <AuthLoadingScreen />;
  }

  return (
    <Routes>
      {/* 1. RUTA EXPLICITA DE LOGIN */}
      <Route 
        path="/login" 
        element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" replace />} 
      />

      {/* 2. RUTAS PROTEGIDAS (Solo si está autenticado) */}
      {isAuthenticated ? (
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
      ) : (
        /* Si no está autenticado y entra a cualquier otra ruta, lo mandamos al login */
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}

      {/* Si está autenticado pero pone una ruta inválida, lo mandamos al Dashboard */}
      {isAuthenticated && <Route path="*" element={<Navigate to="/" replace />} />}
    </Routes>
  );
}