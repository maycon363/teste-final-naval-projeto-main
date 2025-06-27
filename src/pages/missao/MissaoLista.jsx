import React, { useEffect, useState } from 'react'
import { Card, Col, Container, ListGroup, ProgressBar, Row, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import MissaoService from '../../services/academico/MissaoService'
import { AiOutlinePlus } from 'react-icons/ai'
import { Chip } from '@mui/material'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import DeleteIcon from '@mui/icons-material/Delete';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Swal from 'sweetalert2';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';

const MissaoLista = ({ loading }) => {

  const [missao, seMissao] = useState([])
  const [loadingState, setLoadingState] = useState(true);

  useEffect(() => {

    seMissao(MissaoService.getAll())
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
        await MissaoService.delete(id);
        seMissao(MissaoService.getAll());

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
        <h1><PrivacyTipIcon sx={{ fontSize: 50 }} color="primary" />Lista De Navios em Missão</h1>
      </div>
      <div className="text-center mb-3">
        <Link
          to="/missao/create"
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
      ) : missao.length === 0 ? (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh", width: "100%" }}>
          <h3>Nenhum registro encontrado.</h3>
        </div>
      ) : (
        <Container>
          <Row>
            {
              missao.map((item, i) => (
                <Col key={i} md={4} className="mb-4">
                  <Card
                    style={{
                      backgroundColor: '#111',
                      color: '#fff',
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
                      {item.nome}
                    </Card.Header>

                    <Card.Body>
                      <ListGroup variant="flush">
                        <ListGroup.Item style={{ backgroundColor: '#1a1a1a', color: '#fff', borderBottom: '1px solid #222' }}>
                          <strong>Classe do Navio:</strong> {item.classe}
                        </ListGroup.Item>
                        <ListGroup.Item style={{ backgroundColor: '#1a1a1a', color: '#fff', borderBottom: '1px solid #222' }}>
                          <strong>Comandante:</strong> {item.guerra}
                        </ListGroup.Item>
                        <ListGroup.Item style={{ backgroundColor: '#1a1a1a', color: '#fff', borderBottom: '1px solid #222' }}>
                          <strong>Missão:</strong> {item.missao}
                        </ListGroup.Item>
                        <ListGroup.Item style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
                          <strong>Data da Missão:</strong> {item.data}
                        </ListGroup.Item>
                      </ListGroup>

                      <div className="text-center mt-3">
                        <strong className='mt-3 mb-2'>Situação:</strong><br />
                        <div className='mb-2 mt-2'>
                          {item.situacao === "A" && <Spinner animation="border" variant="success" />}
                          {item.situacao === "I" && <Spinner animation="border" variant="danger" />}
                          {item.situacao === "N" && <Spinner animation="border" variant="warning" />}
                        </div>
                      </div>

                      <div className="text-center mt-3">
                        <Link to={'/missao/' + i}>
                          <Chip
                            icon={<EditRoundedIcon />}
                            label="Editar"
                            style={{
                              backgroundColor: '#198754',
                              color: '#fff',
                              marginRight: '8px'
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
            <Link to={-1} className='btn btn-danger'><KeyboardBackspaceIcon /> Voltar</Link>
          </div>
        </Container>
      )}
    </div>
  );
};

export default MissaoLista