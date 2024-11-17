import fundo from "../shared/img/fundo.jpeg";
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import {
  TextField,
  Typography,
  Button,
  Box,
  Paper,
  Tooltip,
  Alert,
} from "@mui/material";
import { register } from "../services/auth";

const Cadastro: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await register(name, email, cpf, password, confirmPassword);
      console.log("Usuário cadastrado com sucesso:", response.message);

      setName("");
      setEmail("");
      setCpf("");
      setPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      setErrorMessage("Erro no cadastro. Verifique os dados e tente novamente.");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" style={{
        backgroundImage: `url(${fundo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      <Paper style={{ display: 'flex', justifyContent: 'center' }}>
        <Paper 
          elevation={3} 
          style={{ paddingTop: '20px', maxWidth: '400px', width: '100%', backgroundColor: '#FF740F', color: '#ffffff', height: '414px' }}
        >
          <Box textAlign="center" marginBottom="20px" height="100%">
            <Typography marginTop="60px" variant="h4">Bem Vindo</Typography>
            <Typography marginTop="60px" variant="h5">Novo Cadastro</Typography>
            <Button style={{ marginTop: '60px' }} component={Link} to="/login" variant="contained" color="secondary">
              Fazer Login
            </Button>
          </Box>
        </Paper>
        <Paper elevation={3} style={{ padding: '20px 80px', maxWidth: '400px', width: '100%' }}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Nome Completo"
              type="text"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="CPF"
              type="cpf"
              variant="outlined"
              fullWidth
              margin="normal"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              required
            />
            <Tooltip
              title={
                <>
                  A senha deve conter:<br/><br/>
                  - 8 caracteres<br/>
                  - 1 caractere especial<br/>
                  - 1 número<br/>
                  - 1 letra maiúscula<br/>
                </>
              }
              placement="right"
              arrow
            >
              <TextField
                label="Senha"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Tooltip>
            <TextField
              label="Confirmar Senha"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: '20px' }}
              type="submit"
            >
              Confirmar
            </Button>
            {errorMessage && (
              <Alert severity="error" style={{ marginTop: '20px' }}>
                {errorMessage}
              </Alert>
            )}
          </form>
        </Paper>
      </Paper>
    </Box>
  );
};

export default Cadastro;
