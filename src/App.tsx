import { Authenticated, Unauthenticated } from "convex/react";
import { Route, Routes } from "react-router";
import { useAuthActions } from '@convex-dev/auth/react'
import { ProtectedLayout } from "./TeacherLayout";
import Test from "./Test";

export default function App() {
  const { signIn } = useAuthActions();
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await signIn("password", formData);
  }


  return (
    <>
      <Unauthenticated>
        <div>Inicia Sesion</div>
        <form onSubmit={handleSubmit}>
          <input type='text' name='username' placeholder='Usuario...' />
          <input type='text' name='password' placeholder='Contraseña...' />
          <input type='hidden' name='flow' value='signIn' />
          <button
            type="submit"
            className="w-full group relative flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 transition-all duration-300 shadow-lg shadow-red-900/20"
          >
            Ingresar
          </button>
        </form>
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

