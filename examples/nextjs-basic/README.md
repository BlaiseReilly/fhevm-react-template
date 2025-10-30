# Next.js Basic Example with FHEVM SDK

This is a basic Next.js example demonstrating how to integrate the FHEVM Universal SDK for building confidential dApps.

## Features

- Complete FHEVM SDK integration
- Encryption and decryption demos
- Type-safe API routes for FHE operations
- Reusable React components
- Modern Next.js 14 App Router

## Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global styles
│   └── api/               # API routes
│       ├── fhe/           # FHE operations
│       └── keys/          # Key management
├── components/            # React components
│   ├── ui/               # Basic UI components
│   ├── fhe/              # FHE-specific components
│   └── examples/         # Example use cases
├── lib/                   # Utility libraries
│   ├── fhe/              # FHE integration
│   └── utils/            # Helper functions
├── hooks/                 # Custom React hooks
└── types/                 # TypeScript definitions
```

## Usage

### Basic Encryption

```tsx
import { useFHEVM } from '@fhevm/sdk/react';

function MyComponent() {
  const { encrypt, isInitialized } = useFHEVM();

  const handleEncrypt = async () => {
    const encrypted = await encrypt(42, 'euint32');
    console.log('Encrypted:', encrypted);
  };

  return (
    <button onClick={handleEncrypt} disabled={!isInitialized}>
      Encrypt Value
    </button>
  );
}
```

### Basic Decryption

```tsx
import { useFHEVM } from '@fhevm/sdk/react';

function MyComponent() {
  const { decrypt, isInitialized } = useFHEVM();

  const handleDecrypt = async (ciphertext: string) => {
    const decrypted = await decrypt({
      contractAddress: '0x...',
      ciphertext,
      userAddress: '0x...',
    });
    console.log('Decrypted:', decrypted);
  };

  return <button onClick={() => handleDecrypt('0x...')}>Decrypt</button>;
}
```

## Learn More

- [FHEVM SDK Documentation](../../packages/fhevm-sdk/README.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [Zama FHEVM](https://docs.zama.ai/fhevm)
