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
  const [user1,user2,user3] = await ethers.getSigners()
  const tokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  const claimAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
  const InsureFi = await ethers.getContractAt("InsureFi", tokenAddress);
  const Claims = await ethers.getContractAt("Claims",claimAddress);
    //   const deployClaims = await Claims.deploy(tokenAddress);

    //   await deployClaims.deployed();

  console.log("Claims deployed to:", Claims.address);

  const tokenBalance = await InsureFi.balanceOf(claimAddress)
  console.log("InsureFi balance:",tokenBalance);
  
  await Claims.connect(user1).registerCar("Toyota","Corolla",1998,10000,"123ABC");
  console.log("Register car succesful");
  
//   await Claims.viewRegistration();
  
  const getCost = await Claims.connect(user1).getCost();
  console.log("Insurance cost is:", getCost);

  const ethVal = {value:ethers.utils.parseEther("0.41")}
  const makePayment = await Claims.connect(user1).makePayment(ethVal);
  console.log("Payment succesfull, You have been insured!");

  const seeReg = await Claims.policyID();
  console.log(seeReg);
  
  
//   const startClaim = await Claims.startClaim("John",1,3,25);
//   console.log("Claims started");
 
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
