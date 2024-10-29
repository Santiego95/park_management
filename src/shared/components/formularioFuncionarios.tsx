// src/components/FormularioFuncionario.tsx
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  useTheme,
} from '@mui/material';

interface FormularioFuncionarioProps {
  onAdicionarFuncionario: (novoFuncionario: { nome: string; funcao: string; estacionamento: string; email: string; senha: string; }) => void;
  onCancelar: () => void;
}

const FormularioFuncionario: React.FC<FormularioFuncionarioProps> = ({ onAdicionarFuncionario, onCancelar }) => {
  const [nome, setNome] = useState('');
  const [funcao, setFuncao] = useState('');
  const [estacionamento, setEstacionamento] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const novoFuncionario = {
      nome,
      funcao,
      estacionamento,
      email,
      senha,
    };
    onAdicionarFuncionario(novoFuncionario);
  };
  const theme = useTheme();

  return (
    <Box sx={{ padding: 2, backgroundColor: theme.palette.primary.main }}>
      <Typography variant="h5" component="h3">Cadastrar Funcionário</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nome"
          variant="outlined"
          fullWidth
          margin="normal"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          InputProps={{
            style: { backgroundColor: '#ffffff', color: '#000000' },
          }}
          required
        />
        <TextField
          label="Função"
          variant="outlined"
          fullWidth
          margin="normal"
          value={funcao}
          onChange={(e) => setFuncao(e.target.value)}
          InputProps={{
            style: { backgroundColor: '#ffffff', color: '#000000' },
          }}
          required
        />
        <TextField
          label="Estacionamento"
          variant="outlined"
          fullWidth
          margin="normal"
          value={estacionamento}
          onChange={(e) => setEstacionamento(e.target.value)}
          InputProps={{
            style: { backgroundColor: '#ffffff', color: '#000000' },
          }}
          required
        />
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            style: { backgroundColor: '#ffffff', color: '#000000' },
          }}
          required
        />
        <TextField
          label="Senha"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          InputProps={{
            style: { backgroundColor: '#ffffff', color: '#000000' },
          }}
          required
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
          <Button style={{ color: "#ffffff", backgroundColor: '#40BB14' }} variant="contained" type="submit">Confirmar</Button>
          <Button style={{ color: "#ffffff", backgroundColor: '#F31111' }} variant="contained" onClick={onCancelar}>Cancelar</Button>
        </Box>
      </form>
    </Box>
  );
}

export default FormularioFuncionario;
