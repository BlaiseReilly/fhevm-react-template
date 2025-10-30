import { createFHEVMClient as createSDKClient } from '@fhevm/sdk';
import { BrowserProvider, JsonRpcProvider } from 'ethers';

export interface FHEClientConfig {
  network?: 'sepolia' | 'zama-devnet' | 'zama-testnet' | 'hardhat';
  gatewayUrl?: string;
  aclAddress?: string;
}

export const createFHEVMClient = async (config: FHEClientConfig = {}) => {
  try {
    let provider;

    if (typeof window !== 'undefined' && window.ethereum) {
      provider = new BrowserProvider(window.ethereum);
    } else {
      provider = new JsonRpcProvider(
        process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL || 'https://rpc.sepolia.org'
      );
    }

    const client = createSDKClient({
      provider,
      network: config.network || 'sepolia',
      ...(config.gatewayUrl && { gatewayUrl: config.gatewayUrl }),
      ...(config.aclAddress && { aclAddress: config.aclAddress }),
    });

    return client;
  } catch (error) {
    console.error('Failed to create FHEVM client:', error);
    throw error;
  }
};

export const initializeClient = async (client: any, signer?: any) => {
  try {
    const result = await client.init(signer);
    return result;
  } catch (error) {
    console.error('Failed to initialize FHEVM client:', error);
    throw error;
  }
};
