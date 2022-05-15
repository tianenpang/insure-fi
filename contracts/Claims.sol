//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "./Registration.sol";
import {
    ISuperfluid,
    ISuperfluidToken
} from  "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

import {
    IInstantDistributionAgreementV1
} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IInstantDistributionAgreementV1.sol";

import {
    IDAv1Library
} from "@superfluid-finance/ethereum-contracts/contracts/apps/IDAv1Library.sol";


contract Claims is Registration {

    // using IDAv1Library for IDAv1Library.InitData;
    // IDAv1Library.InitData internal _idav1Lib;

    // uint32 internal constant payoutID = 0;
    // address internal immutable Admin;
    // ISuperfluidToken public token;

    struct Holder {
        string lastName;
        uint16 policyID;
        uint8 yearsDriving;
        uint8 age;
    }

    struct Event {
        string eventDate;
        string eventTime;
        string eventLocation;
        string eventDescription;
        string eventImgHash;
    }


    mapping(address => Holder) public holder;
    mapping(address => Event) public accident;

    // constructor(
    //     address admin,
    //     ISuperfluid _host,
    //     IInstantDistributionAgreementV1 _ida,
    //     ISuperfluidToken _token
    // ) {
    //     Admin = admin;
    //     token = _token;
    //     _idav1Lib = IDAv1Library.InitData(_host, _ida);
    //     _idav1Lib.createIndex(_token, payoutID);
    // }

    function startClaim(string memory _lastName, uint16 _policyID, uint8 _yearsDriving, uint8 _age) public {
        Holder storage user = holder[msg.sender];
        user.lastName = _lastName;
        user.policyID = _policyID;
        user.yearsDriving = _yearsDriving;
        user.age = _age;
    }

    // function updateUnits(address subscriber, uint128 units) external {
    //     require(msg.sender == _ADMIN, "unathorized");
    //     _idav1Lib.updateSubscriptionUnits(
    //         token,
    //         _INDEX_ID,
    //         subscriber,
    //         units
    //     );
    // }

    function vehicleInfo() public view returns(Car memory) {
        return insuree[msg.sender];
    }

    function eventInfo (string memory _eventDate, string memory _eventTime, string memory _eventLocation, string memory _eventDescription, string memory _eventImgHash) public {
        Event storage e = accident[msg.sender];
        e.eventDate = _eventDate;
        e.eventTime = _eventTime;
        e.eventLocation = _eventLocation;
        e.eventDescription = _eventDescription;
        e.eventImgHash = _eventImgHash;
    }

    function timeDifference() internal returns(uint){
        uint timeDifference = block.timestamp - insuree[msg.sender].registrationTime;
        return timeDifference / 60 * 60 * 24;
    }

    function getCostByAge() internal returns (uint) {
        Holder memory user = holder[msg.sender];
        uint age = user.age;
        if(age <= 25) {
            return 0.03 ether;
        }
        if(age > 25 && age <= 56) {
            return 0.02 ether;
        }
        if(age > 56) {
            return 0.01 ether;
        }
    }

    function getCostByYearsDriving() internal returns (uint) {
        Holder memory user = holder[msg.sender];
        uint yearsDriving = user.yearsDriving;
        if(yearsDriving <= 5) {
            return 0.03 ether;
        }
        if(yearsDriving > 5 && yearsDriving <= 15) {
            return 0.02 ether;
        }
        if(yearsDriving > 15) {
            return 0.01 ether;
        }
    }

    function getClaims() public returns(uint) {
        require(holder[msg.sender].policyID != 0, "Verify ID");
        return getPriceYear() + getPriceMake() + getCostByAge() + getCostByYearsDriving() / timeDifference();
    }

    // function makePayout() external {
    //     // require(holder[msg.sender]);
    //     _idav1Lib.distribute(token, payoutID, getClaims());
    // }

    function payClaims() public {
        (bool sent, ) = msg.sender.call{value: getClaims()}("");
        require(sent, "Claims failed");
    }
}
