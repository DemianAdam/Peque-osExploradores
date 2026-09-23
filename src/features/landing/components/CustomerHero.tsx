import logo from "@/assets/images/newLogo.jpg";
import pan1 from "@/assets/images/pepics/pan1.jpg";
import pan2 from "@/assets/images/pepics/pan2.jpg";
import pan3 from "@/assets/images/pepics/pan3.jpg";
import pan4 from "@/assets/images/pepics/pan4.jpg";
import dino1 from "@/assets/images/pepics/dino1.jpg";
import dino2 from "@/assets/images/pepics/dino2.jpg";
import general1 from "@/assets/images/pepics/general1.jpg";
import flyer from "@/assets/images/pepics/flyer.jpg";

export function CustomerHero() {
  const heroPhotos = [pan1, dino1, pan2, general1, dino2, pan3, pan4, flyer];

  return (
    <section className="relative pt-7  overflow-hidden bg-[radial-gradient(circle_at_5%_10%,rgba(255,101,163,0.12),transparent_25%),radial-gradient(circle_at_92%_15%,rgba(56,189,248,0.12),transparent_25%),radial-gradient(circle_at_50%_90%,rgba(112,184,59,0.1),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(247,207,61,0.12),transparent_25%)]">
      
      {/* Infinite Marquee Photo Background behind main content */}
      <div className="absolute  pointer-events-none overflow-hidden opacity-25 flex flex-col justify-center gap-6 py-12 z-0 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        {/* Row 1 */}
        <div className="animate-marquee flex gap-6">
          {[...heroPhotos, ...heroPhotos].map((photo, i) => (
            <div key={`row1-${i}`} className="w-[220px] h-[140px] rounded-2xl overflow-hidden shadow-md flex-shrink-0 border-2 border-white/80 rotate-[-2deg]">
              <img src={photo} alt="Taller real" className="w-full h-full object-cover filter saturate-125" />
            </div>
          ))}
        </div>
        {/* Row 2 */}
        <div className="animate-marquee-reverse flex gap-6">
          {[...heroPhotos.reverse(), ...heroPhotos].map((photo, i) => (
            <div key={`row2-${i}`} className="w-[220px] h-[140px] rounded-2xl overflow-hidden shadow-md flex-shrink-0 border-2 border-white/80 rotate-[2deg]">
              <img src={photo} alt="Taller real" className="w-full h-full object-cover filter saturate-125" />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1180px] mx-auto px-5 relative z-10 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-center gap-[54px]">
        
        {/* Copy */}
        <div>

          
          <h1 className="text-[clamp(3rem,6.5vw,5.8rem)] font-extrabold text-[#0b3159] leading-[1.02] tracking-[-0.04em] mb-6 drop-shadow-sm">
            Crecer jugando.<br />
            <span className="bg-gradient-to-r from-[#ff65a3] via-[#f47718] to-[#70b83b] bg-clip-text text-transparent">Explorar aprendiendo.</span>
          </h1>

          <p className="max-w-[625px] text-[clamp(1.05rem,1.5vw,1.2rem)] text-[#475968] font-medium leading-relaxed mb-8 bg-white/70 backdrop-blur-xs p-4 rounded-2xl border border-white/60 shadow-xs">
            Un taller para niños y niñas de 1 a 4 años donde cada encuentro se transforma en una aventura para jugar, experimentar, crear y compartir.
          </p>

          <div className="flex flex-wrap gap-3.5 mb-8">
            <a 
              href="#contacto" 
              className="inline-flex items-center justify-center min-h-[52px] px-7 rounded-full bg-gradient-to-r from-[#ff65a3] via-[#f47718] to-[#f7cf3d] text-white font-extrabold text-[0.95rem] shadow-[0_12px_28px_rgba(244,118,25,0.32)] hover:scale-105 transition-all gap-2"
            >
              Quiero conocer el taller <span>→</span>
            </a>
            <a 
              href="https://www.instagram.com/taller_pequesexploradores/" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center justify-center min-h-[52px] px-7 rounded-full bg-white/90 backdrop-blur-xs text-[#0b3159] border-2 border-[#eadfce] font-extrabold text-[0.95rem] shadow-[0_10px_30px_rgba(11,49,89,0.08)] hover:bg-white transition-all"
            >
              Ver Instagram ↗
            </a>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <span className="inline-flex items-center gap-2 px-3.5 py-2 bg-white/90 border border-[#ffd166]/50 rounded-full text-[#0b3159] text-[0.82rem] font-black shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#ff65a3]"></span> 1 a 4 años
            </span>
            <span className="inline-flex items-center gap-2 px-3.5 py-2 bg-white/90 border border-[#06d6a0]/45 rounded-full text-[#0b3159] text-[0.82rem] font-black shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#70b83b]"></span> Lunes a jueves
            </span>
            <span className="inline-flex items-center gap-2 px-3.5 py-2 bg-white/90 border border-[#118ab2]/40 rounded-full text-[#0b3159] text-[0.82rem] font-black shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#38bdf8]"></span> 2 hs por encuentro
            </span>
            <span className="inline-flex items-center gap-2 px-3.5 py-2 bg-white/90 border border-[#ff70a6]/40 rounded-full text-[#0b3159] text-[0.82rem] font-black shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#f47718]"></span> Mina Clavero
            </span>
          </div>
        </div>

        {/* Visual / Photo */}
        <div className="relative min-h-[560px]">
          <div className="absolute z-30 top-[18px] right-[-10px] px-4 py-2 bg-[#70b83b] text-white rounded-full text-[0.78rem] font-black shadow-lg rotate-[6deg] animate-bounce">
            ✦ Inscripciones Abiertas
          </div>

          <div className="absolute left-[0px] top-[48px] w-[130px] h-[130px] rounded-full bg-white p-2 shadow-2xl rotate-[-6deg] z-20 border-4 border-[#ff65a3]">
            <img src={logo} alt="Logo" className="w-full h-full object-cover rounded-full" />
          </div>

          <div className="absolute inset-[10px_0_20px_44px] rounded-[42px] overflow-hidden shadow-[0_24px_55px_rgba(11,49,89,0.16)] border-[8px] border-white bg-[#e8edf0] rotate-[1.5deg]">
            <img 
              src="https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=1200&q=85" 
              alt="Niños explorando y jugando" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          <div className="absolute right-[4px] bottom-[30px] z-30 w-[250px] p-4 rounded-[22px] bg-[#0b3159] text-white shadow-2xl border-2 border-[#f7cf3d]/40">
            <strong className="block mb-1 text-[0.95rem] text-[#f7cf3d]">✦ Aprendemos haciendo</strong>
            <span className="text-white/80 text-[0.8rem] leading-relaxed">Juego libre, movimiento, arte, exploración y experiencias cotidianas.</span>
          </div>
        </div>

      </div>
    </section>
  );
}
