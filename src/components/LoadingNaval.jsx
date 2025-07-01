import React, { useEffect, useRef } from "react";
import { FaAnchor } from "react-icons/fa";

const LoadingNaval = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    // 1. Foca no loading
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }

    // 2. Depois de 1.2s, rola pro topo (dá tempo do loading ser exibido)
    const timeout = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1200);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      ref={scrollRef}
      id="loading-naval"
      className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] bg-gradient-to-b from-blue-900 to-black text-white px-4 py-8 mb-2"
    >
      <div className="relative flex items-center justify-center max-w-xs mx-auto">
        {/* Ícone naval */}
        <FaAnchor className="text-5xl text-blue-400 animate-bounce" />

        {/* Círculo girando como um radar naval */}
        <div className="absolute w-20 h-20 border-4 border-blue-300 border-t-transparent rounded-full animate-spin" />
      </div>

      <h2 className="mt-6 text-xl font-semibold text-blue-100 tracking-widest uppercase animate-pulse text-center">
        Carregando dados naval...
      </h2>
    </div>
  );
};

export default LoadingNaval;
