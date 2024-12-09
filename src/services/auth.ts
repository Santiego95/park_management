import axios from "axios";

interface LoginResponse {
  access_token: string;
  id: number;
}

interface RegisterResponse {
  message: string;
}

interface EsqueciSenhaResponse {
  email: string;
}

const api = axios.create({
  baseURL: 'http://localhost:3000',
});
  
export const login = async (email: string, senha: string): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/auth/login', { email, senha });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Email ou Senha Incorreto');
  }
};

export const register = async (
  nome: string,
  email: string,
  cpf: string,
  senha: string,
  confirmaSenha: string
): Promise<RegisterResponse> => {
  try {
    const response = await api.post<RegisterResponse>('/auth/register', {
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

export const esqueciSenha = async (email: string) : Promise<EsqueciSenhaResponse> => {
  try {
    const response = await api.post<EsqueciSenhaResponse>('/auth/esqueci', {
      email,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro no envio de email');
  }
};
  
export default api;