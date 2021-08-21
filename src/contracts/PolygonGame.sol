pragma solidity ^0.5.0;

import "./ERC721Full.sol";

contract PolygonGame is ERC721Full {
    Character[] public characters;
    string[] public colors;
    mapping(string => bool) _colorExists;    
    uint randNonce = 0;
    constructor() ERC721Full("Polygon Character", "PGC") public {
    }
    
    function randMod(uint _modulus) internal returns(uint) {
    randNonce++;
    return uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, randNonce))) % _modulus;
  }
        
    struct Character {
        uint256 xp;
        uint256 gainedXp;
        uint8 level;
        uint256 vertices;
        uint64 staminaTimeStamp;
    }

    function mint() public {
        //colors.push(_color);
        uint256 xp = 0;
        uint256 gainedXp = 0;
        uint8 level = 0;
        uint256 vertices  = randMod(5);
        uint64 staminaTimeStamp = 0;
        characters.push(Character(xp, gainedXp, level, vertices, staminaTimeStamp));
        uint _id = characters.length - 1;
        _mint(msg.sender, _id);
    }
}