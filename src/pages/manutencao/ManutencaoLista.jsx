import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Spinner, Container, ListGroup, Col, Row, Card, ProgressBar } from 'react-bootstrap'
import ManutencaoService from '../../services/academico/ManutencaoService'
import { Chip } from '@mui/material'
import { Link } from 'react-router-dom'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { AiOutlinePlus } from 'react-icons/ai'
import Swal from 'sweetalert2';
import DeleteIcon from '@mui/icons-material/Delete';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import EngineeringIcon from '@mui/icons-material/Engineering';

const ManutencaoLista = ({ loading }) => {

  const [manutencao, seManutencao] = useState([])
  const [loadingState, setLoadingState] = useState(true)

  useEffect(() => {

    seManutencao(ManutencaoService.getAll())
    setTimeout(() => setLoadingState(false), 1000);

  }, [])

  async function apagar(id) {
    const result = await Swal.fire({
      title: 'Tem certeza?',
      text: "Essa ação não pode ser desfeita!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        await ManutencaoService.delete(id);
        seManutencao(ManutencaoService.getAll());

        await Swal.fire({
          title: 'Deletado!',
          text: 'Registro apagado com sucesso.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });

      } catch (error) {
        Swal.fire({
          title: 'Erro!',
          text: 'Não foi possível apagar o registro.',
          icon: 'error'
        });
        console.error("Erro ao apagar o registro:", error);
      }
    }
  }


  return (
    <div>
      <div className="bg-dark text-white text-center mb-3 py-2">
        <h1><EngineeringIcon sx={{ fontSize: 50 }} color="primary" />Lista De Navios em Manutenção</h1>
      </div>
      <div className="text-center mb-2">
        <Link
          to="/manutencao/create"
          className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded shadow transition duration-200"
        >
          <AiOutlinePlus size={18} />
          Inserir
        </Link>
      </div>
      {loading || loadingState ? (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh", width: "100%" }}>
          <h1>
            <Spinner animation="grow" variant="warning" /> Carregando...
          </h1>
          <ProgressBar striped variant="warning" animated now={100} style={{ width: "50%", marginTop: "15px" }} />
        </div>
      ) : manutencao.length === 0 ? (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh", width: "100%" }}>
          <h3>Nenhum registro encontrado.</h3>
        </div>
      ) : (
        <Container>
          <Row>
            {
              manutencao.map((item, i) => (
                <Col key={i} xs={12} sm={6} md={4} className='mb-4'>
                  <Card
                    style={{
                      backgroundColor: '#111', // preto suave
                      color: '#fff',
                      width: '100%',
                      borderRadius: '12px',
                      border: '1px solid #0d6efd', // azul bootstrap
                      boxShadow: '0 4px 12px rgba(13, 110, 253, 0.2)',
                      overflow: 'hidden'
                    }}
                  >
                    <Card.Header
                      style={{
                        backgroundColor: '#006400',
                        color: '#fff',
                        fontWeight: 'bold',
                        textAlign: 'center'
                      }}
                    >
                      Nome do Navio: {item.nome}
                    </Card.Header>

                    <Card.Body>
                      <ListGroup variant="flush">
                        <ListGroup.Item style={{ backgroundColor: '#1a1a1a', color: '#fff', borderBottom: '1px solid #333' }}>
                          <strong>Investimento:</strong> {item.custo}
                        </ListGroup.Item>
                        <ListGroup.Item style={{ backgroundColor: '#1a1a1a', color: '#fff', borderBottom: '1px solid #333' }}>
                          <strong>Classe do Navio:</strong> {item.classe}
                        </ListGroup.Item>
                        <ListGroup.Item style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
                          <strong>Data de entrega:</strong> {item.data}
                        </ListGroup.Item>
                      </ListGroup>

                      <Card.Text className='text-center mt-3'>
                        <strong>Progresso</strong>
                      </Card.Text>

                      <div className="text-center mb-3">
                        {item.situacao === "A" && <Spinner animation="border" variant="success" />}
                        {item.situacao === "I" && <Spinner animation="border" variant="danger" />}
                        {item.situacao === "N" && <Spinner animation="border" variant="warning" />}
                      </div>

                      <div className='text-center'>
                        <Link to={'/manutencao/' + i}>
                          <Chip
                            icon={<EditRoundedIcon />}
                            label="Editar"
                            style={{ backgroundColor: '#198754', color: '#fff', marginRight: '8px' }}
                          />
                        </Link>

                        <Chip
                          icon={<DeleteIcon />}
                          label="Deletar"
                          style={{ backgroundColor: '#dc3545', color: '#fff' }}
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

export default ManutencaoLista