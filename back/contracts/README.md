# NFTToken.sol
```solidity
contract NFTToken is ERC721Enumerable, ERC721URIStorage, Ownable {
    // Counters 라이브러리를 가져와 _tokenId 변수로 선언하였다.
    using Counters for Counters.Counter;
    Counters.Counter private _tokenId;

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {}

    // 토큰 보내기 전에 실행되는 함수이다.
    // firstTokenId와 batchSize는 부모(ERC721Enumerable)가 원하고 있다.
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 firstTokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, firstTokenId, batchSize);
    }

    // 토큰 소각 메서드이나, 가져다 쓰지는 않을 것이다.
    // 부모 중 어느 쪽을 가져다 쓸 것인지 지정해준 것이다.
    // ERC721URIStorage 먼저 확인하고, 없으면 ERC721의 것을 가져다 쓴다.
    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    // NFT를 올릴 때마다 CID를 tokenURI에 저장한다. 가져올 때는 baseURI를 합쳐서 가져온다.
    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId); // ERC721URIStorage의 super를 가져온다.
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://gateway.pinata.cloud/ipfs/";
    }

    // Minting
    function safeMint(string memory uri) public {
        uint256 tokenId = _tokenId.current();
        _tokenId.increment();
        _safeMint(msg.sender, tokenId); // ERC721 에서 상속받았다.
        _setTokenURI(tokenId, uri);
    }
}
```