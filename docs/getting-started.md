# Getting Started with FHEVM Universal SDK

Quick start guide for the FHEVM Universal SDK.

---

## Installation

```bash
npm install @fhevm/sdk
```

---

## Quick Example

### React / Next.js

```tsx
import { FHEVMProvider, useFHEVM } from '@fhevm/sdk/react';

// 1. Wrap your app
<FHEVMProvider config={{ network: 'sepolia' }}>
  <YourApp />
</FHEVMProvider>

// 2. Use in components
function Component() {
  const { encrypt, decrypt, isInitialized } = useFHEVM();

  const handleEncrypt = async () => {
    const encrypted = await encrypt(42, 'euint32');
    console.log('Encrypted:', encrypted);
  };

  return <button onClick={handleEncrypt}>Encrypt</button>;
}
```

### Node.js

```javascript
import { createFHEVMClient } from '@fhevm/sdk';
import { JsonRpcProvider } from 'ethers';

const provider = new JsonRpcProvider('https://rpc.sepolia.org');
const client = createFHEVMClient({ provider, network: 'sepolia' });

await client.init();
const encrypted = await client.encrypt(42, 'euint32');
const decrypted = await client.userDecrypt({
  contractAddress: '0x...',
  ciphertext: encrypted.data,
  userAddress: '0x...'
});
```

---

## Examples

See the `examples/` directory for complete examples:

- **nextjs-privacy-review** - Full production dApp
- **nextjs-basic** - Minimal setup
- **nodejs-cli** - Command-line tool

---

## Learn More

- [Main README](../README.md) - Complete documentation
- [SDK Package README](../packages/fhevm-sdk/README.md) - SDK-specific docs
- [Zama FHEVM Docs](https://docs.zama.ai/fhevm) - FHEVM technology

---

## Live Demo

- **GitHub**: [https://github.com/BlaiseReilly/fhevm-react-template](https://github.com/BlaiseReilly/fhevm-react-template)
- **Demo App**: [https://fhe-contract-review.vercel.app/](https://fhe-contract-review.vercel.app/)
- **Demo Video**: Download `demo.mp4` from repository
