# Examples and Tutorials

Practical examples and tutorials for FHEVM Universal SDK.

---

## Table of Contents

1. [Basic Encryption/Decryption](#basic-encryptiondecryption)
2. [React Integration](#react-integration)
3. [Next.js Application](#nextjs-application)
4. [Node.js CLI Tool](#nodejs-cli-tool)
5. [Contract Interaction](#contract-interaction)
6. [Complete dApp Example](#complete-dapp-example)

---

## Basic Encryption/Decryption

### Simple Encryption

```typescript
import { createFHEVMClient } from '@fhevm/sdk';
import { BrowserProvider } from 'ethers';

// Setup
const provider = new BrowserProvider(window.ethereum);
const client = createFHEVMClient({ provider, network: 'sepolia' });

// Initialize
const signer = await provider.getSigner();
await client.init(signer);

// Encrypt a value
const encrypted = await client.encrypt(42, 'euint32');
console.log('Encrypted data:', encrypted.data);
console.log('Type:', encrypted.type); // 'euint32'
```

### Decrypt Encrypted Data

```typescript
// Decrypt (requires authorization)
const decrypted = await client.userDecrypt({
  contractAddress: '0x5A042B49224ae2d67d5F216DC9A243F6603848F1',
  ciphertext: '0x...',
  userAddress: await signer.getAddress()
});

console.log('Decrypted value:', decrypted);
```

---

## React Integration

### Basic Setup

```tsx
// App.tsx
import { FHEVMProvider } from '@fhevm/sdk/react';
import Dashboard from './Dashboard';

export default function App() {
  return (
    <FHEVMProvider config={{ network: 'sepolia' }}>
      <Dashboard />
    </FHEVMProvider>
  );
}
```

### Using the Hook

```tsx
// Dashboard.tsx
import { useFHEVM } from '@fhevm/sdk/react';
import { useState } from 'react';

export default function Dashboard() {
  const { isInitialized, encrypt, decrypt, publicKey } = useFHEVM();
  const [value, setValue] = useState(0);
  const [encrypted, setEncrypted] = useState<Uint8Array | null>(null);

  const handleEncrypt = async () => {
    const result = await encrypt(value, 'euint32');
    setEncrypted(result.data);
    console.log('Encrypted!');
  };

  if (!isInitialized) {
    return <div>Initializing FHEVM SDK...</div>;
  }

  return (
    <div>
      <h1>FHEVM Encryption Demo</h1>
      <p>Public Key: {publicKey?.slice(0, 20)}...</p>

      <input
        type="number"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />

      <button onClick={handleEncrypt}>
        Encrypt Value
      </button>

      {encrypted && (
        <p>Encrypted: {encrypted.length} bytes</p>
      )}
    </div>
  );
}
```

### Specialized Hooks

```tsx
// EncryptForm.tsx
import { useEncrypt } from '@fhevm/sdk/react';

export function EncryptForm() {
  const { encrypt, isReady } = useEncrypt();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isReady) return;

    const formData = new FormData(e.target as HTMLFormElement);
    const value = Number(formData.get('value'));

    const encrypted = await encrypt(value, 'euint32');
    console.log('Encrypted:', encrypted);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="value" type="number" required />
      <button disabled={!isReady}>Encrypt</button>
    </form>
  );
}
```

```tsx
// DecryptView.tsx
import { useDecrypt } from '@fhevm/sdk/react';
import { useState } from 'react';

export function DecryptView({ ciphertext, contractAddress, userAddress }) {
  const { decrypt, isReady } = useDecrypt();
  const [result, setResult] = useState<string>('');

  const handleDecrypt = async () => {
    if (!isReady) return;

    const decrypted = await decrypt({
      contractAddress,
      ciphertext,
      userAddress
    });

    setResult(decrypted);
  };

  return (
    <div>
      <button onClick={handleDecrypt} disabled={!isReady}>
        Decrypt
      </button>
      {result && <p>Value: {result}</p>}
    </div>
  );
}
```

---

## Next.js Application

### Complete Setup

```tsx
// pages/_app.tsx
import type { AppProps } from 'next/app';
import { FHEVMProvider } from '@fhevm/sdk/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FHEVMProvider config={{ network: 'sepolia' }}>
      <Component {...pageProps} />
    </FHEVMProvider>
  );
}
```

```tsx
// pages/index.tsx
import { useFHEVM } from '@fhevm/sdk/react';
import { useState } from 'react';
import { ethers } from 'ethers';

export default function Home() {
  const { isInitialized, encrypt, decrypt } = useFHEVM();
  const [contract, setContract] = useState<any>(null);

  // Connect to contract
  const connectContract = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contractInstance = new ethers.Contract(
      '0x5A042B49224ae2d67d5F216DC9A243F6603848F1',
      ABI,
      signer
    );

    setContract(contractInstance);
  };

  // Submit encrypted value
  const submitValue = async (value: number) => {
    if (!isInitialized || !contract) return;

    // Encrypt value
    const encrypted = await encrypt(value, 'euint32');

    // Submit to contract
    const tx = await contract.submitValue(encrypted.data);
    await tx.wait();

    console.log('Value submitted!');
  };

  return (
    <div>
      <h1>FHE Contract Interaction</h1>
      <button onClick={connectContract}>Connect Contract</button>
      <button onClick={() => submitValue(100)}>Submit Value</button>
    </div>
  );
}
```

---

## Node.js CLI Tool

```typescript
// cli.ts
import { createFHEVMClient } from '@fhevm/sdk';
import { JsonRpcProvider, Wallet } from 'ethers';

async function main() {
  // Setup
  const provider = new JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
  const wallet = new Wallet(process.env.PRIVATE_KEY!, provider);

  // Create client
  const client = createFHEVMClient({
    provider,
    network: 'sepolia'
  });

  // Initialize
  console.log('Initializing FHEVM...');
  await client.init(wallet);
  console.log('Public Key:', client.getPublicKey());

  // Encrypt
  console.log('Encrypting value...');
  const encrypted = await client.encrypt(42, 'euint32');
  console.log('Encrypted:', encrypted.data);

  // Decrypt
  console.log('Decrypting value...');
  const decrypted = await client.userDecrypt({
    contractAddress: process.env.CONTRACT_ADDRESS!,
    ciphertext: encrypted.data.toString(),
    userAddress: wallet.address
  });
  console.log('Decrypted:', decrypted);
}

main().catch(console.error);
```

**Run:**

```bash
node cli.ts
```

---

## Contract Interaction

### Submit Encrypted Data

```typescript
import { createFHEVMClient } from '@fhevm/sdk';
import { ethers } from 'ethers';

// Setup
const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();

const client = createFHEVMClient({ provider, network: 'sepolia' });
await client.init(signer);

// Contract setup
const contract = new ethers.Contract(ADDRESS, ABI, signer);

// Encrypt and submit
const value = 85;
const encrypted = await client.encrypt(value, 'euint8');

const tx = await contract.submitData(encrypted.data);
await tx.wait();

console.log('Data submitted!');
```

### Request Decryption

```typescript
// Request decryption from contract
const contractId = 1;
const tx = await contract.requestScoreDecryption(contractId);
await tx.wait();

// Listen for decryption result
contract.on('ScoreDecrypted', (contractId, score) => {
  console.log('Decrypted score:', score);
});
```

---

## Complete dApp Example

### Privacy Contract Review Platform

**Repository**: [https://github.com/BlaiseReilly/fhevm-react-template](https://github.com/BlaiseReilly/fhevm-react-template)

**Live Demo**: [https://fhe-contract-review.vercel.app/](https://fhe-contract-review.vercel.app/)

**Location**: `examples/nextjs-privacy-review/`

This is a full production dApp demonstrating:

1. **Contract Submission**

```typescript
// Submit contract for review
async function submitContract(hash: string, title: string) {
  const tx = await contract.submitContract(hash, title);
  await tx.wait();
  console.log('Contract submitted!');
}
```

2. **Encrypted Review**

```typescript
// Review clause with encrypted ratings
async function reviewClause(
  contractId: number,
  clauseType: string,
  compliance: number,
  sensitivity: number
) {
  const tx = await contract.reviewClause(
    contractId,
    clauseType,
    compliance,  // 0-10, stored encrypted
    sensitivity, // 1-5, stored encrypted
    'Review notes'
  );
  await tx.wait();
}
```

3. **Privacy Analysis**

```typescript
// Complete analysis with encrypted scores
async function completeAnalysis(contractId: number) {
  const tx = await contract.completePrivacyAnalysis(
    contractId,
    85, // data sensitivity (encrypted)
    9,  // GDPR compliance (encrypted)
    8,  // CCPA compliance (encrypted)
    2,  // retention risk (encrypted)
    3   // sharing risk (encrypted)
  );
  await tx.wait();
}
```

4. **Authorized Decryption**

```typescript
// Request score decryption (requires EIP-712 signature)
async function requestDecryption(contractId: number) {
  const { encrypt, decrypt } = useFHEVM();

  // Request decryption
  const tx = await contract.requestScoreDecryption(contractId);
  await tx.wait();

  // Decrypt result
  const score = await decrypt({
    contractAddress: CONTRACT_ADDRESS,
    ciphertext: encryptedScore,
    userAddress: userAddress
  });

  console.log('Score:', score);
}
```

### Running the Example

```bash
cd examples/nextjs-privacy-review

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your credentials

# Run development server
npm run dev
```

Visit the application and follow the workflow:
1. Connect MetaMask (Sepolia network)
2. Submit a contract for review
3. Authorize reviewers (owner only)
4. Review clauses with encrypted ratings
5. Complete privacy analysis
6. Request decryption to view results

---

## Additional Examples

### Batch Encryption

```typescript
async function encryptMultiple(values: number[]) {
  const encrypted = await Promise.all(
    values.map(v => client.encrypt(v, 'euint32'))
  );

  return encrypted.map(e => e.data);
}

// Usage
const encryptedValues = await encryptMultiple([10, 20, 30, 40]);
```

### Type Conversion

```typescript
// Encrypt different types
const uint8 = await client.encrypt(255, 'euint8');
const uint32 = await client.encrypt(1000000, 'euint32');
const bool = await client.encrypt(true, 'ebool');

// Use in contract
await contract.submitRating(uint8.data);
await contract.submitScore(uint32.data);
await contract.submitFlag(bool.data);
```

### Error Handling

```typescript
async function safeEncrypt(value: number) {
  try {
    const encrypted = await client.encrypt(value, 'euint32');
    return { success: true, data: encrypted.data };
  } catch (error) {
    console.error('Encryption failed:', error);
    return { success: false, error: error.message };
  }
}
```

---

## Demo Video

**Download `demo.mp4` from the repository** to see complete examples in action.

**Note**: The demo video must be downloaded from [GitHub repository](https://github.com/BlaiseReilly/fhevm-react-template). Streaming links are not available.

The video demonstrates:
- SDK installation and setup
- React integration
- Contract interaction
- Complete workflow with the Privacy Review dApp

---

## Learn More

- **[Getting Started](./getting-started.md)** - Quick start guide
- **[API Reference](./api-reference.md)** - Complete API docs
- **[Migration Guide](./migration-guide.md)** - Migrate existing apps
- **[Main README](../README.md)** - Project overview

---

## Support

Need help? Check these resources:

- **GitHub Issues**: [Report bugs](https://github.com/BlaiseReilly/fhevm-react-template/issues)
- **Discussions**: [Ask questions](https://github.com/BlaiseReilly/fhevm-react-template/discussions)
- **Zama Docs**: [https://docs.zama.ai/fhevm](https://docs.zama.ai/fhevm)
- **Live Demo**: [https://fhe-contract-review.vercel.app/](https://fhe-contract-review.vercel.app/)
