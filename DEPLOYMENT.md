# 🚀 Deployment Guide

Complete deployment guide for FHEVM Universal SDK examples.

---

## 📋 Prerequisites

- Node.js ≥18.0.0
- npm ≥9.0.0
- MetaMask or similar Web3 wallet
- Sepolia testnet ETH ([Get from faucet](https://sepoliafaucet.com/))
- Etherscan API key ([Get here](https://etherscan.io/myapikey))
- RPC URL ([Alchemy](https://www.alchemy.com/) or [Infura](https://infura.io/))

---

## 🔐 Privacy Contract Review Platform

### Step 1: Clone and Install

```bash
# Clone repository
git clone https://github.com/zama-ai/fhevm-react-template
cd fhevm-react-template

# Install all dependencies
npm install

# Or use convenience script
npm run install:all
```

### Step 2: Configure Environment

```bash
cd examples/nextjs-privacy-review

# Copy environment template
cp .env.example .env

# Edit .env file
nano .env
```

**Required environment variables:**

```env
# Deployment
PRIVATE_KEY=your_wallet_private_key_here
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
ETHERSCAN_API_KEY=your_etherscan_api_key

# Contract Address (after deployment)
NEXT_PUBLIC_CONTRACT_ADDRESS=deployed_contract_address

# Network
DEFAULT_NETWORK=sepolia
```

### Step 3: Compile Contracts

```bash
# Compile Solidity contracts
npm run compile

# Expected output:
# ✅ Compiled 1 Solidity file successfully
```

### Step 4: Deploy to Sepolia

```bash
# Deploy contract
npm run deploy:sepolia

# Expected output:
# Deploying to network: sepolia
# Deployer address: 0x...
# Contract deployed to: 0x5A042B49224ae2d67d5F216DC9A243F6603848F1
# Transaction hash: 0x...
# Deployment info saved to: deployments/sepolia_latest.json
```

**Deployment info is saved to:**
- `deployments/sepolia_latest.json`
- `deployments/sepolia_TIMESTAMP.json`

### Step 5: Verify Contract on Etherscan

```bash
# Verify contract source code
npm run verify:sepolia

# Expected output:
# Verifying contract on Sepolia...
# Contract verified successfully!
# View at: https://sepolia.etherscan.io/address/0x...
```

### Step 6: Update Frontend Configuration

```bash
# Update .env with deployed contract address
echo "NEXT_PUBLIC_CONTRACT_ADDRESS=0x5A042B49224ae2d67d5F216DC9A243F6603848F1" >> .env
```

### Step 7: Run Frontend Locally

```bash
# Start Next.js development server
npm run dev

# Open in browser
open http://localhost:3000
```

### Step 8: Deploy Frontend to Vercel

```bash
# Install Vercel CLI (if not already installed)
npm install -g vercel

# Deploy to Vercel
vercel deploy

# Follow prompts:
# 1. Link to existing project or create new
# 2. Configure build settings (auto-detected for Next.js)
# 3. Add environment variables in Vercel dashboard

# Production deployment
vercel --prod
```

**Vercel Environment Variables:**

Go to Vercel Dashboard → Your Project → Settings → Environment Variables

Add:
- `NEXT_PUBLIC_CONTRACT_ADDRESS`
- `NEXT_PUBLIC_NETWORK` (sepolia)

---

## 📊 Current Deployments

### Privacy Contract Review Platform

| Component | Details |
|-----------|---------|
| **Contract Address** | `0x5A042B49224ae2d67d5F216DC9A243F6603848F1` |
| **Network** | Sepolia Testnet (Chain ID: 11155111) |
| **Etherscan** | [View Contract](https://sepolia.etherscan.io/address/0x5A042B49224ae2d67d5F216DC9A243F6603848F1) |
| **Frontend** | [Demo App](https://fhevm-privacy-review.vercel.app) |
| **Status** | ✅ Live |

### Contract Functions

- ✅ `submitContract()` - Submit contract for review
- ✅ `reviewClause()` - Add clause review (encrypted)
- ✅ `completePrivacyAnalysis()` - Complete analysis (encrypted)
- ✅ `authorizeReviewer()` - Manage reviewers
- ✅ `requestScoreDecryption()` - Decrypt scores (EIP-712)

---

## 🔧 Hardhat Configuration

The project uses Hardhat for contract development:

```javascript
// hardhat.config.js
module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 11155111
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};
```

---

## 🧪 Testing Before Deployment

```bash
# Run tests
npm test

# Run with gas reporting
npm run test:gas

# Generate coverage report
npm run test:coverage
```

**Expected test results:**
- ✅ 54+ tests passing
- ✅ Coverage >80%
- ✅ All security checks pass

---

## 🔍 Verification Steps

After deployment, verify:

### 1. Contract Verification

```bash
# Check contract on Etherscan
https://sepolia.etherscan.io/address/YOUR_CONTRACT_ADDRESS

# Verify:
✅ Contract is verified (green checkmark)
✅ Source code is visible
✅ Constructor arguments are correct
```

### 2. Function Testing

```bash
# Use Hardhat console
npx hardhat console --network sepolia

# Test functions
const contract = await ethers.getContractAt(
  "PrivacyContractReview",
  "YOUR_CONTRACT_ADDRESS"
);

await contract.owner(); // Should return deployer address
await contract.getTotalContracts(); // Should return 0 initially
```

### 3. Frontend Integration

```bash
# Test in browser
1. Connect MetaMask (Sepolia network)
2. Submit a contract
3. Check transaction on Etherscan
4. Verify contract appears in list
```

---

## 🐛 Troubleshooting

### Issue: "Insufficient funds for gas"

**Solution:**
```bash
# Get Sepolia testnet ETH
https://sepoliafaucet.com/
https://sepolia-faucet.pk910.de/
```

### Issue: "Nonce too high"

**Solution:**
```bash
# Reset MetaMask account
MetaMask → Settings → Advanced → Reset Account
```

### Issue: "Contract not verified"

**Solution:**
```bash
# Manual verification on Etherscan
1. Go to contract on Etherscan
2. Click "Verify and Publish"
3. Select:
   - Compiler: v0.8.24
   - Optimization: Yes (200 runs)
   - License: MIT
4. Paste contract code
5. Submit
```

### Issue: "Cannot connect to network"

**Solution:**
```bash
# Check RPC URL
curl -X POST $SEPOLIA_RPC_URL \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'

# Should return current block number
```

---

## 📝 Deployment Checklist

Before deploying to production:

- [ ] Test all contract functions locally
- [ ] Run full test suite (54+ tests)
- [ ] Check gas costs (should be <3M for deployment)
- [ ] Verify environment variables are set
- [ ] Have sufficient Sepolia ETH for deployment
- [ ] Backup private key securely
- [ ] Test on Sepolia testnet first
- [ ] Verify contract on Etherscan
- [ ] Test frontend integration
- [ ] Check all links work
- [ ] Add contract to README
- [ ] Update deployment documentation

---

## 🔄 Redeployment

If you need to redeploy:

```bash
# 1. Update contract code
# 2. Compile
npm run compile

# 3. Deploy (creates new contract)
npm run deploy:sepolia

# 4. Verify new contract
npm run verify:sepolia

# 5. Update frontend .env
NEXT_PUBLIC_CONTRACT_ADDRESS=new_contract_address

# 6. Redeploy frontend
vercel --prod
```

---

## 📊 Gas Costs

Typical gas costs on Sepolia:

| Operation | Gas Used | Estimated Cost (50 gwei) |
|-----------|----------|-------------------------|
| Deploy Contract | ~2,800,000 | ~0.14 ETH |
| Submit Contract | ~150,000 | ~0.0075 ETH |
| Review Clause | ~120,000 | ~0.006 ETH |
| Complete Analysis | ~200,000 | ~0.01 ETH |
| Authorize Reviewer | ~50,000 | ~0.0025 ETH |

---

## 🌐 Network Information

### Sepolia Testnet

- **Chain ID**: 11155111
- **RPC URL**: https://rpc.sepolia.org
- **Explorer**: https://sepolia.etherscan.io
- **Faucets**:
  - https://sepoliafaucet.com/
  - https://sepolia-faucet.pk910.de/

### Zama Networks

- **Devnet Chain ID**: 8009
- **Testnet Chain ID**: 8010
- **Gateway**: https://gateway.sepolia.zama.ai

---

## 🔗 Useful Links

- **Deployed Contract**: [Etherscan](https://sepolia.etherscan.io/address/0x5A042B49224ae2d67d5F216DC9A243F6603848F1)
- **Frontend Demo**: [Vercel App](https://fhevm-privacy-review.vercel.app)
- **Hardhat Docs**: https://hardhat.org/docs
- **Zama Docs**: https://docs.zama.ai/fhevm
- **Ethers.js Docs**: https://docs.ethers.org/v6/

---

**Deployment guide for FHEVM Universal SDK**

**Built for the Zama Bounty Program**
