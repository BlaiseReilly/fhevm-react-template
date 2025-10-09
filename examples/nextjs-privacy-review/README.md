# Privacy Contract Review Platform

**Next.js Example with FHEVM Universal SDK**

This is a complete production-ready dApp demonstrating the FHEVM Universal SDK with encrypted contract compliance review.

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env with your credentials
```

### 3. Compile Contracts

```bash
npm run compile
```

### 4. Deploy to Sepolia

```bash
npm run deploy:sepolia
```

### 5. Run Frontend

```bash
npm run dev
# Open http://localhost:3000
```

---

## 📦 What's Included

### Smart Contracts

- `PrivacyContractReview.sol` - Main contract with FHEVM encryption
  - Submit contracts for review
  - Encrypted compliance scoring
  - Role-based access control
  - EIP-712 decryption support

### Frontend (Next.js)

- **FHEVM SDK Integration** - Using `@fhevm/sdk/react`
- **React Hooks** - `useFHEVM()` for encryption/decryption
- **TypeScript** - Full type safety
- **Tailwind CSS** - Modern styling
- **Web3 Integration** - Ethers.js v6

### Scripts

- `scripts/deploy.js` - Deploy contract to network
- `scripts/verify.js` - Verify contract on Etherscan
- `scripts/interact.js` - Interact with deployed contract

---

## 🎯 Features Demonstrated

### SDK Usage in <10 Lines

```tsx
// 1. Wrap app with provider (1 line)
<FHEVMProvider config={{ network: 'sepolia' }}>
  <App />
</FHEVMProvider>

// 2. Use hook (1 line)
const { encrypt, decrypt, isInitialized } = useFHEVM();

// 3. Encrypt (1 line)
const encrypted = await encrypt(42, 'euint32');

// 4. Decrypt (1 line)
const decrypted = await decrypt({ contractAddress, ciphertext, userAddress });
```

### Complete FHEVM Flow

1. ✅ **Initialize** - Auto-initialized with EIP-712 signature
2. ✅ **Encrypt** - Client-side encryption with type safety
3. ✅ **Submit** - Send encrypted data to contract
4. ✅ **Decrypt** - User decryption with signature verification
5. ✅ **Reencrypt** - Share encrypted data with authorized users

---

## 📁 Project Structure

```
nextjs-privacy-review/
├── contracts/
│   └── PrivacyContractReview.sol    # Main smart contract
├── scripts/
│   ├── deploy.js                    # Deployment script
│   ├── verify.js                    # Verification script
│   └── interact.js                  # Interaction script
├── src/
│   ├── pages/
│   │   ├── _app.tsx                 # App wrapper with FHEVMProvider
│   │   └── index.tsx                # Main page with SDK usage
│   ├── styles/
│   │   └── globals.css              # Global styles
│   └── types/                       # TypeScript definitions
├── public/                          # Static assets
├── hardhat.config.js                # Hardhat configuration
├── next.config.js                   # Next.js configuration
├── package.json                     # Dependencies and scripts
└── README.md                        # This file
```

---

## 🔧 Available Scripts

### Development

```bash
npm run dev          # Start Next.js dev server
npm run build        # Build Next.js app
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Smart Contracts

```bash
npm run compile      # Compile Solidity contracts
npm test             # Run contract tests
npm run deploy:local # Deploy to local Hardhat network
npm run deploy:sepolia # Deploy to Sepolia testnet
```

---

## 🌐 Live Deployment

- **Contract**: `0x5A042B49224ae2d67d5F216DC9A243F6603848F1`
- **Network**: Sepolia Testnet
- **Explorer**: [View on Etherscan](https://sepolia.etherscan.io/address/0x5A042B49224ae2d67d5F216DC9A243F6603848F1)
- **Frontend**: [Demo App](https://fhevm-privacy-review.vercel.app)

---

## 💡 How It Works

### 1. SDK Initialization

The FHEVM SDK is initialized automatically when the app loads:

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
```

### 2. Using the SDK

Access FHEVM functionality in any component:

```tsx
// pages/index.tsx
import { useFHEVM } from '@fhevm/sdk/react';

export default function Home() {
  const { isInitialized, encrypt, decrypt } = useFHEVM();

  async function handleSubmit() {
    // Encrypt data before sending to contract
    const encryptedScore = await encrypt(85, 'euint8');

    // Submit to contract
    await contract.submitReview(encryptedScore.data);
  }

  async function handleDecrypt(ciphertext) {
    // Decrypt with EIP-712 signature
    const decrypted = await decrypt({
      contractAddress: CONTRACT_ADDRESS,
      ciphertext,
      userAddress: account,
    });

    console.log('Decrypted value:', decrypted);
  }

  return <div>{/* UI components */}</div>;
}
```

### 3. Contract Integration

The smart contract uses Zama FHEVM for encrypted operations:

```solidity
// contracts/PrivacyContractReview.sol
import { FHE, euint32, euint8 } from "@fhevm/solidity/lib/FHE.sol";

contract PrivacyContractReview {
    struct ContractDocument {
        euint32 encryptedScore;     // Encrypted compliance score
        euint8 encryptedRiskLevel;  // Encrypted risk level
        // ...
    }

    function completePrivacyAnalysis(
        uint256 _contractId,
        uint8 _gdprCompliance,
        uint8 _ccpaCompliance
    ) external {
        // Encrypt the compliance scores
        analysis.encryptedGDPRCompliance = FHE.asEuint8(_gdprCompliance);
        analysis.encryptedCCPACompliance = FHE.asEuint8(_ccpaCompliance);

        // Grant permissions
        FHE.allow(analysis.encryptedGDPRCompliance, msg.sender);
    }
}
```

---

## 🔐 Privacy Model

### What's Encrypted

- ✅ Compliance scores (GDPR, CCPA)
- ✅ Risk levels (retention, sharing)
- ✅ Sensitivity ratings
- ✅ Review ratings
- ✅ Overall analysis scores

### What's Public

- ✅ Contract metadata (title, hash, timestamp)
- ✅ Reviewer/submitter addresses
- ✅ Review completion status
- ✅ Public identifiers

### Decryption Permissions

Only authorized users can decrypt:
- 📝 **Submitters** - Can decrypt their own contract data
- 👨‍⚖️ **Reviewers** - Can decrypt contracts they reviewed
- 👑 **Owner** - Full access to all data

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Run with gas reporting
npm run test:gas

# Generate coverage
npm run test:coverage
```

**Expected Results:**
- ✅ 54+ tests passing
- ✅ Coverage >80%
- ✅ All security checks pass

---

## 🐛 Troubleshooting

### MetaMask Not Detected

```javascript
// Make sure MetaMask is installed and unlocked
if (!window.ethereum) {
  alert('Please install MetaMask');
}
```

### Wrong Network

```javascript
// Switch to Sepolia network
await window.ethereum.request({
  method: 'wallet_switchEthereumChain',
  params: [{ chainId: '0xaa36a7' }], // 11155111 in hex
});
```

### FHEVM Not Initialized

```tsx
// Wait for initialization
const { isInitialized } = useFHEVM();

if (!isInitialized) {
  return <div>Initializing FHEVM...</div>;
}
```

---

## 📚 Learn More

- **FHEVM SDK Documentation**: [../../../packages/fhevm-sdk/README.md](../../../packages/fhevm-sdk/README.md)
- **Zama FHEVM Docs**: https://docs.zama.ai/fhevm
- **Next.js Documentation**: https://nextjs.org/docs
- **Ethers.js v6**: https://docs.ethers.org/v6/

---

## 🤝 Contributing

This example is part of the FHEVM Universal SDK project. Contributions welcome!

---

## 📜 License

MIT License - see [LICENSE](../../../LICENSE) for details

---

**Built for the Zama Bounty Program**

**Showcasing FHEVM Universal SDK in production**
