'use client';

import { useState } from 'react';
import { useFHEVM } from '@fhevm/sdk/react';
import EncryptionDemo from '@/components/fhe/EncryptionDemo';
import ComputationDemo from '@/components/fhe/ComputationDemo';
import KeyManager from '@/components/fhe/KeyManager';

export default function Home() {
  const { isInitialized, publicKey } = useFHEVM();
  const [activeTab, setActiveTab] = useState<'encrypt' | 'compute' | 'keys'>('encrypt');

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            FHEVM SDK Example
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Build confidential dApps with fully homomorphic encryption
          </p>

          {/* Status Indicator */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
            <div className={`w-3 h-3 rounded-full ${isInitialized ? 'bg-green-500' : 'bg-yellow-500'}`} />
            <span className="text-sm font-medium text-gray-700">
              {isInitialized ? 'SDK Initialized' : 'Initializing...'}
            </span>
          </div>
        </header>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 bg-white p-2 rounded-lg shadow-sm">
          <button
            onClick={() => setActiveTab('encrypt')}
            className={`flex-1 py-3 px-6 rounded-md font-medium transition-all ${
              activeTab === 'encrypt'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Encryption Demo
          </button>
          <button
            onClick={() => setActiveTab('compute')}
            className={`flex-1 py-3 px-6 rounded-md font-medium transition-all ${
              activeTab === 'compute'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Computation Demo
          </button>
          <button
            onClick={() => setActiveTab('keys')}
            className={`flex-1 py-3 px-6 rounded-md font-medium transition-all ${
              activeTab === 'keys'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Key Manager
          </button>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {!isInitialized ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4" />
              <p className="text-gray-600">Initializing FHEVM SDK...</p>
            </div>
          ) : (
            <>
              {activeTab === 'encrypt' && <EncryptionDemo />}
              {activeTab === 'compute' && <ComputationDemo />}
              {activeTab === 'keys' && <KeyManager />}
            </>
          )}
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 text-gray-600">
          <p className="text-sm">
            Powered by{' '}
            <a
              href="https://www.zama.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline font-medium"
            >
              Zama FHEVM
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
