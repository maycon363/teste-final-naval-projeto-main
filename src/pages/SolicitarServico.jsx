import React from 'react'
import { Button, Card, Col, Row  } from 'react-bootstrap'
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
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
  return (
    <Grid>
      <Row>
        <div style={{background: '#000000', color: 'white',}} className='text-center mb-2'>
          <h1>Solicitações de Serviços</h1>
        </div>
          {
          data.map((item, i)=> (
            <Col key={i} md={4} className='ml-4 g-2 letra text-center mb-2'  >
              <Card border="dark" style={{  background: '#000000', color: 'white', width: '18rem' }}>                
                <Typography style={{paddingTop: '10px'}} gutterBottom variant="h5" component="div">
                  {item.title}
                </Typography>
                <Card.Img className='mb-2' variant="top" src={item.src} />
                <Card.Body>
                  <Card.Header style={{background: '#4169E1', color: 'white',}}><h2>Importância</h2><h6>{item.text}</h6></Card.Header>
                </Card.Body> 
                <div className='botoesinf'>
                  <CardActions>
                    <Link to={item.navegation}>
                      <Button variant="success" size="small">Solicitar</Button>
                    </Link>
                    <Link to={item.navegation2}>
                      <Button variant="primary" size="small" disabled>Saiba mais...</Button>
                    </Link>
                  </CardActions>
                </div>
              </Card>
            </Col>
          ))
        }         
      </Row>
    </Grid>
  );
}
export default SolicitarServico