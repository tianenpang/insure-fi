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
  // const [user1, user2, user3] = await ethers.getSigners();
  const tokenAddress = '0xa598AB9a91454f49Ec09F5f20580D8ac854d0f6c';
  const claimAddress = '0xEFB64aADD6cf95db44CBEC67258B1b2fCb25e88e';
  const CFAV1 = '0x49e565Ed1bdc17F3d220f72DF0857C26FA83F873';
  const acceptedToken = '0x96B82B65ACF7072eFEb00502F45757F254c2a0D4';
  const InsureFi = await ethers.getContractAt('InsureFi', tokenAddress);
  const Claims = await ethers.getContractFactory('Claims');
  const deployClaims = await Claims.deploy(tokenAddress, CFAV1, acceptedToken);

  await deployClaims.deployed();

  console.log('Claims deployed to:', deployClaims.address);

  const tokenBalance = await InsureFi.balanceOf(claimAddress);
  console.log('InsureFi balance:', tokenBalance);

  //   await Claims.connect(user1).registerCar("Toyota","Corolla",1998,10000,"123ABC");
  //   console.log("Register car succesful");

  //   const details = await Claims.insuree(user1.address);
  //   console.log(details);

  //   const getCost = await Claims.connect(user1).getCost();
  //   console.log("Insurance cost is:", getCost);

  //   const ethVal = {value:ethers.utils.parseEther("0.51")}
  //   const makePayment = await Claims.makePayment(ethVal);
  //   console.log("Payment succesfull, You have been insured!");

  //   const startClaim = await Claims.startClaim("John",1,3,25);
  //   console.log("Claims started");

  //   const InsBal = await InsureFi.balanceOf(user1.address);
  //   console.log("InsureFi balance before claims",InsBal);

  //   const payOut = await Claims.makePayout()

  //   const InsBal2 = await InsureFi.balanceOf(user1.address);
  //   console.log("InsureFi balance after claims",InsBal2);

  //   const flowDetails = await Claims.flowDetails();
  //   console.log("SuperFluid flow details are:", flowDetails);

  console.log('Sleeping.....');
  // Wait for etherscan to notice that the contract has been deployed
  await sleep(50000);

  // Verify the contract after deploying
  //@ts-ignore
  await hre.run('verify:verify', {
    address: deployClaims.address,
    constructorArguments: [tokenAddress, CFAV1, acceptedToken]
  });
}
function sleep(ms: any) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
