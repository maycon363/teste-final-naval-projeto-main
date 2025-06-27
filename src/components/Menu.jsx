import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const timeoutRef = useRef(null);

  const outrosLinks = [
    { to: "/armamento", label: "Armamentos" },
    { to: "/infor", label: "Navios" },
    { to: "/manutencao", label: "Manutenção" },
    { to: "/armamentos", label: "Equipamentos Bélicos" },
    { to: "/construcao", label: "Construção" },
    { to: "/missao", label: "Missão" },
    { to: "/treinamento", label: "Treinamento" },
    { to: "/servico", label: "Serviço" },
    { to: "/comandantes", label: "Comandantes" },
  ];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setShowDropdown(false), 300);
  };

  const linkClass = "text-white no-underline hover:text-blue-400 transition duration-200";

  return (
    <header className="bg-black/80 backdrop-blur-md shadow-md sticky top-0 z-50 ">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between mb-2">
        <Link to="/" className="flex items-center gap-3 text-white font-bold text-lg no-underline">
          <img
            src="https://logodownload.org/wp-content/uploads/2018/01/marinha-brasil-logo.png"
            alt="Logo"
            className="w-10 h-10 rounded"
          />
          Frota Naval Remake
        </Link>

        {isMobile ? (
          <button onClick={() => setOpen(!open)} className="text-white" aria-label="Menu">
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        ) : (
          <nav className="flex gap-6 text-sm font-medium items-center ">
            <Link to="/" className={linkClass}>Tela Inicial</Link>
            <Link to="/ListaFrota" className={linkClass}>Lista Geral</Link>
            <Link to="/solicita" className={linkClass}>Solicitação</Link>

            <div
              className="relative inline-block"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span className="cursor-pointer text-white hover:text-blue-400">▾ Outros</span>
              {showDropdown && (
                <div
                  className="absolute right-0 mt-2 flex flex-col bg-black border border-gray-700 rounded p-2 z-50 w-56 shadow-lg"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {outrosLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="py-1 px-3 hover:bg-slate-800 rounded text-white no-underline"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>
        )}
      </div>

      {isMobile && open && (
        <div className="w-full bg-black text-white px-4 py-4 flex flex-col gap-3 max-h-[calc(100vh-64px)] overflow-y-auto mb-2">
          <Link to="/" className={linkClass} onClick={() => setOpen(false)}>Tela Inicial</Link>
          <Link to="/ListaFrota" className={linkClass} onClick={() => setOpen(false)}>Lista Geral</Link>
          <Link to="/solicita" className={linkClass} onClick={() => setOpen(false)}>Solicitação</Link>
          <hr className="border-gray-600 my-2" />
          <span className="text-gray-300 text-sm font-semibold">Outros</span>
          {outrosLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={linkClass}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default NavBar;
