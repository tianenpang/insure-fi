import * as dotenv from 'dotenv';
import { HardhatUserConfig, task } from 'hardhat/config';
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';
import 'hardhat-gas-reporter';
// import 'hardhat-abi-exporter';
import 'solidity-coverage';

dotenv.config();

task('accounts', 'Prints the list of accounts', async (_taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

const config: HardhatUserConfig = {
  solidity: '0.8.4',
  networks: {
    mumbai: {
      url: process.env.ROPSTEN_URL || '',
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : []
    },
    hardhat: {
      forking: {
        url: 'https://speedy-nodes-nyc.moralis.io/1081efd32566a9cdb0bd5ccf/polygon/mainnet'
      }
    }
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: 'USD'
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  },
  typechain: {
    target: 'ethers-v5',
    outDir: 'artifacts/contract-type',
    alwaysGenerateOverloads: false
  }
  // abiExporter: {
  //   only: [':Registration$', ':Claims$', ':InsureFi$'],
  //   path: './src/lib/abi',
  //   spacing: 2,
  //   pretty: true,
  //   runOnCompile: true
  // }
};

export default config;
