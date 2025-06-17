import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react';
import { Spinner, Container, Row, Col, Card, ListGroup, ProgressBar } from 'react-bootstrap';
import { AiOutlineRollback } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import ComandatesService from '../../services/academico/ComandatesService';
import { Chip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const ComandantesLista = ({ loading }) => {
  const [comandante, setConmandante] = useState([])
  const [loadingState, setLoadingState] = useState(true);

  useEffect(() => {

    setConmandante(ComandatesService.getAll())
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
        await ComandatesService.delete(id);
        setConmandante(ComandatesService.getAll());

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
        <h1><MilitaryTechIcon sx={{ fontSize: 50 }} color="primary" />Lista De Comandantes de Esquadra</h1>
      </div>
      <div className="text-center">
        <Link className='btn btn-success mb-2 butao' to={'/comandantes/create'}><PersonAddIcon /> Inserir</Link>
      </div>
      {loading || loadingState ? (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh", width: "100%" }}>
          <h1>
            <Spinner animation="grow" variant="warning" /> Carregando...
          </h1>
          <ProgressBar striped variant="warning" animated now={100} style={{ width: "50%", marginTop: "15px" }} />
        </div>
      ) : comandante.length === 0 ? (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh", width: "100%" }}>
          <h3>Nenhum registro encontrado.</h3>
        </div>
      ) : (

        <Container>
          <Row>
            {
              comandante.map((item, i) => (
                <Col key={i} md={4} className='mb-4'>
                  <Card
                    style={{
                      backgroundColor: '#111',
                      color: '#fff',
                      width: '100%',
                      borderRadius: '12px',
                      border: '1px solid #0d6efd',
                      boxShadow: '0 4px 12px rgba(13, 110, 253, 0.2)',
                      overflow: 'hidden'
                    }}
                  >
                    <Card.Header
                      style={{
                        backgroundColor: '#006400',
                        color: '#fff',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        borderBottom: '1px solid #0a58ca'
                      }}
                    >
                      Nome do Comandante:
                      <div style={{ fontSize: '1.2rem' }}>{item.guerra}</div>
                    </Card.Header>

                    <Card.Body>
                      <ListGroup variant="flush">
                        <ListGroup.Item style={{ backgroundColor: '#1a1a1a', color: '#fff', borderBottom: '1px solid #222' }}>
                          <strong>Data de Nascimento:</strong> {item.data}
                        </ListGroup.Item>
                        <ListGroup.Item style={{ backgroundColor: '#1a1a1a', color: '#fff', borderBottom: '1px solid #222' }}>
                          <strong>Idade:</strong> {item.idade}
                        </ListGroup.Item>
                        <ListGroup.Item style={{ backgroundColor: '#1a1a1a', color: '#fff', borderBottom: '1px solid #222' }}>
                          <strong>CPF:</strong> {item.cpf}
                        </ListGroup.Item>
                        <ListGroup.Item style={{ backgroundColor: '#1a1a1a', color: '#fff', borderBottom: '1px solid #222' }}>
                          <strong>RG:</strong> {item.rg}
                        </ListGroup.Item>
                        <ListGroup.Item style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
                          <strong>E-mail:</strong> {item.email}
                        </ListGroup.Item>
                      </ListGroup>

                      <Card.Text className='text-center' style={{ fontWeight: 'bold' }}>
                        Situação:
                      </Card.Text>
                      <Card.Text className='text-center'>
                        {item.situacao === "A" && <Spinner animation="border" variant="success" />}
                        {item.situacao === "I" && <Spinner animation="border" variant="danger" />}
                        {item.situacao === "N" && <Spinner animation="border" variant="warning" />}
                      </Card.Text>

                      <div className='mb-2 iconess'>
                        <Link to={'/comandantes/' + i}>
                          <Chip
                            icon={<EditRoundedIcon />}
                            label="Editar"
                            style={{
                              backgroundColor: '#0d6efd',
                              color: '#fff',
                            }}
                          />
                        </Link>
                        <Chip
                          icon={<DeleteIcon />}
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
            <Link to={-1} className='btn btn-danger'><AiOutlineRollback /> Voltar</Link>
          </div>
        </Container>
      )}
    </div>
  );
}; 
export default ComandantesLista