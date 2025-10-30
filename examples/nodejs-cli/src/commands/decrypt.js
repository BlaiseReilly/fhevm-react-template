#!/usr/bin/env node

import { setupFHEVMClient } from '../client.js';
import { formatAddress } from '../utils.js';
import chalk from 'chalk';
import ora from 'ora';

async function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log(chalk.yellow('Usage: npm run decrypt <ciphertext> <contractAddress>'));
    console.log(chalk.gray('Example: npm run decrypt 0x1234... 0x5A04...'));
    process.exit(1);
  }

  const ciphertext = args[0];
  const contractAddress = args[1];

  console.log(chalk.cyan('\n╔═══════════════════════════════════════════════╗'));
  console.log(chalk.cyan('║          FHEVM Decryption Tool              ║'));
  console.log(chalk.cyan('╚═══════════════════════════════════════════════╝\n'));

  const spinner = ora('Initializing FHEVM client...').start();

  try {
    // Initialize client
    const { client, wallet } = await setupFHEVMClient();
    spinner.succeed(chalk.green('FHEVM client initialized'));

    console.log(chalk.gray(`Wallet: ${wallet.address}`));
    console.log(chalk.gray(`Contract: ${formatAddress(contractAddress)}\n`));

    // Decrypt value
    spinner.start('Decrypting ciphertext...');
    const decrypted = await client.userDecrypt({
      contractAddress,
      ciphertext,
      userAddress: wallet.address
    });

    spinner.succeed(chalk.green('Value decrypted successfully!\n'));

    // Display results
    console.log(chalk.yellow('═══════════════════════════════════════════════'));
    console.log(chalk.yellow('           Decryption Results'));
    console.log(chalk.yellow('═══════════════════════════════════════════════\n'));

    console.log(chalk.gray('Ciphertext:'), chalk.white(ciphertext.substring(0, 20) + '...'));
    console.log(chalk.gray('Decrypted Value:'), chalk.white(decrypted));
    console.log('');

    process.exit(0);
  } catch (error) {
    spinner.fail(chalk.red('Decryption failed'));
    console.error(chalk.red('Error:'), error.message);
    process.exit(1);
  }
}

main();
