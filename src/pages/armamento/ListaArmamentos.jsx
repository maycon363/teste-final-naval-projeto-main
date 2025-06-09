import React, { useEffect, useState } from 'react';
import ArmamentosService from '../../services/academico/ArmamentosService';
import swal from 'sweetalert';
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
        const confirmacao = await swal({
            title: "Tem certeza?",
            text: "Essa ação não pode ser desfeita!",
            icon: "warning",
            buttons: ["Cancelar", "Deletar"],
            dangerMode: true,
        });
    
        if (confirmacao) {
            try {
                await ArmamentosService.delete(id);
                setArmamento(ArmamentosService.getAll());
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
                <h1><PaidIcon sx={{ fontSize: 50 }} color="primary" /> Lista dos Armamentos</h1>
            </div>
            <div className="text-center">
                <Link className='btn btn-success mb-2 butao' to={'/armamentos/create'}><AiOutlinePlus /> Inserir</Link>
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
                            <Col key={i} md={4} className='ml-4 g-2 letra mb-3'>
                                <Card border="danger" style={{ color: "#000000", width: '18rem' }}>
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
                                        <Alert severity="warning">Imagem não encontrada para este código!</Alert>
                                        )
                                    )}
                                    <Card.Body>
                                        <Card.Header style={{ background: '#000000', color: 'white' }}><strong>{item.nome}</strong></Card.Header>
                                    </Card.Body>
                                    <Card.Body>
                                        <ListGroup md={1}>
                                            <ListGroup.Item style={{ background: '#1C1C1C', color: 'white' }}><strong>Data de entrega: </strong> {item.data}</ListGroup.Item>
                                            <ListGroup.Item style={{ background: '#1C1C1C', color: 'white' }}><strong>Investimento: ${item.custo}</strong></ListGroup.Item>
                                            <ListGroup.Item style={{ background: '#1C1C1C', color: 'white' }}><strong>Quantidade de Armamento: </strong> {item.quantidade}</ListGroup.Item>
                                        </ListGroup>
                                    </Card.Body>
                                    <div className="mb-3 iconess">
                                        <Link to={'/armamentos/' + i}>
                                            <Chip
                                            label="Editar"
                                            color="success"
                                            icon={<BorderColorIcon />}
                                            />
                                        </Link>
                                        <Chip
                                            icon={<RemoveShoppingCartIcon />}
                                            color="error"
                                            label="Deletar"
                                            onClick={() => apagar(i)}
                                        />
                                    </div>
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