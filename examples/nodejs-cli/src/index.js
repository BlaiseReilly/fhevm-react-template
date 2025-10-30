#!/usr/bin/env node

import { createFHEVMClient } from '@fhevm/sdk';
import { JsonRpcProvider, Wallet } from 'ethers';
import dotenv from 'dotenv';
import { program } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import readline from 'readline';

// Load environment variables
dotenv.config();

// Banner
console.log(chalk.cyan(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║          FHEVM Universal SDK - Node.js CLI              ║
║          Fully Homomorphic Encryption on Blockchain      ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
`));

// Setup client
let client = null;
let wallet = null;
let provider = null;

async function initializeClient() {
  const spinner = ora('Initializing FHEVM client...').start();

  try {
    // Validate environment variables
    if (!process.env.PRIVATE_KEY) {
      spinner.fail('PRIVATE_KEY not found in .env file');
      process.exit(1);
    }

    if (!process.env.SEPOLIA_RPC_URL) {
      spinner.fail('SEPOLIA_RPC_URL not found in .env file');
      process.exit(1);
    }

    // Setup provider and wallet
    provider = new JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
    wallet = new Wallet(process.env.PRIVATE_KEY, provider);

    spinner.text = 'Creating FHEVM client...';

    // Create FHEVM client
    client = createFHEVMClient({
      provider,
      network: process.env.NETWORK || 'sepolia',
      gatewayUrl: process.env.GATEWAY_URL
    });

    spinner.text = 'Initializing with signature...';

    // Initialize with EIP-712 signature
    await client.init(wallet);

    spinner.succeed(chalk.green('FHEVM client initialized successfully!'));

    console.log(chalk.gray(`
Network: ${process.env.NETWORK || 'sepolia'}
Wallet: ${wallet.address.substring(0, 10)}...${wallet.address.substring(34)}
Gateway: ${process.env.GATEWAY_URL || 'default'}
    `));

    return client;
  } catch (error) {
    spinner.fail(chalk.red('Failed to initialize client'));
    console.error(chalk.red(error.message));
    process.exit(1);
  }
}

async function encryptValue(value, type = 'euint32') {
  console.log(chalk.blue(`\n📝 Encrypting value: ${value} as ${type}`));

  const spinner = ora('Encrypting...').start();

  try {
    const encrypted = await client.encrypt(Number(value), type);

    spinner.succeed(chalk.green('Value encrypted successfully!'));

    console.log(chalk.yellow('\nEncrypted Data:'));
    console.log(chalk.gray('Type:'), chalk.white(encrypted.type));
    console.log(chalk.gray('Data:'), chalk.white(`0x${Buffer.from(encrypted.data).toString('hex')}`));
    console.log(chalk.gray('Length:'), chalk.white(`${encrypted.data.length} bytes`));

    return encrypted;
  } catch (error) {
    spinner.fail(chalk.red('Encryption failed'));
    console.error(chalk.red(error.message));
    throw error;
  }
}

async function decryptValue(ciphertext, contractAddress) {
  console.log(chalk.blue(`\n🔓 Decrypting ciphertext from contract ${contractAddress.substring(0, 10)}...`));

  const spinner = ora('Decrypting...').start();

  try {
    const decrypted = await client.userDecrypt({
      contractAddress,
      ciphertext,
      userAddress: wallet.address
    });

    spinner.succeed(chalk.green('Value decrypted successfully!'));

    console.log(chalk.yellow('\nDecrypted Value:'), chalk.white(decrypted));

    return decrypted;
  } catch (error) {
    spinner.fail(chalk.red('Decryption failed'));
    console.error(chalk.red(error.message));
    throw error;
  }
}

async function showInteractiveMenu() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const question = (query) => new Promise((resolve) => rl.question(query, resolve));

  console.log(chalk.cyan('\n═══════════════════════════════════════════════'));
  console.log(chalk.cyan('           Interactive Menu'));
  console.log(chalk.cyan('═══════════════════════════════════════════════\n'));

  console.log('1. Encrypt a value');
  console.log('2. Decrypt a ciphertext');
  console.log('3. Show client info');
  console.log('4. Exit\n');

  const choice = await question(chalk.yellow('Select an option (1-4): '));

  switch (choice.trim()) {
    case '1': {
      const value = await question(chalk.yellow('\nEnter value to encrypt: '));
      const type = await question(chalk.yellow('Enter FHE type (euint8/euint16/euint32/euint64/ebool): ')) || 'euint32';
      await encryptValue(value, type);
      break;
    }

    case '2': {
      const contractAddress = await question(chalk.yellow('\nEnter contract address: '));
      const ciphertext = await question(chalk.yellow('Enter ciphertext (0x...): '));
      await decryptValue(ciphertext, contractAddress);
      break;
    }

    case '3': {
      console.log(chalk.cyan('\n═══════════════════════════════════════════════'));
      console.log(chalk.cyan('           Client Information'));
      console.log(chalk.cyan('═══════════════════════════════════════════════\n'));
      console.log(chalk.gray('Network:'), chalk.white(process.env.NETWORK || 'sepolia'));
      console.log(chalk.gray('Wallet:'), chalk.white(wallet.address));
      console.log(chalk.gray('Gateway:'), chalk.white(process.env.GATEWAY_URL || 'default'));
      console.log(chalk.gray('Initialized:'), chalk.green('Yes'));
      break;
    }

    case '4': {
      console.log(chalk.green('\nGoodbye! 👋\n'));
      rl.close();
      process.exit(0);
    }

    default: {
      console.log(chalk.red('\nInvalid option. Please try again.'));
    }
  }

  rl.close();

  // Show menu again
  const again = await new Promise((resolve) => {
    const rl2 = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl2.question(chalk.yellow('\nPress Enter to continue...'), () => {
      rl2.close();
      resolve(true);
    });
  });

  if (again) {
    await showInteractiveMenu();
  }
}

// Main function
async function main() {
  // Initialize client
  await initializeClient();

  // Configure CLI
  program
    .name('fhevm-cli')
    .description('FHEVM Universal SDK - Node.js CLI')
    .version('1.0.0');

  program
    .command('encrypt <value> [type]')
    .description('Encrypt a value')
    .action(async (value, type = 'euint32') => {
      await encryptValue(value, type);
      process.exit(0);
    });

  program
    .command('decrypt <ciphertext> <contractAddress>')
    .description('Decrypt a ciphertext')
    .action(async (ciphertext, contractAddress) => {
      await decryptValue(ciphertext, contractAddress);
      process.exit(0);
    });

  program
    .command('info')
    .description('Show client information')
    .action(() => {
      console.log(chalk.cyan('\n═══════════════════════════════════════════════'));
      console.log(chalk.cyan('           Client Information'));
      console.log(chalk.cyan('═══════════════════════════════════════════════\n'));
      console.log(chalk.gray('Network:'), chalk.white(process.env.NETWORK || 'sepolia'));
      console.log(chalk.gray('Wallet:'), chalk.white(wallet.address));
      console.log(chalk.gray('Gateway:'), chalk.white(process.env.GATEWAY_URL || 'default'));
      console.log(chalk.gray('Initialized:'), chalk.green('Yes'));
      console.log('');
      process.exit(0);
    });

  // If no arguments, show interactive menu
  if (process.argv.length <= 2) {
    await showInteractiveMenu();
  } else {
    program.parse();
  }
}

main().catch((error) => {
  console.error(chalk.red('\nError:'), error.message);
  process.exit(1);
});
