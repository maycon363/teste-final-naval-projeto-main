import React from 'react';
import { Alert, Card, Spinner, Table } from 'react-bootstrap';
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
import '../App.css'; // ou o caminho certo

const ListaFrota = () => {
  const construcao = ConstrucaoService.getAll();
  const manutencao = ManutencaoService.getAll();
  const missao = MissaoService.getAll();
  const servico = ServicoService.getAll();
  const treinamento = treinamentoService.getAll();

  return (
    <div className="container-fluid px-2 ">
      <div className="bg-dark text-white text-center mb-3 py-2">
        <h1><GiShipBow /> Lista Geral dos Navios</h1>
      </div>

      <div className="react-player-wrapper mb-4">
        <ReactPlayer className="react-player" width="100%" playing loop controls={false} url="https://www.youtube.com/watch?v=pIFOBeJHzQc" />
      </div>

      <Section title="Lista dos Navios em Construção" icon={<IoMdConstruct />} link="/construcao/create" data={construcao} columns={[
        'nome', 'carac', 'siste', 'radar', 'custo', 'data']}
      />

      <Section title="Lista dos Navios em Manutenção" icon={<IoIosBuild />} link="/manutencao/create" data={manutencao} columns={[
        'nome', 'classe', 'custo', 'data', 'situacao']}
        showStatusSpinner
      />

      <Section title="Lista dos Navios em Missões" icon={<GiBattleship />} link="/missao/create" data={missao} columns={[
        'nome', 'guerra', 'classe', 'missao', 'data', 'situacao']}
        showStatusSpinner growSpinner
      />

      <Section title="Lista dos Navios em Treinamento" icon={<GiBattleship />} link="/treinamento/create" data={treinamento} columns={[
        'navio', 'guerra', 'tipo', 'marinheiro', 'classe', 'data', 'situacao']}
        showStatusSpinner growSpinner
      />

      <div className="text-center mb-2">
        <h1 className="bg-dark text-white py-2"><RiShip2Fill className="icon-style" /> Lista de Navio em Serviço</h1>
        <Link className="btn btn-success mb-3" to={'/servico/create'}><AiOutlinePlus /> Inserir</Link>
      </div>

      <div className="table-responsive scroll-mobile mb-3">
        <Table variant="dark" striped bordered hover>
          <thead>
            <tr>
              <th>Nome do Navio</th>
              <th>Classe</th>
              <th>Tipos de Serviços</th>
              <th>Nomes dos Comandantes</th>
              <th>Datas</th>
              <th>Situações</th>
            </tr>
          </thead>
          <tbody>
            {servico.map((item, i) => (
              <tr key={i}>
                <td>{item.nome}</td>
                <td>
                  {item.imges === "erro" ? (
                      <Alert severity="error">Arma não selecionada!</Alert>
                  ) : (
                    imageMap[item.imges] ? (
                    <Card.Img
                        variant="top"
                        src={imageMap[item.imges]}
                        alt={item.nome || 'Imagem do armamento'}
                        style={{ maxHeight: '100px', objectFit: 'cover' }}
                    />
                    ) : (
                    <Alert severity="error">Imagem não encontrada para este código!</Alert>
                    )
                  )} 
                </td>
                <td>{item.missao}</td>
                <td>{item.guerra}</td>
                <td>{item.data}</td>
                <td>
                  {getStatusSpinner(item.situacao, true)}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

const Section = ({ title, icon, link, data, columns, showStatusSpinner = false, growSpinner = false }) => (
  <div className="mb-5">
    <div className="text-center mb-3">
      <h1 className="bg-dark text-white py-2">{icon}<span className="ms-2">{title}</span></h1>
      <Link className="btn btn-success mb-3" to={link}><AiOutlinePlus /> Inserir</Link>
    </div>
    <div className="table-responsive scroll-mobile">
      <Table variant="dark" striped bordered hover>
        <thead>
          <tr>
            {columns.map((col, i) => <th key={i}>{col.toUpperCase()}</th>)}
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

const getStatusSpinner = (status, grow = false) => {
  const type = grow ? 'grow' : 'border';
  if (status === 'A') return <Spinner animation={type} variant="success" />;
  if (status === 'I') return <Spinner animation={type} variant="danger" />;
  if (status === 'N') return <Spinner animation={type} variant="warning" />;
  return null;
};

export default ListaFrota;
