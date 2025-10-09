import { BrowserProvider, JsonRpcProvider } from 'ethers';

/**
 * FHEVM SDK Configuration
 */
export interface FHEVMConfig {
  provider: BrowserProvider | JsonRpcProvider;
  network: 'sepolia' | 'zama-devnet' | 'zama-testnet' | 'hardhat';
  gatewayUrl?: string;
  aclAddress?: string;
}

/**
 * Instance initialization result
 */
export interface FHEVMInstance {
  instance: any;
  publicKey: string;
  signature: string;
}

/**
 * Encryption result
 */
export interface EncryptedValue {
  data: Uint8Array;
  type: 'euint8' | 'euint16' | 'euint32' | 'euint64' | 'euint128' | 'ebool' | 'eaddress';
}

/**
 * Decryption parameters
 */
export interface DecryptParams {
  contractAddress: string;
  ciphertext: string;
  userAddress: string;
}

/**
 * EIP-712 Reencryption Request
 */
export interface ReencryptionRequest {
  publicKey: string;
  signature: string;
}

/**
 * Network configurations
 */
export const NETWORK_CONFIG = {
  sepolia: {
    chainId: 11155111,
    name: 'Sepolia',
    gatewayUrl: 'https://gateway.sepolia.zama.ai',
    aclAddress: '0x'
  },
  'zama-devnet': {
    chainId: 8009,
    name: 'Zama Devnet',
    gatewayUrl: 'https://gateway.devnet.zama.ai',
    aclAddress: '0x'
  },
  'zama-testnet': {
    chainId: 8010,
    name: 'Zama Testnet',
    gatewayUrl: 'https://gateway.testnet.zama.ai',
    aclAddress: '0x'
  },
  hardhat: {
    chainId: 31337,
    name: 'Hardhat',
    gatewayUrl: 'http://localhost:8545',
    aclAddress: '0x'
  }
};

/**
 * SDK Context for React
 */
export interface FHEVMContextValue {
  instance: any | null;
  isInitialized: boolean;
  publicKey: string | null;
  encrypt: (value: number | boolean, type: string) => Promise<EncryptedValue>;
  decrypt: (params: DecryptParams) => Promise<string>;
  reencrypt: (params: DecryptParams) => Promise<string>;
}
