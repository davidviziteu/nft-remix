// nu stiu cum interactioneaza asta cu ts
//https://docs.ethers.io/v5/api/contract/contract/#Contract-connect
//mai sus e documentatia pt framework ul de testare

const { expect, assert } = require("chai")
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
    await collection.setAddr1(addr1);
    await collection.setAddr1(addr2);
});



describe(`deployment`, () => {
    it("Should set the right owner", async function () {
        expect(await remixer.owner()).to.equal(owner.address);
    })
    it("return a number", async function () {
        let returnedToken = await remixer.connect(addr1).mintRemixedNft(collection.address, 1, addr1.address)
        console.log(`returned number: ${returnedToken}`);
    })
})