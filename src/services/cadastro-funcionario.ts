import axios from "axios";

interface FuncionarioResponse {
    nome: string;
    cpf: string;
    email: string;
    senha: string,
    confirmaSenha: string,
}

const api = axios.create({
    baseURL: 'http://localhost:3000',
});

export const funcionarioCadastro = async (
    nome: string,
    email: string,
    cpf: string,
    senha: string,
    confirmaSenha: string
  ): Promise<FuncionarioResponse> => {
    try {
      const response = await api.post<FuncionarioResponse>('/usuarios/funcionario', {
        nome,
        email,
        cpf,
        senha,
        confirmaSenha,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro no cadastro');
    }
  };