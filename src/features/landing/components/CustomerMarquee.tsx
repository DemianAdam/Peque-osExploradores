export function CustomerMarquee() {
  return (
    <div className="py-4 border-t border-b border-[#eadfce] bg-[rgba(255,255,255,0.68)]">
      <div className="max-w-[1180px] mx-auto px-5 flex flex-wrap justify-center items-center gap-4 sm:gap-[30px] text-[#0b3159] font-black text-[0.9rem]">
        <span className="inline-flex items-center gap-2"><span className="text-[#f47718]">✦</span> Jugamos</span>
        <span className="inline-flex items-center gap-2"><span className="text-[#70b83b]">✦</span> Exploramos</span>
        <span className="inline-flex items-center gap-2"><span className="text-[#f7cf3d]">✦</span> Creamos</span>
        <span className="inline-flex items-center gap-2"><span className="text-[#f39ab4]">✦</span> Compartimos</span>
        <span className="inline-flex items-center gap-2"><span className="text-[#6ed5cf]">✦</span> Crecemos juntos</span>
      </div>
    </div>
  );
}
