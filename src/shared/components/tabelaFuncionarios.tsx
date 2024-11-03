// src/components/TabelaFuncionarios.tsx
import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Funcionario {
  nome: string;
  //funcao: string;
  cpf: string;
  estacionamento: string;
  email: string;
}

interface TabelaFuncionariosProps {
  funcionarios: Funcionario[];
  onDelete: (index: number) => void; // Função de callback para deletar funcionário
}

const TabelaFuncionarios: React.FC<TabelaFuncionariosProps> = ({ funcionarios, onDelete }) => {
  return (
    <Box sx={{backgroundColor: '#ffffff', padding: '10px', height:'70vh'}}>
      <Typography variant="h5">Lista de Funcionários</Typography>
      {funcionarios.length === 0 ? (
        <Typography variant="body1" color="textSecondary">Nenhum funcionário cadastrado ainda.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Função</TableCell>
                <TableCell>Estacionamento</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Ações</TableCell> {/* Coluna para ações */}
              </TableRow>
            </TableHead>
            <TableBody>
              {funcionarios.map((funcionario, index) => (
                <TableRow key={index}>
                  <TableCell>{funcionario.nome}</TableCell>
                  <TableCell>{funcionario.cpf}</TableCell>
                  <TableCell>{funcionario.estacionamento}</TableCell>
                  <TableCell>{funcionario.email}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => onDelete(index)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default TabelaFuncionarios;
