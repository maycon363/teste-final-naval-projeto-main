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
                <Col key={i} md={4} className='mb-4'>
                  <Card
                    style={{
                      backgroundColor: '#111', // fundo preto suave
                      color: '#fff',
                      width: '100%',
                      borderRadius: '12px',
                      border: '1px solid #0d6efd', // azul padrão
                      boxShadow: '0 4px 12px rgba(13, 110, 253, 0.2)',
                      overflow: 'hidden'
                    }}
                  >
                    {item.imges === "erro" ? (
                      <Alert severity="error">Arma não selecionada!</Alert>
                    ) : (
                      imageMap[item.imges] ? (
                        <Card.Img
                          variant="top"
                          src={imageMap[item.imges]}
                          alt={item.nome || 'Imagem do armamento'}
                          style={{
                            maxHeight: '200px',
                            objectFit: 'cover',
                            borderBottom: '1px solid #0d6efd'
                          }}
                        />
                      ) : (
                        <Alert severity="error">Imagem não encontrada para este código!</Alert>
                      )
                    )}

                    <Card.Header
                      style={{
                        backgroundColor: '#006400',
                        color: '#fff',
                        fontWeight: 'bold',
                        textAlign: 'center'
                      }}
                    >
                      Nome da embarcação: {item.nome}
                    </Card.Header>

                    <Card.Body>
                      <ListGroup variant="flush">
                        <ListGroup.Item style={{ backgroundColor: '#1a1a1a', color: '#fff', borderBottom: '1px solid #222' }}>
                          <strong>Data de entrega:</strong> {item.data}
                        </ListGroup.Item>
                        <ListGroup.Item style={{ backgroundColor: '#1a1a1a', color: '#fff', borderBottom: '1px solid #222' }}>
                          <strong>Investimento:</strong> {item.custo}
                        </ListGroup.Item>
                        <ListGroup.Item style={{ backgroundColor: '#1a1a1a', color: '#fff', borderBottom: '1px solid #222' }}>
                          <strong>Características do navio:</strong> {item.carac}
                        </ListGroup.Item>
                        <ListGroup.Item style={{ backgroundColor: '#1a1a1a', color: '#fff', borderBottom: '1px solid #222' }}>
                          <strong>Sistema de defesa:</strong> {item.siste}
                        </ListGroup.Item>
                        <ListGroup.Item style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
                          <strong>Radar:</strong> {item.radar}
                        </ListGroup.Item>
                      </ListGroup>

                      <div className='text-center mt-3'>
                        <Link to={'/construcao/' + i}>
                          <Chip
                            icon={<BorderColorIcon />}
                            label="Editar"
                            style={{
                              backgroundColor: '#0d6efd',
                              color: '#fff',
                              marginRight: '8px'
                            }}
                          />
                        </Link>

                        <Chip
                          icon={<RemoveShoppingCartIcon />}
                          label="Deletar"
                          style={{
                            backgroundColor: '#dc3545',
                            color: '#fff'
                          }}
                          onClick={() => apagar(i)}
                        />
                      </div>
                    </Card.Body>
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