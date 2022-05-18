import "@openzeppelin/contracts/utils/Strings.sol";

contract MockCollection{
    function ownerOf(uint256 tokenId) external view returns (address owner){
        if(tokenId == 1)
            return 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;
        if(tokenId == 2)
            return 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2;
        require(1 == 0, "ERC721: owner query for nonexistent token"); //mock 
    }
}