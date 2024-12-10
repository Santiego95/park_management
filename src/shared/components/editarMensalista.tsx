import React, { useState, ChangeEvent } from "react";
import {
  TextField,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { Mensalista } from "../hooks/types";

// Definição da interface para o Mensalista
// interface Mensalista {
//   nome: string;
//   cpf: string;
//   placa: string;
//   vagas: string;
//   tipo: string;
//   descricao: string;
//   whatsapp: string;
// }

// Definição da interface para as props do componente
interface EditarMensalistaProps {
  mensalista: Mensalista;
  onConfirmar: (mensalista: Mensalista) => void;
  onCancelar: () => void;
}

const EditarMensalista: React.FC<EditarMensalistaProps> = ({
  mensalista,
  onConfirmar,
  onCancelar,
}) => {
  const [mensalistaEditado, setMensalistaEditado] = useState<Mensalista>({
    ...mensalista,
  });

  // Atualizar o estado conforme o usuário edita os campos
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMensalistaEditado({ ...mensalistaEditado, [name]: value });
  };

  return (
    <Dialog open={true} onClose={onCancelar} >
      <DialogTitle>
        Editar Mensalista
      </DialogTitle>
      <DialogContent>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onConfirmar(mensalistaEditado);
        }}
      >
        <Grid container spacing={2} marginTop={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nome"
              name="nome"
              value={mensalistaEditado.nome}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="CPF"
              name="cpf"
              value={mensalistaEditado.cpf}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Placa"
              name="placa"
              value={mensalistaEditado.placa}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Vaga"
              name="vaga"
              value={mensalistaEditado.vagas}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          </Grid>
          </form>
      </DialogContent>
      
          <DialogActions>
            <Button variant="contained" color="success" onClick={() => onConfirmar(mensalistaEditado)}>
                Confirmar
            </Button>
            <Button variant="outlined" color="error" onClick={onCancelar}>
                Cancelar
            </Button>
           
      </DialogActions>
      
    </Dialog>
  );
};

export default EditarMensalista;
