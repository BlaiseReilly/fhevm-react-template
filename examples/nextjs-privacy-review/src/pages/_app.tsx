import type { AppProps } from 'next/app';
import { FHEVMProvider } from '@fhevm/sdk/react';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FHEVMProvider config={{ network: 'sepolia' }}>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-gray-900">
              🔐 Privacy Contract Review Platform
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Powered by Zama FHEVM Universal SDK
            </p>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <Component {...pageProps} />
        </main>
      </div>
    </FHEVMProvider>
  );
}
