/**
 * FHEVM Universal SDK
 * Framework-agnostic SDK for building confidential dApps with Zama FHEVM
 */

// Core exports
export { FHEVMClient, createFHEVMClient } from './core/client';

// Type exports
export type {
  FHEVMConfig,
  FHEVMInstance,
  EncryptedValue,
  DecryptParams,
  ReencryptionRequest,
  FHEVMContextValue,
} from './types';

export { NETWORK_CONFIG } from './types';

// Utility exports
export {
  toHexString,
  fromHexString,
  isValidAddress,
  isValidNetwork,
  formatError,
  sleep,
  retry,
} from './utils/helpers';
