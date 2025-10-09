/**
 * React-specific exports
 * Import from '@fhevm/sdk/react' for React hooks and components
 */

export { FHEVMProvider, useFHEVM, useEncrypt, useDecrypt } from './hooks/useFHEVM';

// Re-export types for convenience
export type { FHEVMContextValue, EncryptedValue, DecryptParams } from './types';
