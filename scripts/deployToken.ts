// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from 'hardhat';

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const tokenAddress = '0xa598AB9a91454f49Ec09F5f20580D8ac854d0f6c';
  const claimAddress = '0xEFB64aADD6cf95db44CBEC67258B1b2fCb25e88e';
  const InsureFi = await ethers.getContractAt('InsureFi', tokenAddress);
  //   const deployInsureFi = await InsureFi.deploy();

  //   await deployInsureFi.deployed();

  console.log('Token address:', InsureFi.address);

  const mint = await InsureFi.mint(claimAddress, '10000000000000000000000');
  console.log(mint);

  //   console.log("Sleeping.....");
  //   // Wait for etherscan to notice that the contract has been deployed
  //   await sleep(50000);

  //   // Verify the contract after deploying
  //   //@ts-ignore
  //   await hre.run("verify:verify", {
  //     address: deployInsureFi.address,
  //     constructorArguments: [],
  //   });
}

// function sleep(ms: any) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
