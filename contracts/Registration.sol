//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

contract Registration {

    uint streamRate = 0.01 * 10e18;

    // Inputs for car
    struct Car {
        string carMake;
        string carModel;
        uint16 carYear;
        uint16 carID;
        uint16 mileage;
        string licensePlate;
        uint registrationTime;
    }

    struct Policyholder {
        uint16 ID;
        address owner;
    }

    //Mapping
    mapping(address => Car) public insuree;
    mapping(address => uint16) public idNum;
    mapping(address => bool) internal insured;

    uint16 public policyID = 1;


    // Function to get price by year
    function getPriceYear() internal view returns(uint){
        Car memory car = insuree[msg.sender];
        uint carYear = car.carYear;
        if (carYear <= 2005) {
            return 0.01 ether;
        }
        if (carYear > 2005 && carYear <= 2012 ) {
            return 0.03 ether;
        }
        if (carYear > 2012) {
            return 0.05 ether;
        }
    }
   
    // Function to get price by make
    function getPriceMake() internal view returns(uint) {
        Car memory car = insuree[msg.sender];

        bytes8 carMake = bytes8(keccak256(abi.encodePacked(car.carMake)));
        bytes8 BMW = bytes8(keccak256(abi.encodePacked("BMW")));
        bytes8 Mercedes = bytes8(keccak256(abi.encodePacked("Mercedes"))); 
        bytes8 Audi = bytes8(keccak256(abi.encodePacked("Audi"))); 
        bytes8 GMC = bytes8(keccak256(abi.encodePacked("GMC"))); 
        bytes8 Chevrolet = bytes8(keccak256(abi.encodePacked("Chevrolet"))); 
        bytes8 Ford = bytes8(keccak256(abi.encodePacked("Ford"))); 
        bytes8 Toyota = bytes8(keccak256(abi.encodePacked("Toyota"))); 
        bytes8 Honda = bytes8(keccak256(abi.encodePacked("Honda"))); 
        bytes8 Nissan = bytes8(keccak256(abi.encodePacked("Nissan")));

        if (carMake == BMW){
            return 0.02 ether;
        }
        if (carMake == Mercedes) {
            return 0.02 ether;
        }
        if (carMake == Audi) {
            return 0.02 ether;
        }
        if (carMake == GMC) {
            return 0.015 ether;
        }
        if (carMake == Chevrolet) {
            return 0.015 ether;
        }
        if (carMake == Ford) {
            return 0.015 ether;
        }
        if (carMake == Toyota) {
            return 0.010 ether;
        }
        if (carMake == Honda) {
            return 0.010 ether;
        }
        if (carMake == Nissan) {
           return 0.010 ether;
        }
    }

    // Function to get price by mileage
    function getPriceMileage() internal view returns(uint) {
        Car memory car = insuree[msg.sender];
        uint mileage = car.mileage;
        if (mileage <= 50000) {
            return 0.03 ether;
        }
        if (mileage >50000 && mileage <= 100000) {
            return 0.025 ether;
        }
        if (mileage > 100000) {
            return 0.02 ether;
        }
    }

    // Function to get total cost
    function getCost() public view returns(uint) {
        uint totatCost = getPriceMileage() + getPriceYear() + getPriceMake();
        return totatCost;
    }
    
    function getInsuranceRate() public returns(bool){
        Car memory car = insuree[msg.sender];

        uint insuranceRate = getCost() * 10000000 / 28*24*60*60;

        if(streamRate >= insuranceRate) return true;

    }
    
    // Function to register car
    function registerCar (string memory _carMake, string memory _carModel, uint16 _carYear, uint16 _mileage, string memory _licensePlate) public {
        require(!insured[msg.sender],"You have been previously insured");
        Car storage car = insuree[msg.sender];
        car.carMake = _carMake;
        car.carModel = _carModel;
        car.carYear = _carYear;
        car.mileage = _mileage;
        car.licensePlate = _licensePlate;
        car.registrationTime = block.timestamp;
        car.carID = policyID;
        idNum[msg.sender] = policyID;
        policyID += 1;
    }
    
    // Function to make payment in Matic
    function makePayment() public payable {
        require(msg.value >= getCost(),"insufficient ether");
        insured[msg.sender] = true;
    }

}