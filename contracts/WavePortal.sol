// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0; //solidity compiler's version that we want to use....nothing lower than that

import "hardhat/console.sol";

contract WavePortal {
    uint totalWaves; //to store total number of waves//initialized to zero
    event NewWave(address indexed from, uint timestamp, string message);
    struct Wave{
        address waver;
        string message;
        uint timestamp;
    }
    // uint private seed;

    constructor() payable {
        console.log("The contract is working!");
        // seed = (block.timestamp + block.difficulty) % 100;
    } //just to check whether the contract is working or not

    
    Wave[] waves;//an array 'wave' that stores the array of 'Wave' struct
    function wave(string memory _message) public {
        totalWaves += 1;
        console.log("%s has waved with message: %s", msg.sender, _message);

        waves.push(Wave(msg.sender, _message, block.timestamp));
        emit NewWave(msg.sender, block.timestamp, _message);
        // seed = (block.difficulty + block.timestamp + seed) % 100;
        uint256 prizeAmount = 0.0001 ether;
        require(
            prizeAmount <= address(this).balance,
            "Trying to withdraw more money than the contract has."
        );
        (bool success, ) = (msg.sender).call{value: prizeAmount}("");
        require(success, "Failed to withdraw money from contract.");
    }
    function getAllWaves() public view returns(Wave[] memory)
    {
        return waves;
    }
    function getTotalWaves() public view returns(uint){
        console.log("We have total %d waves!", totalWaves);
        return totalWaves;
    }

    uint totalPurpleHearts;
    event NewPurpleHeart(address indexed from, uint timestamp, string message);
    struct PurpleHeart{
        address heartSender;
        string message;
        uint timestamp;
    }
    PurpleHeart[] purpleHeart;
    function purpleHearts(string memory _message) public {
        totalPurpleHearts += 1;
        console.log("%s has sent a purple heart with message: %s", msg.sender, _message);
        purpleHeart.push(PurpleHeart(msg.sender, _message, block.timestamp));
        emit NewPurpleHeart(msg.sender, block.timestamp, _message);

        uint256 prizeAmount = 0.0001 ether;
        require(
            prizeAmount <= address(this).balance,
            "Trying to withdraw more money than the contract has."
        );
        (bool success, ) = (msg.sender).call{value: prizeAmount}("");
        require(success, "Failed to withdraw money from contract.");
    
    }
    function getAllPurpleHearts() public view returns(PurpleHeart[] memory)
    {
        return purpleHeart;
    }
    function getTotalPurpleHearts() public view returns(uint) {
        console.log("We have total %d purple hearts!", totalPurpleHearts);
        return(totalPurpleHearts);
    }

    function getTotalReactions() public view returns(uint) {
        uint totalReactions = totalPurpleHearts + totalWaves;
        console.log("We have total %d reactions!", totalReactions);
        return(totalReactions);
    }



}