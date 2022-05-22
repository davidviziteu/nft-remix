// nu stiu cum interactioneaza asta cu ts
//https://docs.ethers.io/v5/api/contract/contract/#Contract-connect
//mai sus e documentatia pt framework ul de testare
const chai =  require("chai")
// const solidity = require("ethereum-waffle");
// chai.use(solidity);
const { expect, assert } = chai
const { ethers } = require("hardhat")



let remixer
let collection
let owner
let addr1
let addr2
let addrs

beforeEach(async function () {
    //asta se executa inainte de fiecare "describe"
    const remixerFactory = await ethers.getContractFactory("Checker");
    const mockCollFactory = await ethers.getContractFactory("MockCollection");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();//fake wallets
    remixer = await remixerFactory.deploy()
    collection = await mockCollFactory.deploy()
    await remixer.deployed()
    await collection.deployed()
    await collection.setAddr1(addr1.address);
    await collection.setAddr1(addr2.address);
});



describe(`testing emitting ok`, () => {
    // it("Should set the right owner", async function () {
    //     expect(await remixer.owner()).to.equal(owner.address);
    // })
    it("should not fail", async function () {
      await expect(remixer.connect(addr1).mintRemixedNft(collection.address, 1, addr1.address, 
        {value: ethers.utils.parseEther("20.0")}
      ))
      .to.emit(remixer, "RemixedNft")
      .withArgs(1);

    })
    it("should burn the nft", async function () {
      await remixer.connect(addr1).burn(1)
      await expect()
      .to.emit(remixer, "RemixedNft")
      .withArgs(1);

    })
})

describe(`testing emitting failure`, () => {
  // it("Should set the right owner", async function () {
  //     expect(await remixer.owner()).to.equal(owner.address);
  // })
  it("should fail", async function () {
    await expect(remixer.connect(addr1).mintRemixedNft(collection.address, 1, addr1.address, 
      {value: ethers.utils.parseEther("20.0")}
    ))
    .to.emit(remixer, "RemixedNft")
    .withArgs(2);

  })
  it("should print transation return data", async function () {
    let retData = await remixer.connect(addr1).mintRemixedNft(collection.address, 1, addr1.address, 
      {value: ethers.utils.parseEther("20.0")}
    )
    console.log(JSON.stringify(retData));
  })
})


describe(`printint return data`, () => {
  it("should print transation return data", async function () {
    let retData = await remixer.connect(addr1).mintRemixedNft(collection.address, 1, addr1.address, 
      {value: ethers.utils.parseEther("20.0")}
    )
    console.log(JSON.stringify(retData));
  })
})