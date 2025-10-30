import { createFHEVMClient } from '@fhevm/sdk';
import { JsonRpcProvider } from 'ethers';

export const getServerFHEClient = async () => {
  const provider = new JsonRpcProvider(
    process.env.SEPOLIA_RPC_URL || 'https://rpc.sepolia.org'
  );

  const client = createFHEVMClient({
    provider,
    network: 'sepolia',
  });

  await client.init();

  return client;
};

export const encryptOnServer = async (value: number | boolean, type: string) => {
  const client = await getServerFHEClient();
  return await client.encrypt(value, type as any);
};

export const decryptOnServer = async (params: {
  contractAddress: string;
  ciphertext: string;
}) => {
  const client = await getServerFHEClient();
  return await client.publicDecrypt(params);
};
