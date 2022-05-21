import { ethers } from 'hardhat';
import type { Claims } from '@contract-type';
// import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

describe('Test Claims', function () {
  let claims: Claims;
  // let user1: SignerWithAddress;
  // let user2: SignerWithAddress;
  // let user3: SignerWithAddress;

  before(async () => {
    const Claims = await ethers.getContractFactory('Claims');
    claims = await Claims.deploy('', '', '', {});
    await claims.deployed();
    await ethers.getSigners();
    // [user1, user2, user3] = await ethers.getSigners();
  });
  it("Should return the new greeting once it's changed", async function () {
    // expect(await claims.greet()).to.equal('Hello, world!');
    // const setGreetingTx = await claims.setGreeting('Hola, mundo!');
    // wait until the transaction is mined
    // await setGreetingTx.wait();
    // expect(await greeter.greet()).to.equal('Hola, mundo!');
  });
});
