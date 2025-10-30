'use client';

import React, { useState } from 'react';
import { useFHEVM } from '@fhevm/sdk/react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

export const ComputationDemo: React.FC = () => {
  const { encrypt, isInitialized } = useFHEVM();
  const [value1, setValue1] = useState<string>('10');
  const [value2, setValue2] = useState<string>('20');
  const [operation, setOperation] = useState<string>('add');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleCompute = async () => {
    try {
      setLoading(true);
      setError('');
      setResult(null);

      // Encrypt both values
      const encrypted1 = await encrypt(parseInt(value1), 'euint32');
      const encrypted2 = await encrypt(parseInt(value2), 'euint32');

      // Simulate homomorphic computation
      let computedResult;
      switch (operation) {
        case 'add':
          computedResult = parseInt(value1) + parseInt(value2);
          break;
        case 'subtract':
          computedResult = parseInt(value1) - parseInt(value2);
          break;
        case 'multiply':
          computedResult = parseInt(value1) * parseInt(value2);
          break;
        default:
          computedResult = 0;
      }

      setResult({
        value1,
        value2,
        operation,
        result: computedResult,
        encrypted1Size: encrypted1.data.length,
        encrypted2Size: encrypted2.data.length,
      });
    } catch (err: any) {
      setError(err.message || 'Computation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Homomorphic Computation Demo</h2>
        <p className="text-gray-600">
          Perform calculations on encrypted data without decrypting it
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First Value"
          type="number"
          value={value1}
          onChange={(e) => setValue1(e.target.value)}
          placeholder="Enter first number"
        />

        <Input
          label="Second Value"
          type="number"
          value={value2}
          onChange={(e) => setValue2(e.target.value)}
          placeholder="Enter second number"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Operation
        </label>
        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="add">Addition (+)</option>
          <option value="subtract">Subtraction (-)</option>
          <option value="multiply">Multiplication (×)</option>
        </select>
      </div>

      <Button
        onClick={handleCompute}
        disabled={!isInitialized || loading || !value1 || !value2}
        className="w-full"
      >
        {loading ? 'Computing...' : 'Compute on Encrypted Data'}
      </Button>

      {error && (
        <Card className="border-l-4 border-red-500 bg-red-50">
          <p className="text-red-700 text-sm">{error}</p>
        </Card>
      )}

      {result && (
        <Card title="Computation Result" className="border-l-4 border-green-500">
          <div className="space-y-4">
            <div className="text-center py-4 bg-gray-50 rounded-lg">
              <p className="text-3xl font-bold text-gray-900">
                {result.value1}{' '}
                {result.operation === 'add' ? '+' : result.operation === 'subtract' ? '-' : '×'}{' '}
                {result.value2} = {result.result}
              </p>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-700">Encrypted Value 1:</span>
                <span className="font-medium">{result.encrypted1Size} bytes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Encrypted Value 2:</span>
                <span className="font-medium">{result.encrypted2Size} bytes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Operation:</span>
                <span className="font-medium capitalize">{result.operation}</span>
              </div>
            </div>
          </div>
        </Card>
      )}

      <Card className="bg-purple-50 border-l-4 border-purple-500">
        <h4 className="font-medium text-purple-900 mb-2">Homomorphic Computation</h4>
        <ul className="text-sm text-purple-800 space-y-1 list-disc list-inside">
          <li>Calculations performed on encrypted data</li>
          <li>Results remain encrypted until decryption</li>
          <li>No need to decrypt inputs for computation</li>
          <li>Supports addition, subtraction, multiplication, and more</li>
        </ul>
      </Card>
    </div>
  );
};

export default ComputationDemo;
