import React, { useEffect, useState } from 'react';
import ArmamentosService from '../../services/academico/ArmamentosService';
import Swal from 'sweetalert2';
import { Card, Col, ListGroup, Container, Row, Spinner, ProgressBar } from 'react-bootstrap';
import { Alert, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai'
import PaidIcon from '@mui/icons-material/Paid';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import imageMap from '../../services/config/imageConfig';


const ListaArmamentos = ({ loading }) => {
    const [armamento, setArmamento] = useState([]);
    const [loadingState, setLoadingState] = useState(true);

    useEffect(() => {
        setArmamento(ArmamentosService.getAll());
        setTimeout(() => setLoadingState(false), 1000);
    }, []);

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
                await ArmamentosService.delete(id);
                setArmamento(ArmamentosService.getAll());

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
                <h1><PaidIcon sx={{ fontSize: 50 }} color="primary" /> Lista dos Equipamentos Bélicos</h1>
            </div>
            <div className="text-center mb-2">
                <Link
                    to="/armamentos/create"
                    className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded shadow transition duration-200"
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
            ) : armamento.length === 0 ? (
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh", width: "100%" }}>
                    <h3>Nenhum registro encontrado.</h3>
                </div>
            ) : (
                <Container>
                    <Row>
                        {armamento.map((item, i) => (
                            <Col key={i} md={4} className="mb-4">
                                <Card
                                    style={{
                                        backgroundColor: '#111',
                                        color: '#fff',
                                        borderRadius: '12px',
                                        border: '1px solid #dc3545',
                                        boxShadow: '0 4px 12px rgba(220, 53, 69, 0.2)',
                                        overflow: 'hidden'
                                    }}
                                >
                                    {item.imges === "erro" ? (
                                        <Alert severity="error">Arma não selecionada!</Alert>
                                    ) : imageMap[item.imges] ? (
                                        <Card.Img
                                            variant="top"
                                            src={imageMap[item.imges]}
                                            alt={item.nome || 'Imagem do armamento'}
                                            style={{
                                                height: '200px',
                                                objectFit: 'cover',
                                                borderBottom: '3px solid #dc3545'
                                            }}
                                        />
                                    ) : (
                                        <Alert severity="warning">Imagem não encontrada para este código!</Alert>
                                    )}

                                    <Card.Header
                                        style={{
                                            backgroundColor: '#006400',
                                            color: '#fff',
                                            textAlign: 'center',
                                            fontWeight: 'bold',
                                            borderBottom: '1px solid #b02a37'
                                        }}
                                    >
                                        {item.nome}
                                    </Card.Header>

                                    <Card.Body>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item style={{ backgroundColor: '#1a1a1a', color: '#fff', borderBottom: '1px solid #222' }}>
                                                <strong>Data de entrega:</strong> {item.data}
                                            </ListGroup.Item>
                                            <ListGroup.Item style={{ backgroundColor: '#1a1a1a', color: '#fff', borderBottom: '1px solid #222' }}>
                                                <strong>Investimento:</strong> ${item.custo}
                                            </ListGroup.Item>
                                            <ListGroup.Item style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
                                                <strong>Quantidade:</strong> {item.quantidade}
                                            </ListGroup.Item>
                                        </ListGroup>

                                        <div className="text-center mt-3">
                                            <Link to={'/armamentos/' + i}>
                                                <Chip
                                                    icon={<BorderColorIcon />}
                                                    label="Editar"
                                                    style={{
                                                        backgroundColor: '#198754',
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
                        ))}
                    </Row>
                    <div className='text-center mb-3'>
                        <Link to={-1} className='btn btn-danger'><KeyboardBackspaceIcon /> Voltar</Link>
                    </div>
                </Container>
            )}
        </div>
    );
}

export default ListaArmamentos