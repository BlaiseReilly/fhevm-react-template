import { useState } from 'react';
import { useFHEVM } from '@fhevm/sdk/react';

export const useComputation = () => {
  const { encrypt, isInitialized } = useFHEVM();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const compute = async (
    operation: 'add' | 'subtract' | 'multiply',
    value1: number,
    value2: number
  ) => {
    try {
      setLoading(true);
      setError(null);

      const encrypted1 = await encrypt(value1, 'euint32');
      const encrypted2 = await encrypt(value2, 'euint32');

      // In a real implementation, this would call a smart contract
      // For now, we simulate the computation
      let result;
      switch (operation) {
        case 'add':
          result = value1 + value2;
          break;
        case 'subtract':
          result = value1 - value2;
          break;
        case 'multiply':
          result = value1 * value2;
          break;
      }

      return {
        encrypted1,
        encrypted2,
        result,
        operation,
      };
    } catch (err: any) {
      setError(err.message || 'Computation failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    compute,
    isReady: isInitialized,
    loading,
    error,
  };
};

export default useComputation;
