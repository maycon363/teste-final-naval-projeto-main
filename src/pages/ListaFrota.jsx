import React from 'react'
import { Card, Spinner, Table } from 'react-bootstrap'
import { Alert } from '@mui/material'
import { Link } from 'react-router-dom'
import {AiOutlinePlus} from 'react-icons/ai'
import ConstrucaoService from '../services/academico/ConstrucaoService'
import ManutencaoService from '../services/academico/ManutencaoService'
import MissaoService from '../services/academico/MissaoService'
import ServicoService from '../services/academico/ServicoService'
import TreinamentoService from '../services/academico/TreinamentoService'
import ReactPlayer from 'react-player'
import { IoIosBuild, IoMdConstruct  } from "react-icons/io";
import { RiShip2Fill } from "react-icons/ri";
import { GiBattleship, GiIronHulledWarship, GiShipBow  } from "react-icons/gi";

const ListaFrota = () => {
  const construcao = ConstrucaoService.getAll()
  const manutencao = ManutencaoService.getAll()
  const missao = MissaoService.getAll()
  const servico = ServicoService.getAll()
  const treinamento = TreinamentoService.getAll()

  return (
    <div>
      <div style={{background: '#1C1C1C', color: 'white'}} className="text-center mb-2">
        <h1><GiShipBow/> Lista Geral dos Navios</h1>
      </div>
      <div className='para mb-3'>
        <ReactPlayer playing={true} loop={true} controls={false} url='https://youtu.be/gCfC1UST8p8' />
      </div>
      <div className="text-center mb-4">
        <h1 style={{background: '#000000'}}><IoMdConstruct style={{background: 'white', color: 'black', borderRadius: '25px'}} /> Lista dos Navios em Construção</h1>
        <Link className='btn btn-success butao' to={'/construcao/create'}><AiOutlinePlus/> Inserir</Link>
      </div>
      <Table variant="dark" striped bordered hover>
        <thead>
          <tr>
              <th>Nomes dos Navios</th>
              <th>Características dos navios</th>
              <th>Sistemas de defesa dos Navios</th>
              <th>Radares dos Navios</th>
              <th>Investimentos</th>
              <th>Datas das entregas</th>
          </tr>
        </thead>
        <tbody>
            {construcao.map((item, i)=> (
              <tr className='td' key={i}>
                <td>{item.nome}</td>
                <td>{item.carac}</td>
                <td>{item.siste}</td>
                <td>{item.radar}</td>
                <td>{item.custo}</td>
                <td>{item.data}</td>       
              </tr>
            ))}
        </tbody>
      </Table>
      <div className="text-center">
        <h1 style={{background: '#000000'}}><IoIosBuild style={{ background: 'white', color: 'black', borderRadius: '25px'}}/> Lista dos Navios em Manutenção</h1>
        <Link className='btn btn-success butao' to={'/manutencao/create'}><AiOutlinePlus/> Inserir</Link>
      </div>
      <Table variant="dark" className="mt-3" striped bordered hover>
        <thead>
          <tr>
            <th>Nomes dos Navios</th>
            <th>Classes dos Navios</th>
            <th>Investimentos</th>
            <th>Datas das entregas</th>
            <th>Progressos</th>
          </tr>
        </thead>
        <tbody>
            {manutencao.map((item, i) => (
              <tr className='td' key={i}>
                <td>{item.nome}</td>
                <td>{item.classe}</td>
                <td>{item.custo}</td>
                <td>{item.data}</td>
                <td>{item.situacao ===  "A" && <Spinner animation="border" variant="success" />}
                    {item.situacao ===  "I" && <Spinner animation="border" variant="danger" />}
                    {item.situacao ===  "N" && <Spinner animation="border" variant="warning" />}
                </td>   
              </tr>
            ))}
        </tbody>
      </Table>
      <div className="text-center">
        <h1 style={{background: '#000000'}}><GiBattleship style={{ background: 'white', color: 'black', borderRadius: '25px'}}/> Lista dos Navios em Missões</h1>
        <Link className='btn btn-success mb-3 butao' to={'/missao/create'}><AiOutlinePlus /> Inserir</Link>
      </div>
      <Table variant="dark" striped bordered hover>
        <thead>
          <tr>
            <th>Nomes dos Navios</th>
            <th>Nomes dos Comandantes</th>
            <th>Classes dos Navios</th>
            <th>Missões</th>
            <th>Prazos</th>
            <th>Situações</th>
          </tr>
        </thead>
        <tbody>
          {missao.map((item, i) => (
            <tr className='td' key={i}>
              <td>{item.nome}</td>
              <td>{item.guerra}</td>
              <td>{item.classe}</td>
              <td>{item.missao}</td>
              <td>{item.data}</td>
              <td>{item.situacao ===  "A" && <Spinner animation="grow" variant="success" />}
                  {item.situacao ===  "I" && <Spinner animation="grow" variant="danger" />}
                  {item.situacao ===  "N" && <Spinner animation="grow" variant="warning" />}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="text-center">
        <h1 style={{background: '#000000'}}><RiShip2Fill style={{ background: 'white', color: 'black', borderRadius: '25px'}}/> Lista de Navio em Serviço</h1>
        <Link className='btn btn-success mb-3 butao' to={'/servico/create'}><AiOutlinePlus /> Inserir</Link>
      </div>
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
            <tr className='td' key={i}>
              <td>
                <td style={{ alignContent: 'center', justifyContent: 'center', marginTop: 'auto', }}>{item.nome}</td>
              </td>
              <td>
                {item.imgs === "18" && <Card.Img style={{ height: 35,  width: 70}} src="https://www.naval.com.br/blog/wp-content/uploads/2015/11/Russian-cruiser-RFS-Moskva-aerial.jpg" />}
                {item.imgs === "17" && <Card.Img style={{ height: 35,  width: 70}} src="https://www.naval.com.br/blog/wp-content/uploads/2023/10/CVN-69-USS-Dwight-D-Eisenhower-454.jpg" />}
                {item.imgs === "16" && <Card.Img style={{ height: 35,  width: 70}} src="https://www.airway.com.br/wp-content/uploads/2017/12/HMS_Ocean.jpg" />}
                {item.imgs === "15" && <Card.Img style={{ height: 35,  width: 70}} src="https://www.naval.com.br/blog/wp-content/uploads/2015/01/Royal_Navy_Type_45_Destroyer_HMS_Dragon_MOD_45153124-e1524089086702.jpg" />}
                {item.imgs === "14" && <Card.Img style={{ height: 35,  width: 70}} src="https://imgsapp2.correiobraziliense.com.br/app/noticia_127983242361/2019/01/01/728103/20181231185546693631o.jpg" />}
                {item.imgs === "13" && <Card.Img style={{ height: 35,  width: 70}} src="https://www.naval.com.br/blog/wp-content/uploads/2015/04/FREMM-Carlo-Bergamini-foto-2-Marinha-Italiana.jpg" />}
                {item.imgs === "12" && <Card.Img style={{ height: 35,  width: 70}} src="https://www.naval.com.br/blog/wp-content/uploads/2023/02/BR71-MKII-corvette-1280x785.jpeg" />}
                {item.imgs === "11" && <Card.Img style={{ height: 35,  width: 70}} src="https://www.naval.com.br/blog/wp-content/uploads/2023/08/E2EC35C3-4A2D-407E-8482-B7B7228F21EF.jpeg" />}
                {item.imgs === "10" && <Card.Img style={{ height: 35,  width: 70}} src="https://www.naval.com.br/blog/wp-content/uploads/2018/03/RFA-Tidesurge.jpg" />}
                {item.imgs === "9" && <Card.Img style={{ height: 35,  width: 70}} src="https://p.turbosquid.com/ts-thumb/Ef/1QJKWR/Vl/r_viewport_002/png/1624540910/600x600/fit_q87/d7d1ad69293948028c1ec1665a942ef09ee8e85c/r_viewport_002.jpg" />}
                {item.imgs === "8" && <Card.Img style={{ height: 35,  width: 70}} src="https://cdn-defesaaereanaval.nuneshost.com/wp-content/uploads/2015/12/Raptor.jpg" />} 
              </td>
              <td>{item.missao}</td>
              <td>{item.guerra}</td>
              <td>{item.data}</td>
              <td>{item.situacao ===  "A" && <Spinner animation="grow" variant="success" />}
                  {item.situacao ===  "I" && <Spinner animation="grow" variant="danger" />}
                  {item.situacao ===  "N" && <Spinner animation="grow" variant="warning" />}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="text-center">
        <h1 style={{background: '#000000'}}><GiIronHulledWarship style={{ background: 'white', color: 'black', borderRadius: '25px'}}/> Lista dos Navios no Treinamento</h1>
        <Link className='btn btn-success butao' to={'/treinamento/create'}><AiOutlinePlus/> Inserir</Link>
      </div>
      <Table variant="dark" className="mt-3" striped bordered hover>
        <thead>
          <tr>
              <th>Nomes dos navios</th>
              <th>Classes dos navios</th>
              <th>Nomes dos Comandantes</th>
              <th>Tipos de treinamentos</th>
              <th>Marinheiros</th>
              <th>Datas dos Treinamentos</th>
              <th>Níveis dos Treinamentos</th>
          </tr>
        </thead>
        <tbody>
            {treinamento.map((item, i) => (
              <tr className='td' key={i}>
                <td>{item.navio}</td>
                <td>{item.classe}</td>
                <td>{item.guerra}</td>
                <td>{item.tipo}</td>
                <td>{item.marinheiro}</td>
                <td>{item.data}</td>
                <td style={{textAlign: 'center'}}>
                    {item.situacao ===  "A" && <Alert variant="filled" severity="success">Nível baixo</Alert>}
                    {item.situacao ===  "I" && <Alert variant="filled" severity="error">Nível Alto</Alert>}
                    {item.situacao ===  "N" && <Alert variant="filled" severity="warning">Nível Médio</Alert>}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>   
  )
}

export default ListaFrota

