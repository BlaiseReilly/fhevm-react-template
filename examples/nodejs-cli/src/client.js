import { createFHEVMClient } from '@fhevm/sdk';
import { JsonRpcProvider, Wallet } from 'ethers';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Initialize FHEVM client with configuration from environment
 * @returns {Promise<{client: FHEVMClient, wallet: Wallet, provider: JsonRpcProvider}>}
 */
export async function setupFHEVMClient() {
  // Validate environment variables
  if (!process.env.PRIVATE_KEY) {
    throw new Error('PRIVATE_KEY not found in environment variables');
  }

  if (!process.env.SEPOLIA_RPC_URL) {
    throw new Error('SEPOLIA_RPC_URL not found in environment variables');
  }

  // Setup provider and wallet
  const provider = new JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
  const wallet = new Wallet(process.env.PRIVATE_KEY, provider);

  // Create FHEVM client
  const client = createFHEVMClient({
    provider,
    network: process.env.NETWORK || 'sepolia',
    gatewayUrl: process.env.GATEWAY_URL
  });

  // Initialize with EIP-712 signature
  await client.init(wallet);

  return { client, wallet, provider };
}

/**
 * Get contract instance
 * @param {Wallet} wallet - Ethers wallet
 * @param {string} contractAddress - Contract address
 * @param {Array} abi - Contract ABI
 * @returns {Contract}
 */
export function getContract(wallet, contractAddress, abi) {
  const { Contract } = await import('ethers');
  return new Contract(contractAddress, abi, wallet);
}
