import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Box } from '@mui/material';
import { Mensalista } from '../hooks/types';
import { useTheme } from '@mui/material/styles';

interface CadastroMensalistaProps {
  onConfirmar: (mensalista: Mensalista) => void;
  onCancelar: () => void;
}

const CadastroMensalista: React.FC<CadastroMensalistaProps> = ({ onConfirmar, onCancelar }) => {
  const theme = useTheme();
  const [mensalista, setMensalista] = React.useState<Mensalista>({
    nome: '',
    cpf: '',
    placa: '',
    descricao: '',
    whatsapp: '',
    vaga: '',
    tipo: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMensalista({ ...mensalista, [name]: value });
  };

  const handleConfirm = () => {
    onConfirmar(mensalista);
  };

  return (
    <Dialog open={true} onClose={onCancelar} PaperProps={{ style: { backgroundColor: theme.palette.primary.main } }}>
      <DialogTitle style={{ color: '#fff' }}>Cadastro de Mensalista</DialogTitle>
      <DialogContent>
        {/* Campo de seleção para tipo de veículo */}
        <TextField
          select
          label="Tipo"
          name="tipo"
          value={mensalista.tipo}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
          InputProps={{
            style: { backgroundColor: '#ffffff', color: '#000000' },
          }}
        >
          <MenuItem value="carro">Carro</MenuItem>
          <MenuItem value="moto">Moto</MenuItem>
          <MenuItem value="caminhao">Caminhão</MenuItem>
        </TextField>

        {/* Disposição dos campos "Descrição" e "Placa" lado a lado */}
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Box flex={1} mr={1}>
            <TextField
              label="Descrição"
              name="descricao"
              value={mensalista.descricao}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              InputProps={{
                style: { backgroundColor: '#ffffff', color: '#000000' },
              }}
            />
          </Box>
          <Box flex={1} ml={1}>
            <TextField
              label="Placa"
              name="placa"
              value={mensalista.placa}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              InputProps={{
                style: { backgroundColor: '#ffffff', color: '#000000' },
              }}
            />
          </Box>
        </Box>

        {/* Disposição dos campos "WhatsApp" e "Vaga" lado a lado */}
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Box flex={1} mr={1}>
            <TextField
              label="WhatsApp"
              name="whatsapp"
              value={mensalista.whatsapp}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              InputProps={{
                style: { backgroundColor: '#ffffff', color: '#000000' },
              }}
            />
          </Box>
          <Box flex={1} ml={1}>
            <TextField
              label="Vaga"
              name="vaga"
              value={mensalista.vaga}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              InputProps={{
                style: { backgroundColor: '#ffffff', color: '#000000' },
              }}
            />
          </Box>
        </Box>

        <TextField
          label="Nome"
          name="nome"
          value={mensalista.nome}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          InputProps={{
            style: { backgroundColor: '#ffffff', color: '#000000' },
          }}
        />
        <TextField
          label="CPF"
          name="cpf"
          value={mensalista.cpf}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          InputProps={{
            style: { backgroundColor: '#ffffff', color: '#000000' },
          }}
        />
      </DialogContent>
      <DialogActions>
      <Button onClick={handleConfirm} variant="contained" style={{ color: "#ffffff", backgroundColor: '#40BB14' }}>Confirmar</Button>
        <Button onClick={onCancelar} variant="contained" style={{ color: "#ffffff", backgroundColor: '#F31111' }}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CadastroMensalista;
