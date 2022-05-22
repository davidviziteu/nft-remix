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
    using Strings for uint;
    uint _counter;
    uint private remixCostInWei;
    uint private burnCostInWei;
    struct ownedIds{
        address ctr;
        uint id;
        uint hashOfImage;
        bool exists;
    }

    mapping(uint => ownedIds) private idToContractData;
    mapping(address => uint) private balances;
    string private baseURI;
    event RemixedNft(uint id, uint hash);
    event BurnedNft(uint id);
    constructor() Ownable() {
        _counter = 0;
        remixCostInWei = 1 ether;
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner { baseURI = _newBaseURI; }
    function _baseURI() public view returns(string memory){return baseURI;}
    function remixCost() public view returns (uint) {return remixCostInWei;}
    function burnCost() public view returns (uint) {return burnCostInWei;}
    function setRemixCostWei(uint _newTaxInWei) public onlyOwner {remixCostInWei = _newTaxInWei;}
    function setBurnCostWei(uint _newTaxInWei) public onlyOwner {burnCostInWei = _newTaxInWei;}
    function _exists(uint _id) internal view returns (bool){
        return idToContractData[_id].exists == true;
    }

    function tokenURI(uint _tokenId) public view virtual returns (string memory) {
        require(_exists(_tokenId), "URI query for nonexistent token");
        string memory uri = _baseURI();
        return bytes(uri).length > 0 ? string(abi.encodePacked(baseURI, _tokenId.toString())) : "";
    }

    function ownerOf(uint _tokenId) external view returns (address){
        require(_exists(_tokenId), "token id not existing");
        ownedIds memory _reference = idToContractData[_tokenId];
        return IERC721(_reference.ctr).ownerOf(_reference.id);
    }

    function mintRemixedNft(address _originalContract, uint _idInContract, uint _hashOfImg) public payable {
        require(msg.value >= remixCost(), "need to pay up");
        address ownerOfNft = IERC721(_originalContract).ownerOf(_idInContract); 
        require(ownerOfNft == msg.sender, "cannot remix an nft that is not yours");
        uint newId = ++_counter;
        balances[msg.sender]++;
        idToContractData[newId] = ownedIds(_originalContract, _idInContract, _hashOfImg, true);
        emit RemixedNft(newId, _hashOfImg);
    }

    function currentCtrBalance() public view onlyOwner returns (uint){
        return address(this).balance;
    }

    function withdraw() public payable onlyOwner {
        (bool os, ) = payable(owner()).call{value: address(this).balance}("");
        require(os, "withdraw failed");
    }

    function burn(uint _tokenId) public payable {
        require(_exists(_tokenId), "token id not existing");
        require(msg.value >= burnCost(), "need to pay up");
        ownedIds memory _reference = idToContractData[_tokenId];
        address originalTokenOwner = IERC721(_reference.ctr).ownerOf(_reference.id);
        require(originalTokenOwner == msg.sender, "you cannot burn someone else's token");
        idToContractData[_tokenId].exists = false; //check if needed
        delete idToContractData[_tokenId];
        balances[msg.sender]--;
        emit BurnedNft(_tokenId);
    }

    function balanceOf(address _addr) public view returns(uint){
        return balances[_addr];
    }

    function hashOfToken(uint _tokenId) public view returns(uint) {
        require(_exists(_tokenId), "Hash query for nonexistent token");
        return idToContractData[_tokenId].hashOfImage;
    }

    function totalRemixedNfts() public view returns(uint){
        return _counter;
    }

}