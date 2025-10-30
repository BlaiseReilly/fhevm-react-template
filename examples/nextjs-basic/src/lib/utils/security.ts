export const validateAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

export const validateCiphertext = (ciphertext: string): boolean => {
  return /^0x[a-fA-F0-9]+$/.test(ciphertext);
};

export const sanitizeInput = (input: string): string => {
  return input.replace(/[^a-zA-Z0-9\s]/g, '');
};

export const validateNumericInput = (value: string, min?: number, max?: number): boolean => {
  const num = parseInt(value);
  if (isNaN(num)) return false;
  if (min !== undefined && num < min) return false;
  if (max !== undefined && num > max) return false;
  return true;
};

export const maskSensitiveData = (data: string, visibleChars: number = 4): string => {
  if (data.length <= visibleChars * 2) return data;
  return `${data.slice(0, visibleChars)}...${data.slice(-visibleChars)}`;
};
