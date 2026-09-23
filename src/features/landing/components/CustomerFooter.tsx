import logo from "@/assets/images/newLogo.jpg";

export function CustomerFooter() {
  return (
    <footer className="py-10 bg-[#fffaf0] text-[#71808c] text-[0.88rem] border-t border-[#eadfce]">
      <div className="max-w-[1180px] mx-auto px-5 flex flex-col sm:flex-row justify-between gap-6 items-center">
        <a href="#inicio" className="inline-flex items-center gap-3 text-[#0b3159] font-extrabold group">
          <img src={logo} alt="Logo" className="w-[38px] h-[38px] object-cover rounded-full ring-2 ring-[#f47718]" />
          <span>Pequeños Exploradores</span>
        </a>
        
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff65a3]"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#f47718]"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#f7cf3d]"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#70b83b]"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8]"></span>
          <span className="ml-2 font-medium">Mina Clavero · Aprender jugando, explorar creciendo.</span>
        </div>
      </div>
    </footer>
  );
}
