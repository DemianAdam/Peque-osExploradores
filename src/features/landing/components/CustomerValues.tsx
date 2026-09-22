export function CustomerValues() {
  return (
    <section id="propuesta" className="py-24">
      <div className="max-w-[1180px] mx-auto px-5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-[30px] mb-11">
          <div className="max-w-[670px]">
            <div className="inline-flex items-center gap-2 text-[0.78rem] font-extrabold tracking-[0.10em] uppercase text-[#f47718] mb-3">
              <span className="w-[25px] h-[3px] rounded-full bg-currentColor"></span>
              Nuestra mirada
            </div>
            <h2 className="text-[clamp(2.2rem,4.6vw,3.7rem)] font-extrabold text-[#0b3159] tracking-[-0.04em] leading-[1.02] mb-3.5">
              La infancia como protagonista.
            </h2>
            <p className="text-[#657583] text-base sm:text-lg">
              Creemos en espacios donde los chicos puedan sentirse libres para explorar, expresarse y disfrutar del aprendizaje sin dejar de ser niños.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[18px]">
          {/* Card 1 */}
          <article className="min-h-[260px] p-[30px] border border-[rgba(11,49,89,0.06)] rounded-[26px] relative overflow-hidden shadow-[0_14px_36px_rgba(11,49,89,0.09)] bg-[#fff0e4]">
            <div className="absolute w-[130px] h-[130px] right-[-44px] bottom-[-48px] rounded-full bg-white/35 pointer-events-none"></div>
            <div className="w-[54px] h-[54px] grid place-items-center mb-[22px] rounded-[17px] bg-white text-[#f47718] text-[1.25rem] font-black shadow-[0_9px_20px_rgba(11,49,89,0.06)]">
              ✦
            </div>
            <h3 className="text-[1.18rem] font-extrabold text-[#0b3159] mb-[11px] tracking-[-0.04em]">Aprender haciendo</h3>
            <p className="text-[#586978] text-[0.95rem] max-w-[31ch]">Cada experiencia parte de lo concreto: tocar, mezclar, construir, probar, observar y descubrir qué podemos hacer.</p>
          </article>

          {/* Card 2 */}
          <article className="min-h-[260px] p-[30px] border border-[rgba(11,49,89,0.06)] rounded-[26px] relative overflow-hidden shadow-[0_14px_36px_rgba(11,49,89,0.09)] bg-[#eff9e5]">
            <div className="absolute w-[130px] h-[130px] right-[-44px] bottom-[-48px] rounded-full bg-white/35 pointer-events-none"></div>
            <div className="w-[54px] h-[54px] grid place-items-center mb-[22px] rounded-[17px] bg-white text-[#70b83b] text-[1.25rem] font-black shadow-[0_9px_20px_rgba(11,49,89,0.06)]">
              ↗
            </div>
            <h3 className="text-[1.18rem] font-extrabold text-[#0b3159] mb-[11px] tracking-[-0.04em]">Jugar con propósito</h3>
            <p className="text-[#586978] text-[0.95rem] max-w-[31ch]">El juego abre oportunidades para desarrollar habilidades, ganar confianza, expresarse y conocer nuevos intereses.</p>
          </article>

          {/* Card 3 */}
          <article className="min-h-[260px] p-[30px] border border-[rgba(11,49,89,0.06)] rounded-[26px] relative overflow-hidden shadow-[0_14px_36px_rgba(11,49,89,0.09)] bg-[#fff9d8]">
            <div className="absolute w-[130px] h-[130px] right-[-44px] bottom-[-48px] rounded-full bg-white/35 pointer-events-none"></div>
            <div className="w-[54px] h-[54px] grid place-items-center mb-[22px] rounded-[17px] bg-white text-[#af8200] text-[1.25rem] font-black shadow-[0_9px_20px_rgba(11,49,89,0.06)]">
              ♥
            </div>
            <h3 className="text-[1.18rem] font-extrabold text-[#0b3159] mb-[11px] tracking-[-0.04em]">Compartir y crecer</h3>
            <p className="text-[#586978] text-[0.95rem] max-w-[31ch]">Mientras jugamos también practicamos esperar, escuchar, compartir, ayudar y disfrutar de la compañía de otros.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
