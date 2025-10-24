# API Reference

Complete API documentation for FHEVM Universal SDK.

---

## Core API

### `createFHEVMClient(config)`

Creates a new FHEVM client instance.

**Parameters:**

```typescript
{
  provider: BrowserProvider | JsonRpcProvider;  // Ethers provider
  network: 'sepolia' | 'zama-devnet' | 'zama-testnet' | 'hardhat';
  gatewayUrl?: string;      // Optional custom gateway URL
  aclAddress?: string;      // Optional ACL contract address
}
```

**Returns:** `FHEVMClient`

**Example:**

```typescript
import { createFHEVMClient } from '@fhevm/sdk';
import { BrowserProvider } from 'ethers';

const provider = new BrowserProvider(window.ethereum);
const client = createFHEVMClient({
  provider,
  network: 'sepolia'
});
```

---

### `client.init(signer?)`

Initialize the FHEVM instance with public key and EIP-712 signature.

**Parameters:**
- `signer?` - Optional ethers Signer for EIP-712 signature

**Returns:** `Promise<FHEVMInstance>`

```typescript
{
  instance: any;
  publicKey: string;
  signature: string;
}
```

**Example:**

```typescript
const signer = await provider.getSigner();
const result = await client.init(signer);

console.log('Public Key:', result.publicKey);
console.log('Signature:', result.signature);
```

---

### `client.encrypt(value, type)`

Encrypt a value to specified encrypted type.

**Parameters:**
- `value: number | boolean` - Value to encrypt
- `type: string` - Target encryption type

**Supported Types:**
- `'euint8'` - 8-bit unsigned integer (0-255)
- `'euint16'` - 16-bit unsigned integer (0-65,535)
- `'euint32'` - 32-bit unsigned integer (0-4,294,967,295)
- `'euint64'` - 64-bit unsigned integer (0-2^64-1)
- `'euint128'` - 128-bit unsigned integer (0-2^128-1)
- `'ebool'` - Boolean (true/false)
- `'eaddress'` - Ethereum address

**Returns:** `Promise<EncryptedValue>`

```typescript
{
  data: Uint8Array;
  type: string;
}
```

**Examples:**

```typescript
// Encrypt integer
const encrypted32 = await client.encrypt(1000, 'euint32');

// Encrypt small value
const encrypted8 = await client.encrypt(255, 'euint8');

// Encrypt boolean
const encryptedBool = await client.encrypt(true, 'ebool');

// Use in contract call
await contract.submitValue(encrypted32.data);
```

---

### `client.userDecrypt(params)`

Client-side decryption using user's private key with EIP-712 signature.

**Parameters:**

```typescript
{
  contractAddress: string;  // Contract address
  ciphertext: string;       // Encrypted data
  userAddress: string;      // User's address
}
```

**Returns:** `Promise<string>` - Decrypted plaintext value

**Example:**

```typescript
const decrypted = await client.userDecrypt({
  contractAddress: '0x5A042B49224ae2d67d5F216DC9A243F6603848F1',
  ciphertext: '0x...',
  userAddress: await signer.getAddress()
});

console.log('Decrypted value:', decrypted);
```

---

### `client.publicDecrypt(params)`

Gateway-based decryption (server-side).

**Parameters:** Same as `userDecrypt`

**Returns:** `Promise<string>` - Decrypted plaintext value

**Example:**

```typescript
const decrypted = await client.publicDecrypt({
  contractAddress: '0x...',
  ciphertext: '0x...'
});
```

---

### `client.reencrypt(params)`

Reencrypt for sharing with another user.

**Parameters:** Same as `userDecrypt`

**Returns:** `Promise<string>`

---

### `client.getInstance()`

Get the raw FHEVM instance.

**Returns:** `any` - fhevmjs instance

---

### `client.getPublicKey()`

Get the user's public key.

**Returns:** `string | null`

---

### `client.getSignature()`

Get the EIP-712 signature.

**Returns:** `string | null`

---

### `client.isInitialized()`

Check if client is initialized.

**Returns:** `boolean`

---

## React API

### `<FHEVMProvider>`

Context provider for React applications.

**Props:**

```typescript
{
  config: {
    network: 'sepolia' | 'zama-devnet' | 'zama-testnet' | 'hardhat';
    gatewayUrl?: string;
    aclAddress?: string;
  };
  children: ReactNode;
}
```

**Example:**

```tsx
import { FHEVMProvider } from '@fhevm/sdk/react';

function App() {
  return (
    <FHEVMProvider config={{ network: 'sepolia' }}>
      <YourApp />
    </FHEVMProvider>
  );
}
```

---

### `useFHEVM()`

Main React hook for FHEVM functionality.

**Returns:**

```typescript
{
  instance: any | null;
  isInitialized: boolean;
  publicKey: string | null;
  encrypt: (value: number | boolean, type: string) => Promise<EncryptedValue>;
  decrypt: (params: DecryptParams) => Promise<string>;
  reencrypt: (params: DecryptParams) => Promise<string>;
}
```

**Example:**

```tsx
import { useFHEVM } from '@fhevm/sdk/react';

function Component() {
  const { isInitialized, encrypt, decrypt, publicKey } = useFHEVM();

  if (!isInitialized) {
    return <div>Initializing FHEVM...</div>;
  }

  const handleEncrypt = async () => {
    const encrypted = await encrypt(42, 'euint32');
    console.log('Encrypted:', encrypted);
  };

  return (
    <div>
      <p>Public Key: {publicKey?.slice(0, 20)}...</p>
      <button onClick={handleEncrypt}>Encrypt Value</button>
    </div>
  );
}
```

---

### `useEncrypt()`

Simplified hook for encryption only.

**Returns:**

```typescript
{
  encrypt: (value: number | boolean, type: string) => Promise<EncryptedValue>;
  isReady: boolean;
}
```

**Example:**

```tsx
import { useEncrypt } from '@fhevm/sdk/react';

function EncryptForm() {
  const { encrypt, isReady } = useEncrypt();

  const handleSubmit = async (value: number) => {
    if (!isReady) return;

    const encrypted = await encrypt(value, 'euint32');
    // Use encrypted.data in contract call
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" />
      <button disabled={!isReady}>Encrypt</button>
    </form>
  );
}
```

---

### `useDecrypt()`

Simplified hook for decryption only.

**Returns:**

```typescript
{
  decrypt: (params: DecryptParams) => Promise<string>;
  reencrypt: (params: DecryptParams) => Promise<string>;
  isReady: boolean;
}
```

**Example:**

```tsx
import { useDecrypt } from '@fhevm/sdk/react';

function DecryptView() {
  const { decrypt, isReady } = useDecrypt();
  const [plaintext, setPlaintext] = useState<string>('');

  const handleDecrypt = async () => {
    if (!isReady) return;

    const result = await decrypt({
      contractAddress: CONTRACT_ADDRESS,
      ciphertext: ciphertext,
      userAddress: userAddress
    });

    setPlaintext(result);
  };

  return (
    <div>
      <button onClick={handleDecrypt} disabled={!isReady}>
        Decrypt
      </button>
      {plaintext && <p>Value: {plaintext}</p>}
    </div>
  );
}
```

---

## Types

### `FHEVMConfig`

```typescript
interface FHEVMConfig {
  provider: BrowserProvider | JsonRpcProvider;
  network: 'sepolia' | 'zama-devnet' | 'zama-testnet' | 'hardhat';
  gatewayUrl?: string;
  aclAddress?: string;
}
```

### `FHEVMInstance`

```typescript
interface FHEVMInstance {
  instance: any;
  publicKey: string;
  signature: string;
}
```

### `EncryptedValue`

```typescript
interface EncryptedValue {
  data: Uint8Array;
  type: 'euint8' | 'euint16' | 'euint32' | 'euint64' | 'euint128' | 'ebool' | 'eaddress';
}
```

### `DecryptParams`

```typescript
interface DecryptParams {
  contractAddress: string;
  ciphertext: string;
  userAddress: string;
}
```

### `FHEVMContextValue`

```typescript
interface FHEVMContextValue {
  instance: any | null;
  isInitialized: boolean;
  publicKey: string | null;
  encrypt: (value: number | boolean, type: string) => Promise<EncryptedValue>;
  decrypt: (params: DecryptParams) => Promise<string>;
  reencrypt: (params: DecryptParams) => Promise<string>;
}
```

---

## Utility Functions

### `toHexString(data)`

Convert Uint8Array to hex string.

```typescript
import { toHexString } from '@fhevm/sdk';

const hex = toHexString(uint8Array);
// Returns: "0x..."
```

### `fromHexString(hex)`

Convert hex string to Uint8Array.

```typescript
import { fromHexString } from '@fhevm/sdk';

const bytes = fromHexString('0x1234');
```

### `isValidAddress(address)`

Validate Ethereum address.

```typescript
import { isValidAddress } from '@fhevm/sdk';

if (isValidAddress('0x...')) {
  // Valid address
}
```

### `isValidNetwork(network)`

Validate network name.

```typescript
import { isValidNetwork } from '@fhevm/sdk';

if (isValidNetwork('sepolia')) {
  // Valid network
}
```

---

## Network Configuration

### `NETWORK_CONFIG`

Pre-configured network settings.

```typescript
import { NETWORK_CONFIG } from '@fhevm/sdk';

const sepoliaConfig = NETWORK_CONFIG.sepolia;
// {
//   chainId: 11155111,
//   name: 'Sepolia',
//   gatewayUrl: 'https://gateway.sepolia.zama.ai',
//   aclAddress: '0x...'
// }
```

**Available Networks:**
- `sepolia` - Ethereum Sepolia testnet
- `zama-devnet` - Zama development network
- `zama-testnet` - Zama test network
- `hardhat` - Local Hardhat network

---

## Error Handling

### Common Errors

**"FHEVM instance not initialized"**
- Call `client.init()` before using encrypt/decrypt

**"FHEVM client not initialized"** (React)
- Ensure `FHEVMProvider` wraps your component
- Wait for `isInitialized` to be true

**"MetaMask or Web3 provider not found"**
- Install MetaMask browser extension
- Ensure wallet is unlocked

**"Unsupported encryption type"**
- Use valid type: euint8, euint16, euint32, euint64, euint128, ebool, eaddress

**"User decryption failed"**
- Verify user has permission to decrypt
- Check EIP-712 signature is valid
- Ensure ciphertext is correct format

---

## Best Practices

### 1. Error Handling

```typescript
try {
  const encrypted = await client.encrypt(value, 'euint32');
  await contract.submitValue(encrypted.data);
} catch (error) {
  console.error('Encryption failed:', error);
  // Handle error appropriately
}
```

### 2. Check Initialization

```typescript
if (!client.isInitialized()) {
  await client.init(signer);
}

const encrypted = await client.encrypt(42, 'euint32');
```

### 3. Type Selection

Choose appropriate type based on value range:
- Small values (0-255): `euint8`
- Medium values (0-65k): `euint16`
- Large values: `euint32` or higher
- Boolean: `ebool`

### 4. Permission Management

Always grant permissions after encryption:

```solidity
// In smart contract
euint32 encryptedValue = FHE.asEuint32(value);
FHE.allow(encryptedValue, userAddress);
```

---

## Live Example

**Repository**: [https://github.com/BlaiseReilly/fhevm-react-template](https://github.com/BlaiseReilly/fhevm-react-template)

**Demo Application**: [https://fhe-contract-review.vercel.app/](https://fhe-contract-review.vercel.app/)

**Demo Video**: Download `demo.mp4` from the repository (streaming not available)

See `examples/` directory for complete working examples.

---

## Support

- **GitHub Issues**: [Report bugs](https://github.com/BlaiseReilly/fhevm-react-template/issues)
- **Documentation**: [Main README](../README.md)
- **Zama Docs**: [https://docs.zama.ai/fhevm](https://docs.zama.ai/fhevm)
