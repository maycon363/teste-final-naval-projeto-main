import LançadorFoguete from '../components/Videos/lançadorfoguete.mp4';
import Missilantiareox from '../components/Videos/MissilAntiareo.mp4';
import canhaosencundario from '../components/Videos/Ak630.30mm.mp4';
import armaantiarea from '../components/Videos/armaantiareo.mp4';
import missilantinavio from '../components/Videos/missilantinavio.mp4';
import torpedo from '../components/Videos/torpedo.mp4';
import Drone from '../components/Videos/Drone.mp4';
import Metralhadora from '../components/Videos/metralhadora.mp4';
import CanhaP from '../components/Videos/canhaoP.mp4';

const armamentos = [
    {   
        src: "https://live.staticflickr.com/2821/11730086453_d0467035b4_b.jpg",
        nome: "Lançador de Foguetes",
        calibre: "60-122mm",
        alcance: "9-20 km",
        peso: "Variável",
        tipo: "Artilharia Naval",
        descricao: "Utilizado para bombardeio de longo alcance e apoio a forças terrestres.",
        video: LançadorFoguete,
    },
    {
        src: "https://www.naval.com.br/blog/wp-content/uploads/2020/09/OTO-76mm-62-2.jpg",
        nome: "Canhão Principal",
        calibre: "76-203 mm ",
        alcance: "20-50 km",
        peso: "3200 até 10000 kg",
        tipo: "Canhão Naval",
        descricao: "Arma principal de destruição de alvos marítimos e terrestres.",
        video: CanhaP,
    },
    {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/AK-630_30_mm_naval_CIWS_gun.JPEG/1200px-AK-630_30_mm_naval_CIWS_gun.JPEG",
        nome: "Canhão Secundário",
        calibre: "25 - 40mm",
        alcance: "16 km",
        peso: "1200 até 6000 kg",
        tipo: "Canhão de Defesa",
        descricao: "Usado para defesa contra embarcações menores e apoio contra aeronaves.",
        video: canhaosencundario,
    },
    {
        src: "https://www.naval.com.br/blog/wp-content/uploads/2020/09/Atmaca-4.jpg",
        nome: "Mísseis Anti-Navios",
        calibre: "Variável",
        alcance: "70-600 km",
        peso: "750 kg",
        tipo: "Míssil Guiado",
        descricao: "Projetado para destruir embarcações inimigas com alta precisão.",
        video: missilantinavio,
    },
    {
        src: "https://www.naval.com.br/blog/wp-content/uploads/2016/11/MBDAs-CAMM-missile-inflight-from-Sea-Ceptor-system-2013-Copyright-MBDA-2-1024x734.jpg",
        nome: "Mísseis Anti-Aéreos",
        calibre: "Variável",
        alcance: "20-90 km",
        peso: "450 - 1600 kg",
        tipo: "Míssil de Defesa",
        descricao: "Defesa contra aeronaves e mísseis inimigos.",
        video: Missilantiareox,
    },
    {
        src: "https://www.naval.com.br/blog/wp-content/uploads/2015/02/Torpedo-F21-e1582729503267.jpg",
        nome: "Torpedos",
        calibre: "533mm",
        alcance: "20 - 90 km",
        peso: "Variável",
        tipo: "Arma Submarina",
        descricao: "Projetado para afundar embarcações inimigas com explosões abaixo da linha d'água.",
        video: torpedo,
    },
    {
        src: "https://cdn-defesaaereanaval.nuneshost.com/wp-content/uploads/2021/05/Metralhadora-.50.jpg",
        nome: "Metralhadora .50",
        calibre: "12.7mm",
        alcance: "2 km",
        peso: "50 kg",
        tipo: "Arma Leve",
        descricao: "Arma para defesa curta distância contra pequenas embarcações e ameaças aéreas.",
        video: Metralhadora,
    },
    {
        src: "https://www.naval.com.br/blog/wp-content/uploads/2023/11/CIWS-Phalanx.jpg",
        nome: "Arma Anti-Aérea",
        calibre: "Variável",
        alcance: "2km - 14km ",
        peso: "Variável",
        tipo: "Defesa Naval",
        descricao: "Canhão de tiro rápido para abater aeronaves e mísseis inimigos.",
        video: armaantiarea,
    },
    {
        src: "https://images.ecestaticos.com/fXRl0myqSfNqZ2juu7zCg9ZxRQI=/0x0:2048x1152/1338x752/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2Fcde%2F2cb%2Fab8%2Fcde2cbab8b8a7492376b793290c34499.jpg",
        nome: "Drone de Ataque",
        calibre: "N/A",
        alcance: "Variável",
        peso: "Variável",
        tipo: "Veículo Aéreo Não Tripulado",
        descricao: "Utilizado para reconhecimento e ataques de precisão.",
        video: Drone,
    }
  ];
  
  export default armamentos;
  