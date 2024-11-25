import React from 'react';
import { Card, CardContent, Typography, Grid, Box, Button, useTheme } from '@mui/material';
import { Link } from "react-router-dom";






interface Estacionamento {
  nome: string;
  endereco: string;
  vagas: number;
  valorHora: number;
  valorMaisHoras: number;
  confirmado: boolean;
}

interface ListaEstacionamentosProps {
  estacionamentos: Estacionamento[];
  onConfirmar: (index: number) => void;
}

const ListaEstacionamentos: React.FC<ListaEstacionamentosProps> = ({ estacionamentos, onConfirmar }) => {
  const theme = useTheme(); 
  return (
    <Box sx={{backgroundColor: '#ffffff', padding: '10px', height:'70vh'}}>
      <Typography variant="h5">Lista de Estacionamentos</Typography>
      {estacionamentos.length === 0 ? (
        <Typography variant="body1" color="textSecondary">Nenhum estacionamento cadastrado ainda.</Typography>
      ) : (
        <Grid container spacing={3}>
          {estacionamentos.map((estacionamento, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card elevation={3}>
                <CardContent style={{backgroundColor: theme.palette.primary.main, color: '#ffffff'}}>
                  <Typography variant="h6">Nome: {estacionamento.nome}</Typography>
                  <Typography variant="body1">Endereço: {estacionamento.endereco}</Typography>
                  <Typography variant="body1">Vagas: {estacionamento.vagas}</Typography>
                  {!estacionamento.confirmado ? (
                    <Button
                      component={Link} to="/rotativo"
                      variant="contained"
                      color="secondary"
                      onClick={() => onConfirmar(index)}
                      sx={{ marginTop: 2 }}
                    >
                      Confirmar
                    </Button>
                  ) : (
                    <Typography variant="body2" color="green" sx={{ marginTop: 2 }}>
                      Estacionamento Confirmado!
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ListaEstacionamentos;
