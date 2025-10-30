import { useState } from 'react';
import { useFHEVM } from '@fhevm/sdk/react';
import { EncryptionType } from '@/lib/fhe/types';

export const useEncryption = () => {
  const { encrypt, isInitialized } = useFHEVM();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const encryptValue = async (value: number | boolean, type: EncryptionType) => {
    try {
      setLoading(true);
      setError(null);
      const result = await encrypt(value, type);
      return result;
    } catch (err: any) {
      setError(err.message || 'Encryption failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    encrypt: encryptValue,
    isReady: isInitialized,
    loading,
    error,
  };
};

export default useEncryption;
