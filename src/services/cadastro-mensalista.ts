import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export interface CriarMensalistaResponse {
  nome: string,
  email: string,
  whatsapp: string,
  cpf: string,
  estacionamentoId: number,
  tipo: string,
  descricao: string,
  placa: string,
  vagas: string
}

export interface AtualizarMensalistaResponse {
  nome?: string,
  email?: string,
  whatsapp?: string,
  cpf?: string,
  estacionamentoId?: number,
  tipo?: string,
  descricao?: string,
  placa?: string,
  vagas?: string
}


export interface BuscarMensalistas {
  estacionamentoId: number,
};

export const cadastrarMensalista = async (
  nome: string,
  email: string,
  whatsapp: string,
  cpf: string,
  estacionamentoId: number,
  tipo: string,
  descricao: string,
  placa: string,
  vagas: string
): Promise<CriarMensalistaResponse> => {
  try {
    const response = await api.post<CriarMensalistaResponse>('/mensalistas', {
      nome,
      email,
      whatsapp,
      cpf,
      estacionamentoId,
      tipo,
      descricao,
      placa,
      vagas
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro no cadastro de mensalista');
  }
};

export const atualizarMensalista = async (
  id: number,
  nome?: string,
  email?: string,
  whatsapp?: string,
  cpf?: string,
  estacionamentoId?: number,
  tipo?: string,
  descricao?: string,
  placa?: string,
  vagas?: string
): Promise<AtualizarMensalistaResponse> => {
  try {
    const response = await api.put<AtualizarMensalistaResponse>(`/mensalistas/${id}`, {
      nome,
      email,
      whatsapp,
      cpf,
      estacionamentoId,
      tipo,
      descricao,
      placa,
      vagas,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao atualizar mensalista');
  }
};

export const excluirMensalista = async (
  id: number,
): Promise<void> => {
  try {
    await api.delete(`/mensalistas/${id}`);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao excluir mensalista');
  }
};



export const buscarMensalistaPorId = async (id: number): Promise<CriarMensalistaResponse> => {
  try {
    const response = await api.get<CriarMensalistaResponse>(`/mensalistas/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao buscar mensalista pelo ID');
  }
};

export const buscarMensalistas = async (estacionamentoId: number): Promise<BuscarMensalistas[]> => {
  try {
    const response = await api.get<BuscarMensalistas[]>(`/mensalistas/getall/${estacionamentoId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao buscar mensalistas');
  }
};

export default api;
