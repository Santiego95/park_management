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

import { toast } from "react-toastify";

const PasswordRecovery: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [novaSenha, setNovaSenha] = useState<string>("");
  const [confirmaSenha, setConfirmaSenha] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Para gerenciar o estado de carregamento.
  const [codeSent, setCodeSent] = useState<boolean>(false); // Estado para controle da mensagem do código enviado.

  // Código gerado ou esperado
  const expectedCode = "123456"; // Simulação de código. Pode vir do backend.

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

  const handleSendCode = () => {
    if (email.trim() === "") {
      toast.error("Por favor, insira um e-mail válido.");
      return;
    }

    // Simulação de envio de código. Aqui você pode adicionar a lógica de envio ao backend.
    setCodeSent(true);
    toast.success("Código enviado para o seu e-mail!");
    handleNextStep();
  };

  const handleVerifyCode = () => {
    if (code === expectedCode) {
      toast.success("Código correto!");
      handleNextStep();
    } else {
      toast.error("Código inválido. Tente novamente.");
    }
  };

  const handleSubmitNovaSenha = () => {
    if (novaSenha === confirmaSenha) {
      toast.success("Senha alterada com sucesso!");
      // Aqui você pode adicionar a lógica para enviar a nova senha ao backend.
    } else {
      toast.error("As senhas não coincidem. Por favor, tente novamente.");
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
              onClick={handleSendCode}
              disabled={loading} // Desativa o botão durante o carregamento
            >
              {loading ? "Enviando..." : "Enviar código"}
            </Button>
          </Box>
        )}

        {activeStep === 1 && (
          <Box>
            {codeSent && (
              <Typography color="primary" sx={{ marginBottom: 2 }}>
                Código enviado para o e-mail: {email}.
              </Typography>
            )}
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
              onClick={handleVerifyCode}
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
