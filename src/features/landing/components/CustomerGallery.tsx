import { useRef, useEffect } from "react";
import pan1 from "@/assets/images/pepics/pan1.jpg";
import pan2 from "@/assets/images/pepics/pan2.jpg";
import pan3 from "@/assets/images/pepics/pan3.jpg";
import pan4 from "@/assets/images/pepics/pan4.jpg";
import dino1 from "@/assets/images/pepics/dino1.jpg";
import dino2 from "@/assets/images/pepics/dino2.jpg";
import general1 from "@/assets/images/pepics/general1.jpg";
import flyer from "@/assets/images/pepics/flyer.jpg";

interface Photo {
  src: string;
  title: string;
  tag: string;
  color: string;
}

export function CustomerGallery() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const photos: Photo[] = [
    { src: pan1, title: "¡Haciendo Pan!", tag: "Taller Culinario", color: "bg-[#ff65a3]" },
    { src: dino1, title: "Otoño + Dinosaurios", tag: "Exploración", color: "bg-[#70b83b]" },
    { src: pan2, title: "Amasando y Jugando", tag: "Sensorial", color: "bg-[#f47718]" },
    { src: general1, title: "Nuestros Espacios", tag: "Actividades", color: "bg-[#38bdf8]" },
    { src: dino2, title: "Descubriendo el pasado", tag: "Imaginación", color: "bg-[#f7cf3d]" },
    { src: pan3, title: "Pequeños Panaderos", tag: "Autonomía", color: "bg-[#ff65a3]" },
    { src: pan4, title: "Horneando con amor", tag: "Repostería", color: "bg-[#f47718]" },
  ];

  // Triplicate array for seamless infinite looping
  const extendedPhotos = [...photos, ...photos, ...photos];

  useEffect(() => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      // Jump to the middle set initially
      const singleSetWidth = container.scrollWidth / 3;
      container.scrollLeft = singleSetWidth;
    }
  }, []);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const singleSetWidth = container.scrollWidth / 3;

    // If scrolled into the first set, jump forward to the middle set
    if (container.scrollLeft <= 10) {
      container.scrollLeft += singleSetWidth;
    } 
    // If scrolled into the third set, jump back to the middle set
    else if (container.scrollLeft >= container.scrollWidth - container.clientWidth - 10) {
      container.scrollLeft -= singleSetWidth;
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="experiencias" className="py-7 bg-[#fffaf0] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-5">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-5 gap-6">
          <div className="text-center md:text-left max-w-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fff0f5] text-[#ff65a3] text-[0.78rem] font-black uppercase tracking-widest mb-3 shadow-xs">
              ✦ Momentos Reales ✦
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0b3159] mb-3 tracking-tight">
              Galería de Exploradores
            </h2>
            <p className="text-[#657583] text-base sm:text-lg">
              Deslizá para explorar momentos de nuestros encuentros: amasando pan, descubriendo dinosaurios y jugando juntos.
            </p>
          </div>

          {/* Navigation Buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <button 
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-full bg-white border-2 border-[#eadfce] text-[#0b3159] hover:bg-[#0b3159] hover:text-white hover:border-[#0b3159] flex items-center justify-center font-black text-lg transition-all shadow-sm"
              aria-label="Anterior"
            >
              ←
            </button>
            <button 
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-full bg-white border-2 border-[#eadfce] text-[#0b3159] hover:bg-[#0b3159] hover:text-white hover:border-[#0b3159] flex items-center justify-center font-black text-lg transition-all shadow-sm"
              aria-label="Siguiente"
            >
              →
            </button>
          </div>
        </div>

        {/* Infinite Swipeable Carousel Container */}
        <div className="relative">
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6  px-2 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {extendedPhotos.map((p, idx) => (
              <div 
                key={idx}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border-2 border-[#eadfce]/70 w-[82vw] sm:w-[340px] flex-shrink-0 snap-start select-none"
              >
                <div className="h-68 sm:h-72 overflow-hidden bg-gray-100 relative pointer-events-none">
                  <img 
                    src={p.src} 
                    alt={p.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`inline-block w-3.5 h-3.5 rounded-full ${p.color} ring-4 ring-white/90 shadow-md`}></span>
                  </div>
                </div>
                <div className="p-4 bg-white flex items-center justify-between border-t border-gray-100">
                  <div>
                    <h3 className="font-extrabold text-[#0b3159] text-base group-hover:text-[#f47718] transition-colors">{p.title}</h3>
                    <span className="text-xs text-[#71808c] font-bold uppercase tracking-wider">{p.tag}</span>
                  </div>
                  <span className="w-9 h-9 rounded-full bg-[#fff0e4] text-[#f47718] flex items-center justify-center font-bold text-sm shadow-sm group-hover:bg-[#f47718] group-hover:text-white transition-all">
                    ✦
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* Instagram CTA */}
        <div className="mt-6 text-center">
          <a
            href="https://www.instagram.com/taller_pequesexploradores/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white font-black py-4 px-9 rounded-full shadow-[0_12px_30px_rgba(236,72,153,0.3)] hover:scale-105 transition-all text-base"
          >
            Ver más fotos y videos en Instagram <span>↗</span>
          </a>
        </div>

      </div>
    </section>
  );
}
