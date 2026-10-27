export function CustomerValues() {
  const cards = [
    {
      bg: "bg-[#fff0f5]",
      border: "border-[#ff65a3]/30",
      iconBg: "bg-[#ff65a3]",
      symbol: "✦",
      title: "Aprender haciendo",
      desc: "Cada experiencia parte de lo concreto: tocar, mezclar, construir, probar, observar y descubrir qué podemos hacer."
    },
    {
      bg: "bg-[#f2ffee]",
      border: "border-[#70b83b]/30",
      iconBg: "bg-[#70b83b]",
      symbol: "↗",
      title: "Jugar con propósito",
      desc: "El juego abre oportunidades para desarrollar habilidades, ganar confianza, expresarse y conocer nuevos intereses."
    },
    {
      bg: "bg-[#fffde6]",
      border: "border-[#f7cf3d]/40",
      iconBg: "bg-[#f7cf3d]",
      symbol: "♥",
      title: "Compartir y crecer",
      desc: "Mientras jugamos también practicamos esperar, escuchar, compartir, ayudar y disfrutar de la compañía de otros."
    },
    {
      bg: "bg-[#ebf8ff]",
      border: "border-[#38bdf8]/30",
      iconBg: "bg-[#38bdf8]",
      symbol: "★",
      title: "Exploración libre",
      desc: "Espacios diseñados para que cada niño explore a su ritmo con total seguridad y contención afectiva."
    }
  ];

  return (
    <section id="propuesta" className="py-7 bg-white relative overflow-hidden">
      <div className="max-w-[1180px] mx-auto px-5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-[30px] mb-7">
          <div className="max-w-[670px]">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ebf8ff] text-[#0284c7] text-[0.78rem] font-extrabold tracking-[0.10em] uppercase mb-3 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#38bdf8]"></span>
              Nuestra mirada
            </div>
            <h2 className="text-[clamp(2.2rem,4.6vw,3.7rem)] font-extrabold text-[#0b3159] tracking-[-0.04em] leading-[1.02] mb-3.5">
              La infancia como protagonista.
            </h2>
            <p className="text-[#657583] text-base sm:text-lg">
              Creemos en espacios coloridos y libres donde los chicos puedan sentirse seguros para explorar, expresarse y disfrutar del aprendizaje.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c, idx) => (
            <article
              key={idx}
              className={` p-[30px] border ${c.border} rounded-[28px] relative overflow-hidden shadow-[0_12px_35px_rgba(11,49,89,0.06)] ${c.bg} hover:-translate-y-1.5 transition-all`}
            >
              <div className="absolute w-[120px] h-[120px] right-[-40px] bottom-[-40px] rounded-full bg-white/50 pointer-events-none"></div>

              <div className="flex">
                <h3 className="text-[1.2rem] font-extrabold text-[#0b3159] mb-[12px] tracking-[-0.03em]">{c.title}</h3>
                <div className={`absolute top-3 right-4 w-[52px] h-[52px] grid place-items-center mb-[22px] rounded-[18px] ${c.iconBg} text-white text-[1.25rem] font-black shadow-md`}>
                  {c.symbol}
                </div>
              </div>

              <p className="text-[#586978] text-[0.92rem] leading-relaxed">{c.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
