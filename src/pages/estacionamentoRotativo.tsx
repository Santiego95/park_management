import React, { useState, useEffect, ChangeEvent } from 'react';
import { useTheme, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Paper, Checkbox, IconButton, Grid2 } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Header from '../shared/components/header';
import CalcularSaida from '../shared/components/cadastrosaida';  
import CadastroMensalista from '../shared/components/cadastroMensalista';
import { Vehicle, PaymentInfo } from "../shared/hooks/types";
import { cadastrarVeiculo, buscarVeiculos, buscarVeiculoPorId } from '../services/cadastrar-veiculos';
import { registrarEntradaSaida } from '../services/entrada-saida';

const EstacionamentoRotativo: React.FC = () => {
  const theme = useTheme();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [newVehicle, setNewVehicle] = useState<Vehicle>({ plate: "", type: "", description: "", entry: "" });
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({ method: "Selecionar", amount: "" });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [mostrarCadastroMensalista, setMostrarCadastroMensalista] = useState(false);

  const  estacionamentoId  = localStorage.getItem('estacionamentoId');
  const estacionamentoIdNumber = estacionamentoId ? parseInt(estacionamentoId) : NaN;
  // console.log();
  // console.log('estacionamentoIdNumber: ', estacionamentoIdNumber);

  useEffect(() => {
    if (isNaN(estacionamentoIdNumber)) {
      alert('ID do estacionamento inválido!');
      return;
    }

    const fetchVehicles = async () => {
      try {
        const data = await buscarVeiculos(estacionamentoIdNumber);
        setVehicles(
          data.map((vehicle) => ({
            plate: vehicle.placa || "",
            type: vehicle.classificacao || "",
            description: vehicle.descricao || "",
            entry: new Date().toLocaleTimeString(),
          }))
        );
      } catch (error) {
        console.error(error);
        alert('Erro ao buscar veículos.');
      }
    };

    fetchVehicles();
  }, [estacionamentoIdNumber]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewVehicle({ ...newVehicle, [name]: value });
  };

  const handleAddVehicle = async () => {
    if (isNaN(estacionamentoIdNumber)) {
      alert('ID do estacionamento inválido!');
      return;
    }

    try {
      const response = await cadastrarVeiculo(
        newVehicle.plate,
        newVehicle.type,
        newVehicle.description,
        undefined,
        undefined,
        estacionamentoIdNumber
      );

      const vehicleId = response.id;
      if (!vehicleId) {
        alert('Erro: O ID do veículo não foi retornado pelo backend.');
        return;
      }

      localStorage.setItem('vehicleId', vehicleId.toString());

      setVehicles([
        ...vehicles,
        {
          id: vehicleId,
          plate: response.placa || "",
          type: response.classificacao || "",
          description: response.descricao || "",
          entry: new Date().toLocaleTimeString(),
        },
      ]);

      setNewVehicle({ plate: "", type: "", description: "", entry: "" });
      alert('Veículo cadastrado com sucesso!');
    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar o veículo. Tente novamente.');
    }
  };

  const handleCheckboxChange = async (vehicle: Vehicle) => {
    try {
      const fetchedVehicles = await buscarVeiculos(estacionamentoIdNumber);
      const matchingVehicle = fetchedVehicles.find(
        (v) => v.placa === vehicle.plate
      );
      // console.log();
      // console.log('matchingVehicle (HANDLE CHECK BOX CHANGE): ', matchingVehicle);
  
      if (matchingVehicle) {
        setSelectedVehicle({
          id: matchingVehicle.id!,
          plate: matchingVehicle.placa || "",
          type: matchingVehicle.classificacao || "",
          description: matchingVehicle.descricao || "",
          entry: new Date().toLocaleTimeString(),
          //entry: matchingVehicle.createdAt?.toString(),
        });
  
        localStorage.setItem('vehicleId', matchingVehicle.id!.toString());
      } else {
        alert("Veículo não encontrado no sistema.");
        setSelectedVehicle(null);
      }
    } catch (error) {
      console.error("Erro ao buscar o veículo:", error);
      alert("Erro ao buscar o veículo. Tente novamente.");
    }
  };
  

  const handleDeleteVehicle = (index: number) => {
    const updatedVehicles = vehicles.filter((_, vehicleIndex) => vehicleIndex !== index);
    setVehicles(updatedVehicles);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleOpenModal = async () => {
    const storedVehicleId = localStorage.getItem('vehicleId');
    const vehicleIdAsNumber = storedVehicleId ? parseInt(storedVehicleId) : NaN;
    // console.log();
    // console.log('vehicleIdAsNumber (HANDLE OPEN MODAL): ', vehicleIdAsNumber);

    if (selectedVehicle) {
      try {
        const vehicleData = await buscarVeiculoPorId(vehicleIdAsNumber);
        setSelectedVehicle({
          ...selectedVehicle,
          ...vehicleData,
        });
        setModalOpen(true);
      } catch (error) {
        console.error(error);
        alert("Erro ao buscar dados do veículo selecionado.");
      }
    } else {
      alert("Selecione um veículo para calcular a saída.");
    }
  };
  
  const handleConfirmExit = async () => {
    if (!selectedVehicle || isNaN(estacionamentoIdNumber)) {
      alert("Veículo ou ID do estacionamento inválidos.");
      return;
    }
  
    try {
      await registrarEntradaSaida(
        String(selectedVehicle.id),
        String(estacionamentoIdNumber),
        new Date().toISOString(),
        paymentInfo.amount,
        paymentInfo.method,
        // "vaga1",
        new Date().toISOString(),
        // "rotativo",
        // ""
      );
      setVehicles(vehicles.filter((v) => v.plate !== selectedVehicle.plate));
      setModalOpen(false);
      setPaymentInfo({ method: "Selecionar", amount: "" });
      alert("Saída registrada com sucesso.");
    } catch (error) {
      console.error(error);
      alert("Erro ao registrar a saída. Tente novamente.");
    }
  };
  

  const handleCancelExit = () => {
    setModalOpen(false);
  };

  const handleOpenCadastroMensalista = () => {
    setMostrarCadastroMensalista(true);
  };

  const handleConfirmarMensalista = (mensalista: any) => {
    console.log("Mensalista cadastrado:", mensalista);
    setMostrarCadastroMensalista(false);
  };

  const handleCancelarMensalista = () => {
    setMostrarCadastroMensalista(false);
  };

  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.plate?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Grid2 padding="20px">
      <Header onMenuClick={() => {}} onCloseMenu={() => {}} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TextField
                  name="plate"
                  value={newVehicle.plate}
                  onChange={handleInputChange}
                  placeholder="Placa"
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <TextField
                  name="type"
                  value={newVehicle.type}
                  onChange={handleInputChange}
                  placeholder="Tipo"
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <TextField
                  name="description"
                  value={newVehicle.description}
                  onChange={handleInputChange}
                  placeholder="Descrição"
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <Button onClick={handleAddVehicle} variant="contained" color="primary">
                  Cadastrar
                </Button>
              </TableCell>
              <TableCell>
                <TextField
                  placeholder="Buscar pela Placa..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  fullWidth
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Selecionar</TableCell>
              <TableCell>Placa</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Entrada</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredVehicles.map((vehicle, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Checkbox
                    checked={selectedVehicle?.plate === vehicle.plate}
                    onChange={() => handleCheckboxChange(vehicle)}
                  />
                </TableCell>
                <TableCell>{vehicle.plate}</TableCell>
                <TableCell>{vehicle.type}</TableCell>
                <TableCell>{vehicle.description}</TableCell>
                <TableCell>{vehicle.entry}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDeleteVehicle(index)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <footer style={{ padding: '20px', backgroundColor: theme.palette.primary.main, borderRadius: '0px 0px 10px 10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button variant="contained" color="secondary" onClick={handleOpenModal}>
            Calcular Saída
          </Button>
          <Button variant="contained" color="secondary" onClick={handleOpenCadastroMensalista}>
            Cadastro Mensalista
          </Button>
        </div>
      </footer>

      {isModalOpen && selectedVehicle && (
        <CalcularSaida
          vehicle={selectedVehicle}
          paymentInfo={paymentInfo}
          setPaymentInfo={setPaymentInfo}
          onConfirm={handleConfirmExit}
          onCancel={handleCancelExit}
        />
      )}

      {mostrarCadastroMensalista && (
        <CadastroMensalista onConfirmar={handleConfirmarMensalista} onCancelar={handleCancelarMensalista} />
      )}
    </Grid2>
  );
};

export default EstacionamentoRotativo;
