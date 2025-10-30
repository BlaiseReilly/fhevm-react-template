import { NextRequest, NextResponse } from 'next/server';
import { createFHEVMClient } from '@fhevm/sdk';
import { JsonRpcProvider } from 'ethers';

export async function POST(request: NextRequest) {
  try {
    const { value, type } = await request.json();

    if (value === undefined || !type) {
      return NextResponse.json(
        { error: 'Missing value or type parameter' },
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

    // Encrypt the value
    const encrypted = await client.encrypt(value, type);

    return NextResponse.json({
      success: true,
      encrypted: {
        data: Array.from(encrypted.data),
        type: encrypted.type,
      },
    });
  } catch (error: any) {
    console.error('Encryption error:', error);
    return NextResponse.json(
      { error: error.message || 'Encryption failed' },
      { status: 500 }
    );
  }
}
