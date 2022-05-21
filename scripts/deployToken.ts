// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const tokenAddress = "0xC5123B98c3A0aa1a4F9390BCf76f7B9D775a5687"
  const claimAddress = "0x511930A41fae024714948b700764394CB759B72f"
  const InsureFi = await ethers.getContractAt("InsureFi",tokenAddress);
//   const deployInsureFi = await InsureFi.deploy();

//   await deployInsureFi.deployed();

  console.log("Token address:", InsureFi.address);

  const mint = await InsureFi.mint(claimAddress,"10000000000000000000000");
  console.log(mint);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
