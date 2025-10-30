import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { FHEVMProvider } from '@fhevm/sdk/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FHEVM Next.js Basic Example',
  description: 'Basic example demonstrating FHEVM SDK integration in Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FHEVMProvider config={{ network: 'sepolia' }}>
          {children}
        </FHEVMProvider>
      </body>
    </html>
  );
}
