import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { esqueciSenha } from "../services/auth";

// const PasswordRecovery: React.FC = () => {
//   const [activeStep, setActiveStep] = useState<number>(0);
//   const [email, setEmail] = useState<string>("");
//   const [code, setCode] = useState<string>("");
//   const [novaSenha, setNovaSenha] = useState<string>("");
//   const [confirmaSenha, setConfirmaSenha] = useState<string>("");

//   const handleNextStep = () => {
//     setActiveStep((prev) => prev + 1);
//   };

//   const handlePreviousStep = () => {
//     setActiveStep((prev) => prev - 1);
//   };

//   const handleSubmitNovaSenha = () => {
//     if (novaSenha === confirmaSenha) {
//       alert("Senha alterada com sucesso!");
//       // Aqui você pode adicionar a lógica para enviar a nova senha ao backend.
//     } else {
//       alert("As senhas não coincidem. Por favor, tente novamente.");
//     }
//   };

//   return (
//     <Container maxWidth="sm" sx={{ marginTop: 4 }}>
//       <Typography variant="h4" gutterBottom align="center">
//         Recuperação de Senha
//       </Typography>
//       <Stepper activeStep={activeStep} alternativeLabel>
//         <Step>
//           <StepLabel>Digite seu e-mail</StepLabel>
//         </Step>
//         <Step>
//           <StepLabel>Insira o código</StepLabel>
//         </Step>
//         <Step>
//           <StepLabel>Nova Senha</StepLabel>
//         </Step>
//       </Stepper>

//       <Box sx={{ marginTop: 4 }}>
//         {activeStep === 0 && (
//           <Box>
//             <Typography>Digite seu e-mail:</Typography>
//             <TextField
//               fullWidth
//               margin="normal"
//               type="email"
//               label="E-mail"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <Button
//               variant="contained"
//               color="primary"
//               fullWidth
//               onClick={handleNextStep}
//             >
//               Enviar código
//             </Button>
//           </Box>
//         )}

//         {activeStep === 1 && (
//           <Box>
//             <Typography>Insira o código de recuperação:</Typography>
//             <TextField
//               fullWidth
//               margin="normal"
//               type="text"
//               label="Código"
//               value={code}
//               onChange={(e) => setCode(e.target.value)}
//             />
//             <Button
//               variant="contained"
//               color="primary"
//               fullWidth
//               onClick={handleNextStep}
//             >
//               Verificar código
//             </Button>
//           </Box>
//         )}

//         {activeStep === 2 && (
//           <Box>
//             <Typography>Nova Senha:</Typography>
//             <TextField
//               fullWidth
//               margin="normal"
//               type="password"
//               label="Nova Senha"
//               value={novaSenha}
//               onChange={(e) => setNovaSenha(e.target.value)}
//             />
//             <TextField
//               fullWidth
//               margin="normal"
//               type="password"
//               label="Confirmar Senha"
//               value={confirmaSenha}
//               onChange={(e) => setConfirmaSenha(e.target.value)}
//             />
//             <Button
//               variant="contained"
//               color="primary"
//               fullWidth
//               onClick={handleSubmitNovaSenha}
//             >
//               Alterar Senha
//             </Button>
//           </Box>
//         )}
//       </Box>

//       <Box sx={{ marginTop: 2 }}>
//         {activeStep > 0 && (
//           <Button
//             variant="outlined"
//             color="secondary"
//             fullWidth
//             onClick={handlePreviousStep}
//           >
//             Voltar
//           </Button>
//         )}
//       </Box>
//     </Container>
//   );
// };

// export default PasswordRecovery;


const PasswordRecovery: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [novaSenha, setNovaSenha] = useState<string>("");
  const [confirmaSenha, setConfirmaSenha] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Para gerenciar o estado de carregamento.

  const handleNextStep = async () => {
    if (activeStep === 0) {
      // Enviar o e-mail
      setLoading(true); // Inicia o carregamento
      try {
        await esqueciSenha(email);
        alert("Código enviado com sucesso. Verifique seu e-mail.");
        setActiveStep((prev) => prev + 1); // Avançar para o próximo passo
      } catch (error: any) {
        alert(error.message || "Erro ao enviar o código.");
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    } else {
      setActiveStep((prev) => prev + 1); // Avançar para o próximo passo
    }
  };

  const handlePreviousStep = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmitNovaSenha = () => {
    if (novaSenha === confirmaSenha) {
      alert("Senha alterada com sucesso!");
      // Aqui você pode adicionar a lógica para enviar a nova senha ao backend.
    } else {
      alert("As senhas não coincidem. Por favor, tente novamente.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Recuperação de Senha
      </Typography>
      <Stepper activeStep={activeStep} alternativeLabel>
        <Step>
          <StepLabel>Digite seu e-mail</StepLabel>
        </Step>
        <Step>
          <StepLabel>Insira o código</StepLabel>
        </Step>
        <Step>
          <StepLabel>Nova Senha</StepLabel>
        </Step>
      </Stepper>

      <Box sx={{ marginTop: 4 }}>
        {activeStep === 0 && (
          <Box>
            <Typography>Digite seu e-mail:</Typography>
            <TextField
              fullWidth
              margin="normal"
              type="email"
              label="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleNextStep}
              disabled={loading} // Desativa o botão durante o carregamento
            >
              {loading ? "Enviando..." : "Enviar código"}
            </Button>
          </Box>
        )}

        {activeStep === 1 && (
          <Box>
            <Typography>Insira o código de recuperação:</Typography>
            <TextField
              fullWidth
              margin="normal"
              type="text"
              label="Código"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleNextStep}
            >
              Verificar código
            </Button>
          </Box>
        )}

        {activeStep === 2 && (
          <Box>
            <Typography>Nova Senha:</Typography>
            <TextField
              fullWidth
              margin="normal"
              type="password"
              label="Nova Senha"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              type="password"
              label="Confirmar Senha"
              value={confirmaSenha}
              onChange={(e) => setConfirmaSenha(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmitNovaSenha}
            >
              Alterar Senha
            </Button>
          </Box>
        )}
      </Box>

      <Box sx={{ marginTop: 2 }}>
        {activeStep > 0 && (
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={handlePreviousStep}
          >
            Voltar
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default PasswordRecovery;
