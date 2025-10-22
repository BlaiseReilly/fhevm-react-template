# 🔐 FHEVM Universal SDK

**Framework-agnostic SDK for building confidential dApps with Zama FHEVM**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/npm/v/@fhevm/sdk.svg)](https://www.npmjs.com/package/@fhevm/sdk)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-blue.svg)](https://www.typescriptlang.org/)
[![Zama](https://img.shields.io/badge/Powered%20by-Zama-blue)](https://www.zama.ai/)

**Built for the Zama Bounty Program** | Universal SDK for Next.js, React, Vue, Node.js, and more

---

## 📺 Demo Video

**Download `demo.mp4` from repository** - Complete setup and integration walkthrough

**Note**: The demo video must be downloaded from the repository to view. Direct streaming links are not available.

---

## ✨ What is FHEVM Universal SDK?

A production-ready, framework-agnostic SDK that makes building confidential dApps with Zama FHEVM **simple, consistent, and developer-friendly**.

### The Problem

Building confidential dApps with FHEVM requires managing multiple dependencies, understanding complex encryption flows, and writing repetitive boilerplate code across different frameworks.

### The Solution

FHEVM Universal SDK provides a **wagmi-like** developer experience with:

- 🔌 **Universal**: Works with React, Next.js, Vue, Node.js, or any JavaScript environment
- 🎯 **10 Lines to Start**: Complete setup in <10 lines of code
- 🧮 **Complete FHE Flow**: Initialize → Encrypt → Decrypt → Reencrypt
- ⚡ **Zero Config**: Sensible defaults, works out of the box
- 🎨 **Wagmi-like API**: Familiar hooks, composable patterns
- 📦 **Single Package**: All dependencies wrapped in one SDK
- 🔒 **Type-Safe**: Full TypeScript support with IntelliSense
- 📚 **Well Documented**: Clear examples and API reference

---

## 🚀 Quick Start

### Installation

```bash
npm install @fhevm/sdk
# or
yarn add @fhevm/sdk
# or
pnpm add @fhevm/sdk
```

### Usage in <10 Lines

#### React / Next.js

```tsx
import { FHEVMProvider, useFHEVM } from '@fhevm/sdk/react';

// 1. Wrap your app (1 line)
<FHEVMProvider config={{ network: 'sepolia' }}>
  <YourApp />
</FHEVMProvider>

// 2. Use in components (2 lines)
function Component() {
  const { encrypt, decrypt } = useFHEVM();

  // 3. Encrypt (1 line)
  const encrypted = await encrypt(42, 'euint32');

  // 4. Decrypt (1 line)
  const decrypted = await decrypt({ contractAddress, ciphertext, userAddress });
}
```

#### Node.js / Vanilla JS

```javascript
import { createFHEVMClient } from '@fhevm/sdk';

// 1. Create client (3 lines)
const client = createFHEVMClient({
  provider,
  network: 'sepolia'
});

// 2. Initialize (1 line)
await client.init(signer);

// 3. Encrypt (1 line)
const encrypted = await client.encrypt(100, 'euint32');

// 4. Decrypt (1 line)
const decrypted = await client.userDecrypt({ contractAddress, ciphertext, userAddress });
```

**Total: 8 lines of code** ✅

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│              FHEVM Universal SDK Architecture               │
└─────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                     Application Layer                        │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │  Next.js   │  │   React    │  │    Vue     │  ← Your App│
│  └────────────┘  └────────────┘  └────────────┘            │
└──────────────────────────────────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────────┐
│                   Framework Adapters                         │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │ React Hooks│  │ Vue Plugin │  │Pure JS API │            │
│  │useFHEVM()  │  │ (Future)   │  │ Client     │            │
│  └────────────┘  └────────────┘  └────────────┘            │
└──────────────────────────────────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────────┐
│                 Core SDK (@fhevm/sdk)                        │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  • Initialize   • Encrypt    • Decrypt              │    │
│  │  • Reencrypt    • Type Safety • Error Handling      │    │
│  └─────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────────┐
│              Zama FHEVM Infrastructure                       │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │  fhevmjs   │  │  Gateway   │  │ ACL/KMS    │            │
│  └────────────┘  └────────────┘  └────────────┘            │
└──────────────────────────────────────────────────────────────┘
```

---

## 📦 Monorepo Structure

```
fhevm-react-template/
├── packages/
│   └── fhevm-sdk/                # 🎯 Core SDK Package
│       ├── src/
│       │   ├── core/
│       │   │   └── client.ts     # FHEVMClient implementation
│       │   ├── hooks/
│       │   │   └── useFHEVM.tsx  # React hooks
│       │   ├── types/
│       │   │   └── index.ts      # TypeScript definitions
│       │   ├── utils/
│       │   │   └── helpers.ts    # Utility functions
│       │   ├── index.ts          # Main export
│       │   └── react.ts          # React-specific exports
│       ├── package.json
│       ├── tsconfig.json
│       └── README.md
│
├── examples/
│   ├── nextjs-privacy-review/    # 📝 Privacy Contract Review dApp
│   │   ├── contracts/            # Smart contracts
│   │   ├── scripts/              # Deploy & interact scripts
│   │   ├── src/
│   │   │   ├── components/       # React components
│   │   │   ├── hooks/            # Custom hooks
│   │   │   ├── lib/              # Utilities
│   │   │   └── types/            # TypeScript types
│   │   ├── public/
│   │   ├── hardhat.config.js
│   │   ├── next.config.js
│   │   └── package.json
│   │
│   ├── nextjs-basic/             # 🎨 Minimal Next.js Example
│   │   ├── src/
│   │   ├── pages/
│   │   └── package.json
│   │
│   └── nodejs-cli/               # 💻 Node.js CLI Example
│       ├── src/
│       └── package.json
│
├── docs/                         # 📚 Documentation
│   ├── getting-started.md
│   ├── api-reference.md
│   ├── examples.md
│   └── migration-guide.md
│
├── demo.mp4                      # 📺 Demo Video
├── package.json                  # Root package (workspace)
├── README.md                     # This file
└── LICENSE
```

---

## 🎯 Core Features

### 1. Framework-Agnostic Core

Works anywhere JavaScript runs:

```javascript
// Node.js server
const client = createFHEVMClient({ provider, network: 'sepolia' });

// React app
const { encrypt } = useFHEVM();

// Vue app (coming soon)
const fhevm = useFHEVM();

// Vanilla JS
import { createFHEVMClient } from '@fhevm/sdk';
```

### 2. Complete Encryption Flow

#### Initialization

```typescript
import { createFHEVMClient } from '@fhevm/sdk';

const client = createFHEVMClient({
  provider: new BrowserProvider(window.ethereum),
  network: 'sepolia',
  gatewayUrl: 'https://gateway.sepolia.zama.ai', // Optional
});

// Initialize with EIP-712 signature
const { instance, publicKey, signature } = await client.init(signer);
```

#### Encryption

```typescript
// Encrypt different types
const encrypted8 = await client.encrypt(255, 'euint8');
const encrypted32 = await client.encrypt(1000000, 'euint32');
const encryptedBool = await client.encrypt(true, 'ebool');

// Use encrypted data in contracts
await contract.submitData(encrypted32.data);
```

#### Decryption

```typescript
// User decryption (client-side with EIP-712)
const decrypted = await client.userDecrypt({
  contractAddress: '0x...',
  ciphertext: '0x...',
  userAddress: '0x...',
});

// Public decryption (gateway)
const publicDecrypted = await client.publicDecrypt({
  contractAddress: '0x...',
  ciphertext: '0x...',
});
```

### 3. Wagmi-like React Hooks

```tsx
import { FHEVMProvider, useFHEVM, useEncrypt, useDecrypt } from '@fhevm/sdk/react';

// Provider
function App() {
  return (
    <FHEVMProvider config={{ network: 'sepolia' }}>
      <Dashboard />
    </FHEVMProvider>
  );
}

// Main hook
function Dashboard() {
  const { isInitialized, publicKey, encrypt, decrypt } = useFHEVM();

  if (!isInitialized) return <Loading />;
  return <YourApp />;
}

// Specialized hooks
function EncryptForm() {
  const { encrypt, isReady } = useEncrypt();
  // Use encryption only
}

function DecryptView() {
  const { decrypt, reencrypt, isReady } = useDecrypt();
  // Use decryption only
}
```

---

## 📝 Complete Examples

### Example 1: Privacy Contract Review (Full dApp)

Located in `examples/nextjs-privacy-review/`

**Features:**
- ✅ Smart contract deployment with Hardhat
- ✅ Full CRUD with encrypted data
- ✅ User roles (Submitter, Reviewer, Admin)
- ✅ EIP-712 signature for decryption
- ✅ Next.js frontend with SDK integration
- ✅ Deployed on Sepolia testnet

**Quick Start:**

```bash
cd examples/nextjs-privacy-review

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Add your PRIVATE_KEY and SEPOLIA_RPC_URL

# Compile contracts
npm run compile

# Deploy to Sepolia
npm run deploy:sepolia

# Start Next.js app
npm run dev
```

**Live Demo:**
- **Contract**: `0x5A042B49224ae2d67d5F216DC9A243F6603848F1`
- **Network**: Sepolia Testnet
- **Explorer**: [View on Etherscan](https://sepolia.etherscan.io/address/0x5A042B49224ae2d67d5F216DC9A243F6603848F1)

### Example 2: Minimal Next.js Setup

Located in `examples/nextjs-basic/`

Minimal example showing SDK integration in <10 lines:

```tsx
// pages/_app.tsx
import { FHEVMProvider } from '@fhevm/sdk/react';

export default function App({ Component, pageProps }) {
  return (
    <FHEVMProvider config={{ network: 'sepolia' }}>
      <Component {...pageProps} />
    </FHEVMProvider>
  );
}

// pages/index.tsx
import { useFHEVM } from '@fhevm/sdk/react';

export default function Home() {
  const { encrypt, decrypt, isInitialized } = useFHEVM();

  const handleEncrypt = async () => {
    const result = await encrypt(42, 'euint32');
    console.log('Encrypted:', result);
  };

  return (
    <div>
      <button onClick={handleEncrypt} disabled={!isInitialized}>
        Encrypt Value
      </button>
    </div>
  );
}
```

### Example 3: Node.js CLI

Located in `examples/nodejs-cli/`

Command-line tool for FHEVM operations:

```javascript
import { createFHEVMClient } from '@fhevm/sdk';
import { JsonRpcProvider, Wallet } from 'ethers';

const provider = new JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const wallet = new Wallet(process.env.PRIVATE_KEY, provider);

const client = createFHEVMClient({ provider, network: 'sepolia' });
await client.init(wallet);

// Encrypt
const encrypted = await client.encrypt(100, 'euint32');
console.log('Encrypted data:', encrypted.data);

// Decrypt
const decrypted = await client.userDecrypt({
  contractAddress: process.env.CONTRACT_ADDRESS,
  ciphertext: encrypted.data,
  userAddress: wallet.address,
});
console.log('Decrypted:', decrypted);
```

---

## 🎓 API Reference

### Core API

#### `createFHEVMClient(config)`

Creates FHEVM client instance.

**Config:**
```typescript
{
  provider: BrowserProvider | JsonRpcProvider;  // Ethers provider
  network: 'sepolia' | 'zama-devnet' | 'zama-testnet' | 'hardhat';
  gatewayUrl?: string;      // Optional gateway URL
  aclAddress?: string;      // Optional ACL contract address
}
```

#### `client.init(signer?)`

Initialize with public key and signature.

```typescript
const result = await client.init(signer);
// Returns: { instance, publicKey, signature }
```

#### `client.encrypt(value, type)`

Encrypt value to specified type.

```typescript
const encrypted = await client.encrypt(42, 'euint32');
// Returns: { data: Uint8Array, type: 'euint32' }
```

**Supported Types:**
- `euint8` (0-255)
- `euint16` (0-65,535)
- `euint32` (0-4,294,967,295)
- `euint64` (0-2^64-1)
- `euint128` (0-2^128-1)
- `ebool` (true/false)
- `eaddress` (Ethereum address)

#### `client.userDecrypt(params)`

Client-side decryption with EIP-712.

```typescript
const decrypted = await client.userDecrypt({
  contractAddress: '0x...',
  ciphertext: '0x...',
  userAddress: '0x...',
});
```

#### `client.publicDecrypt(params)`

Gateway-based decryption.

```typescript
const decrypted = await client.publicDecrypt({
  contractAddress: '0x...',
  ciphertext: '0x...',
});
```

### React Hooks

#### `useFHEVM()`

Main hook with full functionality.

```typescript
const {
  instance,        // FHEVM instance
  isInitialized,   // Ready state
  publicKey,       // User's public key
  encrypt,         // Encryption function
  decrypt,         // Decryption function
  reencrypt,       // Reencryption function
} = useFHEVM();
```

#### `useEncrypt()`

Simplified encryption hook.

```typescript
const { encrypt, isReady } = useEncrypt();
```

#### `useDecrypt()`

Simplified decryption hook.

```typescript
const { decrypt, reencrypt, isReady } = useDecrypt();
```

---

## 🌍 Network Support

| Network | ChainID | Gateway URL | Status |
|---------|---------|-------------|--------|
| Sepolia | 11155111 | `https://gateway.sepolia.zama.ai` | ✅ Supported |
| Zama Devnet | 8009 | `https://gateway.devnet.zama.ai` | ✅ Supported |
| Zama Testnet | 8010 | `https://gateway.testnet.zama.ai` | ✅ Supported |
| Hardhat | 31337 | `http://localhost:8545` | ✅ Supported |

---

## 📚 Documentation

Complete documentation is available in the `docs/` folder:

- **[Getting Started](./docs/getting-started.md)** - Installation and quick setup guide
- **[API Reference](./docs/api-reference.md)** - Complete API documentation with examples
- **[Examples](./docs/examples.md)** - Code examples and tutorials for all frameworks
- **[Migration Guide](./docs/migration-guide.md)** - Migrate from fhevm-react-template to Universal SDK

### Live Resources

- **GitHub Repository**: [https://github.com/BlaiseReilly/fhevm-react-template](https://github.com/BlaiseReilly/fhevm-react-template)
- **Demo Application**: [https://fhe-contract-review.vercel.app/](https://fhe-contract-review.vercel.app/)
- **Demo Video**: Download `demo.mp4` from repository (streaming not available)

---

## 🎯 Design Principles

### 1. Developer Experience First

- **Familiar Patterns**: Wagmi-like API that web3 developers already know
- **Zero Config**: Works out of the box with sensible defaults
- **Type Safety**: Full TypeScript support with IntelliSense
- **Clear Errors**: Helpful error messages with solutions

### 2. Universal & Modular

- **Framework Agnostic**: Core SDK works everywhere
- **Framework Adapters**: Optional adapters for React, Vue, etc.
- **Tree-shakeable**: Import only what you need
- **Extensible**: Easy to add custom functionality

### 3. Production Ready

- **Battle Tested**: Used in production dApps
- **Well Documented**: Comprehensive docs and examples
- **Type Safe**: Full TypeScript coverage
- **Tested**: Unit and integration tests

---

## 🔧 Development Setup

### Prerequisites

- Node.js ≥18.0.0
- npm ≥9.0.0

### Install Dependencies

```bash
# Install all packages (root + workspaces)
npm install

# Or use the convenience script
npm run install:all
```

### Build SDK

```bash
# Build SDK package
npm run build:sdk

# Build all examples
npm run build:all
```

### Run Examples

```bash
# Next.js Privacy Review
npm run dev:nextjs-privacy

# Next.js Basic
npm run dev:nextjs-basic

# Node.js CLI
npm run dev:nodejs
```

### Run Tests

```bash
npm test
```

---

## 📊 Comparison

### Before (Traditional FHEVM Setup)

```javascript
// ❌ Lots of boilerplate
import { createInstance } from 'fhevmjs';
import { ethers } from 'ethers';

// Manually configure everything
const instance = await createInstance({
  chainId: 11155111,
  publicKeyVerifier: '0x...',
  gatewayUrl: 'https://gateway.sepolia.zama.ai',
});

// Manual EIP-712 signature
const domain = { name: 'FHEVM', version: '1', chainId: 11155111 };
const types = { Reencryption: [{ name: 'publicKey', type: 'bytes' }] };
const message = { publicKey: instance.getPublicKey() };
const signature = await signer.signTypedData(domain, types, message);

// Manual encryption
const encrypted = instance.encrypt32(42);

// ~30+ lines of code
```

### After (FHEVM Universal SDK)

```javascript
// ✅ Simple & clean
import { createFHEVMClient } from '@fhevm/sdk';

const client = createFHEVMClient({ provider, network: 'sepolia' });
await client.init(signer);

const encrypted = await client.encrypt(42, 'euint32');
const decrypted = await client.userDecrypt(params);

// ~8 lines of code
```

**Result: 73% less code, 100% more clarity**

---

## 🏆 Bounty Requirements Checklist

### ✅ Core Requirements

- [x] **Universal SDK Package** - Works with any framework
- [x] **Initialize, Encrypt, Decrypt** - Complete FHEVM flow
- [x] **Wagmi-like API** - Familiar structure with hooks/adapters
- [x] **Clean & Reusable** - Modular, typed, documented
- [x] **Framework Agnostic Core** - Pure JS/TS core

### ✅ Technical Requirements

- [x] **Import into any dApp** - NPM package
- [x] **Initialization utilities** - `createFHEVMClient`, `init()`
- [x] **Encryption/Decryption** - `encrypt()`, `userDecrypt()`, `publicDecrypt()`
- [x] **EIP-712 signature** - Built-in support
- [x] **Modular API** - Hooks, adapters, utilities
- [x] **Type Safety** - Full TypeScript coverage

### ✅ Bonus Points

- [x] **Multiple environments** - Next.js, React, Node.js examples
- [x] **Clear documentation** - README, API docs, examples
- [x] **Quick setup** - <10 lines of code to start
- [x] **Monorepo structure** - Clean organization
- [x] **Production example** - Privacy Contract Review dApp

### ✅ Deliverables

- [x] **GitHub repo** - Monorepo with SDK + examples
- [x] **Next.js showcase** - Full dApp example
- [x] **Video demo** - Setup and design walkthrough
- [x] **README** - Complete documentation
- [x] **Deployment links** - Sepolia testnet deployment

---

## 🎬 Video Demo

**[Watch the complete demo video](./demo.mp4)**

The demo covers:
1. **Installation** - Setting up the SDK in a new project
2. **Basic Usage** - Encrypt/decrypt in <10 lines
3. **Next.js Integration** - Building a dApp with the SDK
4. **Privacy Contract Review** - Full example walkthrough
5. **Design Decisions** - Architecture and API design

---

## 🚢 Deployment

### Live Deployments

**Privacy Contract Review Platform:**
- **GitHub Repository**: [https://github.com/BlaiseReilly/fhevm-react-template](https://github.com/BlaiseReilly/fhevm-react-template)
- **Live Demo**: [https://fhe-contract-review.vercel.app/](https://fhe-contract-review.vercel.app/)
- **Contract Address**: `0x5A042B49224ae2d67d5F216DC9A243F6603848F1`
- **Network**: Sepolia Testnet (Chain ID: 11155111)
- **Etherscan**: [View Contract](https://sepolia.etherscan.io/address/0x5A042B49224ae2d67d5F216DC9A243F6603848F1)
- **Demo Video**: Download `demo.mp4` from repository (streaming not available)

### Deploy Your Own

```bash
cd examples/nextjs-privacy-review

# 1. Configure environment
cp .env.example .env
# Add PRIVATE_KEY, SEPOLIA_RPC_URL, ETHERSCAN_API_KEY

# 2. Deploy contract
npm run deploy:sepolia

# 3. Verify contract
npm run verify:sepolia

# 4. Deploy frontend to Vercel
vercel deploy
```

---

## 🤝 Contributing

Contributions welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Development Workflow

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm test`)
5. Commit changes (`git commit -m 'Add amazing feature'`)
6. Push to branch (`git push origin feature/amazing-feature`)
7. Open Pull Request

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

- **[Zama](https://www.zama.ai/)** - For FHEVM technology and bounty program
- **[fhevmjs](https://github.com/zama-ai/fhevmjs)** - Underlying FHEVM library
- **Community** - For feedback and contributions

---

## 📞 Support

- **Documentation**: [./docs](./docs)
- **GitHub Issues**: [Report bugs](https://github.com/zama-ai/fhevm-react-template/issues)
- **Discussions**: [Join discussions](https://github.com/zama-ai/fhevm-react-template/discussions)
- **Zama Discord**: [Community support](https://discord.gg/zama)

---

## 🗺️ Roadmap

### v1.0 (Current)

- ✅ Core SDK with encrypt/decrypt
- ✅ React hooks and provider
- ✅ Next.js example
- ✅ Node.js example
- ✅ TypeScript support
- ✅ Sepolia deployment

### v1.1 (Planned)

- ⏳ Vue.js adapter
- ⏳ Svelte adapter
- ⏳ Angular adapter
- ⏳ CLI tool for quick setup
- ⏳ Additional examples

### v2.0 (Future)

- 🔮 Contract interaction helpers
- 🔮 Transaction simulation
- 🔮 Gas optimization utilities
- 🔮 Multi-chain support
- 🔮 Advanced caching

---

## 🎯 Why FHEVM Universal SDK?

| Feature | Traditional Setup | FHEVM Universal SDK |
|---------|------------------|---------------------|
| **Lines of Code** | ~30+ | ~8 |
| **Dependencies** | 5+ packages | 1 package |
| **Setup Time** | ~1 hour | <5 minutes |
| **Framework Support** | Custom per framework | Universal |
| **Type Safety** | Partial | Full TypeScript |
| **Documentation** | Scattered | Comprehensive |
| **Examples** | Limited | Multiple frameworks |
| **Maintenance** | High | Low |

---

**Built with ❤️ for the Zama Bounty Program**

**Made possible by [Zama](https://www.zama.ai/) - Bringing privacy to blockchain**
