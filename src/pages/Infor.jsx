import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material';
import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Card, Col, Row } from 'react-bootstrap';
import SpeedIcon from '@mui/icons-material/Speed';
import BatteryAlertIcon from '@mui/icons-material/BatteryAlert';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import warships from '../services/warships'; 

const Infor = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [message, setMessage] = useState("");

  const handleCompartilhar = () => {
    setMessage("A funcionalidade de compartilhar estará disponível no futuro.");
    setOpenDialog(true);
  };

  const handleSaibaMais = () => {
    setMessage("A funcionalidade de 'Saiba mais...' estará disponível no futuro.");
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Grid>
        <Row className='mb-3'>
          <div style={{ background: '#000000', color: 'white' }} className='text-center mb-1'>
            <h1>Informações de todos os tipos de Navios de guerra</h1>
          </div>
          {warships.map((item, i) => (
            <Col key={i} md={4} sm={6} xs={12} className='mb-4'>
              <Card border="dark" style={{ background: '#000000', color: 'white', width: '100%' }}>
                <Card.Img variant="top" src={item.src} />
                <Card.Body>
                  <Typography gutterBottom variant="h4" component="div" align="center">
                    {item.icon} {item.type}
                  </Typography>
                  <Typography gutterBottom variant="p" component="div">
                    <h5 style={{ background: '#1E90FF' }}>Função</h5>
                    {item.description}
                  </Typography>
                  <Typography variant="text" component="div">
                    <h5 style={{ background: '#1E90FF' }}>Características</h5>
                    <ul>
                      <li><BatteryAlertIcon style={{ marginRight: 8 }} /><strong>Capacidade:</strong> {item.features.capacidade}</li>
                      <li><ShieldOutlinedIcon style={{ marginRight: 8 }} /><strong>Defesa:</strong> {item.features.defesa}</li>
                      <li><SpeedIcon style={{ marginRight: 8 }} /><strong>Velocidade:</strong> {item.features.velocidade}</li>
                    </ul>
                  </Typography>
                </Card.Body>
                <div className='d-flex justify-content-center align-items-center' style={{ height: '5vh' }}>
                  <Stack spacing={3}>
                    <Rating style={{ background: '#1E90FF' }} name="size-large" defaultValue={1} size="large" />
                  </Stack>
                </div>
                <Card.Footer>
                  <CardActions className="d-flex justify-content-between">
                    <Button size="small" onClick={handleCompartilhar}>Compartilhar</Button>
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
            <a href="https://mui.com/material-ui/react-dialog/" target="_blank" rel="noopener noreferrer">Dialog do Material-UI</a>
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Infor;