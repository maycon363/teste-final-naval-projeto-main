import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Spinner, Container, ListGroup, Row, Col, Card, ProgressBar } from 'react-bootstrap'
import { Alert, Chip } from '@mui/material'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AiOutlinePlus } from 'react-icons/ai'
import CategoriaService from '../../services/academico/ConstrucaoService';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import imageMap from '../../services/config/imageConfig';

const ConstrucaoLista = ({ loading }) => {
  const [construcao, setConstrucao] = useState([])
  const [loadingState, setLoadingState] = useState(true);

  useEffect(() => {

    setConstrucao(CategoriaService.getAll())
    setTimeout(() => setLoadingState(false), 1000);

  }, [])

  async function apagar(id) {
    const result = await Swal.fire({
      title: 'Tem certeza?',
      text: 'Essa ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Deletar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        await CategoriaService.delete(id);
        setConstrucao(CategoriaService.getAll());
        Swal.fire(
          'Deletado com Sucesso!',
          'Registro apagado com sucesso.',
          'success'
        );
      } catch (error) {
        Swal.fire(
          'Erro!',
          'Não foi possível apagar o registro.',
          'error'
        );
        console.error("Erro ao apagar o registro:", error);
      }
    }
  }

  return (
    <div>
      <div className="bg-dark text-white text-center mb-3 py-2">
        <h1 id='inicio'><ShoppingCartIcon sx={{ fontSize: 50 }} color="primary" />Lista De Navios em Construção</h1>
      </div>
      <div className="text-center">
        <Link className='btn btn-success mb-2 butao' to={'/construcao/create'}><AiOutlinePlus /> Inserir</Link>
      </div>
      {loading || loadingState ? (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh", width: "100%" }}>
          <h1>
            <Spinner animation="grow" variant="warning" /> Carregando...
          </h1>
          <ProgressBar striped variant="warning" animated now={100} style={{ width: "50%", marginTop: "15px" }} />
        </div>
      ) : construcao.length === 0 ? (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh", width: "100%" }}>
          <h3>Nenhum registro encontrado.</h3>
        </div>
      ) : (
        <Container>
          <Row>
            {
              construcao.map((item, i) => (
                <Col key={i} md={4} className='ml-4 g-2 mb-3'  >
                  <Card border="dark" style={{ color: "#000000", width: '18rem' }}>
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
                      <Card.Header className="text-center" style={{ background: '#000000', color: 'white', }}><strong>Nome da embarcação: </strong><h7>{item.nome}</h7></Card.Header>
                    </Card.Body>
                    <Card.Body>
                      <ListGroup border="danger" md={1}>
                        <ListGroup.Item style={{ background: '#1C1C1C', color: 'white', }}><strong>Data de entrega: </strong> {item.data}</ListGroup.Item>
                        <ListGroup.Item style={{ background: '#1C1C1C', color: 'white', }}><strong>Investimento: </strong> {item.custo}</ListGroup.Item>
                        <ListGroup.Item style={{ background: '#1C1C1C', color: 'white', }}><strong>Características do navio: </strong> {item.carac}</ListGroup.Item>
                        <ListGroup.Item style={{ background: '#1C1C1C', color: 'white', }}><strong>Sistema de defesa do Navio: </strong> {item.siste}</ListGroup.Item>
                        <ListGroup.Item style={{ background: '#1C1C1C', color: 'white', }}><strong>Radar do Navio: </strong> {item.radar}</ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                    <div className='mb-3 iconess'>
                      <Link to={'/construcao/' + i}>
                        <Chip
                          icon={<BorderColorIcon />}
                          label="Editar"
                          color="success"
                        />
                      </Link>{' '}

                      <Chip
                        icon={<RemoveShoppingCartIcon />}
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
            <Link to={-1} className='btn btn-danger'><KeyboardBackspaceIcon /> Voltar</Link>
          </div>
        </Container>
      )}
    </div>
  );
};

export default ConstrucaoLista