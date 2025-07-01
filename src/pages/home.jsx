import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { features } from "services/texthome";


const Home = () => {
  return (
    <main className="text-white overflow-hidden mb-2 font-sans">
      {/* HERO */}
      <section
        aria-label="Apresentação do sistema Frota Naval Remake"
        className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://www.naval.com.br/blog/wp-content/uploads/2020/10/Carrier-Strike-Group-do-Reino-Unido-4.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10" />

        <div className="relative z-20 flex flex-col justify-center items-center text-center min-h-screen px-6 md:px-12 max-w-6xl mx-auto">
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-wide drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            Frota Naval Remake
          </motion.h1>

          <motion.p
            className="text-lg md:text-2xl max-w-3xl text-gray-300 mb-14 leading-relaxed tracking-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            Um sistema estratégico para controle total de operações, frotas e
            armamentos.
          </motion.p>

          <Link to="/solicita" aria-label="Começar agora, ir para solicitar serviço">
            <motion.button
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-400 text-white font-semibold py-4 px-10 rounded-full text-lg shadow-xl flex items-center justify-center gap-3 transition-transform duration-300"
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              type="button"
            >
              Começar agora <ArrowRight size={24} aria-hidden="true" />
            </motion.button>
          </Link>
        </div>
      </section>

      <section
        aria-label="Principais funcionalidades do sistema"
        className="py-28 bg-gradient-to-b from-slate-900 to-black"
      >
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          {features.map((item, i) => (
            <motion.article
              key={i}
              className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/20 shadow-xl hover:shadow-2xl hover:scale-[1.04] transition-transform duration-300 flex flex-col"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.25 }}
              aria-labelledby={`feature-title-${i}`}
              tabIndex={0} 
            >
              <img
                src={item.img}
                alt={item.title}
                className="rounded-xl h-52 w-full object-cover mb-6 shadow-lg"
                loading="lazy"
                width={400}
                height={208}
              />
              <h3
                id={`feature-title-${i}`}
                className="text-3xl font-semibold mb-4 text-white tracking-tight"
              >
                {item.title}
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">{item.desc}</p>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
