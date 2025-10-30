#!/usr/bin/env node

import { setupFHEVMClient } from '../client.js';
import { bytesToHex, isValidFHEType } from '../utils.js';
import chalk from 'chalk';
import ora from 'ora';

async function main() {
  const args = process.argv.slice(2);

  if (args.length < 1) {
    console.log(chalk.yellow('Usage: npm run encrypt <value> [type]'));
    console.log(chalk.gray('Example: npm run encrypt 42 euint32'));
    console.log(chalk.gray('Types: euint8, euint16, euint32, euint64, euint128, ebool'));
    process.exit(1);
  }

  const value = args[0];
  const type = args[1] || 'euint32';

  if (!isValidFHEType(type)) {
    console.error(chalk.red(`Invalid FHE type: ${type}`));
    console.log(chalk.gray('Valid types: euint8, euint16, euint32, euint64, euint128, ebool, eaddress'));
    process.exit(1);
  }

  console.log(chalk.cyan('\n╔═══════════════════════════════════════════════╗'));
  console.log(chalk.cyan('║          FHEVM Encryption Tool              ║'));
  console.log(chalk.cyan('╚═══════════════════════════════════════════════╝\n'));

  const spinner = ora('Initializing FHEVM client...').start();

  try {
    // Initialize client
    const { client, wallet } = await setupFHEVMClient();
    spinner.succeed(chalk.green('FHEVM client initialized'));

    console.log(chalk.gray(`Wallet: ${wallet.address}\n`));

    // Encrypt value
    spinner.start('Encrypting value...');
    const encrypted = await client.encrypt(
      type === 'ebool' ? Boolean(Number(value)) : Number(value),
      type
    );

    spinner.succeed(chalk.green('Value encrypted successfully!\n'));

    // Display results
    console.log(chalk.yellow('═══════════════════════════════════════════════'));
    console.log(chalk.yellow('           Encryption Results'));
    console.log(chalk.yellow('═══════════════════════════════════════════════\n'));

    console.log(chalk.gray('Original Value:'), chalk.white(value));
    console.log(chalk.gray('FHE Type:'), chalk.white(encrypted.type));
    console.log(chalk.gray('Encrypted Data:'), chalk.white(bytesToHex(encrypted.data)));
    console.log(chalk.gray('Data Length:'), chalk.white(`${encrypted.data.length} bytes`));
    console.log('');

    process.exit(0);
  } catch (error) {
    spinner.fail(chalk.red('Encryption failed'));
    console.error(chalk.red('Error:'), error.message);
    process.exit(1);
  }
}

main();
