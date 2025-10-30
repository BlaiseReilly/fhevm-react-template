'use client';

import React, { useState } from 'react';
import { useFHEVM } from '@fhevm/sdk/react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

export const EncryptionDemo: React.FC = () => {
  const { encrypt, isInitialized } = useFHEVM();
  const [value, setValue] = useState<string>('42');
  const [type, setType] = useState<string>('euint32');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleEncrypt = async () => {
    try {
      setLoading(true);
      setError('');
      setResult(null);

      const numValue = type === 'ebool' ? (value.toLowerCase() === 'true') : parseInt(value);
      const encrypted = await encrypt(numValue, type as any);

      setResult({
        original: value,
        type,
        encrypted: Array.from(encrypted.data).slice(0, 20).join(', ') + '...',
        size: encrypted.data.length,
      });
    } catch (err: any) {
      setError(err.message || 'Encryption failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Encryption Demo</h2>
        <p className="text-gray-600">
          Encrypt values using fully homomorphic encryption (FHE)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Value to Encrypt"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter a number"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Encryption Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="euint8">euint8 (0-255)</option>
            <option value="euint16">euint16 (0-65,535)</option>
            <option value="euint32">euint32 (0-4B)</option>
            <option value="euint64">euint64 (0-2^64)</option>
            <option value="ebool">ebool (true/false)</option>
          </select>
        </div>
      </div>

      <Button
        onClick={handleEncrypt}
        disabled={!isInitialized || loading || !value}
        className="w-full"
      >
        {loading ? 'Encrypting...' : 'Encrypt Value'}
      </Button>

      {error && (
        <Card className="border-l-4 border-red-500 bg-red-50">
          <p className="text-red-700 text-sm">{error}</p>
        </Card>
      )}

      {result && (
        <Card title="Encryption Result" className="border-l-4 border-green-500">
          <div className="space-y-3 text-sm">
            <div>
              <span className="font-medium text-gray-700">Original Value:</span>
              <p className="text-gray-900 mt-1">{result.original}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Type:</span>
              <p className="text-gray-900 mt-1">{result.type}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Encrypted Data (preview):</span>
              <p className="text-gray-900 mt-1 font-mono text-xs break-all">
                {result.encrypted}
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Size:</span>
              <p className="text-gray-900 mt-1">{result.size} bytes</p>
            </div>
          </div>
        </Card>
      )}

      <Card className="bg-blue-50 border-l-4 border-blue-500">
        <h4 className="font-medium text-blue-900 mb-2">How it works</h4>
        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
          <li>Values are encrypted client-side using FHE</li>
          <li>Encrypted data can be computed on without decryption</li>
          <li>Only authorized parties can decrypt the results</li>
          <li>Supports multiple data types (integers, booleans, addresses)</li>
        </ul>
      </Card>
    </div>
  );
};

export default EncryptionDemo;
