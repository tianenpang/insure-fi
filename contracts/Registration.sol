//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

contract Registration {
    // Inputs for car
    struct Car {
        string carMake;
        string carModel;
        uint16 carYear;
        uint8 carID;
        uint16 mileage;
        string licensePlate;
    }

    struct Policyholder {
        uint16 ID;
        address owner;
    }

    //Mapping
    mapping(address => Car) private insuree;

    uint ID;

    // Function to register car
    function registerCar (string memory _carMake, string memory _carModel, uint16 _carYear, uint16 _mileage, string memory _licensePlate) public {
        Car storage car = insuree[msg.sender];
        car.carMake = _carMake;
        car.carModel = _carModel;
        car.carYear = _carYear;
        car.mileage = _mileage;
        car.licensePlate = _licensePlate;
        ID += 1;
    }

    // function viewRegistration () public view returns(Car memory) {
    //     return insuree[msg.sender];
    // }

    // Function to get price by year
    function getPriceYear() internal returns(uint){
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
    function getPriceMake() internal returns(uint) {
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
            return 0.2 ether;
        }
        if (carMake == Mercedes) {
            return 0.2 ether;
        }
        if (carMake == Audi) {
            return 0.2 ether;
        }
        if (carMake == GMC) {
            return 0.15 ether;
        }
        if (carMake == Chevrolet) {
            return 0.15 ether;
        }
        if (carMake == Ford) {
            return 0.15 ether;
        }
        if (carMake == Toyota) {
            return 0.10 ether;
        }
        if (carMake == Honda) {
            return 0.10 ether;
        }
        if (carMake == Nissan) {
           return 0.10 ether;
        }
    }

    // Function to get price by mileage
    function getPriceMileage() internal returns(uint) {
        Car memory car = insuree[msg.sender];
        uint mileage = car.mileage;
        if (mileage <= 50000) {
            return 0.3 ether;
        }
        if (mileage >50000 && mileage <= 100000) {
            return 0.25 ether;
        }
        if (mileage > 100000) {
            return 0.2 ether;
        }
    }

    // Function to get total cost
    function getCost () public returns(uint) {
        return getPriceMileage() + getPriceYear() + getPriceMake();
    }
    
    // Function to make payment
    function makePayment () public payable {
        require(msg.value == getCost(), "insufficient ether");

    }

}
