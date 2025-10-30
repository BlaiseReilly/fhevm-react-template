#!/usr/bin/env node

import { setupFHEVMClient } from '../client.js';
import { bytesToHex, formatAddress } from '../utils.js';
import { Contract } from 'ethers';
import chalk from 'chalk';
import ora from 'ora';
import dotenv from 'dotenv';

dotenv.config();

// Example ABI (Privacy Contract Review)
const EXAMPLE_ABI = [
  "function submitContract(string memory _documentHash, string memory _publicTitle) external returns (uint256)",
  "function getTotalContracts() external view returns (uint256)",
  "function getContractInfo(uint256 _contractId) external view returns (string memory, address, uint256, bool, string memory, uint256)"
];

async function main() {
  console.log(chalk.cyan('\n╔═══════════════════════════════════════════════╗'));
  console.log(chalk.cyan('║        FHEVM Contract Interaction           ║'));
  console.log(chalk.cyan('╚═══════════════════════════════════════════════╝\n'));

  const spinner = ora('Initializing FHEVM client...').start();

  try {
    // Initialize client
    const { client, wallet } = await setupFHEVMClient();
    spinner.succeed(chalk.green('FHEVM client initialized'));

    console.log(chalk.gray(`Wallet: ${wallet.address}\n`));

    // Check if contract address is configured
    if (!process.env.CONTRACT_ADDRESS) {
      console.log(chalk.yellow('⚠️  CONTRACT_ADDRESS not configured in .env'));
      console.log(chalk.gray('This example demonstrates how to interact with contracts.\n'));

      // Demo encryption
      spinner.start('Encrypting demo value...');
      const encrypted = await client.encrypt(100, 'euint32');
      spinner.succeed(chalk.green('Value encrypted\n'));

      console.log(chalk.yellow('═══════════════════════════════════════════════'));
      console.log(chalk.yellow('           Demo Encryption'));
      console.log(chalk.yellow('═══════════════════════════════════════════════\n'));

      console.log(chalk.gray('Value:'), chalk.white('100'));
      console.log(chalk.gray('Type:'), chalk.white('euint32'));
      console.log(chalk.gray('Encrypted:'), chalk.white(bytesToHex(encrypted.data).substring(0, 30) + '...'));
      console.log('');

      console.log(chalk.cyan('To interact with a real contract:'));
      console.log(chalk.gray('1. Set CONTRACT_ADDRESS in .env'));
      console.log(chalk.gray('2. Run this command again\n'));

      process.exit(0);
    }

    const contractAddress = process.env.CONTRACT_ADDRESS;
    const contract = new Contract(contractAddress, EXAMPLE_ABI, wallet);

    console.log(chalk.gray(`Contract: ${formatAddress(contractAddress)}\n`));

    // Get total contracts
    spinner.start('Fetching contract data...');
    const totalContracts = await contract.getTotalContracts();
    spinner.succeed(chalk.green('Contract data retrieved\n'));

    console.log(chalk.yellow('═══════════════════════════════════════════════'));
    console.log(chalk.yellow('           Contract Information'));
    console.log(chalk.yellow('═══════════════════════════════════════════════\n'));

    console.log(chalk.gray('Total Contracts:'), chalk.white(totalContracts.toString()));

    // If there are contracts, show the first one
    if (totalContracts > 0n) {
      spinner.start('Loading contract details...');
      const contractInfo = await contract.getContractInfo(1);
      spinner.succeed(chalk.green('Contract details loaded\n'));

      console.log(chalk.yellow('\nFirst Contract:'));
      console.log(chalk.gray('Document Hash:'), chalk.white(contractInfo[0]));
      console.log(chalk.gray('Submitter:'), chalk.white(formatAddress(contractInfo[1])));
      console.log(chalk.gray('Timestamp:'), chalk.white(new Date(Number(contractInfo[2]) * 1000).toLocaleString()));
      console.log(chalk.gray('Status:'), chalk.white(contractInfo[3] ? 'Reviewed' : 'Pending'));
      console.log(chalk.gray('Title:'), chalk.white(contractInfo[4]));
      console.log(chalk.gray('Clauses:'), chalk.white(contractInfo[5].toString()));
    }

    console.log('');
    process.exit(0);

  } catch (error) {
    spinner.fail(chalk.red('Interaction failed'));
    console.error(chalk.red('Error:'), error.message);
    process.exit(1);
  }
}

main();
