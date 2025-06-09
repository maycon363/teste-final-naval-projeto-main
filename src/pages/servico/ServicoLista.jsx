import React, { useEffect, useState } from 'react'
import { Card, Col, Container, ListGroup, ProgressBar, Row, Spinner} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ServicoService from '../../services/academico/ServicoService'
import { Alert, Chip } from '@mui/material'
import { AiOutlineRollback } from 'react-icons/ai'
import swal from 'sweetalert';
import DeleteIcon from '@mui/icons-material/Delete';
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import SecurityIcon from '@mui/icons-material/Security';
import imageMap from '../../services/config/imageConfig';

const ServicoLista = ({ loading }) => {

  const [servico, setServico] = useState([])
   const [loadingState, setLoadingState] = useState(true);

  useEffect(() => {

    setServico(ServicoService.getAll())
    setTimeout(() => setLoadingState(false), 1000);

  }, [])

  async function apagar(id) {
    const confirmacao = await swal({
      title: "Tem certeza?",
      text: "Essa ação não pode ser desfeita!",
      icon: "warning",
      buttons: ["Cancelar", "Deletar"],
      dangerMode: true,
    });
  
    if (confirmacao) {
      try {
        await ServicoService.delete(id);
        setServico(ServicoService.getAll());
        swal("Deletado com Sucesso!", "Registro apagado com sucesso.", "success");
      } catch (error) {
        swal("Erro!", "Não foi possível apagar o registro.", "error");
        console.error("Erro ao apagar o registro:", error);
      }
    }
  }

  return (
    <div>
      <div className="bg-dark text-white text-center mb-3 py-2">
        <h1><SecurityIcon sx={{ fontSize: 50 }} color="primary"/>Lista De Navios em Serviço</h1>
      </div>
      <div className="text-center">
        <Link className='btn btn-success mb-3 butao' to={'/servico/create'}><AddModeratorIcon /> Inserir</Link>
      </div>
      {loading || loadingState ? (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh", width: "100%" }}>
          <h1>
            <Spinner animation="grow" variant="warning" /> Carregando...
          </h1>
          <ProgressBar striped variant="warning" animated now={100} style={{ width: "50%", marginTop: "15px" }} />
        </div>
      ) : servico.length === 0 ? (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh", width: "100%" }}>
          <h3>Nenhum registro encontrado.</h3>
        </div>
      ) : (
        <Container>
          <Row>
            {
              servico.map((item, i)=> (
                <Col key={i} md={4} className='ml-4 g-2 letra mb-3'  >
                  <Card border="dark" style={{  color: "#000000", width: '18rem' }}>
                      {item.imges === "erro" ? (
                          <Alert severity="error">Arma não selecionada!</Alert>
                      ) : (
                        imageMap[item.imges] ? (
                        <Card.Img
                            variant="top"
                            src={imageMap[item.imges]}
                            alt={item.nome || 'Imagem do armamento'}
                            style={{ maxHeight: '200px', objectFit: 'cover' }}
                        />
                        ) : (
                        <Alert severity="error">Imagem não encontrada para este código!</Alert>
                        )
                      )} 
                    <Card.Body>
                      <Card.Header style={{background: '#000000', color: 'white',}}><strong>{item.nome}</strong></Card.Header>
                    </Card.Body>
                    <Card.Body>
                      <ListGroup md={1}>
                          <ListGroup.Item style={{background: '#1C1C1C', color: 'white',}}><h5>Nome do Comandante: </h5><strong>{item.guerra}</strong></ListGroup.Item>
                          <ListGroup.Item style={{background: '#1C1C1C', color: 'white',}}><h5>Data do Serviço: </h5><strong> {item.data}</strong></ListGroup.Item>
                          <ListGroup.Item style={{background: '#1C1C1C', color: 'white',}}><h5>Tipo de Serviço: </h5><strong>{item.missao}</strong></ListGroup.Item>
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
                    <div className='mb-2 iconess'>
                      <Link to={'/servico/' + i}>
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
                  </Card>
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

export default ServicoLista