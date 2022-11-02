// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract FungSampleContract is ERC721URIStorage, Ownable, AccessControl {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    mapping(uint256 => string) private _tokenURIs;

    constructor() ERC721("FungSampleContract", "FUNGSAMPLE") {}

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function mintWithoutBuyerAddress() public payable returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _safeMint(msg.sender, newItemId);
        return newItemId;
    }

    function mintWithBuyerAddress(address buyer) external payable returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _safeMint(buyer, newItemId);
        return newItemId;
    }

    function mintNFT(address recipient, string memory _tokenURI) external payable returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _safeMint(recipient, newItemId);
        _setTokenURI(newItemId, _tokenURI);
        return newItemId;
    }

    function failedMint() external payable {
        require(false, "Error from mint function");
    }

    function grantMinerRole(address minter) external onlyOwner {
        _setupRole(MINTER_ROLE, minter);
    }

    function mintWithAccessControl() external payable returns (uint256) {
        require(hasRole(MINTER_ROLE, msg.sender), "Caller is not a minter");
        return mintWithoutBuyerAddress();
    }
}
