import React, { useState } from 'react';
import { TextField, Button, Box, useTheme } from '@mui/material';

interface Estacionamento {
  endereco: string;
  nome: string;
  vagas: number;
  confirmado: boolean; // O tipo 'vagas' é um número ou uma string vazia.
}

interface FormularioEstacionamentoProps {
  onAdicionarEstacionamento: (estacionamento: Estacionamento) => void;
  onCancelar: () => void;
}



const FormularioEstacionamento: React.FC<FormularioEstacionamentoProps> = ({ onAdicionarEstacionamento, onCancelar }) => {
  const [endereco, setEndereco] = useState<string>('');
  const [nome, setNome] = useState<string>('');
  const [vagas, setVagas] = useState<number>(0); // Inicializa como 0

  const theme = useTheme();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const novoEstacionamento: Estacionamento = {
      endereco,
      nome,
      vagas, // Converte para número ou mantém como string vazia
      confirmado: false, // Definindo o valor inicial como false
    };
  
    onAdicionarEstacionamento(novoEstacionamento);
  };
  

  return (
    <form onSubmit={handleSubmit} style={{padding: 10, backgroundColor: theme.palette.primary.main}}>
      <Box sx={{  padding: 2, backgroundColor: theme.palette.primary.main }}>
        <TextField
          fullWidth
          label="Endereço"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
          InputProps={{
            style: { backgroundColor: '#ffffff', color: '#000000' },
          }}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          InputProps={{
            style: { backgroundColor: '#ffffff', color: '#000000' },
          }}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Vagas"
          type="number"
          value={vagas}
          onChange={(e) => setVagas(e.target.value ? parseInt(e.target.value) : NaN)}
          InputProps={{
            style: { backgroundColor: '#ffffff', color: '#000000' },
          }}
          margin="normal"
          required
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
        <Button style={{ color: "#ffffff", backgroundColor: '#40BB14' }} variant="contained" type="submit">Confirmar</Button>
        <Button style={{ color: "#ffffff", backgroundColor: '#F31111' }} variant="contained" onClick={onCancelar}>Cancelar</Button>
      </Box>
    </form>
  );
};

export default FormularioEstacionamento;
