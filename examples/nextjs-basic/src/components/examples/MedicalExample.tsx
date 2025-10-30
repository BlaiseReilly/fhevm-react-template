'use client';

import React, { useState } from 'react';
import { useFHEVM } from '@fhevm/sdk/react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

export const MedicalExample: React.FC = () => {
  const { encrypt, isInitialized } = useFHEVM();
  const [patientData, setPatientData] = useState({
    age: '35',
    heartRate: '72',
    bloodPressure: '120',
  });
  const [encrypted, setEncrypted] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleEncryptMedicalData = async () => {
    try {
      setLoading(true);
      const encryptedAge = await encrypt(parseInt(patientData.age), 'euint8');
      const encryptedHR = await encrypt(parseInt(patientData.heartRate), 'euint8');
      const encryptedBP = await encrypt(parseInt(patientData.bloodPressure), 'euint8');

      setEncrypted({
        age: encryptedAge.data.length,
        heartRate: encryptedHR.data.length,
        bloodPressure: encryptedBP.data.length,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Encryption failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Private Medical Records Example">
      <div className="space-y-4">
        <Input
          label="Age"
          type="number"
          value={patientData.age}
          onChange={(e) => setPatientData({ ...patientData, age: e.target.value })}
        />
        <Input
          label="Heart Rate (bpm)"
          type="number"
          value={patientData.heartRate}
          onChange={(e) => setPatientData({ ...patientData, heartRate: e.target.value })}
        />
        <Input
          label="Blood Pressure (systolic)"
          type="number"
          value={patientData.bloodPressure}
          onChange={(e) => setPatientData({ ...patientData, bloodPressure: e.target.value })}
        />

        <Button
          onClick={handleEncryptMedicalData}
          disabled={!isInitialized || loading}
          className="w-full"
        >
          {loading ? 'Encrypting...' : 'Encrypt Medical Data'}
        </Button>

        {encrypted && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm font-medium text-blue-900 mb-2">
              Medical data encrypted successfully
            </p>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>Age: {encrypted.age} bytes</li>
              <li>Heart Rate: {encrypted.heartRate} bytes</li>
              <li>Blood Pressure: {encrypted.bloodPressure} bytes</li>
            </ul>
          </div>
        )}
      </div>
    </Card>
  );
};

export default MedicalExample;
