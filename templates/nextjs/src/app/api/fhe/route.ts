import { NextRequest, NextResponse } from 'next/server';
import { createFHEVMClient } from '@fhevm/sdk';
import { JsonRpcProvider } from 'ethers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { operation, value, type } = body;

    // Initialize FHEVM client
    const provider = new JsonRpcProvider(process.env.SEPOLIA_RPC_URL || 'https://rpc.sepolia.org');
    const client = createFHEVMClient({
      provider,
      network: 'sepolia',
    });

    await client.init();

    let result;

    switch (operation) {
      case 'encrypt':
        result = await client.encrypt(value, type);
        break;

      case 'decrypt':
        result = await client.publicDecrypt({
          contractAddress: body.contractAddress,
          ciphertext: body.ciphertext,
        });
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid operation' },
          { status: 400 }
        );
    }

    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error('FHE operation error:', error);
    return NextResponse.json(
      { error: error.message || 'FHE operation failed' },
      { status: 500 }
    );
  }
}
