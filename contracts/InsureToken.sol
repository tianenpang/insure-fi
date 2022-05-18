// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract InsureFi is ERC20, Ownable {
    address to;

    constructor(address _to) ERC20("InsureFi", "INF") {
        to = _to; 
    }

    function mint(uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}