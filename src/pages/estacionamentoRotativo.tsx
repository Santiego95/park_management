import React, { useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Paper, Checkbox, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Header from '../shared/components/header';

interface Vehicle {
  plate: string;
  type: string;
  description: string;
  entry: string;
}

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

  const [selectedVehicles, setSelectedVehicles] = useState<boolean[]>(new Array(vehicles.length).fill(false));
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewVehicle({ ...newVehicle, [name]: value });
  };

  const handleAddVehicle = () => {
    setVehicles([...vehicles, { ...newVehicle, entry: new Date().toLocaleTimeString() }]);
    setNewVehicle({ plate: "", type: "", description: "", entry: "" });
    setSelectedVehicles([...selectedVehicles, false]);
  };

  const handleDeleteVehicle = (index: number) => {
    const updatedVehicles = vehicles.filter((_, vehicleIndex) => vehicleIndex !== index);
    setVehicles(updatedVehicles);
    setSelectedVehicles(selectedVehicles.filter((_, vehicleIndex) => vehicleIndex !== index));
  };

  const handleSelectVehicle = (index: number) => {
    const updatedSelections = [...selectedVehicles];
    updatedSelections[index] = !updatedSelections[index];
    setSelectedVehicles(updatedSelections);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.plate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
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
                    checked={selectedVehicles[index]}
                    onChange={() => handleSelectVehicle(index)}
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
          <Button variant="contained">Calcular Saída</Button>
          <Button variant="contained">Cadastro Mensalista</Button>
          <Button variant="contained">Fechar Caixa</Button>
        </div>
      </footer>
    </div>
  );
};

export default EstacionamentoRotativo;
