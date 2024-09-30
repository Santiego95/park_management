import fundo from "../shared/img/fundo.jpeg";
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import {
  TextField,
  Typography,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
  Paper,
} from "@mui/material";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" style={{
        backgroundImage: `url(${fundo})`,
        backgroundSize: 'cover', // Para cobrir toda a área
        backgroundPosition: 'center', // Para centralizar a imagem
      }}>
        <Paper style={{display: 'flex', justifyContent: 'center'}}>
            <Paper elevation={3} style={{ paddingTop: '20px', maxWidth: '400px', width: '100%', backgroundColor: '#FF740F', color: '#ffffff', height: '414px'}}>
                <Box textAlign="center" marginBottom="20px" height="100%">
                <Typography marginTop = "60px" variant="h4">Bem Vindo</Typography>
                <Typography marginTop = "60px" variant="h5">Faça Login</Typography>
                <Button style={{marginTop: '60px'}} component={Link} to="/cadastro" variant="contained" color="secondary">Fazer Cadastro</Button>
                </Box>
            </Paper>
            <Paper elevation={3} style={{ padding: '80px', maxWidth: '400px', width: '100%' }}>
                <form>
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
                    label="Senha"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                    <Link to="#" >
                    Esqueceu a senha?
                    </Link>
                    <FormControlLabel
                    control={<Checkbox color="primary" />}
                    label="Salvar Senha"
                    />
                </Box>

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginTop: '20px' }}
                >
                    Entrar
                </Button>
                </form>
            </Paper>
        </Paper>
      
    </Box>
  );
};

export default Login;
