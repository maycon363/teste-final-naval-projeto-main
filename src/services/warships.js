import SailingIcon from '@mui/icons-material/Sailing';

const warships = [
  {
    type: "Navio-Tanque",
    description: "Navio de apoio logístico responsável pelo transporte de combustível e suprimentos para outras embarcações.",
    features: {
      capacidade: "Alta capacidade de armazenamento de combustível",
      defesa: "Baixa, geralmente escoltado por navios de guerra",
      velocidade: "Média, focado em autonomia",
    },
    icon: <SailingIcon />,
    src: "https://www.naval.com.br/blog/wp-content/uploads/2018/06/WAVESa.jpg"
  },
  {
    type: "Porta-Aviões",
    description: "Navio de guerra de grande porte projetado para transportar, lançar e recuperar aeronaves.",
    features: {
      capacidade: "Pode transportar dezenas de aeronaves",
      defesa: "Fortemente armado e protegido por escolta",
      velocidade: "Média a alta, dependendo da classe",
    },
    icon: <SailingIcon />,
    src: "https://jojonoticias.com.br/wp-content/uploads/2023/02/porta-avioes-1.jpg"
  },
  {
    type: "Porta-Helicópteros",
    description: "Navio especializado em operações com helicópteros, podendo atuar em resgates, combate e apoio tático.",
    features: {
      capacidade: "Transporte de helicópteros e veículos anfíbios",
      defesa: "Média, pode carregar mísseis e sistemas antiaéreos",
      velocidade: "Média",
    },
    icon: <SailingIcon />,
    src: "https://www.naval.com.br/blog/wp-content/uploads/2021/02/BPC-Tonnerre.jpg"
  },
  {
    type: "Cruzador",
    description: "Navio de guerra multifuncional, usado para defesa aérea, ataque naval e bombardeio terrestre.",
    features: {
      capacidade: "Armamento pesado, incluindo mísseis de longo alcance",
      defesa: "Alta, com sistemas antimísseis avançados",
      velocidade: "Alta",
    },
    icon: <SailingIcon />,
    src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgHtxR-ZMj1ZAKMgvjgdYUNU1wO57xf5R-NrHWIS8RiYY0DMurhPlpC4lLJq97lNg8qf8VrEsnmGrCqe40bIrP20B3GC_b2MMR7dtN3CGU3plWCTNoocKOzyKfWW9vBNChSaErf17MimRo/s1600/KIROV+B9wpZQ3.jpg"
  },
  {
    type: "Destroyer",
    description: "Navio rápido e ágil, especializado em defesa antiaérea, antimísseis e guerra naval.",
    features: {
      capacidade: "Sensores avançados e sistemas de guerra eletrônica",
      defesa: "Muito alta, projetado para proteger frotas",
      velocidade: "Muito alta",
    },
    icon: <SailingIcon />,
    src: "https://preview.redd.it/o2194jbkqsz81.jpg?auto=webp&s=66a7277c686ce8d2293f1cc2aa5849c7fb351942"
  },
  {
    type: "Fragata",
    description: "Navio de guerra médio, versátil, usado para patrulha e escolta.",
    features: {
      capacidade: "Capacidade para guerra antissubmarino e defesa aérea",
      defesa: "Média a alta, dependendo da classe",
      velocidade: "Alta",
    },
    icon: <SailingIcon />,
    src: "https://www.naval.com.br/blog/wp-content/uploads/2021/02/Surcouf.jpg"
  },
  {
    type: "Corveta",
    description: "Navio de pequeno porte, ágil e ideal para missões de patrulha e defesa costeira.",
    features: {
      capacidade: "Armamento leve a médio",
      defesa: "Baixa a média, usada para ataques rápidos",
      velocidade: "Alta",
    },
    icon: <SailingIcon  />,
    src: "https://www.naval.com.br/blog/wp-content/uploads/2017/03/Gowind-2500-2.jpg"
  },
  {
    type: "Navio Patrulha",
    description: "Navio usado para segurança marítima, combate ao tráfico e missões de resgate.",
    features: {
      capacidade: "Equipado com canhões e metralhadoras leves",
      defesa: "Baixa, usado em missões não diretamente combativas",
      velocidade: "Média a alta",
    },
    icon: <SailingIcon  />,
    src: "https://www.naval.com.br/blog/wp-content/uploads/2018/09/Navio-Patrulha-La-Moqueuse-P688-e1536529154498.jpg"
  },
  {
    type: "Submarino",
    description: "Embarcação submersível projetada para espionagem, ataques e defesa.",
    features: {
      capacidade: "Operações furtivas e lançamento de torpedos e mísseis",
      defesa: "Alta, devido à furtividade",
      velocidade: "Variável, dependendo se está submerso ou na superfície",
    },
    icon: <SailingIcon />,
    src: "https://api.metro1.com.br/noticias/142244,governo-federal-e-franca-tem-reuniao-sigilosa-para-complementar-acordo-sobre-submarino-nuclear-3.jpg"
  },
  {
    type: "Caça-Minas",
    description: "Navio especializado na detecção e remoção de minas marítimas.",
    features: {
      capacidade: "Equipado com sensores e drones para detectar minas",
      defesa: "Baixa, depende de escolta em zonas de combate",
      velocidade: "Baixa a média",
    },
    icon: <SailingIcon />,
    src: "https://www.naval.com.br/blog/wp-content/uploads/2017/11/mcmv-47mine-explosion_2340x1316-1024x576.jpg"
  },
  {
    type: "Navio Autônomo de Guerra",
    description: "Embarcação sem tripulação que pode executar missões de combate ou patrulha automaticamente.",
    features: {
      capacidade: "Equipado com IA para navegação e combate",
      defesa: "Média, projetado para evitar detecção",
      velocidade: "Alta",
    },
    icon: <SailingIcon />,
    src: "https://cdnb.artstation.com/p/assets/images/images/027/751/519/large/tj-songbo-img-6027.jpg?1592438622"
  },
  {
    type: "Lancha de Guerra",
    description: "Embarcação rápida e ágil, usada para ataques costeiros e operações especiais.",
    features: {
      capacidade: "Alta mobilidade e armamento leve a médio",
      defesa: "Baixa, depende da velocidade para evitar ataques",
      velocidade: "Muito alta",
    },
    icon: <SailingIcon />,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGqxGdv8Y8cgOUqotoCe1x0Fu5JLJGfIYpSw&s"
  },
];

export default warships;