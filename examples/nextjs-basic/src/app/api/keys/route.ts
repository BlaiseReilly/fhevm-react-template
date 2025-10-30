import { NextRequest, NextResponse } from 'next/server';
import { createFHEVMClient } from '@fhevm/sdk';
import { JsonRpcProvider } from 'ethers';

export async function GET(request: NextRequest) {
  try {
    // Initialize FHEVM client
    const provider = new JsonRpcProvider(
      process.env.SEPOLIA_RPC_URL || 'https://rpc.sepolia.org'
    );

    const client = createFHEVMClient({
      provider,
      network: 'sepolia',
    });

    const { publicKey } = await client.init();

    return NextResponse.json({
      success: true,
      publicKey,
      network: 'sepolia',
    });
  } catch (error: any) {
    console.error('Key retrieval error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to retrieve keys' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json();

    if (action === 'generate') {
      // Initialize new FHEVM instance
      const provider = new JsonRpcProvider(
        process.env.SEPOLIA_RPC_URL || 'https://rpc.sepolia.org'
      );

      const client = createFHEVMClient({
        provider,
        network: 'sepolia',
      });

      const { publicKey, signature } = await client.init();

      return NextResponse.json({
        success: true,
        publicKey,
        signature,
        message: 'New key pair generated',
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('Key generation error:', error);
    return NextResponse.json(
      { error: error.message || 'Key generation failed' },
      { status: 500 }
    );
  }
}
