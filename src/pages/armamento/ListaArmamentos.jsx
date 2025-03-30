import React, { useEffect, useState } from 'react'
import ArmamentosService from '../../services/academico/ArmamentosService'
import swal from 'sweetalert';
import { Card, Col, ListGroup, Container, Row, Spinner, ProgressBar } from 'react-bootstrap';
import { Alert, Chip } from '@mui/material'
import { Link } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai'
import PaidIcon from '@mui/icons-material/Paid';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';


const ListaArmamentos = ({ loading }) => {
    const [armamento, setArmamento] = useState([]);
    const [loadingState, setLoadingState] = useState(true); 

    useEffect(() => {
        setArmamento(ArmamentosService.getAll());
        setTimeout(() => setLoadingState(false), 1000); 
    }, []);

    function apagar(id) {
        if (swal("Deletado com Sucesso!!!", "Registro apagado", "success", { dangerMode: true })) {
            ArmamentosService.delete(id);
            setArmamento(ArmamentosService.getAll());
        }
    }

    return (
        <div>
            <div style={{ background: '#000000' }} className='text-center'>
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
                            <Col key={i} md={4} className='ml-4 g-2 letra'>
                                <Card border="danger" style={{ color: "#000000", width: '18rem' }}>
                                    {item.imges === "erro" && <Alert variant="filled" severity="error">Alerta, arma não Selecionada!!!</Alert>}
                                    {item.imges === "cp" && <Card.Img variant="top" src="https://d1a5vuhmdbnak9.cloudfront.net/defesanet/site/upload/media/1650328029_25474.jpg" />}
                                    {item.imges === "cs" && <Card.Img variant="top" src="https://www.naval.com.br/blog/wp-content/uploads/2013/05/MSI-DS25M-1.jpg" />}
                                    {item.imges === "man" && <Card.Img variant="top" src="https://www.naval.com.br/blog/wp-content/uploads/2020/09/Atmaca-5.jpg" />}
                                    {item.imges === "mae" && <Card.Img variant="top" src="https://cdn-defesaaereanaval.nuneshost.com/wp-content/uploads/2013/10/MBDA-Sea-Ceptor.jpg" />}
                                    {item.imges === "t" && <Card.Img variant="top" src="https://www.naval.com.br/blog/wp-content/uploads/2015/11/Mk.46-torpedo-960x527.jpg" />}
                                    {item.imges === "m" && <Card.Img variant="top" src="https://www.naval.com.br/blog/wp-content/uploads/2023/06/Visitacao-ao-NPaOc-Araguari-do-Grupamento-de-Patrulha-Naval-do-Nordeste-22-1280x721.jpg" />}
                                    {item.imges === "ca" && <Card.Img variant="top" src="https://cdn1.sputniknewsbr.com.br/img/946/88/9468885_0:0:1025:577_1280x0_80_0_0_dcbac1291a91dc07b2a70902dcbf8f06.jpg" />}
                                    {item.imges === "da" && <Card.Img variant="top" src="https://www.aereo.jor.br/wp-content/uploads//2022/11/Bayraktar-Kizilelma.jpg" />}
                                    {item.imges === "lf" && <Card.Img variant="top" src="https://live.staticflickr.com/2821/11730086453_d0467035b4_b.jpg" />}
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
                                </Card>
                                <div className='mb-3 iconess'>
                                    <Link to={'/armamentos/' + i}>
                                        <Chip
                                            label="Editar"
                                            color="success"
                                            icon={<BorderColorIcon />}
                                        />
                                    </Link>{' '}
                                    <Chip
                                        icon={<RemoveShoppingCartIcon />}
                                        color="error"
                                        label="Deletar"
                                        onClick={() => apagar(i)}
                                    />
                                </div>
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