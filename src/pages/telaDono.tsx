import React, { useEffect, useState } from 'react';
import { Button, Box, Dialog, DialogContent } from '@mui/material';
import FormularioEstacionamento from '../shared/components/formularioEstacionamento';
import ListaEstacionamentos from '../shared/components/listaEstacionamentos';
import FormularioFuncionario from '../shared/components/formularioFuncionarios';
import TabelaFuncionarios from '../shared/components/tabelaFuncionarios';
import Header from '../shared/components/header';
import { buscarEstacionamentos } from '../services/cadastro-estacionamento';

interface Estacionamento {
  nome: string;
  endereco: string;
  vagas: number;
  valorHora: number; 
  valorMaisHoras: number;
  confirmado: boolean;
}

interface Funcionario {
  nome: string;
  cpf: string;
  estacionamento: string;
  email: string;
}

const TelaDono = () => {
  const [estacionamentos, setEstacionamentos] = useState<Estacionamento[]>([]);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [mostrarFormularioEstacionamento, setMostrarFormularioEstacionamento] = useState(false);
  const [mostrarFormularioFuncionario, setMostrarFormularioFuncionario] = useState(false);
  const [mostrarTabelaFuncionarios, setMostrarTabelaFuncionarios] = useState(false);

  const adicionarEstacionamento = (novoEstacionamento: Estacionamento) => {
    const estacionamentoComConfirmacao = { ...novoEstacionamento, confirmado: false }; // Garantir booleano
    setEstacionamentos([...estacionamentos, estacionamentoComConfirmacao]);
    setMostrarFormularioEstacionamento(false);
  };

  const adicionarFuncionario = (novoFuncionario: Funcionario) => {
    setFuncionarios([...funcionarios, novoFuncionario]);
    setMostrarFormularioFuncionario(false);
  };

  const confirmarEstacionamento = (index: number) => {
    const novosEstacionamentos = [...estacionamentos];
    novosEstacionamentos[index].confirmado = true;
    setEstacionamentos(novosEstacionamentos);
  };

  const mostrarTelaEstacionamentos = () => {
    setMostrarTabelaFuncionarios(false);
  };

  const mostrarTelaFuncionarios = () => {
    setMostrarTabelaFuncionarios(true);
  };

  const deletarFuncionario = (index: number) => {
    const updatedFuncionarios = funcionarios.filter((_, i) => i !== index);
    setFuncionarios(updatedFuncionarios);
  };

  // Efeito para carregar os dados dos estacionamentos
  useEffect(() => {
    const carregarEstacionamentos = async () => {
      try {
        const usuarioId = 1; // ID do usuário (você pode pegar de um contexto ou autenticação)
        const dados = await buscarEstacionamentos(usuarioId);
        setEstacionamentos(
          dados.map(estacionamento => ({
            nome: estacionamento.estacionamentoNome,
            endereco: estacionamento.endereco,
            vagas: estacionamento.totalvagas,
            valorHora: estacionamento.valorHora,
            valorMaisHoras: estacionamento.valorMaisHoras,
            confirmado: false, // Controle inicial do estado "confirmado"
          }))
        );
      } catch (error) {
        console.error('Erro ao carregar estacionamentos:', error);
      }
    };

    carregarEstacionamentos();
  }, []); // O array vazio garante que o efeito só seja executado uma vez, ao montar o componente

  const handleConfirmar = (index: number) => {
    setEstacionamentos(prev =>
      prev.map((item, i) => (i === index ? { ...item, confirmado: true } : item)) // Atualiza o estado 'confirmado' ao clicar
    );
  };



  return (
    <Box sx={{ padding: 2 }}>
      <Header onMenuClick={() => {}} onCloseMenu={() => {}} />

      <Box sx={{ marginTop: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
          <Button
            variant={!mostrarTabelaFuncionarios ? 'outlined' : 'contained'}
            onClick={mostrarTelaEstacionamentos}
          >
            Estacionamentos
          </Button>

          {mostrarTabelaFuncionarios ? (
            <Button variant="contained" onClick={() => setMostrarFormularioFuncionario(true)}>
              Adicionar Funcionário
            </Button>
          ) : (
            <Button variant="contained" onClick={() => setMostrarFormularioEstacionamento(true)}>
              Adicionar Estacionamento
            </Button>
          )}

          <Button
            variant={mostrarTabelaFuncionarios ? 'outlined' : 'contained'}
            onClick={mostrarTelaFuncionarios}
          >
            Tabela de Funcionários
          </Button>
        </Box>

        {/* Dialog para Formulário de Estacionamento */}
        <Dialog open={mostrarFormularioEstacionamento} onClose={() => setMostrarFormularioEstacionamento(false)}>
          <DialogContent>
            <FormularioEstacionamento
              onAdicionarEstacionamento={adicionarEstacionamento}
              onCancelar={() => setMostrarFormularioEstacionamento(false)}
            />
          </DialogContent>
        </Dialog>

        {/* Dialog para Formulário de Funcionário */}
        <Dialog open={mostrarFormularioFuncionario} onClose={() => setMostrarFormularioFuncionario(false)}>
          <DialogContent>
            <FormularioFuncionario
              onAdicionarFuncionario={adicionarFuncionario}
              onCancelar={() => setMostrarFormularioFuncionario(false)}
            />
          </DialogContent>
        </Dialog>

        {!mostrarTabelaFuncionarios ? (
          <ListaEstacionamentos estacionamentos={estacionamentos} onConfirmar={confirmarEstacionamento} />
        ) : (
          <TabelaFuncionarios funcionarios={funcionarios} onDelete={deletarFuncionario} />
        )}
      </Box>
    </Box>
  );
};

export default TelaDono;
