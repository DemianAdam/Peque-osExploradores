import logo from "@/assets/images/newLogo.jpg";

export function CustomerHero() {
  return (
    <section className="relative pt-[72px] pb-[74px] overflow-hidden bg-[radial-gradient(circle_at_8%_18%,rgba(244,118,25,0.11),transparent_21%),radial-gradient(circle_at_87%_12%,rgba(112,184,59,0.13),transparent_20%),radial-gradient(circle_at_55%_100%,rgba(110,213,207,0.12),transparent_25%)]">
      <div className="max-w-[1180px] mx-auto px-5 relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_0.95fr] items-center gap-[54px]">
        
        {/* Copy */}
        <div>
          <div className="inline-flex items-center gap-2 text-[0.78rem] font-extrabold tracking-[0.10em] uppercase text-[#f47718] mb-4">
            <span className="w-[25px] h-[3px] rounded-full bg-currentColor"></span>
            Un espacio para descubrir
          </div>
          
          <h1 className="text-[clamp(3.2rem,7vw,6.4rem)] font-extrabold text-[#0b3159] leading-[0.96] tracking-[-0.04em] mb-[22px]">
            Crecer jugando.<br />
            <span className="text-[#f47718] font-normal not-italic">Explorar aprendiendo.</span>
          </h1>

          <p className="max-w-[625px] text-[clamp(1.05rem,1.5vw,1.2rem)] text-[#657583] leading-relaxed mb-8">
            Un taller para niños y niñas de 1 a 4 años donde cada encuentro se transforma en una oportunidad para jugar, experimentar, crear y compartir.
          </p>

          <div className="flex flex-wrap gap-3 mb-6">
            <a 
              href="#contacto" 
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-full bg-[#f47718] text-white font-extrabold text-[0.92rem] shadow-[0_12px_26px_rgba(244,118,25,0.22)] hover:shadow-[0_15px_34px_rgba(244,118,25,0.28)] transition-all"
            >
              Quiero conocer el taller →
            </a>
            <a 
              href="https://www.instagram.com/taller_pequesexploradores/" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-full bg-white text-[#0b3159] border border-[#eadfce] font-extrabold text-[0.92rem] shadow-[0_14px_36px_rgba(11,49,89,0.09)] hover:shadow-lg transition-all"
            >
              Ver Instagram
            </a>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <span className="inline-flex items-center gap-2 px-3 py-2 bg-white/76 border border-[#eadfce] rounded-full text-[#476070] text-[0.81rem] font-extrabold shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#70b83b]"></span> 1 a 4 años
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-2 bg-white/76 border border-[#eadfce] rounded-full text-[#476070] text-[0.81rem] font-extrabold shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#70b83b]"></span> Lunes a jueves
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-2 bg-white/76 border border-[#eadfce] rounded-full text-[#476070] text-[0.81rem] font-extrabold shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#70b83b]"></span> 2 hs
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-2 bg-white/76 border border-[#eadfce] rounded-full text-[#476070] text-[0.81rem] font-extrabold shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#70b83b]"></span> Mina Clavero
            </span>
          </div>
        </div>

        {/* Visual / Photo */}
        <div className="relative min-h-[590px]">
          <div className="absolute z-30 top-[22px] right-[-16px] px-4 py-2.5 bg-[#f7cf3d] text-[#574600] rounded-full text-[0.75rem] font-black shadow-lg rotate-[5deg]">
            ✦ Inscripciones abiertas
          </div>

          <div className="absolute left-[3px] top-[56px] w-[140px] h-[140px] rounded-full bg-white p-2.5 shadow-2xl rotate-[-7deg] z-20">
            <img src={logo} alt="Logo" className="w-full h-full object-contain rounded-full" />
          </div>

          <div className="absolute inset-[10px_0_22px_54px] rounded-[48px] overflow-hidden shadow-[0_22px_60px_rgba(11,49,89,0.12)] border-[9px] border-white bg-[#e8edf0] rotate-[1deg]">
            <img 
              src="https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=1200&q=85" 
              alt="Niños explorando y jugando" 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute right-[4px] bottom-[38px] z-30 w-[238px] p-[18px] rounded-[23px] bg-[#0b3159] text-white shadow-2xl">
            <strong className="block mb-1 text-[1rem]">Aprendemos haciendo</strong>
            <span className="text-[rgba(255,255,255,0.76)] text-[0.82rem]">Juego, movimiento, arte, exploración y experiencias cotidianas.</span>
          </div>
        </div>

      </div>
    </section>
  );
}
