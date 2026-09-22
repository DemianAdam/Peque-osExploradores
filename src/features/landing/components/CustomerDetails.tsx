export function CustomerDetails() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="max-w-[1180px] mx-auto px-5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-[30px] mb-11">
          <div className="max-w-[670px]">
            <div className="inline-flex items-center gap-2 text-[0.78rem] font-extrabold tracking-[0.10em] uppercase text-[#f47718] mb-3">
              <span className="w-[25px] h-[3px] rounded-full bg-currentColor"></span>
              La propuesta
            </div>
            <h2 className="text-[clamp(2.2rem,4.6vw,3.7rem)] font-extrabold text-[#0b3159] tracking-[-0.04em] leading-[1.02] mb-3.5">
              Todo lo importante, de un vistazo.
            </h2>
            <p className="text-[#657583] text-base sm:text-lg">
              Una propuesta simple para familias que buscan un espacio cercano, lúdico y lleno de experiencias.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div className="bg-[#fff0f5] border border-[#eadfce] rounded-[22px] p-6 shadow-[0_14px_36px_rgba(11,49,89,0.09)]">
            <span className="block text-[#657583] text-[0.74rem] mb-1.5 font-black uppercase tracking-[0.07em]">Edades</span>
            <strong className="text-[#0b3159] text-[1.05rem]">1 a 4 años</strong>
          </div>

          <div className="bg-[#e7fbf8] border border-[#eadfce] rounded-[22px] p-6 shadow-[0_14px_36px_rgba(11,49,89,0.09)]">
            <span className="block text-[#657583] text-[0.74rem] mb-1.5 font-black uppercase tracking-[0.07em]">Duración</span>
            <strong className="text-[#0b3159] text-[1.05rem]">2 horas</strong>
          </div>

          <div className="bg-[#fff9d8] border border-[#eadfce] rounded-[22px] p-6 shadow-[0_14px_36px_rgba(11,49,89,0.09)]">
            <span className="block text-[#657583] text-[0.74rem] mb-1.5 font-black uppercase tracking-[0.07em]">Días</span>
            <strong className="text-[#0b3159] text-[1.05rem]">Lunes a jueves</strong>
          </div>

          <div className="bg-[#f2efff] border border-[#eadfce] rounded-[22px] p-6 shadow-[0_14px_36px_rgba(11,49,89,0.09)]">
            <span className="block text-[#657583] text-[0.74rem] mb-1.5 font-black uppercase tracking-[0.07em]">Ubicación</span>
            <strong className="text-[#0b3159] text-[1.05rem]">Mina Clavero</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
