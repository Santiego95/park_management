import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Box, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { cadastrarMensalista } from '../../services/cadastro-mensalista';

interface Mensalista {
  nome: string;
  cpf: string;
  placa: string;
  descricao: string;
  whatsapp: string;
  vagas: string;
  tipo: string;
  email: string;
}

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
    vagas: '',
    tipo: '',
    email: '',
  });

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMensalista({ ...mensalista, [name]: value });
  };

  const handleConfirm = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await cadastrarMensalista(
        mensalista.nome,
        mensalista.email,
        mensalista.whatsapp,
        mensalista.cpf,
        1,
        mensalista.tipo,
        mensalista.descricao,
        mensalista.placa,
        mensalista.vagas
      );
      onConfirmar(response);
    } catch (err: any) {
      setError(err.message || "Erro ao cadastrar mensalista");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onClose={onCancelar} PaperProps={{ style: { backgroundColor: "#f7f7f7f7" } }}>
      <DialogTitle style={{ color: theme.palette.primary.main }}>Cadastro de Mensalista</DialogTitle>
      <DialogContent>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <TextField
          select
          label="Tipo"
          name="tipo"
          value={mensalista.tipo}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
          InputProps={{
            style: { backgroundColor: "#ffffff", color: "#000000" },
          }}
        >
          <MenuItem value="carro">Carro</MenuItem>
          <MenuItem value="moto">Moto</MenuItem>
          <MenuItem value="caminhao">Caminhão</MenuItem>
        </TextField>

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
                style: { backgroundColor: "#ffffff", color: "#000000" },
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
                style: { backgroundColor: "#ffffff", color: "#000000" },
              }}
            />
          </Box>
        </Box>

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
                style: { backgroundColor: "#ffffff", color: "#000000" },
              }}
            />
          </Box>
          <Box flex={1} ml={1}>
            <TextField
              label="Vagas"
              name="vagas"
              value={mensalista.vagas}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              InputProps={{
                style: { backgroundColor: "#ffffff", color: "#000000" },
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
            style: { backgroundColor: "#ffffff", color: "#000000" },
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
            style: { backgroundColor: "#ffffff", color: "#000000" },
          }}
        />
        <TextField
          label="Email"
          name="email"
          value={mensalista.email}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          InputProps={{
            style: { backgroundColor: "#ffffff", color: "#000000" },
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleConfirm}
          variant="contained"
          style={{ color: "#ffffff", backgroundColor: "#40BB14" }}
          disabled={loading}
        >
          {loading ? "Salvando..." : "Confirmar"}
        </Button>
        <Button onClick={onCancelar} variant="contained" style={{ color: "#ffffff", backgroundColor: "#F31111" }}>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CadastroMensalista;
