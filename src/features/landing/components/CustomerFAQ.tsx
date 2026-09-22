export function CustomerFAQ() {
  return (
    <section id="preguntas" className="py-24 bg-white">
      <div className="max-w-[1180px] mx-auto px-5 grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-[60px] items-start">
        
        <div>
          <div className="inline-flex items-center gap-2 text-[0.78rem] font-extrabold tracking-[0.10em] uppercase text-[#f47718] mb-3">
            <span className="w-[25px] h-[3px] rounded-full bg-currentColor"></span>
            Preguntas frecuentes
          </div>
          <h2 className="text-[clamp(2.2rem,4.6vw,3.7rem)] font-extrabold text-[#0b3159] tracking-[-0.04em] leading-[1.02] mb-3.5">
            Lo que las familias suelen querer saber.
          </h2>
          <p className="text-[#657583] text-base leading-relaxed">
            Respondemos las dudas más frecuentes que recibimos por Instagram.
          </p>
        </div>

        <div className="grid gap-2.5">
          <details open className="bg-white border border-[#eadfce] rounded-[18px] overflow-hidden shadow-sm">
            <summary className="cursor-pointer p-5 flex items-center justify-between gap-4 text-[#0b3159] font-extrabold">
              <span>¿Para qué edades es el taller?</span>
            </summary>
            <p className="px-5 pb-5 text-[#657583] text-[0.92rem] leading-relaxed">
              La propuesta está pensada para niños y niñas de 1 a 4 años.
            </p>
          </details>

          <details className="bg-white border border-[#eadfce] rounded-[18px] overflow-hidden shadow-sm">
            <summary className="cursor-pointer p-5 flex items-center justify-between gap-4 text-[#0b3159] font-extrabold">
              <span>¿Cuánto dura cada encuentro?</span>
            </summary>
            <p className="px-5 pb-5 text-[#657583] text-[0.92rem] leading-relaxed">
              Cada encuentro tiene una duración de 2 horas, de lunes a jueves.
            </p>
          </details>

          <details className="bg-white border border-[#eadfce] rounded-[18px] overflow-hidden shadow-sm">
            <summary className="cursor-pointer p-5 flex items-center justify-between gap-4 text-[#0b3159] font-extrabold">
              <span>¿Cómo consulto por una vacante?</span>
            </summary>
            <p className="px-5 pb-5 text-[#657583] text-[0.92rem] leading-relaxed">
              El contacto es directo por Instagram. Escribinos y coordinamos la información que necesites.
            </p>
          </details>

          <details className="bg-white border border-[#eadfce] rounded-[18px] overflow-hidden shadow-sm">
            <summary className="cursor-pointer p-5 flex items-center justify-between gap-4 text-[#0b3159] font-extrabold">
              <span>¿Qué tipo de actividades realizan?</span>
            </summary>
            <p className="px-5 pb-5 text-[#657583] text-[0.92rem] leading-relaxed">
              Se proponen experiencias de juego, movimiento, arte, exploración sensorial y actividades cotidianas, como cocinar y crear con distintos materiales.
            </p>
          </details>
        </div>

      </div>
    </section>
  );
}
