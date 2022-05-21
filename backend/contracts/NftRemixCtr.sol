// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";

contract Checker is Ownable {
    using Strings for uint256;
    uint _counter;
    uint private costInWei;
    struct ownedIds{
        address ctr;
        uint id;
        bool exists;
    }

    mapping(uint => ownedIds) private idToContractData;
    string private baseURI;

    constructor() Ownable() {
        _counter = 1;
        costInWei = 1 ether;
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner { baseURI = _newBaseURI; }
    function _baseURI() public view returns(string memory){return baseURI;}
    function remixCost() public view returns (uint256) {return costInWei;}
    function setRemixCostWei(uint _newTaxInWei) public onlyOwner {costInWei = _newTaxInWei;}
    function _exists(uint _id) internal view returns (bool){
        return idToContractData[_id].exists == true;
    }

    function tokenURI(uint256 _tokenId) public view virtual returns (string memory) {
        require(_exists(_tokenId), "ERC721Metadata: URI query for nonexistent token");
        string memory uri = _baseURI();
        return bytes(uri).length > 0 ? string(abi.encodePacked(baseURI, _tokenId.toString())) : "";
    }

    function ownerOf(uint256 _tokenId) external view returns (address owner){
        require(_exists(_tokenId), "token id not existing");
        ownedIds memory _reference = idToContractData[_tokenId];
        return IERC721(_reference.ctr).ownerOf(_reference.id);
    }

    function mintRemixedNft(address _originalContract, uint _idInContract, address _minter) public payable returns (uint newTokenId){
        require(msg.value >= remixCost(), "need to pay up");
        address ownerOfNft = IERC721(_originalContract).ownerOf(_idInContract); 
        require(ownerOfNft == _minter, "cannot remix an nft that is not _minter's");
        uint newId = _counter++;
        idToContractData[newId] = ownedIds(_originalContract, _idInContract, true);
        return newId;
    }

    function currentBalance() public view onlyOwner returns (uint256){
        return address(this).balance;
    }
    function withdraw() public payable onlyOwner {
        (bool os, ) = payable(owner()).call{value: address(this).balance}("");
        require(os, "withdraw failed");
    }

    function burn(uint256 _tokenId) public returns (uint256) {
        require(_exists(_tokenId), "token id not existing");
        ownedIds memory _reference = idToContractData[_tokenId];
        address original_token_owner = IERC721(_reference.ctr).ownerOf(_reference.id);
        require(original_token_owner == msg.sender, "you cannot burn someone else's token");
        idToContractData[_tokenId].exists = false; //check if needed
        delete idToContractData[_tokenId];
        return _tokenId;
    }

}