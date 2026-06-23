import InputField from '../components/UI/InputField';
import logo from '../assets/images/logo_pequenos.png';
import { useAuthActions } from '@convex-dev/auth/react';

export default function Login() {
  const { signIn } = useAuthActions();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await signIn("password", formData);
  }

  return (
    <div className="min-h-screen w-full bg-[#C6E5D9] flex flex-col items-center pt-12 px-6">

      <div className="w-full max-w-98.25 flex flex-col items-center">

        {/* Logo */}
        <img
          src={logo}
          alt="Pequeños Exploradores"
          className="w-64 object-contain mb-8"
        />

        {/* Título */}
        <h1 className="text-3xl font-bold text-orange-500 mb-8 drop-shadow-sm">
          Iniciar Sesión
        </h1>

        {/* Contenedor Visual */}
        <form
          className="w-full flex flex-col gap-2"
          onSubmit={handleSubmit}
        >

          <InputField
            label="Usuario"
            id="username"
            type="text"
          />

          <InputField
            label="Contraseña"
            id="password"
            type="password"
          />
          
          <input type='hidden' name='flow' value='signIn' />

          {/* Botón Visual */}
          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              className="px-10 py-3 bg-[#F9A8D4] hover:bg-pink-400 text-gray-800 font-bold rounded-full shadow-md transition-all text-xl"
            >
              Ingresar
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}