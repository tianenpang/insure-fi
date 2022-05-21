//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "./Registration.sol";
import "./IERC20.sol";
import "./IgetFlow.sol";
import {
    IConstantFlowAgreementV1
} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";

import {
    ISuperToken
} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

contract Claims is Registration{

    IERC20 InsureToken;
    IConstantFlowAgreementV1 private _cfa;
    ISuperToken private _acceptedToken;  

    constructor(
        address _tokenAddress,
        IConstantFlowAgreementV1 cfa,
        ISuperToken acceptedToken
    ){
        InsureToken = IERC20(_tokenAddress);
        _cfa = cfa;
        _acceptedToken = acceptedToken;
    }

    struct Holder {
        string lastName;
        uint16 policyID;
        uint8 yearsDriving;
        uint8 age;
    }

    // struct Event {
    //     string eventDate;
    //     string eventTime;
    //     string eventLocation;
    //     string eventDescription;
    //     string eventImgHash;
    // }

    mapping(address => Holder) public holder;
    // mapping(address => Event) public accident;

    function startClaim(string memory _lastName, uint16 _policyID, uint8 _yearsDriving, uint8 _age) public {
        require(insured[msg.sender],"You need to be insured before claim");
        require(_policyID != 0 && _policyID == insuree[msg.sender].carID,"Invalid ID");
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

    // function vehicleInfo() public view returns(Car memory) {
    //     return insuree[msg.sender];
    // }

    // function eventInfo (string memory _eventDate, string memory _eventTime, string memory _eventLocation, string memory _eventDescription, string memory _eventImgHash) public {
    //     Event storage e = accident[msg.sender];
    //     e.eventDate = _eventDate;
    //     e.eventTime = _eventTime;
    //     e.eventLocation = _eventLocation;
    //     e.eventDescription = _eventDescription;
    //     e.eventImgHash = _eventImgHash;
    // }

    function flowDetails() public view returns(uint256 timestamp, int96 flowRate,uint256 deposit,uint256 owedDeposit){
        (uint256 timestamp,int96 flowRate,uint256 deposit,uint256 owedDeposit) = _cfa.getFlow(_acceptedToken,msg.sender,address(this));
    }

    function timeDifference() internal returns(uint){
        uint time = block.timestamp - insuree[msg.sender].registrationTime;
        return time / 60 * 60 * 24;
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
        // require(getInsuranceRate() == true, "Filing failed");
        return getPriceYear() + getPriceMake() + getCostByAge() / getCostByYearsDriving() * timeDifference();
    }

    function makePayout() external {
        (bool sent) = InsureToken.transfer(msg.sender, getClaims()/10e10);
         require(sent, "Claims failed");
    }
}
