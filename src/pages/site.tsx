import React, { useState } from 'react';
import { Container, Box, Button, Typography, TextField, Grid } from '@mui/material';
import NavBar from '../shared/components/navBar'; // Importação do NavBar
import Desenvolvedores from '../shared/components/devs';
import fundoImage from '../shared/img/fundo.jpeg'; 
import telaRotativo from '../shared/img/tela-rotativo.png';
import telaDono from '../shared/img/tela-dono.png';
import telaCadastroMensalista from '../shared/img/tela-cadastro-mensalista.png';
import { Link } from "react-router-dom";


const Site: React.FC = () => {
  const [mostrarFormularioEstacionamento, setMostrarFormularioEstacionamento] = useState(false);

  return (
    <Container id="inicio" maxWidth="lg">
      <NavBar onAdicionarEstacionamento={() => setMostrarFormularioEstacionamento(true)} />

      <Box
        p={4}
        textAlign="center"
        sx={{
          backgroundImage: `url(${fundoImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center', 
          height: '400px', 
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          color: 'white', 
        }}
      >
        <Typography variant="h3" component="h2" gutterBottom>
          Software para ajudar no Gerenciamento de Sua empresa!
        </Typography>
        <Typography variant="h5" component="h3" gutterBottom>
          A Park Management apresenta uma solução de Gerenciamento de estacionamento.
        </Typography>
      </Box>

      {/* Info */}
      <Box id="sobre" mt={8}>
        <Typography variant="h4" gutterBottom>
          Por que a Park Management?
        </Typography>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Projetado para facilitar a sua vida na hora de encontrar e gerenciar vagas de estacionamento com uma interface simples e intuitiva.
        </Typography>

        <Grid container spacing={1} mt={4}>
          <Grid item xs={12} md={6}>
            <img style={{ paddingLeft: '120px' }} src="https://picsum.photos/352/350" alt="profile" />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography gutterBottom pt={10}>
              Simplifique o estacionamento com apenas alguns toques e desfrute de uma experiência mais tranquila e eficiente.
            </Typography>
            <Button variant="contained" color="primary" component={Link} to="/paginaMensalista">
              Saiba Mais
            </Button>
          </Grid>
        </Grid>
      </Box>

      <hr />

      {/* Serviços */}
      <Box id="servicos" mt={8}>
        <Typography variant="h4" gutterBottom>
          Serviços Disponíveis
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <img style={{ paddingLeft: '120px' }} src="https://picsum.photos/351/352" alt="profile" />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography gutterBottom pt={10}>
              Nosso aplicativo permite que proprietários de vários estacionamentos cadastrem e gerenciem todos os seus
              estabelecimentos em um único perfil. Com funcionalidades que incluem o registro de informações como capacidade,
              tarifas e horários de funcionamento, os donos podem acompanhar em tempo real a ocupação de cada unidade,
              otimizando a gestão de forma prática e eficiente, independentemente da quantidade de estacionamentos.
            </Typography>
            <Button variant="contained" color="primary">
              Saiba Mais
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={4} mt={4} ml={8}>
          <Grid item xs={12} md={6}>
            <Typography gutterBottom pt={10}>
              Nosso aplicativo oferece um cálculo automático de saída para carros rotativos, simplificando o processo de cobrança.
              Ao registrar a entrada do veículo, o sistema monitora o tempo de permanência e, ao solicitar a saída, calcula
              automaticamente o valor devido com base no tempo estacionado e nas tarifas aplicáveis. Essa funcionalidade agiliza
              o atendimento e garante uma cobrança precisa e transparente, sem complicações para o cliente ou o administrador.
            </Typography>
            <Button variant="contained" color="primary">
              Saiba Mais
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <img src="https://picsum.photos/352/351" alt="profile" />
          </Grid>
        </Grid>
      </Box>

      {/* Quem Somos */}
      <Box id="quem-somos" mt={8}>
        <Typography variant="h4" gutterBottom>
          Quem Somos
        </Typography>
        <Typography variant="h5" gutterBottom>
          Conheça os desenvolvedores
        </Typography>
        <Typography paragraph>
          Nossa equipe de desenvolvedores é formada por quatro alunos dedicados e apaixonados por tecnologia. Juntos, estamos
          cursando Análise e Desenvolvimento de Sistemas e unimos nossos conhecimentos para criar soluções inovadoras e eficientes.
        </Typography>

        <Desenvolvedores />
      </Box>

      {/* Contato */}
      <Box id="contato" mt={8}>
        <Typography variant="h4" gutterBottom>
          Entre em Contato
        </Typography>
        <Typography paragraph>
          Faça uma pergunta ou deixe um feedback sobre os nossos produtos. Preencha o formulário e responderemos o mais rápido
          possível.
        </Typography>
        <Box bgcolor="#ffffff" p="20px">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Nome Completo" margin="normal" />
              <TextField fullWidth label="Email" type="email" margin="normal" />
              <TextField fullWidth label="Mensagem" multiline rows={4} margin="normal" />
              <Button variant="contained" color="primary">
                Enviar Mensagem
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Site;
