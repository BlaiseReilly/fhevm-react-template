'use client';

import React, { useState } from 'react';
import { useFHEVM } from '@fhevm/sdk/react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

export const BankingExample: React.FC = () => {
  const { encrypt, isInitialized } = useFHEVM();
  const [balance, setBalance] = useState<string>('1000');
  const [amount, setAmount] = useState<string>('100');
  const [transaction, setTransaction] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleTransaction = async (type: 'deposit' | 'withdraw') => {
    try {
      setLoading(true);
      const encryptedAmount = await encrypt(parseInt(amount), 'euint32');
      const encryptedBalance = await encrypt(parseInt(balance), 'euint32');

      setTransaction({
        type,
        amount,
        balance,
        timestamp: new Date().toISOString(),
        encrypted: true,
      });
    } catch (error) {
      console.error('Transaction failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Private Banking Example">
      <div className="space-y-4">
        <Input
          label="Current Balance"
          type="number"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
        />
        <Input
          label="Transaction Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <div className="flex gap-2">
          <Button
            onClick={() => handleTransaction('deposit')}
            disabled={!isInitialized || loading}
            className="flex-1"
          >
            Deposit
          </Button>
          <Button
            onClick={() => handleTransaction('withdraw')}
            disabled={!isInitialized || loading}
            variant="secondary"
            className="flex-1"
          >
            Withdraw
          </Button>
        </div>

        {transaction && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <p className="text-sm font-medium text-green-900">
              Transaction {transaction.type}: ${transaction.amount} (Encrypted)
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default BankingExample;
