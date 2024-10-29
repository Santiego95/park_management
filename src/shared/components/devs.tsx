import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import Alecsandro from "../img/img-alecsandro.jpg";
import Marcio from "../img/img-marcio.jpg";
import Matheus from "../img/img-matheus.jpg";
import Nathan from "../img/img-nathan.jpg";

const desenvolvedores = [
  {
    nome: 'Alecsandro Santiego',
    descricao: 'Desenvolvedor do layout do projeto',
    imagem: Alecsandro,
  },
  {
    nome: 'Marcio Carvalho',
    descricao: 'Gerente de projeto e responsável pela coordenação geral',
    imagem: Marcio,
  },
  {
    nome: 'Matheus Nascimento',
    descricao: 'Desenvolvedor frontend com foco em interfaces modernas',
    imagem: Matheus,
  },
  {
    nome: 'Nathan Bonifacio',
    descricao: 'Especialista em backend e integração de APIs',
    imagem: Nathan,
  },
];

const Desenvolvedores: React.FC = () => {
  return (
    <Grid container spacing={4}>
      {desenvolvedores.map((dev, index) => (
        <Grid item xs={12} md={3} key={index}>
          <Card sx={{width:'280px', bgcolor:'#000000', color:'#ffffff'}}>
            <CardContent>
              <Typography variant="h6">{dev.nome}</Typography>
              <Typography variant="subtitle1">{dev.descricao}</Typography>
              <Box mt={2}>
                <img style={{width:'100%', height:'250px'}} src={dev.imagem} alt="profile" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Desenvolvedores;
