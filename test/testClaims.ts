import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Test Claims", function () {
    let greeter:any
    let user1:SignerWithAddress
    let user2:SignerWithAddress
    let user3:SignerWithAddress

    before(
        async() =>{
            const Greeter = await ethers.getContractFactory("Claims");
            greeter = await Greeter.deploy("Hello, world!");
            await greeter.deployed();
            [user1,user2,user3] = await ethers.getSigners();
        }
    )
  it("Should return the new greeting once it's changed", async function () {


    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
