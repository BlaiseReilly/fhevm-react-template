import { EncryptionType } from '../fhe/types';

export const validateEncryptionType = (type: string): type is EncryptionType => {
  return ['euint8', 'euint16', 'euint32', 'euint64', 'euint128', 'ebool', 'eaddress'].includes(type);
};

export const getTypeRange = (type: EncryptionType): { min: number; max: number } => {
  switch (type) {
    case 'euint8':
      return { min: 0, max: 255 };
    case 'euint16':
      return { min: 0, max: 65535 };
    case 'euint32':
      return { min: 0, max: 4294967295 };
    case 'euint64':
      return { min: 0, max: Number.MAX_SAFE_INTEGER };
    case 'euint128':
      return { min: 0, max: Number.MAX_SAFE_INTEGER };
    case 'ebool':
      return { min: 0, max: 1 };
    default:
      return { min: 0, max: Number.MAX_SAFE_INTEGER };
  }
};

export const validateValueForType = (value: number | boolean, type: EncryptionType): boolean => {
  if (type === 'ebool') {
    return typeof value === 'boolean';
  }

  if (typeof value !== 'number') return false;

  const { min, max } = getTypeRange(type);
  return value >= min && value <= max;
};

export const formatError = (error: any): string => {
  if (typeof error === 'string') return error;
  if (error?.message) return error.message;
  return 'An unknown error occurred';
};
