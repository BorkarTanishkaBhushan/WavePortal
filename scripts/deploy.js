const main = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();

    console.log("Deploying contract with account: ", deployer.address); //0xF7e2E1A7803cfce61877d254B94DB71F748a6c45
    console.log("Account balance: ", accountBalance.toString());

    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.001"),
      });
    await waveContract.deployed();

    console.log("WavePortal address: ", waveContract.address); //0x90ae5458F48c974320668952d52Fd6b1ad3aDFBa
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();