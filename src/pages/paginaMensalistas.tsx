import React, { useEffect, useState } from "react";
import { Box, Button, Container, TextField, Table, TableBody, TableCell, TableHead, TableRow, Typography, Checkbox } from "@mui/material";
import Header from "../shared/components/header";
import CadastroMensalista from "../shared/components/cadastroMensalista";
import ConfirmarExclusao from "../shared/components/confirmarExclusao";
import EditarMensalista from "../shared/components/editarMensalista";
import { toast } from 'react-toastify';
import { buscarMensalistaPorId, buscarMensalistas, excluirMensalista } from "../services/cadastro-mensalista";
import { Mensalista } from "../shared/hooks/types";

const App: React.FC = () => {
  const [mensalistas, setMensalistas] = useState<Mensalista[]>([]); // Inicializa a lista vazia
  const [busca, setBusca] = useState<string>("");
  const [selectedMensalista, setSelectedMensalista] = useState<Mensalista | null>(null); // Armazena o mensalista selecionado
  const [selectedMensalistaId, setSelectedMensalistaId] = useState<number | null>(null); // Armazena o ID do mensalista selecionado
  const [mostrarCadastroMensalista, setMostrarCadastroMensalista] = useState<boolean>(false);
  const [mensalistaEmEdicao, setMensalistaEmEdicao] = useState<Mensalista | null>(null);
  const [modalExcluirOpen, setModalExcluirOpen] = useState<boolean>(false);

  const estacionamentoId = localStorage.getItem("estacionamentoId");
  const estacionamentoIdNumber = estacionamentoId ? parseInt(estacionamentoId) : NaN;

  useEffect(() => {
    if (!estacionamentoIdNumber) return; // Evita chamada desnecessária se não tiver o ID do estacionamento.

    const fetchMensalistas = async () => {
      try {
        const mensalistasFromApi = await buscarMensalistas(estacionamentoIdNumber); // Chama o serviço de backend
        setMensalistas(mensalistasFromApi); // Atualiza o estado com os mensalistas do backend
      } catch (error: any) {
        toast.error(error.message || "Erro ao buscar mensalistas");
      }
    };

    fetchMensalistas();
  }, [estacionamentoIdNumber]); // A dependência é o estacionamentoIdNumber, ou seja, recarrega sempre que o ID mudar.

  const handleBuscaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusca(e.target.value);
  };

  const handleSelecionarMensalista = async (mensalista: Mensalista) => {
    if (mensalista.id === undefined) {
      toast.error("O ID do mensalista não está definido.");
      return;
    }
  
    try {
      const detalhesMensalista = await buscarMensalistaPorId(mensalista.id);
      setSelectedMensalista(detalhesMensalista);
      setSelectedMensalistaId(detalhesMensalista.id);
  
      localStorage.setItem("mensalistaSelecionadoId", detalhesMensalista.id.toString());
  
    } catch (error: any) {
      toast.error(error.message || "Erro ao buscar mensalista pelo ID");
    }
  };
  

  const handleOpenCadastroMensalista = () => {
    setMostrarCadastroMensalista(true);
  };

  const handleConfirmarMensalista = (mensalista: Mensalista) => {
    setMensalistas([...mensalistas, mensalista]);
    setMostrarCadastroMensalista(false);
  };

  const handleEditarMensalista = () => {
    if (selectedMensalista) {
      setMensalistaEmEdicao(selectedMensalista);
    } else {
      toast.error("Selecione um mensalista para editar.");
    }
  };

  const handleConfirmarEdicao = (mensalistaEditado: Mensalista) => {
    setMensalistas(
      mensalistas.map((m) => (m.cpf === mensalistaEditado.cpf ? mensalistaEditado : m))
    );
    setMensalistaEmEdicao(null);
    toast.success("Mensalista editado com sucesso!");
  };

  const handleExcluirMensalista = async () => {
    if (!selectedMensalista || !selectedMensalista.id) {
      toast.error("Erro: Nenhum mensalista selecionado para exclusão.");
      return;
    }

    try {
      await excluirMensalista(selectedMensalista.id); // Chama o serviço para deletar
      setMensalistas(mensalistas.filter((m) => m.id !== selectedMensalista.id)); // Atualiza a lista
      setModalExcluirOpen(false);
      setSelectedMensalista(null);
      toast.success("Mensalista excluído com sucesso!");
    } catch (error: any) {
      toast.error(error.message || "Erro ao excluir mensalista.");
    }
  };

  const handleConfirmarExclusao = () => {
    setModalExcluirOpen(true);
  };

  const filteredMensalistas = mensalistas.filter((mensalista) =>
    [mensalista.nome, mensalista.cpf, mensalista.placa, mensalista.whatsapp, mensalista.vagas]
      .some((field) => field?.toLowerCase().includes(busca.toLowerCase()))
  );

  return (
    <Box>
      <Header onMenuClick={() => {}} onCloseMenu={() => {}} />

      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Gerenciar Mensalistas
        </Typography>

        <TextField
          label="Buscar por CPF, Nome ou Placa"
          variant="outlined"
          fullWidth
          value={busca}
          onChange={handleBuscaChange}
          sx={{ marginBottom: 3 }}
        />

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Vaga</TableCell>
              <TableCell>CPF</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Placa</TableCell>
              <TableCell>WhatsApp</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Selecionar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMensalistas.map((mensalista) => (
              <TableRow key={mensalista.cpf}>
                <TableCell>{mensalista.vagas}</TableCell>
                <TableCell>{mensalista.cpf}</TableCell>
                <TableCell>{mensalista.nome}</TableCell>
                <TableCell>{mensalista.placa}</TableCell>
                <TableCell>{mensalista.whatsapp}</TableCell>
                <TableCell>Pago</TableCell>
                <TableCell>
                  <Checkbox
                    checked={selectedMensalista?.cpf === mensalista.cpf}
                    onChange={() => handleSelecionarMensalista(mensalista)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Box sx={{ marginTop: 3, display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" color="primary" onClick={handleOpenCadastroMensalista}>
            Cadastrar Mensalista
          </Button>
          <Button variant="contained" color="secondary" onClick={handleEditarMensalista}>
            Editar Mensalista
          </Button>
          <Button variant="contained" color="error" onClick={handleExcluirMensalista}>
            Excluir Mensalista
          </Button>
        </Box>
      </Container>

      {mostrarCadastroMensalista && (
        <CadastroMensalista
          onConfirmar={handleConfirmarMensalista}
          onCancelar={() => setMostrarCadastroMensalista(false)}
        />
      )}

      {mensalistaEmEdicao && (
        <EditarMensalista
          mensalista={mensalistaEmEdicao}
          onConfirmar={handleConfirmarEdicao}
          onCancelar={() => setMensalistaEmEdicao(null)}
        />
      )}

      {modalExcluirOpen && selectedMensalista && (
        <ConfirmarExclusao
          mensalista={selectedMensalista}
          onConfirm={handleConfirmarExclusao}
          onCancel={() => setModalExcluirOpen(false)}
        />
      )}
    </Box>
  );
};

export default App;