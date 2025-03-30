import { Stack } from '@mui/material';
import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Card, Col, Row } from 'react-bootstrap';
import armamentos from '../services/armamentos'; 
import ReactPlayer from 'react-player';
import { AiFillYoutube } from "react-icons/ai";
import { FaRegFileAlt } from "react-icons/fa";
import { AiOutlineSetting } from "react-icons/ai";

const ArmamentosNaval = () => {
  const [activeVideo, setActiveVideo] = useState(null);

  const handleVideoClick = (index) => {
    setActiveVideo(index);
  };

  return (
    <div>
      <Grid>
        <Row className='mb-3'>
          <div style={{ background: '#000000', color: 'white' }} className='text-center mb-1'>
            <h1>Informações de todos os tipos de Armamentos Navais</h1>
          </div>
          {armamentos.map((item, i) => (
            <Col key={i} md={4} sm={6} xs={12} className='mb-4'>
              <Card border="dark" style={{ background: '#000000', color: 'white', width: '100%' }}>
                <Card.Img variant="top" src={item.src} />
                <Card.Body>
                  <Typography gutterBottom variant="h4" component="div" align="center">
                    {item.nome}
                  </Typography>
                  <Typography gutterBottom variant="p" component="div">
                    <h5 style={{ background: '#1E90FF', display: 'flex', alignItems: 'center', padding: '8px', borderRadius: '5px' }}>
                      <FaRegFileAlt size={20} style={{ color: '#FFFFFF', marginRight: '8px' }} />Descrição
                    </h5>
                    {item.descricao}
                  </Typography>
                  <Typography variant="text" component="div">
                    <h5 style={{ background: '#1E90FF', display: 'flex', alignItems: 'center', padding: '8px', borderRadius: '5px' }}>
                      <AiOutlineSetting size={20} style={{ color: '#FFFFFF', marginRight: '8px' }} />
                      Especificações
                    </h5>
                    <ul>
                      <li><strong>Calibre:</strong> {item.calibre}</li>
                      <li><strong>Alcance:</strong> {item.alcance}</li>
                      <li><strong>Peso:</strong> {item.peso}</li>
                      <li><strong>Tipo:</strong> {item.tipo}</li>
                    </ul>
                  </Typography>
                  <Card.Footer className="text-center">
                    <h5 
                      className="text-white p-2 d-flex align-items-center justify-content-center"
                      style={{ 
                        backgroundColor: activeVideo === i ? '#32CD32' : '#1E90FF', 
                        borderRadius: '5px', 
                        cursor: 'pointer' 
                      }}
                      onClick={() => handleVideoClick(i)}
                    >
                      <AiFillYoutube size={20} style={{ color: '#DC143C', marginRight: '8px' }} />
                      {activeVideo === i ? "🎥 Vídeo Aberto! Clique em outro para trocar" : "Assistir Demonstração"}
                    </h5>

                    {activeVideo === i ? (
                      <div className="d-flex justify-content-center align-items-center mt-2">
                        <ReactPlayer 
                          url={item.video} 
                          playing 
                          loop 
                          controls 
                          width="100%" 
                          muted={false} 
                          height="200px" 
                        />  
                      </div>
                    ) : (
                      <div 
                        style={{ 
                          width: '100%', 
                          height: '200px', 
                          display: 'flex', 
                          justifyContent: 'center', 
                          alignItems: 'center', 
                          backgroundImage: 'url("https://images.pond5.com/sonar-screen-submarines-and-ships-footage-085882927_iconl.jpeg")', 
                          backgroundSize: 'cover',
                          color: '#FFF', 
                          fontSize: '25px', 
                          fontWeight: 'bold', 
                          borderRadius: '5px', 
                          cursor: 'pointer',
                          transition: '0.3s',
                          boxShadow: '0px 0px 10px rgba(255, 255, 255, 0.95)'
                        }} 
                        onClick={() => handleVideoClick(i)}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                      >
                        Clique para Assistir
                      </div>
                    )}
                  </Card.Footer>
                </Card.Body>
                <div className='d-flex justify-content-center align-items-center mb-3' style={{ height: '5vh' }}>
                  <Stack spacing={3}>
                    <Rating style={{ background: '#1E90FF' }} name="size-large" defaultValue={1} size="large" />
                  </Stack>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Grid>
    </div>
  );
};

export default ArmamentosNaval;
