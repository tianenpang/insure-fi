//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;


interface IERC20{
    function transfer(address to, uint256 amount) external returns (bool);
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}