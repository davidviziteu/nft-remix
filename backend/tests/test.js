// nu stiu cum interactioneaza asta cu ts
//https://docs.ethers.io/v5/api/contract/contract/#Contract-connect
//mai sus e documentatia pt framework ul de testare

const { expect, assert } = require("chai")
const { ethers } = require("hardhat")

let deployedContract
let owner
let addr1
let addr2
let addrs

beforeEach(async function () {
    //asta se executa inainte de fiecare "describe"
    const ctrFactory = await ethers.getContractFactory("nume_TODO");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();//fake wallets
    deployedContract = await ctrFactory.deploy(
        //aici vin argumentele pt constructorul contractului
    )
    await deployedContract.deployed()
});



describe(`deployment`, () => {
    it("Should set the right owner", async function () {
        expect(await deployedContract.owner()).to.equal(owner.address);
    })
    it("should check something else", async function () {
        //something else
    })
})
describe(`transactions`, () => {
    it("should check something else", async function () {
        //something else
    })
})