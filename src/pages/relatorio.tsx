import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Box, Button, Table, TableBody, TableCell, TableHead, TableRow, Paper, Container } from '@mui/material';
import Header from '../shared/components/header';
import RelatorioDonout from '../shared/components/relatorioDonout';
import RelatorioMes from '../shared/components/relatorioMes';

interface TabelaData {
  placa: string;
  tipo: string;
  descricao: string;
  estacionamento: string;
  horario: string;
}

const Relatorio: React.FC = () => {
  const [mostrarTabela, setMostrarTabela] = useState(false);
  const [mostrarFormularioEstacionamento, setMostrarFormularioEstacionamento] = useState(false);

  const alternarVisibilidade = () => {
    setMostrarTabela(!mostrarTabela);
  };

  const dadosTabela: TabelaData[] = [
    { placa: 'ABC1234', tipo: 'Carro', descricao: 'Veículo de passeio', estacionamento: 'Estacionamento A', horario: '14:30' },
    { placa: 'DEF5678', tipo: 'Moto', descricao: 'Motocicleta', estacionamento: 'Estacionamento B', horario: '15:00' },
    { placa: 'GHI9012', tipo: 'Caminhão', descricao: 'Caminhão de carga', estacionamento: 'Estacionamento C', horario: '13:45' },
    { placa: 'JKL3456', tipo: 'Carro', descricao: 'Veículo de passeio', estacionamento: 'Estacionamento A', horario: '16:10' },
    { placa: 'MNO7890', tipo: 'Van', descricao: 'Van de transporte', estacionamento: 'Estacionamento D', horario: '09:30' },
  ];

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sistema de Estacionamento
          </Typography>
          <Button color="inherit" onClick={() => setMostrarFormularioEstacionamento(true)}>
            Adicionar Estacionamento
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ marginTop: 4 }}>
        <Box display="flex" justifyContent="space-between" flexWrap="wrap">
          <Box sx={{ flex: '1 1 48%', marginBottom: 4 }}>
            <RelatorioDonout />
          </Box>
          <Box sx={{ flex: '1 1 48%', marginBottom: 4 }}>
            <RelatorioMes />
          </Box>
        </Box>

        <Box>
          <Typography
            variant="h5"
            component="h2"
            onClick={alternarVisibilidade}
            sx={{ cursor: 'pointer', marginBottom: 2 }}
          >
            {mostrarTabela ? 'Clique para esconder o histórico de veículos' : 'Clique para ver o histórico de veículos'}
          </Typography>

          {mostrarTabela && (
            <Paper elevation={3}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Placa do Veículo</TableCell>
                    <TableCell>Tipo de Veículo</TableCell>
                    <TableCell>Descrição</TableCell>
                    <TableCell>Estacionamento</TableCell>
                    <TableCell>Horário de Pagamento</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dadosTabela.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.placa}</TableCell>
                      <TableCell>{item.tipo}</TableCell>
                      <TableCell>{item.descricao}</TableCell>
                      <TableCell>{item.estacionamento}</TableCell>
                      <TableCell>{item.horario}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default Relatorio;
