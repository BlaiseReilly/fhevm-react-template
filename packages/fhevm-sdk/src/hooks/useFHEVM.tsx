import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BrowserProvider } from 'ethers';
import { FHEVMClient, createFHEVMClient } from '../core/client';
import { FHEVMConfig, FHEVMContextValue, EncryptedValue, DecryptParams } from '../types';

/**
 * FHEVM Context
 */
const FHEVMContext = createContext<FHEVMContextValue | null>(null);

/**
 * FHEVM Provider Props
 */
interface FHEVMProviderProps {
  config: Omit<FHEVMConfig, 'provider'>;
  children: ReactNode;
}

/**
 * FHEVM Provider Component
 * Wraps your app to provide FHEVM functionality
 */
export function FHEVMProvider({ config, children }: FHEVMProviderProps) {
  const [client, setClient] = useState<FHEVMClient | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);

  useEffect(() => {
    initializeClient();
  }, []);

  async function initializeClient() {
    try {
      // Get provider from window.ethereum
      if (!window.ethereum) {
        throw new Error('MetaMask or Web3 provider not found');
      }

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Create client
      const fhevmClient = createFHEVMClient({
        ...config,
        provider,
      });

      // Initialize
      const result = await fhevmClient.init(signer);

      setClient(fhevmClient);
      setPublicKey(result.publicKey);
      setIsInitialized(true);
    } catch (error) {
      console.error('Failed to initialize FHEVM:', error);
    }
  }

  async function encrypt(value: number | boolean, type: string): Promise<EncryptedValue> {
    if (!client) {
      throw new Error('FHEVM client not initialized');
    }
    return client.encrypt(value, type as any);
  }

  async function decrypt(params: DecryptParams): Promise<string> {
    if (!client) {
      throw new Error('FHEVM client not initialized');
    }
    return client.userDecrypt(params);
  }

  async function reencrypt(params: DecryptParams): Promise<string> {
    if (!client) {
      throw new Error('FHEVM client not initialized');
    }
    return client.reencrypt(params);
  }

  const value: FHEVMContextValue = {
    instance: client?.getInstance() || null,
    isInitialized,
    publicKey,
    encrypt,
    decrypt,
    reencrypt,
  };

  return <FHEVMContext.Provider value={value}>{children}</FHEVMContext.Provider>;
}

/**
 * Hook to use FHEVM functionality
 */
export function useFHEVM(): FHEVMContextValue {
  const context = useContext(FHEVMContext);

  if (!context) {
    throw new Error('useFHEVM must be used within FHEVMProvider');
  }

  return context;
}

/**
 * Hook to encrypt values
 */
export function useEncrypt() {
  const { encrypt, isInitialized } = useFHEVM();

  return {
    encrypt,
    isReady: isInitialized,
  };
}

/**
 * Hook to decrypt values
 */
export function useDecrypt() {
  const { decrypt, reencrypt, isInitialized } = useFHEVM();

  return {
    decrypt,
    reencrypt,
    isReady: isInitialized,
  };
}

// Extend window type for TypeScript
declare global {
  interface Window {
    ethereum?: any;
  }
}
