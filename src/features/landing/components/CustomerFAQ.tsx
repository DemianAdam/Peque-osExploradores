export function CustomerFAQ() {
  return (
    <section id="preguntas" className="py-7 bg-white">
      <div className="max-w-[1180px] mx-auto px-5 grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-[60px] items-start">
        
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f2ffee] text-[#70b83b] text-[0.78rem] font-extrabold tracking-[0.10em] uppercase mb-3 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#70b83b]"></span>
            Preguntas frecuentes
          </div>
          <h2 className="text-[clamp(2.2rem,4.6vw,3.7rem)] font-extrabold text-[#0b3159] tracking-[-0.04em] leading-[1.02] mb-3.5">
            Lo que las familias suelen querer saber.
          </h2>
          <p className="text-[#657583] text-base leading-relaxed">
            Respondemos las dudas más frecuentes que recibimos por Instagram.
          </p>
        </div>

        <div className="grid gap-3">
          <details open className="bg-[#fffaf0] border-2 border-[#ff65a3]/30 rounded-[20px] overflow-hidden shadow-xs group">
            <summary className="cursor-pointer p-6 flex items-center justify-between gap-4 text-[#0b3159] font-extrabold text-lg">
              <span>¿Para qué edades es el taller?</span>
              <span className="w-8 h-8 rounded-full bg-[#ff65a3] text-white flex items-center justify-center font-bold text-sm">✦</span>
            </summary>
            <p className="px-6 pb-6 text-[#657583] text-[0.95rem] leading-relaxed">
              La propuesta está pensada para niños y niñas de 1 a 4 años en un entorno seguro y estimulante.
            </p>
          </details>

          <details className="bg-[#fffaf0] border-2 border-[#38bdf8]/30 rounded-[20px] overflow-hidden shadow-xs group">
            <summary className="cursor-pointer p-6 flex items-center justify-between gap-4 text-[#0b3159] font-extrabold text-lg">
              <span>¿Cuánto dura cada encuentro?</span>
              <span className="w-8 h-8 rounded-full bg-[#38bdf8] text-white flex items-center justify-center font-bold text-sm">✦</span>
            </summary>
            <p className="px-6 pb-6 text-[#657583] text-[0.95rem] leading-relaxed">
              Cada encuentro tiene una duración de 2 horas, de lunes a jueves.
            </p>
          </details>

          <details className="bg-[#fffaf0] border-2 border-[#f7cf3d]/40 rounded-[20px] overflow-hidden shadow-xs group">
            <summary className="cursor-pointer p-6 flex items-center justify-between gap-4 text-[#0b3159] font-extrabold text-lg">
              <span>¿Cómo consulto por una vacante?</span>
              <span className="w-8 h-8 rounded-full bg-[#f7cf3d] text-white flex items-center justify-center font-bold text-sm">✦</span>
            </summary>
            <p className="px-6 pb-6 text-[#657583] text-[0.95rem] leading-relaxed">
              El contacto es directo por Instagram. Escribinos y coordinamos la información que necesites.
            </p>
          </details>

          <details className="bg-[#fffaf0] border-2 border-[#70b83b]/30 rounded-[20px] overflow-hidden shadow-xs group">
            <summary className="cursor-pointer p-6 flex items-center justify-between gap-4 text-[#0b3159] font-extrabold text-lg">
              <span>¿Qué tipo de actividades realizan?</span>
              <span className="w-8 h-8 rounded-full bg-[#70b83b] text-white flex items-center justify-center font-bold text-sm">✦</span>
            </summary>
            <p className="px-6 pb-6 text-[#657583] text-[0.95rem] leading-relaxed">
              Se proponen experiencias de juego, movimiento, arte, exploración sensorial y actividades cotidianas, como cocinar y crear con distintos materiales.
            </p>
          </details>
        </div>

      </div>
    </section>
  );
}
