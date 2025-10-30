# Node.js CLI Example - FHEVM Universal SDK

A command-line interface demonstrating FHEVM Universal SDK usage in a pure Node.js environment.

## Features

- Initialize FHEVM client
- Encrypt values to FHE types
- Decrypt FHE ciphertexts
- Interact with FHE smart contracts
- User-friendly CLI with colored output

## Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

## Installation

```bash
npm install
```

## Configuration

1. Copy the environment template:

```bash
cp .env.example .env
```

2. Update `.env` with your configuration:

```env
PRIVATE_KEY=your_private_key_here
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/your_infura_key
NETWORK=sepolia
GATEWAY_URL=https://gateway.sepolia.zama.ai
CONTRACT_ADDRESS=0x5A042B49224ae2d67d5F216DC9A243F6603848F1
```

## Usage

### Interactive Menu

Start the interactive CLI:

```bash
npm start
```

### Direct Commands

#### Encrypt a Value

```bash
npm run encrypt
```

Example:
```bash
node src/commands/encrypt.js 42 euint32
```

#### Decrypt a Ciphertext

```bash
npm run decrypt
```

Example:
```bash
node src/commands/decrypt.js 0x1234... 0xContractAddress...
```

#### Interact with Contract

```bash
npm run interact
```

## Code Examples

### Basic Encryption

```javascript
import { createFHEVMClient } from '@fhevm/sdk';
import { JsonRpcProvider, Wallet } from 'ethers';

// Setup
const provider = new JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const wallet = new Wallet(process.env.PRIVATE_KEY, provider);

// Create client
const client = createFHEVMClient({
  provider,
  network: 'sepolia'
});

// Initialize
await client.init(wallet);

// Encrypt
const encrypted = await client.encrypt(42, 'euint32');
console.log('Encrypted:', encrypted.data);
```

### Decryption

```javascript
// User decryption (with EIP-712 signature)
const decrypted = await client.userDecrypt({
  contractAddress: '0x...',
  ciphertext: '0x...',
  userAddress: wallet.address
});

console.log('Decrypted:', decrypted);
```

### Contract Interaction

```javascript
import { Contract } from 'ethers';

// Setup contract
const contract = new Contract(
  contractAddress,
  contractABI,
  wallet
);

// Encrypt data
const encryptedValue = await client.encrypt(100, 'euint32');

// Send to contract
const tx = await contract.submitEncryptedData(encryptedValue.data);
await tx.wait();

console.log('Transaction completed!');
```

## Project Structure

```
nodejs-cli/
├── src/
│   ├── index.js           # Main CLI entry point
│   ├── client.js          # FHEVM client setup
│   ├── utils.js           # Utility functions
│   └── commands/          # CLI commands
│       ├── encrypt.js     # Encryption command
│       ├── decrypt.js     # Decryption command
│       └── interact.js    # Contract interaction
├── package.json
├── .env.example
└── README.md
```

## Available Commands

| Command | Description |
|---------|-------------|
| `npm start` | Launch interactive menu |
| `npm run encrypt` | Encrypt a value |
| `npm run decrypt` | Decrypt a ciphertext |
| `npm run interact` | Interact with smart contract |

## Supported FHE Types

- `euint8` - Encrypted 8-bit unsigned integer (0-255)
- `euint16` - Encrypted 16-bit unsigned integer (0-65,535)
- `euint32` - Encrypted 32-bit unsigned integer (0-4,294,967,295)
- `euint64` - Encrypted 64-bit unsigned integer
- `euint128` - Encrypted 128-bit unsigned integer
- `ebool` - Encrypted boolean
- `eaddress` - Encrypted Ethereum address

## Troubleshooting

### Connection Issues

If you encounter connection errors:

1. Verify your `SEPOLIA_RPC_URL` is correct
2. Check that your private key is valid
3. Ensure you have testnet ETH for gas fees

### Gateway Errors

If gateway requests fail:

1. Verify `GATEWAY_URL` is correct for your network
2. Check network connectivity
3. Ensure the contract is deployed on the correct network

## Examples

### Example 1: Encrypt and Log

```bash
node src/commands/encrypt.js 100 euint32
```

Output:
```
✓ FHEVM Client initialized
✓ Encrypted value: 100
Type: euint32
Data: 0x1234abcd...
```

### Example 2: Full Workflow

```javascript
import { createFHEVMClient } from '@fhevm/sdk';
import { JsonRpcProvider, Wallet } from 'ethers';

async function main() {
  // Setup
  const provider = new JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
  const wallet = new Wallet(process.env.PRIVATE_KEY, provider);

  // Create and initialize client
  const client = createFHEVMClient({
    provider,
    network: 'sepolia'
  });

  await client.init(wallet);
  console.log('Client initialized');

  // Encrypt
  const encrypted = await client.encrypt(42, 'euint32');
  console.log('Encrypted:', encrypted.data);

  // Decrypt
  const decrypted = await client.userDecrypt({
    contractAddress: process.env.CONTRACT_ADDRESS,
    ciphertext: encrypted.data,
    userAddress: wallet.address
  });

  console.log('Decrypted:', decrypted);
}

main().catch(console.error);
```

## Learn More

- [FHEVM SDK Documentation](../../packages/fhevm-sdk/README.md)
- [Zama Documentation](https://docs.zama.ai/)
- [Getting Started Guide](../../docs/getting-started.md)
- [API Reference](../../docs/api-reference.md)

## License

MIT
