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
import { toast } from "react-toastify";
import { atualizarMensalista } from "../../services/cadastro-mensalista";

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

  const [loading, setLoading] = useState<boolean>(false); // Para exibir um estado de carregamento

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMensalistaEditado({ ...mensalistaEditado, [name]: value });
  };

  const handleConfirmarEdicao = async () => {
    setLoading(true);
    if (mensalistaEditado.id === undefined) {
      toast.error("O ID do mensalista não está definido.");
      return;
    }
    try {
      const atualizado = await atualizarMensalista(
        mensalistaEditado.id,
        mensalistaEditado.nome,
        mensalistaEditado.email,
        mensalistaEditado.whatsapp,
        mensalistaEditado.cpf,
        mensalistaEditado.estacionamentoId,
        mensalistaEditado.tipo,
        mensalistaEditado.descricao,
        mensalistaEditado.placa,
        mensalistaEditado.vagas
      );

      toast.success("Mensalista atualizado com sucesso!");
      onConfirmar({ ...mensalistaEditado, ...atualizado });
    } catch (error: any) {
      toast.error(error.message || "Erro ao atualizar mensalista");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onClose={onCancelar}>
      <DialogTitle>Editar Mensalista</DialogTitle>
      <DialogContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleConfirmarEdicao();
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
                name="vagas"
                value={mensalistaEditado.vagas}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          color="success"
          onClick={handleConfirmarEdicao}
          disabled={loading}
        >
          {loading ? "Atualizando..." : "Confirmar"}
        </Button>
        <Button variant="outlined" color="error" onClick={onCancelar} disabled={loading}>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditarMensalista;
