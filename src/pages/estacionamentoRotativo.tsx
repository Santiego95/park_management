import React, { useState, ChangeEvent } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Paper, Checkbox, IconButton, Container, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Header from '../shared/components/header';
import CalcularSaida from '../shared/components/cadastrosaida';  
import CadastroMensalista from '../shared/components/cadastroMensalista';
import { Vehicle, PaymentInfo, Mensalista } from "../shared/hooks/types";

const EstacionamentoRotativo: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    { plate: "AAA-1111", type: "Carro", description: "Gol prata", entry: "14:32" },
    { plate: "BBB-2222", type: "Carro", description: "Fiesta prata", entry: "14:56" },
  ]);

  const [newVehicle, setNewVehicle] = useState<Vehicle>({
    plate: "",
    type: "",
    description: "",
    entry: "",
  });

  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    method: "Selecionar",
    amount: "",
  });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [mostrarCadastroMensalista, setMostrarCadastroMensalista] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewVehicle({ ...newVehicle, [name]: value });
  };

  const handleAddVehicle = () => {
    setVehicles([...vehicles, { ...newVehicle, entry: new Date().toLocaleTimeString() }]);
    setNewVehicle({ plate: "", type: "", description: "", entry: "" });
  };

  const handleCheckboxChange = (vehicle: Vehicle) => {
    setSelectedVehicle(selectedVehicle?.plate === vehicle.plate ? null : vehicle);
  };

  const handleDeleteVehicle = (index: number) => {
    const updatedVehicles = vehicles.filter((_, vehicleIndex) => vehicleIndex !== index);
    setVehicles(updatedVehicles);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleOpenModal = () => {
    if (selectedVehicle) {
      setModalOpen(true);
    } else {
      alert("Selecione um veículo para calcular a saída.");
    }
  };

  const handleConfirmExit = () => {
    setVehicles(vehicles.filter(v => v.plate !== selectedVehicle?.plate));
    setModalOpen(false);
    setPaymentInfo({ method: "Selecionar", amount: "" });
  };

  const handleCancelExit = () => {
    setModalOpen(false);
  };

  const handleOpenCadastroMensalista = () => {
    setMostrarCadastroMensalista(true);
  };

  const handleConfirmarMensalista = (mensalista: Mensalista) => {
    console.log("Mensalista cadastrado:", mensalista);
    setMostrarCadastroMensalista(false);
  };

  const handleCancelarMensalista = () => {
    setMostrarCadastroMensalista(false);
  };

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.plate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container style={{ padding: '20px' }}>
      <Header onMenuClick={() => {}} onCloseMenu={() => {}} />
      <Typography variant="h4" gutterBottom>Gestão de Estacionamento</Typography>

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

      <footer style={{ marginTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button variant="contained" color="primary" onClick={handleOpenModal}>Calcular Saída</Button>
          <Button variant="contained" onClick={handleOpenCadastroMensalista}>Cadastro Mensalista</Button>
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
        <CadastroMensalista
          onConfirmar={handleConfirmarMensalista}
          onCancelar={handleCancelarMensalista}
        />
      )}
    </Container>
  );
};

export default EstacionamentoRotativo;
