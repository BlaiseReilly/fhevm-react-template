import { NextRequest, NextResponse } from 'next/server';
import { createFHEVMClient } from '@fhevm/sdk';
import { JsonRpcProvider } from 'ethers';

export async function POST(request: NextRequest) {
  try {
    const { contractAddress, ciphertext, userAddress } = await request.json();

    if (!contractAddress || !ciphertext) {
      return NextResponse.json(
        { error: 'Missing contractAddress or ciphertext' },
        { status: 400 }
      );
    }

    // Initialize FHEVM client
    const provider = new JsonRpcProvider(
      process.env.SEPOLIA_RPC_URL || 'https://rpc.sepolia.org'
    );

    const client = createFHEVMClient({
      provider,
      network: 'sepolia',
    });

    await client.init();

    // Decrypt using public decryption (gateway)
    const decrypted = await client.publicDecrypt({
      contractAddress,
      ciphertext,
    });

    return NextResponse.json({
      success: true,
      decrypted,
    });
  } catch (error: any) {
    console.error('Decryption error:', error);
    return NextResponse.json(
      { error: error.message || 'Decryption failed' },
      { status: 500 }
    );
  }
}
