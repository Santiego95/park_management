// src/types.ts

// Definindo o tipo para veículos
export interface Vehicle {
    plate: string;
    type: string;
    description: string;
    entry: string;
  }
  
  // Definindo o tipo para informações de pagamento
  export interface PaymentInfo {
    method: string;
    amount: string;
  }
  
  // Definindo o tipo para um mensalista (adapte conforme necessário)
  export interface Mensalista {
    nome: string;
    cpf: string;
    placa: string;
    descricao: string;
    whatsapp: string;
    vaga: string;
    tipo: string;
  }