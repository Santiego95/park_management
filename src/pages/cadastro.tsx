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
} from "@mui/material";

const Cadastro: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Fazendo Cadastro com:", { name, email, password });
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" style={{
        backgroundImage: `url(${fundo})`,
        backgroundSize: 'cover', // Para cobrir toda a área
        backgroundPosition: 'center', // Para centralizar a imagem
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
          </form>
        </Paper>
      </Paper>
    </Box>
  );
};

export default Cadastro;
