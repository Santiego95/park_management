// src/types.ts

// Definindo o tipo para veículos
export interface Vehicle {
    id?: number;
    plate?: string;
    type?: string;
    description?: string;
    entry?: string;
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
    vagas: string;
    tipo: string;
    email: string;
  }

  export interface Estacionamento {
    nome: string;
    endereco: string;
    vagas: number;
    confirmado: boolean;
  }

  export interface Funcionario {
    nome: string;
    cpf: string;
    estacionamento: string;
    email: string;
    senha: string;
  }