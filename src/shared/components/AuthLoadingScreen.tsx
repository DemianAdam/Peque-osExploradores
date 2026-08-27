import logo from "@/assets/images/logo_pequenos.png";

export function AuthLoadingScreen() {
  return (
    <div className="min-h-screen w-full bg-[#C6E5D9] flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-98.25 flex flex-col items-center animate-pulse">
        <img
          src={logo}
          alt="Pequeños Exploradores"
          className="w-64 object-contain mb-8"
        />
        <p className="text-orange-500 font-bold text-xl drop-shadow-sm">
          Cargando...
        </p>
      </div>
    </div>
  );
}