import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export interface CadastrarVeiculoResponse {
  id?: number,
  placa?: string,
  classificacao?: string,
  descricao?: string,
  cpfMensalista: string,
  vaga?: string,
  estacionamentoId?: number,
}

export const cadastrarVeiculo = async (
  placa?: string,
  classificacao?: string,
  descricao?: string,
  cpfMensalista?: string,
  vaga?: string,
  estacionamentoId?: number,
): Promise<CadastrarVeiculoResponse> => {
  try {
    const response = await api.post<CadastrarVeiculoResponse>('/veiculos', {
      placa,
      classificacao,
      descricao,
      cpfMensalista,
      estacionamentoId,
      vaga
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro no cadastro de veículo');
  }
};

export const buscarVeiculoPorId = async (id: number): Promise<CadastrarVeiculoResponse> => {
  try {
    const response = await api.get<CadastrarVeiculoResponse>(`/veiculos/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao buscar veículo pelo ID');
  }
};


export const buscarVeiculos = async (estacionamentoId: number): Promise<CadastrarVeiculoResponse[]> => {
  try {
    const response = await api.get<CadastrarVeiculoResponse[]>(`/veiculos/getall/${estacionamentoId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao buscar veiculos');
  }
};

export default api;
