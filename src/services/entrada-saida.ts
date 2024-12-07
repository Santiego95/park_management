import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export interface EntradaSaidaResponse {
  id?: number,
  veiculoId?: string,
  estacionamentoId?: string,
  horarioSaida?: string,
  valorPago?: string,
  formaPagamento?: string,
  vaga?: string,
  dataPagamento?: string,
  tipoCliente?: string,
  cpfMensalista?: string,
}

export const registrarEntradaSaida = async (
  veiculoId?: string,
  estacionamentoId?: string,
  horarioSaida?: string,
  valorPago?: string,
  formaPagamento?: string,
  vaga?: string,
  dataPagamento?: string,
  tipoCliente?: string,
  cpfMensalista?: string,
): Promise<EntradaSaidaResponse> => {
  try {
    const response = await api.post<EntradaSaidaResponse>('/entradaSaida', {
      veiculoId,
      estacionamentoId,
      horarioSaida,
      valorPago,
      formaPagamento,
      vaga,
      dataPagamento,
      tipoCliente,
      cpfMensalista,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro no registro de saída');
  }
};

export const calcularSaida = async (
  veiculoId?: string,
  estacionamentoId?: string,
) => {
  try {
    const response = await api.post('/entradaSaida/calcular-saida', {
      veiculoId,
      estacionamentoId,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao calcular valor da saída');
  }
};

export default api;
