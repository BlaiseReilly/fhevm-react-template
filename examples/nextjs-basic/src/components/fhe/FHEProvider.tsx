'use client';

import React from 'react';
import { FHEVMProvider as SDKProvider } from '@fhevm/sdk/react';

interface FHEProviderProps {
  children: React.ReactNode;
}

export const FHEProvider: React.FC<FHEProviderProps> = ({ children }) => {
  return (
    <SDKProvider config={{ network: 'sepolia' }}>
      {children}
    </SDKProvider>
  );
};

export default FHEProvider;
