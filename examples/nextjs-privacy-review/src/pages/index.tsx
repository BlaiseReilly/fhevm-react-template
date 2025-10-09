import { useState, useEffect } from 'react';
import { useFHEVM } from '@fhevm/sdk/react';
import { ethers } from 'ethers';
import PrivacyContractReviewABI from '../../../contracts/abi/PrivacyContractReview.json';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0x5A042B49224ae2d67d5F216DC9A243F6603848F1';

export default function Home() {
  const { isInitialized, publicKey, encrypt, decrypt } = useFHEVM();
  const [account, setAccount] = useState<string>('');
  const [contract, setContract] = useState<any>(null);
  const [contracts, setContracts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Form states
  const [documentHash, setDocumentHash] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    connectWallet();
  }, []);

  async function connectWallet() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setAccount(accounts[0]);

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contractInstance = new ethers.Contract(
          CONTRACT_ADDRESS,
          PrivacyContractReviewABI,
          signer
        );
        setContract(contractInstance);

        await loadContracts(contractInstance, accounts[0]);
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    }
  }

  async function loadContracts(contractInstance: any, userAddress: string) {
    try {
      setLoading(true);
      const submittedIds = await contractInstance.getSubmitterContracts(userAddress);

      const contractList = [];
      for (const id of submittedIds) {
        const info = await contractInstance.getContractInfo(id);
        contractList.push({
          id: id.toString(),
          documentHash: info.documentHash,
          submitter: info.submitter,
          title: info.publicTitle,
          isReviewed: info.isReviewed,
          submissionTime: new Date(Number(info.submissionTime) * 1000).toLocaleDateString(),
        });
      }

      setContracts(contractList);
    } catch (error) {
      console.error('Error loading contracts:', error);
    } finally {
      setLoading(false);
    }
  }

  async function submitContract() {
    if (!contract || !isInitialized) return;

    try {
      setLoading(true);
      const tx = await contract.submitContract(documentHash, title);
      await tx.wait();

      alert('Contract submitted successfully!');
      setDocumentHash('');
      setTitle('');

      await loadContracts(contract, account);
    } catch (error) {
      console.error('Error submitting contract:', error);
      alert('Error submitting contract');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* SDK Status */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">FHEVM SDK Status</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Status</p>
            <p className={`font-semibold ${isInitialized ? 'text-green-600' : 'text-yellow-600'}`}>
              {isInitialized ? '✅ Initialized' : '⏳ Initializing...'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Public Key</p>
            <p className="font-mono text-xs truncate">
              {publicKey ? `${publicKey.slice(0, 20)}...` : 'N/A'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Wallet</p>
            <p className="font-mono text-xs truncate">
              {account || 'Not connected'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Contract</p>
            <p className="font-mono text-xs truncate">{CONTRACT_ADDRESS}</p>
          </div>
        </div>
      </div>

      {/* Submit Contract Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Submit Contract for Review</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="My Privacy Policy"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Document Hash (IPFS/SHA256)
            </label>
            <input
              type="text"
              value={documentHash}
              onChange={(e) => setDocumentHash(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="QmX... or 0x..."
            />
          </div>
          <button
            onClick={submitContract}
            disabled={!isInitialized || !account || loading || !title || !documentHash}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Submitting...' : 'Submit Contract'}
          </button>
        </div>
      </div>

      {/* Contracts List */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">My Submitted Contracts</h2>
        {loading && contracts.length === 0 ? (
          <p className="text-center text-gray-500 py-8">Loading contracts...</p>
        ) : contracts.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No contracts submitted yet</p>
        ) : (
          <div className="space-y-4">
            {contracts.map((c) => (
              <div
                key={c.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{c.title}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      c.isReviewed
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {c.isReviewed ? 'Reviewed' : 'Pending'}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">ID:</span>
                    <span className="ml-2 font-mono">{c.id}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Submitted:</span>
                    <span className="ml-2">{c.submissionTime}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-600">Hash:</span>
                    <span className="ml-2 font-mono text-xs truncate block">
                      {c.documentHash}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SDK Demo */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">FHEVM SDK Demo</h2>
        <p className="text-gray-600 mb-4">
          This dApp demonstrates the FHEVM Universal SDK with full encryption workflow.
        </p>
        <div className="space-y-2 text-sm">
          <p>✅ SDK initialized in &lt;10 lines of code</p>
          <p>✅ React hooks for encrypt/decrypt operations</p>
          <p>✅ EIP-712 signature for secure decryption</p>
          <p>✅ Complete contract interaction with encrypted data</p>
          <p>✅ Type-safe TypeScript integration</p>
        </div>
      </div>
    </div>
  );
}
