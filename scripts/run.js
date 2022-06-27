const main = async () => {

    

    const [owner, randomPerson] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal"); //this will compile the contract & genrate necessary files
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.1"),
    });
    //👆using this hardhat will create a local ethereum network for us...when the scripts wil be destroyed then the network will alsobe destroyed
    await waveContract.deployed();
    //👆this will help us wait untill the local etherum network is created
    console.log("Contract deployed to:", waveContract.address);
    //gives the address of our contract on the blockchain
    console.log("Contract deployed by:", owner.address);

    let contractBalance = await hre.ethers.provider.getBalance(
        waveContract.address
    );

    console.log(
        "Contract balance:",
        hre.ethers.utils.formatEther(contractBalance)
    );

    let waveCount;
    waveCount = await waveContract.getTotalWaves();
    console.log(waveCount.toNumber());
    let waveTxn = await waveContract.wave("A message!");
    await waveTxn.wait();//waiting to be mined
    
    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log(
        "Contract balance:",
        hre.ethers.utils.formatEther(contractBalance)
    );

    waveCount = await waveContract.getTotalWaves();
    console.log(waveCount.toNumber());
    waveTxn = await waveContract.connect(randomPerson).wave("Another message!");
    await waveTxn.wait();

    console.log(
        "Contract balance:",
        hre.ethers.utils.formatEther(contractBalance)
    );

    waveCount = await waveContract.getTotalWaves();
    console.log(waveCount.toNumber());

    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);






    // for purple heart
    let heartCount;
    heartCount = await waveContract.getTotalPurpleHearts();
    console.log(heartCount.toNumber());

    let heartTxn = await waveContract.purpleHearts("Heart Message");
    await heartTxn.wait();
    console.log(
        "Contract balance:",
        hre.ethers.utils.formatEther(contractBalance)
    );

    heartCount = await waveContract.getTotalPurpleHearts();
    console.log(heartCount.toNumber());

    heartTxn = await waveContract.connect(randomPerson).purpleHearts("Another Heart message!");
    await heartTxn.wait();

    console.log(
        "Contract balance:",
        hre.ethers.utils.formatEther(contractBalance)
    );

    let allHearts = await waveContract.getAllPurpleHearts();
    console.log(allHearts);

    let totalR;
    totalR = await waveContract.getTotalReactions();
    
};

const runMain = async () => {
    try{
        await main();
        process.exit(0);//exit node process without error
    }
    catch(error) {
        console.log(error);
        process.exit(1);//exit node process while indicating 'Uncaught Fatal Exception' error
    }
};

runMain();