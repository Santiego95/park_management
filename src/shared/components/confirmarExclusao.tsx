import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";

// Tipagem para as propriedades do componente
interface ConfirmarExclusaoProps {
  mensalista: {
    nome: string;
    cpf: string;
    placa: string;
    vagas: string;
  };
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmarExclusao: React.FC<ConfirmarExclusaoProps> = ({
  mensalista,
  onConfirm,
  onCancel,
}) => {
  return (
    <Dialog open={true} onClose={onCancel}>
      <DialogTitle>Confirmar Exclusão</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Tem certeza de que deseja excluir o seguinte mensalista?
        </DialogContentText>
        <Box mt={2}>
          <Typography><strong>Nome:</strong> {mensalista.nome}</Typography>
          <Typography><strong>CPF:</strong> {mensalista.cpf}</Typography>
          <Typography><strong>Placa:</strong> {mensalista.placa}</Typography>
          <Typography><strong>Vaga:</strong> {mensalista.vagas}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={onConfirm}>
          Confirmar
        </Button>
        <Button variant="outlined" onClick={onCancel}>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmarExclusao;
