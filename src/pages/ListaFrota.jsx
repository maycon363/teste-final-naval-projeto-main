import React from 'react';
import { Spinner, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import ConstrucaoService from '../services/academico/ConstrucaoService';
import ManutencaoService from '../services/academico/ManutencaoService';
import MissaoService from '../services/academico/MissaoService';
import ServicoService from '../services/academico/ServicoService';
import ReactPlayer from 'react-player';
import { IoIosBuild, IoMdConstruct } from 'react-icons/io';
import { RiShip2Fill } from 'react-icons/ri';
import { GiBattleship, GiShipBow } from 'react-icons/gi';
import treinamentoService from '../services/academico/TreinamentoService';
import imageMap from '../services/config/imageConfig';
import '../App.css';

const ListaFrota = () => {
  const construcao = ConstrucaoService.getAll();
  const manutencao = ManutencaoService.getAll();
  const missao = MissaoService.getAll();
  const servico = ServicoService.getAll();
  const treinamento = treinamentoService.getAll();

  return (
    <div className="bg-slate-900 text-white py-4 px-2 min-h-screen mb-2">
      <div className="text-center mb-6">
        <h1 className="flex items-center justify-center gap-2 text-xl md:text-3xl font-bold whitespace-nowrap">
          <GiShipBow className="text-blue-400 shrink-0" size={28} />
          Lista Geral dos Navios
        </h1>
        <p className="text-gray-400 mt-1">Visão completa de todas as frotas em operação, manutenção, missão e mais.</p>
      </div>

      <div className="max-w-6xl mx-auto rounded-xl overflow-hidden shadow-lg border border-slate-700 mb-8">
        <ReactPlayer
          className="react-player"
          width="100%"
          height="360px"
          playing
          loop
          muted
          controls={false}
          url="https://www.youtube.com/watch?v=pIFOBeJHzQc"
        />
      </div>

      <Section
        title="Navios em Construção"
        icon={<IoMdConstruct />}
        link="/construcao/create"
        data={construcao}
        columns={['nome', 'carac', 'siste', 'radar', 'custo', 'data']}
      />

      <Section
        title="Navios em Manutenção"
        icon={<IoIosBuild />}
        link="/manutencao/create"
        data={manutencao}
        columns={['nome', 'classe', 'custo', 'data', 'situacao']}
        showStatusSpinner
      />

      <Section
        title="Navios em Missão"
        icon={<GiBattleship />}
        link="/missao/create"
        data={missao}
        columns={['nome', 'guerra', 'classe', 'missao', 'data', 'situacao']}
        showStatusSpinner
        growSpinner
      />

      <Section
        title="Navios em Treinamento"
        icon={<GiBattleship />}
        link="/treinamento/create"
        data={treinamento}
        columns={['navio', 'guerra', 'tipo', 'marinheiro', 'classe', 'data', 'situacao']}
        showStatusSpinner
        growSpinner
      />

      <SectionServico data={servico} />
    </div>
  );
};

const Section = ({ title, icon, link, data, columns, showStatusSpinner = false, growSpinner = false }) => (
  <div className="mb-12">
    <div className="text-center mb-4">
      <h2 className="flex items-center justify-center gap-2 text-xl md:text-2xl font-semibold whitespace-nowrap">
        {React.cloneElement(icon, { size: 24, className: 'text-blue-400 shrink-0' })}
        {title}
      </h2>
      <Link to={link} className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full font-medium shadow mt-2">
        <AiOutlinePlus /> Inserir
      </Link>
    </div>
    <div className="table-responsive scroll-mobile px-2">
      <Table variant="dark" striped bordered hover>
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th key={i}>{col.toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i}>
              {columns.map((col, j) => (
                <td key={j}>
                  {col === 'situacao' && showStatusSpinner
                    ? getStatusSpinner(item[col], growSpinner)
                    : item[col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  </div>
);

const SectionServico = ({ data }) => (
  <div className="mb-16">
    <div className="text-center mb-4">
      <h2 className="flex items-center justify-center gap-2 text-xl md:text-2xl font-semibold whitespace-nowrap">
        <RiShip2Fill size={24} className="text-green-400 shrink-0" /> Navios em Serviço
      </h2>
      <Link to="/servico/create" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full font-medium shadow mt-2">
        <AiOutlinePlus /> Inserir
      </Link>
    </div>
    <div className="table-responsive scroll-mobile px-2">
      <Table variant="dark" striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Imagem</th>
            <th>Serviço</th>
            <th>Comandante</th>
            <th>Data</th>
            <th>Situação</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i}>
              <td>{item.nome}</td>
              <td>
                {item.imges === "erro" ? (
                  <span className="text-danger">Imagem ausente</span>
                ) : imageMap[item.imges] ? (
                  <img
                    src={imageMap[item.imges]}
                    alt="Imagem do navio"
                    style={{ height: '80px', borderRadius: '8px', objectFit: 'cover' }}
                  />
                ) : (
                  <span className="text-warning">Imagem não encontrada</span>
                )}
              </td>
              <td>{item.missao}</td>
              <td>{item.guerra}</td>
              <td>{item.data}</td>
              <td>{getStatusSpinner(item.situacao, true)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  </div>
);

const getStatusSpinner = (status, grow = false) => {
  const animation = grow ? 'grow' : 'border';
  const variantMap = {
    A: 'success',
    I: 'danger',
    N: 'warning'
  };
  return status && variantMap[status] ? (
    <Spinner animation={animation} variant={variantMap[status]} size="sm" />
  ) : (
    <span className="text-gray-400">Indefinido</span>
  );
};

export default ListaFrota;
