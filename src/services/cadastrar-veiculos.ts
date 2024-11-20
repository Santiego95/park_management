import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export interface CadastrarVeiculoResponse {
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

export default api;
