// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/utils/Strings.sol";

contract MockCollection{
    address addr1;
    address addr2;
    constructor(){
        addr1 = address(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4);
        addr2 = address(0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2);
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