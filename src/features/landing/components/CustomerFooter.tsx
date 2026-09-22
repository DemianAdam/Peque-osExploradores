import logo from "@/assets/images/newLogo.jpg";

export function CustomerFooter() {
  return (
    <footer className="py-8 bg-[#fffaf0] text-[#71808c] text-[0.86rem]">
      <div className="max-w-[1180px] mx-auto px-5 flex flex-col sm:flex-row justify-between gap-5 items-center border-t border-[#eadfce] pt-7">
        <a href="#inicio" className="inline-flex items-center gap-2.5 text-[#0b3159] font-extrabold">
          <img src={logo} alt="Logo" className="w-[34px] h-[34px] object-contain rounded-full" />
          Pequeños Exploradores
        </a>
        <span>Mina Clavero · Aprender jugando, explorar creciendo.</span>
      </div>
    </footer>
  );
}
