import React from 'react';
import { Button, Card } from 'react-bootstrap';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const ServicoCard = ({ item, onSaibaMais }) => (
  <Card
    border="secondary"
    style={{
      background: '#161b22',
      color: 'white',
      borderRadius: '16px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
      transition: 'transform 0.3s ease',
    }}
    className="text-center hover-card h-100 d-flex flex-column justify-content-between"
  >
    <Typography style={{ paddingTop: '15px' }} gutterBottom variant="h6">
      {item.title}
    </Typography>

    <Card.Img
      variant="top"
      src={item.src}
      alt={item.title}
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
        <h6>{item.text.slice(0, 100)}...</h6>
      </Card.Header>
    </Card.Body>

    <Card.Footer>
      <CardActions className="d-flex justify-content-between">
        <Link to={item.navegation}>
          <Button variant="success" size="sm">Solicitar</Button>
        </Link>
        <Button size="sm" onClick={() => onSaibaMais(item)}>Saiba mais...</Button>
      </CardActions>
    </Card.Footer>
  </Card>
);

export default ServicoCard;
