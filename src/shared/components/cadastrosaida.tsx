import React, { useEffect, useState } from 'react';
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
import { calcularSaida } from '../../services/entrada-saida';

interface CalcularSaidaProps {
  vehicle: Vehicle | null;
  paymentInfo: PaymentInfo;
  setPaymentInfo: React.Dispatch<React.SetStateAction<PaymentInfo>>;
  onConfirm: () => void;
  onCancel: () => void;
}

const CalcularSaida: React.FC<CalcularSaidaProps> = ({ vehicle, paymentInfo, setPaymentInfo, onConfirm, onCancel }) => {
  const theme = useTheme();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [calculatedValue, setCalculatedValue] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const  estacionamentoId  = localStorage.getItem('estacionamentoId');
  const estacionamentoIdNumber = estacionamentoId ? parseInt(estacionamentoId) : NaN;

  const storedVehicleId = localStorage.getItem('vehicleId');
  const vehicleIdAsNumber = storedVehicleId ? parseInt(storedVehicleId) : NaN;

  console.log('calculatedValue: ', calculatedValue);

  useEffect(() => {
    const fetchCalculatedValue = async () => {
      if (!vehicleIdAsNumber || !estacionamentoIdNumber) {
        alert('IDs inválidos');
        return;
      }

      try {
        setLoading(true);
        const data = await calcularSaida(vehicleIdAsNumber.toString(), estacionamentoIdNumber.toString());
        setCalculatedValue(data.value);
      } catch (err: any) {
        alert('Erro ao calcular valor');
      } finally {
        setLoading(false);
      }
    };

    fetchCalculatedValue();
  }, [vehicleIdAsNumber, estacionamentoIdNumber]);

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
              <MenuItem value="Pix" color='#ffffff'>Pix</MenuItem>
              <MenuItem value="Cartão de Crédito" color='#ffffff'>Cartão de Crédito</MenuItem>
              <MenuItem value="Cartão de Débito" color='#ffffff'>Cartão de Débito</MenuItem>
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

  //   <>
  //   <Dialog
  //     open={!!vehicle}
  //     onClose={onCancel}
  //     PaperProps={{ style: { backgroundColor: theme.palette.primary.main } }}
  //   >
  //     <DialogTitle style={{ color: '#ffffff' }}>Calcular Saída</DialogTitle>
  //     <DialogContent dividers>
  //       <Box display="flex" justifyContent="space-between" mb={2}>
  //         <Typography variant="body1" color="#ffffff">
  //           <strong>Placa:</strong> {vehicle?.plate}
  //         </Typography>
  //       </Box>
  //       <Box display="flex" justifyContent="space-between" mb={2}>
  //         <Typography variant="body1" color="#ffffff">
  //           <strong>Tipo:</strong> {vehicle?.type}
  //         </Typography>
  //       </Box>
  //       <Box display="flex" justifyContent="space-between" mb={2}>
  //         <Typography variant="body1" color="#ffffff">
  //           <strong>Descrição:</strong> {vehicle?.description}
  //         </Typography>
  //       </Box>
  //       <Box display="flex" justifyContent="space-between" mb={2}>
  //         <Typography variant="body1" color="#ffffff">
  //           <strong>Entrada:</strong> {vehicle?.entry}
  //         </Typography>
  //       </Box>
  //       <Box display="flex" justifyContent="space-between" mb={2}>
  //         <Typography variant="body1" color="#ffffff">
  //           <strong>Saída:</strong> {new Date().toLocaleTimeString()}
  //         </Typography>
  //       </Box>

  //       <FormControl fullWidth>
  //         <InputLabel style={{ color: '#ffffff' }}>Forma de Pagamento</InputLabel>
  //         <Select
  //           value={paymentInfo.method}
  //           onChange={handlePaymentChange}
  //           name="method"
  //           label="Forma de Pagamento"
  //           style={{ color: '#ffffff' }}
  //           MenuProps={{
  //             PaperProps: {
  //               style: {
  //                 backgroundColor: theme.palette.primary.main,
  //               },
  //             },
  //           }}
  //         >
  //           <MenuItem value="Selecionar">Selecionar</MenuItem>
  //           <MenuItem value="Pix">Pix</MenuItem>
  //           <MenuItem value="Cartão de Crédito">Cartão de Crédito</MenuItem>
  //           <MenuItem value="Cartão de Débito">Cartão de Débito</MenuItem>
  //           <MenuItem value="Dinheiro">Dinheiro</MenuItem>
  //         </Select>
  //       </FormControl>

  //       <Box mt={2}>
  //         <Typography variant="body1" style={{ color: '#ffffff' }}>
  //           <strong>Valor:</strong>{' '}
  //           {loading
  //             ? 'Carregando...'
  //             : calculatedValue !== null
  //             ? `R$${calculatedValue.toFixed(2)}`
  //             : 'Erro ao carregar valor'}
  //         </Typography>
  //       </Box>
  //     </DialogContent>

  //     <DialogActions>
  //       <Button
  //         onClick={onConfirm}
  //         style={{ color: '#ffffff', backgroundColor: '#40BB14' }}
  //         variant="contained"
  //       >
  //         Confirmar
  //       </Button>
  //       <Button
  //         onClick={onCancel}
  //         style={{ color: '#ffffff', backgroundColor: '#F31111' }}
  //         variant="contained"
  //       >
  //         Cancelar
  //       </Button>
  //     </DialogActions>
  //   </Dialog>

  //   <Snackbar
  //     open={openSnackbar}
  //     autoHideDuration={3000}
  //     onClose={() => setOpenSnackbar(false)}
  //     message="Por favor, selecione um veículo primeiro!"
  //   />
  // </>
  );
};

export default CalcularSaida;
