import logo from "@/assets/images/newLogo.jpg";

export function CustomerNavbar() {
  return (
    <header className="sticky top-0 z-40 bg-[rgba(255,250,240,0.88)] backdrop-blur-lg border-b border-[rgba(11,49,89,0.08)]">
      <div className="max-w-[1180px] mx-auto px-5 min-h-[80px] flex items-center justify-between gap-6">
        <a href="#inicio" className="flex items-center gap-3 font-extrabold text-[#0b3159] whitespace-nowrap group">
          <div className="relative">
            <img src={logo} alt="Pequeños Exploradores" className="w-[52px] h-[52px] object-cover rounded-full ring-2 ring-[#f47718] group-hover:scale-105 transition-transform" />
            
          </div>
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-black tracking-tight text-[#0b3159]">Pequeños Exploradores</span>
            <span className="text-[10px] font-bold text-[#f47718] uppercase tracking-wider">Espacio Recreativo</span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-[#496172] font-bold text-[0.95rem]">
          <a href="#propuesta" className="hover:text-[#f47718] transition-colors">Propuesta</a>
          <a href="#experiencias" className="hover:text-[#70b83b] transition-colors">Experiencias</a>
          <a href="#equipo" className="hover:text-[#38bdf8] transition-colors">Equipo</a>
          <a href="#preguntas" className="hover:text-[#ff65a3] transition-colors">Preguntas</a>
          <a 
            href="#contacto" 
            className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-full bg-gradient-to-r from-[#ff65a3] via-[#f47718] to-[#f7cf3d] text-white font-extrabold text-[0.95rem] shadow-[0_10px_25px_rgba(244,118,25,0.3)] hover:scale-105 transition-all"
          >
            Consultar ✦
          </a>
        </nav>
      </div>
    </header>
  );
}
