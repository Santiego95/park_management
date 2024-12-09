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
  Typography,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { Vehicle, PaymentInfo } from '../hooks/types';
import { useTheme } from '@mui/material/styles';
import { buscarVeiculoPorId } from '../../services/cadastrar-veiculos';
import { buscarEstacionamentoPorId } from '../../services/cadastro-estacionamento';

interface CalcularSaidaProps {
  vehicle: Vehicle | null;
  paymentInfo: PaymentInfo;
  setPaymentInfo: React.Dispatch<React.SetStateAction<PaymentInfo>>;
  onConfirm: () => void;
  onCancel: () => void;
}

const CalcularSaida: React.FC<CalcularSaidaProps> = ({ vehicle, paymentInfo, setPaymentInfo, onConfirm, onCancel }) => {
  const theme = useTheme();
  const [valorCalculado, setValorCalculado] = useState<number>(9.0);
  const [erroCalculo, setErroCalculo] = useState<string | null>(null);

  const estacionamentoId = localStorage.getItem('estacionamentoId');
  const estacionamentoIdNumber = estacionamentoId ? parseInt(estacionamentoId) : NaN;

  const storedVehicleId = localStorage.getItem('vehicleId');
  const vehicleIdAsNumber = storedVehicleId ? parseInt(storedVehicleId) : NaN;

  useEffect(() => {
    const calcularValor = async () => {
      try {
        if (isNaN(estacionamentoIdNumber) || isNaN(vehicleIdAsNumber)) {
          setErroCalculo('IDs inválidos. Verifique os dados.');
          return;
        }

        const estacionamento = await buscarEstacionamentoPorId(estacionamentoIdNumber);
        const veiculo = await buscarVeiculoPorId(vehicleIdAsNumber);

        if (!estacionamento || !veiculo) {
          setErroCalculo('Estacionamento ou veículo não encontrado.');
          return;
        }

        const entrada = veiculo.createdAt ? new Date(veiculo.createdAt) : new Date();
        const saida = new Date(); // Hora atual como saída
        const diffMs = saida.getTime() - entrada.getTime();
        const diffHoras = diffMs / (1000 * 60 * 60);

        let valor = estacionamento.valorHora;
        if (diffHoras > 1) {
          valor += Math.ceil(diffHoras - 1) * estacionamento.valorMaisHoras;
        }

        setValorCalculado(valor);
        setErroCalculo(null);
      } catch (error: any) {
        setErroCalculo(error.message || 'Erro ao calcular o valor.');
      }
    };

    calcularValor();
  }, [estacionamentoIdNumber, vehicleIdAsNumber]);

  // Função para lidar com a mudança da forma de pagamento
  const handlePaymentChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setPaymentInfo({ ...paymentInfo, [name]: value });
  };

  return (
    <>
      <Dialog open={!!vehicle} onClose={onCancel} PaperProps={{ style: { backgroundColor: '#f7f7f7f7' } }}>
        <DialogTitle style={{ color: theme.palette.primary.main }}>Calcular Saída</DialogTitle>
        <DialogContent dividers>
          {/* Dados do veículo */}
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="body1" color= {theme.palette.primary.main} ><strong>Placa:</strong> {vehicle?.plate}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="body1" color= {theme.palette.primary.main}><strong>Entrada:</strong> {vehicle?.entry}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="body1" color= {theme.palette.primary.main}><strong>Saída:</strong> {new Date().toLocaleTimeString()}</Typography>
          </Box>

          {/* Forma de pagamento */}
          <FormControl fullWidth>
            <InputLabel style={{ color: theme.palette.primary.main }}>Forma de Pagamento</InputLabel>
            <Select
              value={paymentInfo.method}
              onChange={handlePaymentChange}
              name="method"
              label="Forma de Pagamento"
              style={{ color: theme.palette.primary.main }}
              MenuProps={{
                PaperProps: {
                  style: {
                    backgroundColor: '#f7f7f7f7',
                  },
                },
              }}
            >
              <MenuItem value="Selecionar">Selecionar</MenuItem>
              <MenuItem value="Pix">Pix</MenuItem>
              <MenuItem value="Cartão de Crédito">Cartão de Crédito</MenuItem>
              <MenuItem value="Cartão de Débito">Cartão de Débito</MenuItem>
              <MenuItem value="Dinheiro">Dinheiro</MenuItem>
            </Select>
          </FormControl>

          {/* Valor calculado */}
          <Box mt={2}>
            {erroCalculo ? (
              <Typography variant="body1" style={{ color: 'red' }}><strong>Erro:</strong> {erroCalculo}</Typography>
            ) : (
              <Typography variant="body1" style={{ color: '#ffffff' }}><strong>Valor:</strong> R${valorCalculado.toFixed(2)}</Typography>
            )}
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={onConfirm} style={{ color: "#ffffff", backgroundColor: '#40BB14' }} variant="contained">Confirmar</Button>
          <Button onClick={onCancel} style={{ color: "#ffffff", backgroundColor: '#F31111' }} variant="contained">Cancelar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CalcularSaida;
