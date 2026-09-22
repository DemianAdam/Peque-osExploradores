export function CustomerContact() {
  return (
    <section id="contacto" className="py-24 bg-[#fffaf0]">
      <div className="max-w-[1180px] mx-auto px-5">
        <div className="p-8 sm:p-[68px] rounded-[40px] bg-[linear-gradient(135deg,#f47718_0%,#f48b38_46%,#f39ab4_100%)] text-white relative overflow-hidden shadow-xl">
          
          <div className="absolute w-[440px] h-[440px] right-[-220px] top-[-240px] rounded-full border border-white/28 pointer-events-none"></div>
          <div className="absolute w-[250px] h-[250px] left-[-150px] bottom-[-170px] rounded-full bg-white/12 pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-[50px] items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-[0.78rem] font-extrabold tracking-[0.10em] uppercase text-[#f7cf3d] mb-3">
                <span className="w-[25px] h-[3px] rounded-full bg-currentColor"></span>
                Inscripciones abiertas
              </div>
              <h2 className="text-[clamp(2.2rem,4.6vw,3.7rem)] font-extrabold text-white tracking-[-0.04em] leading-[1.02] mb-3.5">
                ¿Quieren conocer Pequeños Exploradores?
              </h2>
              <p className="text-white/88 max-w-[630px] text-base sm:text-lg leading-relaxed mb-6">
                No hace falta completar formularios: escribinos, contanos la edad de tu peque y te compartimos toda la información para coordinar el próximo paso.
              </p>
              <div>
                <a 
                  href="https://www.instagram.com/taller_pequesexploradores/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-full bg-white text-[#0b3159] font-extrabold text-[0.92rem] shadow-lg hover:shadow-xl transition-all gap-2"
                >
                  Escribir por Instagram <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

            <div className="p-6 rounded-[24px] bg-[#0b3159]/96 shadow-[0_18px_38px_rgba(11,49,89,0.14)] backdrop-blur-md">
              <div className="flex items-center gap-3 py-3">
                <div className="w-[38px] h-[38px] grid place-items-center rounded-[12px] bg-white/8 text-white font-black">◎</div>
                <div>
                  <strong className="block text-[0.9rem] text-white">Instagram</strong>
                  <span className="block text-white/68 text-[0.82rem]">@taller_pequesexploradores</span>
                </div>
              </div>
              <div className="flex items-center gap-3 py-3 border-t border-white/10">
                <div className="w-[38px] h-[38px] grid place-items-center rounded-[12px] bg-white/8 text-white font-black">⌖</div>
                <div>
                  <strong className="block text-[0.9rem] text-white">Ubicación</strong>
                  <span className="block text-white/68 text-[0.82rem]">Mina Clavero · La llamada Escénica</span>
                </div>
              </div>
              <div className="flex items-center gap-3 py-3 border-t border-white/10">
                <div className="w-[38px] h-[38px] grid place-items-center rounded-[12px] bg-white/8 text-white font-black">◷</div>
                <div>
                  <strong className="block text-[0.9rem] text-white">Horarios</strong>
                  <span className="block text-white/68 text-[0.82rem]">Lunes a jueves · 2 horas</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
