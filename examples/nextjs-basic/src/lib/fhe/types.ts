export type EncryptionType = 'euint8' | 'euint16' | 'euint32' | 'euint64' | 'euint128' | 'ebool' | 'eaddress';

export interface EncryptedData {
  data: Uint8Array;
  type: EncryptionType;
}

export interface DecryptionParams {
  contractAddress: string;
  ciphertext: string;
  userAddress?: string;
}

export interface FHEVMInstance {
  publicKey: string;
  signature?: string;
  instance: any;
}

export interface EncryptionResult {
  original: any;
  encrypted: EncryptedData;
  timestamp: string;
}

export interface DecryptionResult {
  decrypted: any;
  timestamp: string;
}
