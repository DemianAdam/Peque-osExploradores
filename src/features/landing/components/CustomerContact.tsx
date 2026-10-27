export function CustomerContact() {
  return (
    <section id="contacto" className="py-7 bg-[#fffaf0]">
      <div className="max-w-[1180px] mx-auto px-5">
        <div className="p-8 sm:p-[68px] rounded-[42px] bg-[linear-gradient(135deg,#ff65a3_0%,#f47718_50%,#f7cf3d_100%)] text-white relative overflow-hidden shadow-2xl">
          
          <div className="absolute w-[440px] h-[440px] right-[-220px] top-[-240px] rounded-full border border-white/30 pointer-events-none"></div>
          <div className="absolute w-[250px] h-[250px] left-[-150px] bottom-[-170px] rounded-full bg-white/15 pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-[50px] items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[0.78rem] font-black tracking-[0.10em] uppercase mb-4 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                Inscripciones abiertas
              </div>
              <h2 className="text-[clamp(2.2rem,4.6vw,3.7rem)] font-extrabold text-white tracking-[-0.04em] leading-[1.02] mb-4">
                ¿Quieren conocer Pequeños Exploradores?
              </h2>
              <p className="text-white/95 max-w-[630px] text-base sm:text-lg leading-relaxed mb-8 font-medium">
                No hace falta completar formularios: escribinos, contanos la edad de tu peque y te compartimos toda la información para coordinar el próximo paso.
              </p>
              <div>
                <a 
                  href="https://www.instagram.com/taller_pequesexploradores/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center justify-center min-h-[52px] px-8 rounded-full bg-white text-[#0b3159] font-extrabold text-[0.98rem] shadow-xl hover:scale-105 transition-all gap-3"
                >
                  Escribir por Instagram <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

            <div className="p-7 rounded-[28px] bg-[#0b3159]/95 shadow-[0_20px_45px_rgba(11,49,89,0.2)] backdrop-blur-md border border-white/20">
              <div className="flex items-center gap-4 py-3.5">
                <div className="w-[42px] h-[42px] grid place-items-center rounded-[14px] bg-[#ff65a3] text-white font-black shadow-sm">◎</div>
                <div>
                  <strong className="block text-[0.95rem] text-white">Instagram</strong>
                  <span className="block text-white/70 text-[0.84rem]">@taller_pequesexploradores</span>
                </div>
              </div>
              <div className="flex items-center gap-4 py-3.5 border-t border-white/10">
                <div className="w-[42px] h-[42px] grid place-items-center rounded-[14px] bg-[#70b83b] text-white font-black shadow-sm">⌖</div>
                <div>
                  <strong className="block text-[0.95rem] text-white">Ubicación</strong>
                  <span className="block text-white/70 text-[0.84rem]">Mina Clavero · La llamada Escénica</span>
                </div>
              </div>
              <div className="flex items-center gap-4 py-3.5 border-t border-white/10">
                <div className="w-[42px] h-[42px] grid place-items-center rounded-[14px] bg-[#38bdf8] text-white font-black shadow-sm">◷</div>
                <div>
                  <strong className="block text-[0.95rem] text-white">Horarios</strong>
                  <span className="block text-white/70 text-[0.84rem]">Lunes a jueves · 2 horas</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
