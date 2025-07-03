import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, Button as MuiButton, Box } from '@mui/material';
import ServicoCard from '../components/ServicoCard';
import { Col, Row } from 'react-bootstrap';
import { data } from '../services/dadossolicitar';

const SolicitarServico = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSaibaMais = (item) => {
    setSelectedItem(item);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedItem(null);
  };

  return (
    <>
      <Box
        sx={{
          bgcolor: 'primary.dark',
          color: 'white',
          textAlign: 'center',
          py: 6,
          mb: 4,
          borderRadius: 2,
          maxWidth: 900,
          mx: 'auto',
        }}
      >
        <Typography variant="h3" fontWeight="bold" color="primary.contrastText">
          Solicitações de Serviços
        </Typography>
        <Typography variant="subtitle1" color="grey.300">
          Escolha uma das opções abaixo
        </Typography>
      </Box>

      <Row>
        {data.map((item, i) => (
          <Col key={i} md={4} className="mb-4 d-flex">
            <ServicoCard item={item} onSaibaMais={handleSaibaMais} />
          </Col>
        ))}
      </Row>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: '#121212', 
            color: '#fff', 
          },
        }}
      >
        <DialogTitle sx={{ color: '#fff' }}>{selectedItem?.title}</DialogTitle>
        <DialogContent dividers sx={{ color: '#ddd' }}>
          {selectedItem?.src && (
            <img
              src={selectedItem.src}
              alt={selectedItem.title}
              style={{ width: '100%', borderRadius: 8, marginBottom: 16 }}
            />
          )}

          <Typography variant="body1" paragraph whiteSpace="pre-line">
            {selectedItem?.description || selectedItem?.text}
          </Typography>

          {selectedItem?.specs && (
            <>
              <Typography variant="subtitle1" gutterBottom sx={{ color: '#aaa' }}>
                Especificações Técnicas
              </Typography>
              <ul>
                {Object.entries(selectedItem.specs).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {value}
                  </li>
                ))}
              </ul>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <MuiButton onClick={handleCloseDialog} color="primary" variant="contained">
            Fechar
          </MuiButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SolicitarServico;
