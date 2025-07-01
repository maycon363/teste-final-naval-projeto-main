import React, { useEffect, useState } from 'react'
import { Card, Col, Container, ListGroup, ProgressBar, Row, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ServicoService from '../../services/academico/ServicoService'
import { Alert, Chip } from '@mui/material'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Swal from 'sweetalert2';
import DeleteIcon from '@mui/icons-material/Delete';
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import SecurityIcon from '@mui/icons-material/Security';
import imageMap from '../../services/config/imageConfig';
import LoadingNaval from '../../components/LoadingNaval';

const ServicoLista = ({ loading }) => {

  const [servico, setServico] = useState([])
  const [loadingState, setLoadingState] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {

    setServico(ServicoService.getAll())
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
        await ServicoService.delete(id);
        setServico(ServicoService.getAll());

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

  if (isSubmitting) {
    return <LoadingNaval />;
  }

  return (
    <div>
      <div className="bg-dark text-white text-center mb-3 py-2">
        <h1><SecurityIcon sx={{ fontSize: 50 }} color="primary" />Lista De Navios em Serviço</h1>
      </div>
      <div className="text-center">
        <Link className='btn btn-success mb-3 butao' to={'/servico/create'}><AddModeratorIcon /> Inserir</Link>
      </div>
      {loading || loadingState ? (
        <LoadingNaval />
      ) : servico.length === 0 ? (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh", width: "100%" }}>
          <h3>Nenhum registro encontrado.</h3>
        </div>
      ) : (
        <Container>
          <Row>
            {
              servico.map((item, i) => (
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
                          <h6><strong>Comandante:</strong> {item.guerra}</h6>
                        </ListGroup.Item>
                        <ListGroup.Item style={{ backgroundColor: '#1a1a1a', color: '#fff', borderBottom: '1px solid #222' }}>
                          <h6><strong>Data:</strong> {item.data}</h6>
                        </ListGroup.Item>
                        <ListGroup.Item style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
                          <h6><strong>Tipo:</strong> {item.missao}</h6>
                        </ListGroup.Item>
                      </ListGroup>

                      <div className="text-center ">
                        <strong className='mb-2'>Situação:</strong><br />
                        <div className='mb-2 mt-2'>
                          {item.situacao === "A" && <Spinner animation="border" variant="success" />}
                          {item.situacao === "I" && <Spinner animation="border" variant="danger" />}
                          {item.situacao === "N" && <Spinner animation="border" variant="warning" />}
                        </div>
                      </div>

                      <div className="text-center mt-3">
                        <Link to={'/servico/' + i}>
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

export default ServicoLista