/**
 * Format Ethereum address for display
 * @param {string} address - Ethereum address
 * @returns {string} Formatted address
 */
export function formatAddress(address) {
  return `${address.substring(0, 6)}...${address.substring(38)}`;
}

/**
 * Format bytes to hex string
 * @param {Uint8Array} bytes - Bytes to format
 * @returns {string} Hex string
 */
export function bytesToHex(bytes) {
  return '0x' + Buffer.from(bytes).toString('hex');
}

/**
 * Parse hex string to bytes
 * @param {string} hex - Hex string
 * @returns {Uint8Array} Bytes
 */
export function hexToBytes(hex) {
  const hexString = hex.startsWith('0x') ? hex.slice(2) : hex;
  return new Uint8Array(Buffer.from(hexString, 'hex'));
}

/**
 * Validate FHE type
 * @param {string} type - FHE type
 * @returns {boolean} True if valid
 */
export function isValidFHEType(type) {
  const validTypes = ['euint8', 'euint16', 'euint32', 'euint64', 'euint128', 'ebool', 'eaddress'];
  return validTypes.includes(type);
}

/**
 * Get max value for FHE type
 * @param {string} type - FHE type
 * @returns {bigint} Max value
 */
export function getMaxValueForType(type) {
  const maxValues = {
    'euint8': 255n,
    'euint16': 65535n,
    'euint32': 4294967295n,
    'euint64': 18446744073709551615n,
    'euint128': 340282366920938463463374607431768211455n,
    'ebool': 1n
  };

  return maxValues[type] || 0n;
}

/**
 * Format timestamp to date string
 * @param {number} timestamp - Unix timestamp
 * @returns {string} Formatted date
 */
export function formatDate(timestamp) {
  return new Date(timestamp * 1000).toLocaleString();
}

/**
 * Sleep for specified milliseconds
 * @param {number} ms - Milliseconds
 * @returns {Promise<void>}
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
