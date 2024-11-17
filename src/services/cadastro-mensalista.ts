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

export default api;
