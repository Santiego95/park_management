import { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { buscarEstacionamentos } from '../../services/cadastro-estacionamento';


interface Estacionamento {
  nome: string;
  endereco: string;
  vagas: number;
  valorHora: number;
  valorMaisHoras: number;
  confirmado: boolean;
}

interface ListaEstacionamentosProps {
  estacionamentos: Estacionamento[];
  onConfirmar: (index: number) => void;
}

// const ListaEstacionamentos: React.FC<ListaEstacionamentosProps> = ({ estacionamentos, onConfirmar }) => {
//   const theme = useTheme();

//   return (
//     <Box sx={{ backgroundColor: '#ffffff', padding: '10px', height: '70vh' }}>
//       <Typography variant="h5">Lista de Estacionamentos</Typography>
//       {estacionamentos.length === 0 ? (
//         <Typography variant="body1" color="textSecondary">
//           Nenhum estacionamento cadastrado ainda.
//         </Typography>
//       ) : (
//         <Grid container spacing={3}>
//           {estacionamentos.map((estacionamento, index) => (
//             <Grid item xs={12} sm={6} md={4} key={index}>
//               <Card elevation={3}>
//                 <CardContent style={{ backgroundColor: theme.palette.primary.main, color: '#ffffff' }}>
//                   <Typography variant="h6">Nome: {estacionamento.nome}</Typography>
//                   <Typography variant="body1">Endereço: {estacionamento.endereco}</Typography>
//                   <Typography variant="body1">Vagas: {estacionamento.vagas}</Typography>
//                   {!estacionamento.confirmado ? (
//                     <Button
//                       component={Link}
//                       to="/rotativo"
//                       variant="contained"
//                       color="secondary"
//                       onClick={() => onConfirmar(index)}
//                       sx={{ marginTop: 2 }}
//                     >
//                       Confirmar
//                     </Button>
//                   ) : (
//                     <Typography variant="body2" color="green" sx={{ marginTop: 2 }}>
//                       Estacionamento Confirmado!
//                     </Typography>
//                   )}
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       )}
//     </Box>
//   );
// };

// export default ListaEstacionamentos;


//---------------------------TESTE 1------------------------------------

// import React from 'react';
// import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
// import { Link, useNavigate } from 'react-router-dom';
// import { useTheme } from '@mui/material/styles';

// interface Estacionamento {
//   nome: string;
//   endereco: string;
//   vagas: number;
//   valorHora: number;
//   valorMaisHoras: number;
//   confirmado: boolean;
// }

// interface ListaEstacionamentosProps {
//   estacionamentos: Estacionamento[];
//   onConfirmar: (index: number) => void;
// }

// const ListaEstacionamentos: React.FC<ListaEstacionamentosProps> = ({ estacionamentos, onConfirmar }) => {
//   const theme = useTheme();
//   const navigate = useNavigate(); // Hook para navegação programática

//   const handleConfirmar = (index: number) => {
//     const estacionamentoId = localStorage.getItem('estacionamentoId'); // Recupera o ID do localStorage
//     if (estacionamentoId) {
//       onConfirmar(index); // Chama a função de confirmação
//       navigate(`/rotativo/${estacionamentoId}`); // Redireciona para a página com o ID
//     } else {
//       console.error('ID do estacionamento não encontrado no localStorage');
//     }
//   };

//   return (
//     <Box sx={{ backgroundColor: '#ffffff', padding: '10px', height: '70vh' }}>
//       <Typography variant="h5">Lista de Estacionamentos</Typography>
//       {estacionamentos.length === 0 ? (
//         <Typography variant="body1" color="textSecondary">
//           Nenhum estacionamento cadastrado ainda.
//         </Typography>
//       ) : (
//         <Grid container spacing={3}>
//           {estacionamentos.map((estacionamento, index) => (
//             <Grid item xs={12} sm={6} md={4} key={index}>
//               <Card elevation={3}>
//                 <CardContent style={{ backgroundColor: theme.palette.primary.main, color: '#ffffff' }}>
//                   <Typography variant="h6">Nome: {estacionamento.nome}</Typography>
//                   <Typography variant="body1">Endereço: {estacionamento.endereco}</Typography>
//                   <Typography variant="body1">Vagas: {estacionamento.vagas}</Typography>
//                   {!estacionamento.confirmado ? (
//                     <Button
//                       variant="contained"
//                       color="secondary"
//                       onClick={() => handleConfirmar(index)} // Usa a função com redirecionamento dinâmico
//                       sx={{ marginTop: 2 }}
//                     >
//                       Confirmar
//                     </Button>
//                   ) : (
//                     <Typography variant="body2" color="green" sx={{ marginTop: 2 }}>
//                       Estacionamento Confirmado!
//                     </Typography>
//                   )}
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       )}
//     </Box>
//   );
// };

// export default ListaEstacionamentos;

//---------------------------TESTE 2------------------------------------

// interface Estacionamento {
//   nome: string;
//   endereco: string;
//   vagas: number;
//   valorHora: number;
//   valorMaisHoras: number;
//   confirmado: boolean;
// }

// interface EstacionamentoResponse {
//   id: number;
//   nome: string;
//   endereco: string;
//   vagas: number;
//   valorHora: number;
//   valorMaisHoras: number;
// }

// interface ListaEstacionamentosProps {
//   usuarioId: number;
//   onConfirmar: (index: number) => void;
// }

// const ListaEstacionamentos: React.FC<ListaEstacionamentosProps> = ({ usuarioId, onConfirmar }) => {
//   const [estacionamentos, setEstacionamentos] = useState<Estacionamento[]>([]);
//   const [estacionamentosComId, setEstacionamentosComId] = useState<EstacionamentoResponse[]>([]);
//   const navigate = useNavigate();
//   const theme = useTheme();

//   useEffect(() => {
//     // Busca os estacionamentos do backend quando o componente é montado
//     const fetchEstacionamentos = async () => {
//       try {
//         const response = await buscarEstacionamentos(usuarioId);
//         setEstacionamentosComId(response); // Armazena a lista com IDs
//         setEstacionamentos(
//           response.map((e) => ({
//             id: e.id,
//             nome: e.estacionamentoNome,
//             endereco: e.endereco,
//             vagas: e.totalvagas,
//             valorHora: e.valorHora,
//             valorMaisHoras: e.valorMaisHoras,
//             confirmado: false,
//           }))
//         );
//       } catch (error) {
//         console.error('Erro ao buscar estacionamentos:', error);
//       }
//     };

//     fetchEstacionamentos();
//   }, [usuarioId]);

//   const handleConfirmar = (index: number) => {
//     const nomeEstacionamento = estacionamentos[index].nome;

//     // Filtra pelo nome do estacionamento para encontrar o ID correspondente
//     const estacionamentoEncontrado = estacionamentosComId.find(
//       (e) => e.nome === nomeEstacionamento
//     );

//     if (estacionamentoEncontrado) {
//       const estacionamentoId = estacionamentoEncontrado.id;
//       onConfirmar(index); // Marca como confirmado no estado externo
//       navigate(`/rotativo/${estacionamentoId}`); // Redireciona para a página com o ID correto
//     } else {
//       console.error(`Estacionamento com nome "${nomeEstacionamento}" não encontrado.`);
//     }
//   };

//   return (
//     <Box sx={{ backgroundColor: '#ffffff', padding: '10px', height: '70vh' }}>
//       <Typography variant="h5">Lista de Estacionamentos</Typography>
//       {estacionamentos.length === 0 ? (
//         <Typography variant="body1" color="textSecondary">
//           Nenhum estacionamento cadastrado ainda.
//         </Typography>
//       ) : (
//         <Grid container spacing={3}>
//           {estacionamentos.map((estacionamento, index) => (
//             <Grid item xs={12} sm={6} md={4} key={index}>
//               <Card elevation={3}>
//                 <CardContent style={{ backgroundColor: theme.palette.primary.main, color: '#ffffff' }}>
//                   <Typography variant="h6">Nome: {estacionamento.nome}</Typography>
//                   <Typography variant="body1">Endereço: {estacionamento.endereco}</Typography>
//                   <Typography variant="body1">Vagas: {estacionamento.vagas}</Typography>
//                   {!estacionamento.confirmado ? (
//                     <Button
//                       variant="contained"
//                       color="secondary"
//                       onClick={() => handleConfirmar(index)} // Usa a lógica para redirecionar com o ID
//                       sx={{ marginTop: 2 }}
//                     >
//                       Confirmar
//                     </Button>
//                   ) : (
//                     <Typography variant="body2" color="green" sx={{ marginTop: 2 }}>
//                       Estacionamento Confirmado!
//                     </Typography>
//                   )}
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       )}
//     </Box>
//   );
// };

// export default ListaEstacionamentos;

//----------------------------

const ListaEstacionamentos: React.FC<ListaEstacionamentosProps> = ({ estacionamentos, onConfirmar }) => {
  const theme = useTheme();

  return (
    <Box sx={{ backgroundColor: '#ffffff', padding: '10px', height: '70vh' }}>
      <Typography variant="h5">Lista de Estacionamentos</Typography>
      {estacionamentos.length === 0 ? (
        <Typography variant="body1" color="textSecondary">
          Nenhum estacionamento cadastrado ainda.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {estacionamentos.map((estacionamento, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card elevation={3}>
                <CardContent style={{ backgroundColor: theme.palette.primary.main, color: '#ffffff' }}>
                  <Typography variant="h6">Nome: {estacionamento.nome}</Typography>
                  <Typography variant="body1">Endereço: {estacionamento.endereco}</Typography>
                  <Typography variant="body1">Vagas: {estacionamento.vagas}</Typography>
                  {!estacionamento.confirmado ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => onConfirmar(index)} // Chama a função passada pelo componente pai
                      sx={{ marginTop: 2 }}
                    >
                      Confirmar
                    </Button>
                  ) : (
                    <Typography variant="body2" color="green" sx={{ marginTop: 2 }}>
                      Estacionamento Confirmado!
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ListaEstacionamentos;


