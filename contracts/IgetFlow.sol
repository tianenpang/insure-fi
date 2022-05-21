//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import {
    ISuperfluidToken
} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluidToken.sol";

interface Igetflow is ISuperfluidToken{
   function getFlow(
        ISuperfluidToken token,
        address sender,
        address receiver
    )
        external view virtual
        returns (
            uint256 timestamp,
            int96 flowRate,
            uint256 deposit,
            uint256 owedDeposit
        );
}
