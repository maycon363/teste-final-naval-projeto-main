import React, { useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const data = [
  {
    src: 'https://tecnodefesa.com.br/wp-content/uploads/2021/06/d5bde4ca-abae-4e01-8ca5-aad5c2ec1462.jpg',
    title: 'Comprar Armamentos',
    navegation:'/armamentos/create',
    text: 'A compra de armamentos para navios é essencial para a defesa das águas territoriais, proteção de rotas comerciais, combate a ameaças como pirataria e contrabando, projeção de poder geopolítico e modernização da frota naval. Também garante segurança econômica, resposta rápida a emergências e participação em operações internacionais.'
  },
  {
    src: 'https://tecnodefesa.com.br/wp-content/uploads/2022/12/NPa_Maracana_incorporcao-0.jpg',
    title: 'Solicitar Manutenção para o Navio',
    navegation:'/manutencao/create',
    text: 'A manutenção de navios de guerra é necessária para garantir sua funcionalidade, prevenir falhas, manter a segurança da tripulação, atualizar tecnologias e prolongar sua vida útil, assegurando que estejam prontos para missões, serviços e ameaças.'
  },
  {
    src: 'https://p2.trrsf.com/image/fget/cf/800/450/middle/images.terra.com/2013/10/30/131028-o-zz999-101.JPG',
    title: 'Comprar Navios',
    navegation:'/construcao/create',
    text: 'Navios de guerra são essenciais para proteger a soberania, recursos naturais e rotas comerciais de um país. Eles garantem segurança marítima, defesa contra agressões externas e permitem projeção de poder internacional. Além disso, auxiliam em missões humanitárias, reforçam parcerias globais e impulsionam a indústria tecnológica e de defesa, sendo fundamentais para a dissuasão estratégica e estabilidade nacional.'
  },
  {
    src: 'https://cdn-pen.nuneshost.com/images/190131-fragata-fremm-francesa.jpg',
    title: 'Solicitar Navio pra Missão',
    navegation:'/missao/create',
    text: 'Enviar navios para missões é importante para proteger interesses nacionais, projetar poder, combater ameaças globais e prestar ajuda humanitária. Essas operações fortalecem alianças, promovem a segurança marítima e reafirmam o compromisso político e diplomático de um país no cenário internacional.'
  },
  {
    src: 'https://cdn-defesaaereanaval.nuneshost.com/wp-content/uploads/2021/07/luigi-rizzo-f-595-750x500.jpg',
    title: 'Solicitar Navios para o Treinamento',
    navegation:'/treinamento/create',
    text: 'Enviar navios para treinamentos é essencial para aprimorar a prontidão da tripulação, testar equipamentos, e desenvolver táticas de combate e defesa. Esses exercícios fortalecem a coordenação entre unidades, garantem a eficiência em operações reais e aumentam a capacidade de resposta a ameaças. Além disso, promovem a integração com outras forças navais em treinamentos conjuntos, reforçando alianças e a interoperabilidade.'
  },
  {
    src: 'https://www.naval.com.br/blog/wp-content/uploads/2018/09/Navio-Patrulha-La-Moqueuse-P688-e1536529154498.jpg',
    title: 'Solicitar Navio para o Serviço',
    navegation:'/servico/create',
    text: 'Enviar navios para serviço é crucial para proteger águas territoriais, assegurar rotas comerciais, realizar operações de segurança e defesa, e responder a crises ou emergências. Essas missões garantem a soberania nacional, preservam recursos estratégicos e reforçam a presença e influência do país no cenário marítimo global.'
  }
];

const SolicitarServico = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [message, setMessage] = useState("");

  const handleSaibaMais = () => {
    setMessage("A funcionalidade de 'Saiba mais...' estará disponível no futuro.");
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Grid>
        <Row>
          <div className="bg-dark text-white text-center mb-3 py-2">
            <h1 style={{ fontWeight: 'bold', fontSize: '2rem' }}>Solicitações de Serviços</h1>
          </div>

          {data.map((item, i) => (
            <Col key={i} md={4} className='g-3 d-flex justify-content-center mb-4'>
              <Card
                border="secondary"
                style={{
                  background: '#161b22',
                  color: 'white',
                  width: '100%',
                  maxWidth: '22rem',
                  borderRadius: '16px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                  transition: 'transform 0.3s ease',
                }}
                className='text-center hover-card'
              >
                <Typography style={{ paddingTop: '15px' }} gutterBottom variant="h5" component="div">
                  {item.title}
                </Typography>

                <Card.Img
                  className='mb-3'
                  variant="top"
                  src={item.src}
                  style={{
                    height: '180px',
                    objectFit: 'cover',
                    borderTopLeftRadius: '16px',
                    borderTopRightRadius: '16px',
                  }}
                />

                <Card.Body>
                  <Card.Header
                    style={{
                      background: '#1f6feb',
                      color: 'white',
                      borderRadius: '8px',
                      marginBottom: '10px',
                    }}
                  >
                    <h2 style={{ fontSize: '1.2rem' }}>Importância</h2>
                    <h6>{item.text}</h6>
                  </Card.Header>
                </Card.Body>
                <Card.Footer>
                  <CardActions className="d-flex justify-content-between">
                    <Link to={item.navegation}>
                      <Button variant="success" size="sm">Solicitar</Button>
                    </Link>
                    <Button size="small" onClick={handleSaibaMais}>Saiba mais...</Button>
                  </CardActions>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Funcionalidade Futuro</DialogTitle>
        <DialogContent>
          <p>{message}</p>
          <p>Enquanto isso, explore os componentes legais do MUI aqui: 
            <a href="https://mui.com/material-ui/react-dialog/" target="_blank" rel="noopener noreferrer"> Dialog do Material-UI</a>
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SolicitarServico;
