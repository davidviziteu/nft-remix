// nu stiu cum interactioneaza asta cu ts
//https://docs.ethers.io/v5/api/contract/contract/#Contract-connect
//mai sus e documentatia pt framework ul de testare
const chai =  require("chai")
// const solidity = require("ethereum-waffle");
// chai.use(solidity);
const { expect, assert } = chai
const { ethers } = require("hardhat")
const nftHashesArr = require('./nfts.js')


let remixer
let collection
let owner
let addr1
let addr2
let addrs

beforeEach(async function () {
    //asta se executa inainte de fiecare "it"???

});



describe(`testing emitting ok`, () => {
    // it("Should set the right owner", async function () {
    //     expect(await remixer.owner()).to.equal(owner.address);
    // })

    it("should deploy the contract and check it's owner", async function () {
      const remixerFactory = await ethers.getContractFactory("Checker");
      const mockCollFactory = await ethers.getContractFactory("MockCollection");
      [owner, addr1, addr2, ...addrs] = await ethers.getSigners();//fake wallets
      remixer = await remixerFactory.deploy()
      collection = await mockCollFactory.deploy()
      await remixer.deployed()
      await collection.deployed()
      await collection.setAddr1(addr1.address);
      await collection.setAddr2(addr2.address);
      console.log(`addr1: ${addr1.address}`);
      console.log(`addr2: ${addr2.address}`);
      expect(await remixer.connect(addr1).owner()).to.be.equal(owner.address)
    })
    it("should check the mock collection has token 1 owner set correcntly", async function () {

      expect(await collection.connect(addr1).ownerOf(1))
      .to.be.equal(addr1.address)
    })
    it("should check that nft 1 was remixed correctly", async function () {
      expect(await remixer.connect(addr1).mintRemixedNft(collection.address, 1, nftHashesArr[1], 
        {value: ethers.utils.parseEther("20.0")}
      ))
      .to.emit(remixer, "RemixedNft")
      .withArgs(1, nftHashesArr[1]);
    })
    it("should check that hash of nft 1 is returned correctly", async function () {
      expect(await remixer.connect(addr1).hashOfToken(1)).to.be.equal(nftHashesArr[1])
    })
    it("should check that the total nft remixed count was incremented correctly (=1)", async function () {
      expect(await remixer.connect(addr1).totalRemixedNfts()).to.be.equal(1)
    })
    it("should check that nft 2 was remixed correctly", async function () {
      await expect(remixer.connect(addr2).mintRemixedNft(collection.address, 2, nftHashesArr[2], 
        {value: ethers.utils.parseEther("20.0")}
      ))
      .to.emit(remixer, "RemixedNft")
      .withArgs(2, nftHashesArr[2]);
    })
    it("should check that the total nft remixed count was incremented correctly (=2)", async function () {
      expect(await remixer.connect(addr1).totalRemixedNfts()).to.be.equal(2)
    })
    it("should burn the nft 1", async function () {
      expect(await remixer.connect(addr1).burn(1))
      .to.emit(remixer, "BurnedNft")
      .withArgs(1);
    })
    it("should check that the total nft remixed count is the same (=2)", async function () {
      expect(await remixer.connect(addr1).totalRemixedNfts()).to.be.equal(2)
    })
    it("should fail because user did not pay enough", async function () {
      await expect(remixer.connect(addr2).mintRemixedNft(collection.address, 3, nftHashesArr[2], 
        {value: ethers.utils.parseEther("0.0")}
      )).to.be.revertedWith("need to pay up");
    })
    it("should check that the total nft remixed count is the same (=2)", async function () {
      expect(await remixer.connect(addr1).totalRemixedNfts()).to.be.equal(2)
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