export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface EncryptionAPIRequest {
  value: number | boolean;
  type: string;
}

export interface DecryptionAPIRequest {
  contractAddress: string;
  ciphertext: string;
  userAddress?: string;
}

export interface ComputationAPIRequest {
  operation: 'add' | 'subtract' | 'multiply';
  operand1: string;
  operand2: string;
  contractAddress?: string;
  abi?: any[];
}
