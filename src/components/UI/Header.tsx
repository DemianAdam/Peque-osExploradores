import { useState } from "react";
import logo from "../../assets/images/Logo.png"
import { Link } from "react-router";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuLinkClass = "block w-full px-5 py-4 transition-all duration-200 font-medium text-gray-700 hover:bg-pink-100 hover:text-pink-600";
  
  
  return (
    <>
    <header className="sticky top-0 z-50 w-full bg-[#1E293B] border-b border-gray-200">
        <div className="flex items-center justify-between px-5 h-20">
          <button onClick={() => setIsMenuOpen(true)} className="p-2 text-white">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

        {/* Logo (Centrado) */}
        <Link to="/" className="w-24 h-24">
          <img 
            src={logo} 
            alt="Pequeños Exploradores" 
            className="w-full h-full object-contain" 
          />
        </Link>

        {/* Espaciador invisible para mantener el logo centrado */}
        <div className="w-12"></div>
      </div>
    </header>
    {/* Menú Lateral (Overlay) */}
    {isMenuOpen && (
      <div className="fixed inset-0 z-50 flex">
        
        {/* Panel del menú (LADO IZQUIERDO) */}
        <div className="w-64 bg-white h-full shadow-2xl p-6 z-50 animate-in slide-in-from-left duration-300">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold">Menú</h2>
            <button onClick={() => setIsMenuOpen(false)} className="text-gray-500 hover:text-red-500">
              ✕
            </button>
          </div>

          <nav className="flex flex-col">
            {/* Definimos una clase base para todos los links */}
            <Link 
              to="/" 
              onClick={() => setIsMenuOpen(false)} 
              className={menuLinkClass}
            >
              Panel de atajos
            </Link>

            <Link 
              to="/children" 
              onClick={() => setIsMenuOpen(false)} 
              className={menuLinkClass}
            >
              Chicos
            </Link>

            <Link 
              to="/groups" 
              onClick={() => setIsMenuOpen(false)} 
              className={menuLinkClass}
            >
              Grupos
            </Link>

            <Link 
              to="/fees" 
              onClick={() => setIsMenuOpen(false)} 
              className={menuLinkClass}
            >
              Cuotas
            </Link>

            <Link 
              to="/payments" 
              onClick={() => setIsMenuOpen(false)} 
              className={menuLinkClass}
            >
              Pagos
            </Link>

            <Link 
              to="/teachers" 
              onClick={() => setIsMenuOpen(false)} 
              className={menuLinkClass}
            >
              Señoritas
            </Link>

            <Link 
              to="/invoices" 
              onClick={() => setIsMenuOpen(false)} 
              className={menuLinkClass}
            >
              Gastos
            </Link>
            
            <Link 
              to="/payslips" 
              onClick={() => setIsMenuOpen(false)} 
              className={menuLinkClass}
            >
              Liquidaciones
            </Link>
            
            
          </nav>
        </div>

        {/* Fondo traslúcido (Cierra el menú al hacer clic) */}
        <div 
          className="flex-1 bg-black/50 backdrop-blur-sm transition-opacity" 
          onClick={() => setIsMenuOpen(false)}
        ></div>
      </div>
    )}
    </>
  );
};