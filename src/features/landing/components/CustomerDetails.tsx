export function CustomerDetails() {
  return (
    <section className="relative overflow-hidden bg-white py-10">
      <div className="max-w-[1180px] mx-auto px-5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-[30px] mb-12">
          <div className="max-w-[670px]">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fff9d8] text-[#af8200] text-[0.78rem] font-extrabold tracking-[0.10em] uppercase mb-3 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#f7cf3d]"></span>
              La propuesta
            </div>
            <h2 className="text-[clamp(2.2rem,4.6vw,3.7rem)] font-extrabold text-[#0b3159] tracking-[-0.04em] leading-[1.02] mb-3.5">
              Todo lo importante, de un vistazo.
            </h2>
            <p className="text-[#657583] text-base sm:text-lg">
              Una propuesta simple para familias que buscan un espacio cercano, lúdico y lleno de experiencias en Mina Clavero.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-[#fff0f5] border-2 border-[#ff65a3]/30 rounded-[26px] p-7 shadow-[0_12px_30px_rgba(255,101,163,0.1)] hover:scale-102 transition-transform">
            <span className="inline-block w-3 h-3 rounded-full bg-[#ff65a3] mb-3"></span>
            <span className="block text-[#657583] text-[0.78rem] mb-1 font-black uppercase tracking-[0.08em]">Edades</span>
            <strong className="text-[#0b3159] text-[1.2rem] font-black">1 a 4 años</strong>
          </div>

          <div className="bg-[#e7fbf8] border-2 border-[#38bdf8]/30 rounded-[26px] p-7 shadow-[0_12px_30px_rgba(56,189,248,0.1)] hover:scale-102 transition-transform">
            <span className="inline-block w-3 h-3 rounded-full bg-[#38bdf8] mb-3"></span>
            <span className="block text-[#657583] text-[0.78rem] mb-1 font-black uppercase tracking-[0.08em]">Duración</span>
            <strong className="text-[#0b3159] text-[1.2rem] font-black">2 horas</strong>
          </div>

          <div className="bg-[#fffde6] border-2 border-[#f7cf3d]/40 rounded-[26px] p-7 shadow-[0_12px_30px_rgba(247,207,61,0.1)] hover:scale-102 transition-transform">
            <span className="inline-block w-3 h-3 rounded-full bg-[#f7cf3d] mb-3"></span>
            <span className="block text-[#657583] text-[0.78rem] mb-1 font-black uppercase tracking-[0.08em]">Días</span>
            <strong className="text-[#0b3159] text-[1.2rem] font-black">Lunes a jueves</strong>
          </div>

          <div className="bg-[#f2ffee] border-2 border-[#70b83b]/30 rounded-[26px] p-7 shadow-[0_12px_30px_rgba(112,184,59,0.1)] hover:scale-102 transition-transform">
            <span className="inline-block w-3 h-3 rounded-full bg-[#70b83b] mb-3"></span>
            <span className="block text-[#657583] text-[0.78rem] mb-1 font-black uppercase tracking-[0.08em]">Ubicación</span>
            <strong className="text-[#0b3159] text-[1.2rem] font-black">Mina Clavero</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
