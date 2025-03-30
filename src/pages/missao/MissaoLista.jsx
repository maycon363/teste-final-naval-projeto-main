import React, { useEffect, useState } from 'react'
import { Card, Col, Container, ListGroup, ProgressBar, Row, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import MissaoService from '../../services/academico/MissaoService'
import { AiOutlinePlus } from 'react-icons/ai'
import { Chip } from '@mui/material'
import { AiOutlineRollback } from 'react-icons/ai'
import DeleteIcon from '@mui/icons-material/Delete';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import swal from 'sweetalert';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';

const MissaoLista = ({ loading }) => {

    const [missao, seMissao] = useState([])
    const [loadingState, setLoadingState] = useState(true);

    useEffect(() => {

      seMissao(MissaoService.getAll())
      setTimeout(() => setLoadingState(false), 1000);

    }, [])

    function apagar(id) {
      if(swal("Registro Deletado com Sucesso!!!", "Registro apagado", "success", {dangerMode: true,
      })){
        MissaoService.delete(id)
        seMissao(MissaoService.getAll())
      }
    }

  return (
    <div>
      <div style={{background: '#000000'}} className="text-center">
        <h1><PrivacyTipIcon sx={{ fontSize: 50 }} color="primary"/>Lista De Navios em Missão</h1>
      </div>
      <div className="text-center">
        <Link className='btn btn-success mb-3 butao' to={'/missao/create'}><AiOutlinePlus /> Inserir</Link>
      </div>
      {loading || loadingState ? (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh", width: "100%" }}>
          <h1>
            <Spinner animation="grow" variant="warning" /> Carregando...
          </h1>
          <ProgressBar striped variant="warning" animated now={100} style={{ width: "50%", marginTop: "15px" }} />
        </div>
        ) : missao.length === 0 ? (
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh", width: "100%" }}>
            <h3>Nenhum registro encontrado.</h3>
          </div>
      ) : (
        <Container>
          <Row>
            {
              missao.map((item, i)=> (
                <Col key={i} md={4} className='ml-4 g-2 letra '  >
                  <Card border="dark" style={{  color: "#000000", width: '18rem' }}>
                    <Card.Body>
                      <Card.Header style={{background: '#000000', color: 'white',}}><strong>{item.nome}</strong></Card.Header>
                    </Card.Body>
                    <Card.Body>
                      <ListGroup md={1}>
                        <ListGroup.Item  style={{background: '#1C1C1C', color: 'white',}}><strong>Classe do Navio: </strong>{item.classe}</ListGroup.Item>
                        <ListGroup.Item  style={{background: '#1C1C1C', color: 'white',}}><strong>Nome do Comandante: </strong>{item.guerra}</ListGroup.Item>
                        <ListGroup.Item  style={{background: '#1C1C1C', color: 'white',}}><strong>Nome da Missão: </strong> {item.missao}</ListGroup.Item>
                        <ListGroup.Item  style={{background: '#1C1C1C', color: 'white',}}><strong>Data da Missão: </strong> {item.data}</ListGroup.Item>
                      </ListGroup> 
                      <Card.Text className='lets'>
                        <strong>Situação</strong>                        
                      </Card.Text> 
                      <Card.Text className='lets2'>
                        {item.situacao ===  "A" && <Spinner animation="border" variant="success" />}
                        {item.situacao ===  "I" && <Spinner animation="border" variant="danger" />}
                        {item.situacao ===  "N" && <Spinner animation="border" variant="warning" />}
                      </Card.Text>   
                    </Card.Body>
                  </Card>
                    <div className='mb-3 iconess'>
                      <Link to={'/missao/' + i}>
                        <Chip
                          icon={<EditRoundedIcon />}
                          label="Editar"
                          color="success"
                        />
                      </Link>{' '}
                        
                      <Chip
                        icon={<DeleteIcon />}
                        color="error"
                        label="Deletar"
                        onClick={() => apagar(i)}
                      />
                    </div>
                </Col>
              ))
            }
          </Row>
          <div className='text-center mb-3'>
            <Link to={-1} className='btn btn-danger'><AiOutlineRollback/> Voltar</Link>
          </div>
        </Container>
      )}  
    </div>
  );
};

export default MissaoLista