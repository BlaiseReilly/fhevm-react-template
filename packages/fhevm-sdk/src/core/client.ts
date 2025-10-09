import { createInstance, initGateway } from 'fhevmjs';
import { BrowserProvider, JsonRpcProvider, Signer } from 'ethers';
import { FHEVMConfig, FHEVMInstance, EncryptedValue, DecryptParams, NETWORK_CONFIG } from '../types';

/**
 * FHEVM Client - Core SDK functionality
 * Provides encryption, decryption, and FHEVM instance management
 */
export class FHEVMClient {
  private instance: any = null;
  private provider: BrowserProvider | JsonRpcProvider;
  private publicKey: string | null = null;
  private signature: string | null = null;
  private config: FHEVMConfig;

  constructor(config: FHEVMConfig) {
    this.config = config;
    this.provider = config.provider;
  }

  /**
   * Initialize FHEVM instance with public key and signature
   */
  async init(signer?: Signer): Promise<FHEVMInstance> {
    try {
      const networkConfig = NETWORK_CONFIG[this.config.network];

      // Create FHEVM instance
      this.instance = await createInstance({
        chainId: networkConfig.chainId,
        publicKeyVerifier: networkConfig.aclAddress,
        gatewayUrl: this.config.gatewayUrl || networkConfig.gatewayUrl,
      });

      // Generate public key
      this.publicKey = this.instance.getPublicKey();

      // Get EIP-712 signature if signer provided
      if (signer) {
        const signerAddress = await signer.getAddress();

        // Create EIP-712 domain and message
        const domain = {
          name: 'FHEVM',
          version: '1',
          chainId: networkConfig.chainId,
        };

        const types = {
          Reencryption: [
            { name: 'publicKey', type: 'bytes' },
          ],
        };

        const message = {
          publicKey: `0x${this.publicKey}`,
        };

        // Sign with EIP-712
        this.signature = await signer.signTypedData(domain, types, message);
      }

      return {
        instance: this.instance,
        publicKey: this.publicKey!,
        signature: this.signature || '',
      };
    } catch (error) {
      throw new Error(`Failed to initialize FHEVM: ${error}`);
    }
  }

  /**
   * Encrypt a value to specified encrypted type
   */
  async encrypt(
    value: number | boolean,
    type: 'euint8' | 'euint16' | 'euint32' | 'euint64' | 'euint128' | 'ebool' | 'eaddress' = 'euint32'
  ): Promise<EncryptedValue> {
    if (!this.instance) {
      throw new Error('FHEVM instance not initialized. Call init() first.');
    }

    try {
      let encryptedData: Uint8Array;

      switch (type) {
        case 'euint8':
          encryptedData = this.instance.encrypt8(Number(value));
          break;
        case 'euint16':
          encryptedData = this.instance.encrypt16(Number(value));
          break;
        case 'euint32':
          encryptedData = this.instance.encrypt32(Number(value));
          break;
        case 'euint64':
          encryptedData = this.instance.encrypt64(BigInt(value));
          break;
        case 'euint128':
          encryptedData = this.instance.encrypt128(BigInt(value));
          break;
        case 'ebool':
          encryptedData = this.instance.encryptBool(Boolean(value));
          break;
        case 'eaddress':
          encryptedData = this.instance.encryptAddress(String(value));
          break;
        default:
          throw new Error(`Unsupported encryption type: ${type}`);
      }

      return {
        data: encryptedData,
        type,
      };
    } catch (error) {
      throw new Error(`Encryption failed: ${error}`);
    }
  }

  /**
   * Decrypt using user's private key (userDecrypt - client-side)
   */
  async userDecrypt(params: DecryptParams): Promise<string> {
    if (!this.instance || !this.publicKey || !this.signature) {
      throw new Error('FHEVM instance not fully initialized');
    }

    try {
      // Use fhevmjs reencryption and decryption
      const result = await this.instance.reencrypt(
        params.ciphertext,
        params.contractAddress,
        params.userAddress,
        this.signature
      );

      return result.toString();
    } catch (error) {
      throw new Error(`User decryption failed: ${error}`);
    }
  }

  /**
   * Public decrypt using gateway (publicDecrypt - server-side)
   */
  async publicDecrypt(params: DecryptParams): Promise<string> {
    try {
      const networkConfig = NETWORK_CONFIG[this.config.network];
      const gatewayUrl = this.config.gatewayUrl || networkConfig.gatewayUrl;

      const response = await fetch(`${gatewayUrl}/decrypt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ciphertext: params.ciphertext,
          contractAddress: params.contractAddress,
        }),
      });

      if (!response.ok) {
        throw new Error(`Gateway request failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.plaintext;
    } catch (error) {
      throw new Error(`Public decryption failed: ${error}`);
    }
  }

  /**
   * Reencrypt for viewing by specific user
   */
  async reencrypt(params: DecryptParams): Promise<string> {
    return this.userDecrypt(params);
  }

  /**
   * Get current instance
   */
  getInstance(): any {
    return this.instance;
  }

  /**
   * Get public key
   */
  getPublicKey(): string | null {
    return this.publicKey;
  }

  /**
   * Get signature
   */
  getSignature(): string | null {
    return this.signature;
  }

  /**
   * Check if initialized
   */
  isInitialized(): boolean {
    return this.instance !== null && this.publicKey !== null;
  }
}

/**
 * Create FHEVM client instance
 */
export function createFHEVMClient(config: FHEVMConfig): FHEVMClient {
  return new FHEVMClient(config);
}
