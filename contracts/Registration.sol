//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

contract Registration {

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

    function registerCar (string memory _carMake, string memory _carModel, uint16 _carYear, uint16 _mileage, string memory _licensePlate) public {
        Car storage car = insuree[msg.sender];
        car.carMake = _carMake;
        car.carModel = _carModel;
        car.carYear = _carYear;
        car.carID += 1;
        car.mileage = _mileage;
        car.licensePlate = _licensePlate;
    }

    function viewRegistration () public view returns(Car memory) {
        return insuree[msg.sender];
    }

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
    // function getPriceMake() internal returns(uint) {
    //     Car memory car = insuree[msg.sender];
    //     bytes memory carMake = bytes(car.carMake);
    //     bytes memory BMW = abi.encodePacked("BMW");
    //     bytes memory Mercedes = abi.encodePacked("Mercedes"); 
    //     bytes memory Audi = abi.encodePacked("Audi"); 
    //     bytes memory GMC = abi.encodePacked("GMC"); 
    //     bytes memory Chevrolet = abi.encodePacked("Chevrolet"); 
    //     bytes memory Ford = abi.encodePacked("Ford"); 
    //     bytes memory Toyota = abi.encodePacked("Toyota"); 
    //     bytes memory Honda = abi.encodePacked("Honda"); 
    //     bytes memory Nissan = abi.encodePacked("Nissan"); 
        
    //     // if (keccak256(carMake == BMW == Mercedes == Audi)) return 0.2 ether;
    //     // if (carMake == Mercedes) return 0.2 ether;
    //     // if (carMake == Audi) return 0.2 ether;
    //     // if (carMake == GMC) return 0.15 ether;
    //     // if (carMake == Chevrolet) return 0.15 ether;
    //     // if (carMake == Ford) return 0.15 ether;
    //     // if (carMake == Toyota) return 0.1 ether;
    //     // if (carMake == Honda) return 0.1 ether;
    //     // if (carMake == Nissan) return 0.1 ether;

    // }
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

    function getCost () public returns(uint) {
        return getPriceMileage() + getPriceYear();
    }
    
    function makePayment () public payable {
        require(msg.value == getCost(), "insufficient ether");

    }

}
