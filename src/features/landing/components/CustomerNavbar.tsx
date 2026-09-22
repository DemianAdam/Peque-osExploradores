import logo from "@/assets/images/newLogo.jpg";

export function CustomerNavbar() {
  return (
    <header className="sticky top-0 z-40 bg-[rgba(255,250,240,0.84)] backdrop-blur-lg border-b border-[rgba(11,49,89,0.07)]">
      <div className="max-w-[1180px] mx-auto px-5 min-h-[76px] flex items-center justify-between gap-6">
        <a href="#inicio" className="flex items-center gap-3 font-extrabold text-[#0b3159] whitespace-nowrap">
          <img src={logo} alt="Pequeños Exploradores" className="w-[52px] h-[52px] object-contain rounded-full" />
          <span className="text-sm sm:text-base">Pequeños Exploradores</span>
        </a>

        <nav className="hidden md:flex items-center gap-7 text-[#496172] font-bold text-[0.92rem]">
          <a href="#propuesta" className="hover:text-[#0b3159] transition-colors">Propuesta</a>
          <a href="#experiencias" className="hover:text-[#0b3159] transition-colors">Experiencias</a>
          <a href="#equipo" className="hover:text-[#0b3159] transition-colors">Equipo</a>
          <a href="#preguntas" className="hover:text-[#0b3159] transition-colors">Preguntas</a>
          <a 
            href="#contacto" 
            className="inline-flex items-center justify-center min-h-[48px] px-5 rounded-full bg-[#f47718] text-white font-extrabold text-[0.92rem] shadow-[0_12px_26px_rgba(244,118,25,0.22)] hover:shadow-[0_15px_34px_rgba(244,118,25,0.28)] transition-all"
          >
            Consultar
          </a>
        </nav>
      </div>
    </header>
  );
}
