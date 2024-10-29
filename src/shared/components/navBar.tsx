import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Link as MuiLink } from '@mui/material';
import { Link } from "react-router-dom";

interface NavBarProps {
  onAdicionarEstacionamento: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ onAdicionarEstacionamento }) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Park Management
      </Typography>
      <Box sx={{ display: 'flex', gap: 4 }}>
        <MuiLink href="#inicio" color="secondary" fontWeight="bold" underline="hover">
          Início
        </MuiLink>
        <MuiLink href="#sobre" color="secondary" fontWeight="bold" underline="hover">
          Sobre
        </MuiLink>
        <MuiLink href="#servicos" color="secondary" fontWeight="bold" underline="hover">
          Serviços
        </MuiLink>
        <MuiLink href="#quem-somos" color="secondary" fontWeight="bold" underline="hover">
          Quem Somos
        </MuiLink>
        <MuiLink href="#contato" color="secondary" fontWeight="bold" underline="hover">
          Contato
        </MuiLink>
      </Box>
      <Box sx={{ display: 'flex', gap: 2, marginLeft: '40px' }}>
        <Button component={Link} to="/login" variant="contained" color="secondary">Login</Button>
        <Button component={Link} to="/login" variant="contained" color="secondary">Cadastro</Button>
      </Box>
      
    </Toolbar>
  </AppBar>
);

export default NavBar;
