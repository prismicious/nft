pragma solidity ^0.5.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract PolyToken is ERC20 {

    constructor () ERC20("PolyToken", "POLY") {
        _mint(address(this), 1000000 * (10 ** uint256(decimals())));
       _mint(msg.sender, 10000 * (10 ** uint256(decimals())));
    }
}