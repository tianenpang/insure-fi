// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract InsureFi is ERC20, Ownable {
    address to;

    constructor() ERC20("InsureFi", "INF") {}

    function mint(address _to, uint256 amount) public onlyOwner {
        to = _to; 
        _mint(to, amount);
    }
}