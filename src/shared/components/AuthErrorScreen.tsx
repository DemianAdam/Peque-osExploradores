import { RefreshCw, LogOut } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";

interface AuthErrorScreenProps {
  error: Error;
}

export function AuthErrorScreen({ error }: AuthErrorScreenProps) {
  const { signOut } = useAuthActions();

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <div className="bg-red-50 text-red-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Error de Autenticación</h2>
        <p className="text-gray-600 mb-6 text-sm">
          {error.message || "No se pudo cargar la información del usuario."}
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-xl font-medium hover:bg-pink-600 transition"
          >
            <RefreshCw size={16} />
            Reintentar
          </button>
          <button
            onClick={async () => {
              await signOut();
              window.location.href = "/login";
            }}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition"
          >
            <LogOut size={16} />
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}