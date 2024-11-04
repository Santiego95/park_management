import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Snackbar,
  Typography,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { Vehicle, PaymentInfo } from '../hooks/types';
import { useTheme } from '@mui/material/styles';

interface CalcularSaidaProps {
  vehicle: Vehicle | null; // Permitir que o veículo seja null
  paymentInfo: PaymentInfo;
  setPaymentInfo: React.Dispatch<React.SetStateAction<PaymentInfo>>;
  onConfirm: () => void;
  onCancel: () => void;
}

const CalcularSaida: React.FC<CalcularSaidaProps> = ({ vehicle, paymentInfo, setPaymentInfo, onConfirm, onCancel }) => {
  const theme = useTheme(); // Usar useTheme para acessar o tema
  const [openSnackbar, setOpenSnackbar] = React.useState(false); // Estado para controle da Snackbar

  const handlePaymentChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setPaymentInfo({ ...paymentInfo, [name]: value });
  };

  return (
    <>
      <Dialog open={!!vehicle} onClose={onCancel} PaperProps={{ style: { backgroundColor: theme.palette.primary.main } }}> {/* Usando a cor primary do tema */}
        <DialogTitle style={{ color: '#ffffff' }}>Calcular Saída</DialogTitle>
        <DialogContent dividers>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="body1" color='#ffffff'><strong>Placa:</strong> {vehicle?.plate}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="body1" color='#ffffff'><strong>Tipo:</strong> {vehicle?.type}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="body1" color='#ffffff'><strong>Descrição:</strong> {vehicle?.description}</Typography>
            </Box>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="body1" color='#ffffff'><strong>Entrada:</strong> {vehicle?.entry}</Typography>
          </Box>
            
          
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="body1" color='#ffffff'><strong>Saída:</strong> {new Date().toLocaleTimeString()}</Typography>
          </Box>

          <FormControl fullWidth>
            <InputLabel style={{ color: '#ffffff' }}>Forma de Pagamento</InputLabel> {/* Cor do texto */}
            <Select
              value={paymentInfo.method}
              onChange={handlePaymentChange}
              name="method"
              label="Forma de Pagamento"
              style={{ color: '#ffffff' }} // Cor do texto da seleção
              MenuProps={{
                PaperProps: {
                  style: {
                    backgroundColor: theme.palette.primary.main, // Cor do fundo do menu
                  },
                },
              }}
            >
              <MenuItem value="Selecionar">Selecionar</MenuItem>
              <MenuItem value="PIX" color='#ffffff'>PIX</MenuItem>
              <MenuItem value="Crédito" color='#ffffff'>Crédito</MenuItem>
              <MenuItem value="Débito" color='#ffffff'>Débito</MenuItem>
              <MenuItem value="Dinheiro" color='#ffffff'>Dinheiro</MenuItem>
            </Select>
          </FormControl>

          <Box mt={2}>
            <Typography variant="body1" style={{ color: '#ffffff' }}><strong>Valor:</strong> R$9.00</Typography> {/* Cor do texto */}
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={onConfirm} style={{ color: "#ffffff", backgroundColor: '#40BB14' }} variant="contained">Confirmar</Button>
          <Button onClick={onCancel} style={{ color: "#ffffff", backgroundColor: '#F31111' }} variant="contained">Cancelar</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para mostrar a mensagem de erro */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message="Por favor, selecione um veículo primeiro!"
      />
    </>
  );
};

export default CalcularSaida;
