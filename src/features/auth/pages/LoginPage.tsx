import InputField from '@ui/InputField';
import logo from '@/assets/images/logo_pequenos.png';
import rainbowBg from '@/assets/images/rainbow.avif';
import { useAuthActions } from '@convex-dev/auth/react';

export default function Login() {
  const { signIn } = useAuthActions();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await signIn("password", formData);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("No se pudo iniciar sesión. Verifica tus credenciales.");
    }
  }

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center px-4 py-8 bg-cover bg-center overflow-y-auto"
      style={{ backgroundImage: `url(${rainbowBg})` }}
    >
      {/* Contenedor tipo Card centrado con ancho controlado y respiro vertical */}
      <div className="w-full max-w-sm bg-[#C6E5D9]/95 backdrop-blur-md p-6 sm:p-8 rounded-3xl shadow-2xl flex flex-col items-center border border-white/55 my-auto">

        {/* Logo */}
        <img
          src={logo}
          alt="Pequeños Exploradores"
          className="w-48 sm:w-56 object-contain mb-2"
        />

        {/* Título */}
        <h1 className="text-xl sm:text-2xl font-bold text-orange-500 mb-5 drop-shadow-sm">
          Iniciar Sesión
        </h1>

        {/* Formulario */}
        <form
          className="w-full flex flex-col gap-3.5"
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

          {/* Botón */}
          <div className="mt-4 flex justify-center">
            <button
              type="submit"
              className="w-full py-2.5 bg-[#F9A8D4] hover:bg-pink-400 text-gray-800 font-bold rounded-xl shadow-md transition-all text-base cursor-pointer"
            >
              Ingresar
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}