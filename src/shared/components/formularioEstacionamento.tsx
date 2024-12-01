import React, { useState } from 'react';
import { TextField, Button, Box, useTheme } from '@mui/material';
import { estacionamento } from '../../services/cadastro-estacionamento';
import { toast } from 'react-toastify';

interface Estacionamento {
  endereco: string;
  nome: string;
  vagas: number;
  valorHora: number;
  valorMaisHoras: number;
  confirmado: boolean; // O tipo 'vagas' é um número ou uma string vazia.
}

interface FormularioEstacionamentoProps {
  onAdicionarEstacionamento: (estacionamento: Estacionamento) => void;
  onCancelar: () => void;
}

const FormularioEstacionamento: React.FC<FormularioEstacionamentoProps> = ({ onAdicionarEstacionamento, onCancelar }) => {
  const [endereco, setEndereco] = useState<string>('');
  const [nome, setNome] = useState<string>('');
  const [vagas, setVagas] = useState<number>(0);
  const [valorHora, setValorHora] = useState<number>(0);
  const [valorMaisHoras, setValorMaisHoras] = useState<number>(0);
  const [usuarioId, setUsuarioId] = useState<string>('');

  const theme = useTheme();
  const userIdString = localStorage.getItem('userId');
  const userId = userIdString ? parseInt(userIdString) : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (userId === null) {
      toast.success("Usuário não logado. Por favor, faça login novamente.");
      return;
    }

    try {
      const response = await estacionamento(nome, endereco, vagas, userId, valorHora, valorMaisHoras);
      const novoEstacionamento: Estacionamento = {
        endereco: response.endereco,
        nome: response.estacionamentoNome,
        vagas: response.totalvagas,
        valorHora: response.valorHora,
        valorMaisHoras: response.valorMaisHoras,
        confirmado: false, // ou conforme a lógica que você precisa
      };

      localStorage.setItem('estacionamentoId', response.id.toString());

      onAdicionarEstacionamento(novoEstacionamento);
      
      setEndereco('');
      setNome('');
      setVagas(0);
      setValorHora(0);
      setValorMaisHoras(0);
    } catch (error) {
      console.error(error);
    }
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
          label="Primeira Hora"
          type="number"
          value={valorHora}
          onChange={(e) => setValorHora(e.target.value ? parseFloat(e.target.value) : 0)}
          InputProps={{
            style: { backgroundColor: '#ffffff', color: '#000000' },
          }}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Demais Horas"
          type="number"
          value={valorMaisHoras}
          onChange={(e) => setValorMaisHoras(e.target.value ? parseFloat(e.target.value) : 0)}
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