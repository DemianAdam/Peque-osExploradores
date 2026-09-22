import pan1 from "@/assets/images/pepics/pan1.jpg";
import pan2 from "@/assets/images/pepics/pan2.jpg";
import pan3 from "@/assets/images/pepics/pan3.jpg";
import pan4 from "@/assets/images/pepics/pan4.jpg";
import dino1 from "@/assets/images/pepics/dino1.jpg";
import dino2 from "@/assets/images/pepics/dino2.jpg";
import general1 from "@/assets/images/pepics/general1.jpg";
import flyer from "@/assets/images/pepics/flyer.jpg";

export function CustomerGallery() {
  const photos = [
    { src: pan1, title: "¡Haciendo Pan!", tag: "Taller Culinario" },
    { src: dino1, title: "Otoño + Dinosaurios", tag: "Exploración" },
    { src: pan2, title: "Amasando y Jugando", tag: "Sensorial" },
    { src: general1, title: "Nuestros Espacios", tag: "Actividades" },
    { src: dino2, title: "Descubriendo el pasado", tag: "Imaginación" },
    { src: pan3, title: "Pequeños Panaderos", tag: "Autonomía" },
    { src: pan4, title: "Disfrutando lo hecho", tag: "Compartir" },
    { src: flyer, title: "¡Inscripciones Abiertas!", tag: "Mina Clavero" },
  ];

  return (
    <section id="experiencias" className="py-20 bg-white">
      <div className="max-w-[1180px] mx-auto px-5">
        
        {/* Simple Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[#f47718] font-extrabold uppercase tracking-widest text-xs mb-2 block">
            Momentos Reales
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b3159] mb-4">
            Galería de Exploradores
          </h2>
          <p className="text-[#657583] text-base">
            Fotos auténticas de nuestros encuentros: amasando pan, explorando dinosaurios y jugando juntos.
          </p>
        </div>

        {/* Clean, Colorful Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {photos.map((p, idx) => (
            <div 
              key={idx}
              className="group relative bg-[#f8fafc] rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-[#eadfce]"
            >
              <div className="h-64 overflow-hidden bg-gray-100">
                <img 
                  src={p.src} 
                  alt={p.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 bg-white flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-[#0b3159] text-base">{p.title}</h3>
                  <span className="text-xs text-[#657583] font-medium">{p.tag}</span>
                </div>
                <span className="w-8 h-8 rounded-full bg-[#fff0e4] text-[#f47718] flex items-center justify-center font-bold text-sm">
                  ✦
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="mt-12 text-center">
          <a
            href="https://www.instagram.com/taller_pequesexploradores/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white font-bold py-3.5 px-8 rounded-full shadow-md hover:opacity-95 transition-all text-base"
          >
            Ver más fotos y videos en Instagram ↗
          </a>
        </div>

      </div>
    </section>
  );
}
