import axios from 'axios';

interface EstacionamentoResponse {
  estacionamentoNome: string;
  endereco: string;
  totalvagas: number;
  usuarioId: number;
}

const api = axios.create({
    baseURL: 'http://localhost:3000',
});

export const estacionamento = async (
    estacionamentoNome: string, 
    endereco: string, 
    totalvagas: number, 
    usuarioId: number
): Promise<EstacionamentoResponse> => {
    try {
      const response = await api.post<EstacionamentoResponse>('/estacionamento', { 
        estacionamentoNome, 
        endereco,
        totalvagas,
        usuarioId,
    });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro no cadastro do estacionamento');
    }
  };