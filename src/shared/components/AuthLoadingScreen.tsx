import logo from "@/assets/images/newLogo.png";

export function AuthLoadingScreen() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm bg-[#C6E5D9]/95 backdrop-blur-md p-8 rounded-3xl shadow-2xl flex flex-col items-center border border-white/55 animate-pulse">
        <img
          src={logo}
          alt="Pequeños Exploradores"
          className="w-48 sm:w-56 object-contain mb-4"
        />
        <p className="text-orange-500 font-bold text-xl drop-shadow-sm">
          Cargando...
        </p>
      </div>
    </div>
  );
}