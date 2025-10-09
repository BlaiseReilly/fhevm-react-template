# @fhevm/sdk

**Universal FHEVM SDK** - Framework-agnostic library for building confidential dApps with Zama FHEVM.

## Features

- 🔐 **Universal**: Works with React, Next.js, Vue, Node.js, or any JavaScript environment
- 🧮 **Complete FHE Flow**: Initialize, encrypt, decrypt, and reencrypt
- 🎯 **Wagmi-like API**: Familiar developer experience with hooks and modular structure
- ⚡ **TypeScript First**: Full type safety and IntelliSense support
- 🔌 **Framework Adapters**: Built-in React hooks, extensible to other frameworks
- 📦 **Zero Config**: Works out of the box with sensible defaults

## Installation

```bash
npm install @fhevm/sdk
# or
yarn add @fhevm/sdk
# or
pnpm add @fhevm/sdk
```

## Quick Start

### Vanilla JavaScript / Node.js

```javascript
import { createFHEVMClient } from '@fhevm/sdk';
import { JsonRpcProvider } from 'ethers';

// Create provider
const provider = new JsonRpcProvider('https://rpc.sepolia.org');

// Create FHEVM client
const client = createFHEVMClient({
  provider,
  network: 'sepolia',
});

// Initialize
await client.init();

// Encrypt values
const encrypted = await client.encrypt(42, 'euint32');
console.log('Encrypted:', encrypted.data);

// Decrypt values
const decrypted = await client.userDecrypt({
  contractAddress: '0x...',
  ciphertext: '0x...',
  userAddress: '0x...',
});
console.log('Decrypted:', decrypted);
```

### React / Next.js

```tsx
import { FHEVMProvider, useFHEVM, useEncrypt } from '@fhevm/sdk/react';

// 1. Wrap your app with FHEVMProvider
function App() {
  return (
    <FHEVMProvider config={{ network: 'sepolia' }}>
      <YourApp />
    </FHEVMProvider>
  );
}

// 2. Use FHEVM hooks in your components
function YourComponent() {
  const { isInitialized, encrypt, decrypt } = useFHEVM();

  const handleEncrypt = async () => {
    const result = await encrypt(100, 'euint32');
    console.log('Encrypted:', result);
  };

  return (
    <div>
      {isInitialized ? (
        <button onClick={handleEncrypt}>Encrypt Value</button>
      ) : (
        <p>Initializing FHEVM...</p>
      )}
    </div>
  );
}
```

## API Reference

### Core API

#### `createFHEVMClient(config)`

Creates a new FHEVM client instance.

**Parameters:**
- `config.provider` - Ethers provider (BrowserProvider or JsonRpcProvider)
- `config.network` - Network name ('sepolia' | 'zama-devnet' | 'zama-testnet' | 'hardhat')
- `config.gatewayUrl?` - Optional custom gateway URL
- `config.aclAddress?` - Optional ACL contract address

**Returns:** `FHEVMClient`

#### `client.init(signer?)`

Initialize the FHEVM instance with public key and signature.

**Parameters:**
- `signer?` - Optional ethers Signer for EIP-712 signature

**Returns:** `Promise<FHEVMInstance>`

#### `client.encrypt(value, type)`

Encrypt a value to specified encrypted type.

**Parameters:**
- `value` - Number or boolean to encrypt
- `type` - Encryption type ('euint8' | 'euint16' | 'euint32' | 'euint64' | 'euint128' | 'ebool' | 'eaddress')

**Returns:** `Promise<EncryptedValue>`

#### `client.userDecrypt(params)`

Decrypt using user's private key (client-side decryption).

**Parameters:**
- `params.contractAddress` - Contract address
- `params.ciphertext` - Encrypted data
- `params.userAddress` - User's address

**Returns:** `Promise<string>`

#### `client.publicDecrypt(params)`

Decrypt using gateway (server-side decryption).

**Parameters:** Same as `userDecrypt`

**Returns:** `Promise<string>`

### React Hooks

#### `useFHEVM()`

Main hook to access FHEVM functionality.

**Returns:**
```typescript
{
  instance: any | null;
  isInitialized: boolean;
  publicKey: string | null;
  encrypt: (value, type) => Promise<EncryptedValue>;
  decrypt: (params) => Promise<string>;
  reencrypt: (params) => Promise<string>;
}
```

#### `useEncrypt()`

Simplified hook for encryption only.

**Returns:**
```typescript
{
  encrypt: (value, type) => Promise<EncryptedValue>;
  isReady: boolean;
}
```

#### `useDecrypt()`

Simplified hook for decryption only.

**Returns:**
```typescript
{
  decrypt: (params) => Promise<string>;
  reencrypt: (params) => Promise<string>;
  isReady: boolean;
}
```

## Encryption Types

| Type | Description | Range |
|------|-------------|-------|
| `euint8` | Encrypted 8-bit unsigned integer | 0 to 255 |
| `euint16` | Encrypted 16-bit unsigned integer | 0 to 65,535 |
| `euint32` | Encrypted 32-bit unsigned integer | 0 to 4,294,967,295 |
| `euint64` | Encrypted 64-bit unsigned integer | 0 to 2^64 - 1 |
| `euint128` | Encrypted 128-bit unsigned integer | 0 to 2^128 - 1 |
| `ebool` | Encrypted boolean | true or false |
| `eaddress` | Encrypted address | Ethereum address |

## Examples

See the `examples/` directory for complete examples:

- **Next.js Privacy Review** - Full dApp with contract interaction
- **Next.js Basic** - Minimal setup example
- **Node.js CLI** - Command-line tool example

## Network Configuration

Supported networks:

- **Sepolia** - Ethereum testnet
- **Zama Devnet** - Zama development network
- **Zama Testnet** - Zama test network
- **Hardhat** - Local development

## TypeScript Support

The SDK is written in TypeScript and provides full type definitions.

```typescript
import type { FHEVMConfig, EncryptedValue, DecryptParams } from '@fhevm/sdk';
```

## License

MIT
