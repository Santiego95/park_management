import axios from "axios";

interface FuncionarioResponse {
    nome: string;
    cpf: string;
    email: string;
    estacionamento: string;
    senha: string,
    confirmaSenha: string,
}

export interface BuscarFuncionarioPorId {
  id: number,
};

export interface BuscarFuncionarios {
  id: number,
};


const api = axios.create({
    baseURL: 'http://localhost:3000',
});

export const funcionarioCadastro = async (
    nome: string,
    email: string,
    estacionamento: string,
    cpf: string,
    senha: string,
    confirmaSenha: string
  ): Promise<FuncionarioResponse> => {
    try {
      const response = await api.post<FuncionarioResponse>('/usuarios/funcionario', {
        nome,
        email,
        estacionamento,
        cpf,
        senha,
        confirmaSenha,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro no cadastro');
    }
  };

  export const excluirFuncionario = async (
    id: number,
  ): Promise<void> => {
    try {
      await api.delete(`/usuarios/${id}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao excluir funcionário');
    }
  };

  export const buscarFuncionarioPorId = async (id: number): Promise<BuscarFuncionarioPorId> => {
    try {
      const response = await api.get<BuscarFuncionarioPorId>(`/usuarios/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar mensalista pelo ID');
    }
  };
  
  export const buscarFuncionarios = async (id: number): Promise<BuscarFuncionarios[]> => {
    try {
      const response = await api.get<BuscarFuncionarios[]>(`/usuarios/getall/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar mensalistas');
    }
  };