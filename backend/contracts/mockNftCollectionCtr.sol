// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/utils/Strings.sol";

contract MockCollection{
    address private addr1;
    address private addr2;
    constructor(){
        addr1 = address(0x70997970C51812dc3A010C7d01b50e0d17dc79C8);
        addr2 = address(0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC);
    }
    function setAddr1(address _addr1) public {
        addr1 = _addr1;
    }
    function setAddr2(address _addr2) public {
        addr2 = _addr2;
    }
    function ownerOf(uint256 tokenId) external view returns (address owner){
        if(tokenId == 1)
            return addr1;
        if(tokenId == 2)
            return addr2;
        require(1 == 0, "ERC721: owner query for nonexistent token"); //mock 
    }
}