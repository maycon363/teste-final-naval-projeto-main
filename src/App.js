import React  from 'react';
import Menu from "./components/Menu";
import Rodape from "./components/Rodape";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Manutencao from "./pages/manutencao/Manutencao";
import ConstrucaoLista from "./pages/construcao/ConstrucaoLista";
import Construcao from "./pages/construcao/Construcao";
import Missao from "./pages/missao/Missao";
import MissaoLista from "./pages/missao/MissaoLista";
import ManutencaoLista from "./pages/manutencao/ManutencaoLista";
import ServicoLista from "./pages/servico/ServicoLista";
import Servico from "./pages/servico/Servico";
import TreinamentoLista from "./pages/treinamento/TreinamentoLista";
import Treinamento from "./pages/treinamento/Treinamento";
import ListaFrota from "./pages/ListaFrota";
import ComandantesLista from "./pages/comandantes/ComandantesLista";
import Comandantes from "./pages/comandantes/Comandantes";
import ListaArmamentos from "./pages/armamento/ListaArmamentos";
import Armamentos from "./pages/armamento/Armamentos";
import SolicitarServico from "./pages/SolicitarServico";
import Infor from "./pages/Infor";
import ScrollToTop from './components/ScrollToTop';
import ArmamentosNaval from './pages/ArmamentosNaval';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Menu />
          <Container>
            <Routes>
              <Route path="/" element={<ListaFrota />} />
              <Route path="/solicita" element={<SolicitarServico />} />
              <Route path="/armamento" element={<ArmamentosNaval />} />

              <Route path="/construcao" element={<ConstrucaoLista />} />
              <Route path="/construcao/:id" element={<Construcao />} />
              <Route path="/construcao/create" element={<Construcao />} />

              <Route path="/manutencao" element={<ManutencaoLista />} />
              <Route path="/manutencao/:id" element={<Manutencao />} />
              <Route path="/manutencao/create" element={<Manutencao />} />

              <Route path="/missao" element={<MissaoLista />} />
              <Route path="/missao/:id" element={<Missao />} />
              <Route path="/missao/create" element={<Missao />} /> 

              <Route path="/servico" element={<ServicoLista/>} />
              <Route path="/servico/:id" element={<Servico />} />
              <Route path="/servico/create" element={<Servico />} />

              <Route path="/treinamento" element={<TreinamentoLista />} />
              <Route path="/treinamento/:id" element={<Treinamento />} />
              <Route path="/treinamento/create" element={<Treinamento />} />

              <Route path="/comandantes" element={<ComandantesLista />} />
              <Route path="/comandantes/:id" element={<Comandantes />} />
              <Route path="/comandantes/create" element={<Comandantes />} />

              <Route path="/armamentos" element={<ListaArmamentos />} />
              <Route path="/armamentos/:id" element={<Armamentos />} />
              <Route path="/armamentos/create" element={<Armamentos />} />

              <Route path="/infor" element={<Infor />} />

            </Routes>
          </Container>
          <ScrollToTop />
        <Rodape/>  
      </BrowserRouter>    
    </div>
  );
}

export default App;