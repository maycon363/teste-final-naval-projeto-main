import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Spinner, Container, ListGroup, Row, Col, Card, ProgressBar  } from 'react-bootstrap'
import { Chip } from '@mui/material'
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { AiOutlinePlus } from 'react-icons/ai'
import CategoriaService from '../../services/academico/ConstrucaoService';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const ConstrucaoLista = ({ loading }) => {
  const [construcao, setConstrucao] = useState([])
  const [loadingState, setLoadingState] = useState(true); 

  useEffect(() => {

    setConstrucao(CategoriaService.getAll())
    setTimeout(() => setLoadingState(false), 1000);

  }, [])

  function apagar(id) {
    if(swal("Deletado com Sucesso!!!", "Registro apagado", "success", {dangerMode: true,})){
      CategoriaService.delete(id)
      setConstrucao(CategoriaService.getAll())
    }
  }
    
  return (
    <div>
      <div style={{background: '#000000'}} className="text-center">
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
              construcao.map((item, i)=> (
                <Col key={i} md={4} className='ml-4 g-2 '  >
                  <Card border="dark" style={{  color: "#000000", width: '18rem' }}>
                      {item.imges === "28" && <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/commons/4/45/US_Navy_110401-N-SF508-181_The_Ticonderoga-class_guided-missile_cruiser_USS_Shiloh_%28CG_67%29_transits_off_the_northeastern_coast_of_Japan.jpg" />}
                      {item.imges === "27" && <Card.Img variant="top" src="https://cdn-defesaaereanaval.nuneshost.com/wp-content/uploads/2012/12/CVP-Franc%C3%AAs.jpg" />}
                      {item.imges === "26" && <Card.Img variant="top" src="https://www.naval.com.br/blog/wp-content/uploads/2009/10/L9014-Tonnerre.jpg" />}
                      {item.imges === "25" && <Card.Img variant="top" src="https://www.seaforces.org/marint/Italian-Navy/Destroyer/D-553_DAT/D553-Andrea-Doria-10.jpg" />}
                      {item.imges === "24" && <Card.Img variant="top" src="https://1.bp.blogspot.com/-D5Ttraw5ac0/V4grdCtF9RI/AAAAAAAAEH4/svQQWj-sO80sC7XfSJ_hBdpEnVaXQYOZgCLcB/s1600/Virginia_class_submarine.jpg" />}
                      {item.imges === "23" && <Card.Img variant="top" src="https://1.bp.blogspot.com/-SXRq6xmd9q8/Xq7y3zO2c6I/AAAAAAADNm4/CjMGNgXfE_IsPMefEOP4SFsTmec7dnFFACLcBGAsYHQ/s1600/A1.jpg" />}
                      {item.imges === "22" && <Card.Img variant="top" src="https://pbs.twimg.com/media/Fji3zYvWYAgQs7e?format=jpg&name=4096x4096" />}
                      {item.imges === "21" && <Card.Img variant="top" src="https://www.naval.com.br/blog/wp-content/uploads/2017/06/OPV-Damen.jpg" />}
                      {item.imges === "20" && <Card.Img variant="top" src="https://www.naval.com.br/blog/wp-content/uploads/2018/03/RFA-Tidesurge.jpg" />}
                      {item.imges === "19" && <Card.Img variant="top" src="https://p.turbosquid.com/ts-thumb/Ef/1QJKWR/Vl/r_viewport_002/png/1624540910/600x600/fit_q87/d7d1ad69293948028c1ec1665a942ef09ee8e85c/r_viewport_002.jpg" />}
                      {item.imges === "18" && <Card.Img variant="top" src="https://cdn-defesaaereanaval.nuneshost.com/wp-content/uploads/2015/12/Raptor.jpg" />} 
                    <Card.Body>
                      <Card.Header className="text-center" style={{ background: '#000000', color: 'white',}}><strong>Nome da embarcação: </strong><h7>{item.nome}</h7></Card.Header>
                    </Card.Body>
                    <Card.Body>
                      <ListGroup border="danger" md={1}>
                        <ListGroup.Item style={{background: '#1C1C1C', color: 'white',}}><strong>Data de entrega: </strong> {item.data}</ListGroup.Item>
                        <ListGroup.Item style={{background: '#1C1C1C', color: 'white',}}><strong>Investimento: </strong> {item.custo}</ListGroup.Item>
                        <ListGroup.Item style={{background: '#1C1C1C', color: 'white',}}><strong>Características do navio: </strong> {item.carac}</ListGroup.Item>
                        <ListGroup.Item style={{background: '#1C1C1C', color: 'white',}}><strong>Sistema de defesa do Navio: </strong> {item.siste}</ListGroup.Item>
                        <ListGroup.Item style={{background: '#1C1C1C', color: 'white',}}><strong>Radar do Navio: </strong> {item.radar}</ListGroup.Item>    
                      </ListGroup>
                    </Card.Body>
                  </Card>
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
                </Col>
              ))
            }
          </Row>
          <div className='text-center mb-3'>
            <Link to={-1} className='btn btn-danger'><KeyboardBackspaceIcon/> Voltar</Link>
          </div>
        </Container>
      )}
    </div>
  );
};

export default ConstrucaoLista