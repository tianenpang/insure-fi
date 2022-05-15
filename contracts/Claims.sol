//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "./Registration.sol";

contract Claims is Registration {

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

    function startClaim(string memory _lastName, uint16 _policyID, uint8 _yearsDriving, uint8 _age) public {
        Holder storage user = holder[msg.sender];
        user.lastName = _lastName;
        user.policyID = _policyID;
        user.yearsDriving = _yearsDriving;
        user.age = _age;
    }

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
        return getPriceYear() + getPriceMake() + getCostByAge() + getCostByYearsDriving();
    }

    // function makePayout

}
