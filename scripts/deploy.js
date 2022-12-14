require("@nomiclabs/hardhat-ethers"); // https://github.com/NomicFoundation/hardhat/issues/1627
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const FungSampleContract = await ethers.getContractFactory("FungSampleContract");
  const contract = await FungSampleContract.deploy();

  console.log("Contract address:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

