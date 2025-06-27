import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Home = () => {
    return (
        <div className="text-white overflow-hidden mb-2">

            {/* HERO SECTION COM BACKGROUND-IMAGE */}
            <section
                className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url('https://www.naval.com.br/blog/wp-content/uploads/2020/10/Carrier-Strike-Group-do-Reino-Unido-4.jpg')`,
                }}
            >
                {/* Overlay escura com blur */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10" />

                {/* Conteúdo */}
                <div className="relative z-20 flex flex-col justify-center items-center text-center min-h-screen px-4">
                    <motion.h1
                        className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2 }}
                    >
                        Frota Naval Remake
                    </motion.h1>
                    <motion.p
                        className="text-xl md:text-2xl max-w-2xl text-gray-200 mb-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 1 }}
                    >
                        Um sistema estratégico para controle total de operações, frotas e armamentos.
                    </motion.p>
                    <Link to="/solicita">
                        <motion.button
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transition-all duration-300 border border-blue-300 hover:shadow-blue-500/50"
                            whileHover={{ scale: 1.1 }}
                        >
                            Começar agora <ArrowRight className="inline-block ml-2" size={20} />
                        </motion.button>
                    </Link>
                </div>
            </section>

            {/* SEÇÃO DE DESTAQUES */}
            <section className="py-24 bg-gradient-to-b from-slate-900 to-black">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
                    {[
                        {
                            title: "Frota Inteligente",
                            desc: "Monitore e gerencie navios com precisão tática.",
                            img: "https://www.naval.com.br/blog/wp-content/uploads/2021/10/Frota-combinada-da-Russia-e-China-passou-pelo-estreito-de-Tsugaru-3.jpg",
                        },
                        {
                            title: "Comando de Missões",
                            desc: "Crie operações e acompanhe seu sucesso em tempo real.",
                            img: "https://cdn.jornaldebrasilia.com.br/wp-content/uploads/2019/10/Navios-de-Apoio-Oce%C3%A2nico-Classe-Mearim-s%C3%A3o-incorporados-%C3%A0-Marinha-do-Brasil-7.jpg",
                        },
                        {
                            title: "Controle de Armamentos",
                            desc: "Gerencie seu arsenal com tecnologia de última geração.",
                            img: "https://www.naval.com.br/blog/wp-content/uploads/2023/11/CIWS-Phalanx-1.jpg",
                        },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-lg hover:scale-105 transition-transform duration-300"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                        >
                            <img
                                src={item.img}
                                alt={item.title}
                                className="rounded-md h-40 w-full object-cover mb-4"
                                loading="lazy"
                            />
                            <h3 className="text-2xl font-bold mb-2 text-white">{item.title}</h3>
                            <p className="text-gray-300">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
