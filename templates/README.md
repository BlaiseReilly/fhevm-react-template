# FHEVM SDK Templates

This directory contains ready-to-use templates for different frameworks, demonstrating FHEVM SDK integration.

## Available Templates

### Next.js Template
**Location:** `./nextjs/`

A complete Next.js 14 application template with App Router, demonstrating:
- FHEVM SDK integration with React hooks
- Client-side and server-side encryption
- API routes for FHE operations
- Reusable components for encryption/decryption
- Type-safe TypeScript implementation
- Example use cases (banking, medical records)

**Quick Start:**
```bash
cd templates/nextjs
npm install
npm run dev
```

## Using Templates

### Option 1: Copy Template
```bash
cp -r templates/nextjs my-fhevm-app
cd my-fhevm-app
npm install
npm run dev
```

### Option 2: Use as Reference
Browse the template files to understand integration patterns and copy relevant code to your existing project.

## Template Structure

Each template includes:
- ✅ Complete SDK integration
- ✅ Example components and pages
- ✅ API routes (where applicable)
- ✅ TypeScript definitions
- ✅ Configuration files
- ✅ README with setup instructions
- ✅ Environment variable examples

## Framework Support

| Framework | Status | Location |
|-----------|--------|----------|
| Next.js | ✅ Available | `./nextjs/` |
| React | 📝 Use Next.js template | - |
| Vue | 🔄 Coming Soon | - |
| Node.js | 📝 See examples | - |

## Requirements

- Node.js ≥18.0.0
- npm ≥9.0.0
- MetaMask or compatible Web3 wallet (for browser apps)

## Documentation

For detailed documentation, see:
- [Getting Started Guide](../docs/getting-started.md)
- [API Reference](../docs/api-reference.md)
- [Examples](../docs/examples.md)

## Support

For issues or questions:
- GitHub Issues: [Report a bug](https://github.com/BlaiseReilly/fhevm-react-template/issues)
- Documentation: [Read the docs](../docs/)
- Zama Discord: [Join community](https://discord.gg/zama)
