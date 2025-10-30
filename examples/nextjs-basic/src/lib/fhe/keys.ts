export const generateKeyPair = async () => {
  // Key generation is handled by FHEVM SDK
  // This is a placeholder for any custom key management logic
  return {
    publicKey: null,
    message: 'Keys are managed by FHEVM SDK',
  };
};

export const storePublicKey = (publicKey: string) => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('fhevm_public_key', publicKey);
  }
};

export const getStoredPublicKey = (): string | null => {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem('fhevm_public_key');
  }
  return null;
};

export const clearStoredKeys = () => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('fhevm_public_key');
  }
};
