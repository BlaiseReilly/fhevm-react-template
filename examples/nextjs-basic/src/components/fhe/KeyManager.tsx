'use client';

import React, { useState } from 'react';
import { useFHEVM } from '@fhevm/sdk/react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export const KeyManager: React.FC = () => {
  const { publicKey, isInitialized } = useFHEVM();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const truncateKey = (key: string) => {
    if (!key) return '';
    return `${key.slice(0, 20)}...${key.slice(-20)}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Key Management</h2>
        <p className="text-gray-600">
          View and manage your FHE encryption keys
        </p>
      </div>

      <Card title="Public Key" className="border-l-4 border-indigo-500">
        {isInitialized && publicKey ? (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-xs font-mono text-gray-700 break-all">
                {publicKey}
              </p>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleCopy} size="sm" variant="outline">
                {copied ? 'Copied!' : 'Copy Key'}
              </Button>
            </div>

            <div className="text-sm text-gray-600">
              <p><strong>Length:</strong> {publicKey.length} characters</p>
              <p><strong>Format:</strong> Base64 encoded</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-600">No public key available</p>
        )}
      </Card>

      <Card className="bg-green-50 border-l-4 border-green-500">
        <h4 className="font-medium text-green-900 mb-2">Key Information</h4>
        <ul className="text-sm text-green-800 space-y-1 list-disc list-inside">
          <li>Public key is used for encrypting data</li>
          <li>Private key never leaves your device</li>
          <li>Keys are generated per session</li>
          <li>EIP-712 signatures provide additional security</li>
        </ul>
      </Card>

      <Card title="Network Information">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-700">Network:</span>
            <span className="font-medium">Sepolia Testnet</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Chain ID:</span>
            <span className="font-medium">11155111</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Status:</span>
            <span className={`font-medium ${isInitialized ? 'text-green-600' : 'text-yellow-600'}`}>
              {isInitialized ? 'Connected' : 'Connecting...'}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default KeyManager;
