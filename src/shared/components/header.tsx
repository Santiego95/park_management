import React, { useState, MouseEvent } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

// Definindo as propriedades do Header
interface HeaderProps {
  onMenuClick: (event: MouseEvent<HTMLElement>) => void;
  onCloseMenu: () => void;
}


// Componente Header
const Header: React.FC<HeaderProps> = ({ onMenuClick, onCloseMenu }) => {
  const theme = useTheme(); // Acesse o tema aqui
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
    onMenuClick(event);
  };

  const handleClose = () => {
    setMenuAnchorEl(null);
    onCloseMenu();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Park Management
        </Typography>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuClick}>
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={menuAnchorEl}
          keepMounted
          open={Boolean(menuAnchorEl)}
          onClose={handleClose}
          PaperProps={{
            style: {
              backgroundColor: theme.palette.primary.main, // Usando a cor primária do tema
              color: theme.palette.primary.contrastText, // Usando a cor de contraste do tema
            },
          }}
        >
          <MenuItem onClick={handleClose}>Mensalistas</MenuItem>
          <MenuItem onClick={handleClose}>Relatórios</MenuItem>
          <MenuItem onClick={handleClose}>Estacionamentos</MenuItem>
          <MenuItem onClick={handleClose}>Sair</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
