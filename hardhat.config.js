require("@nomicfoundation/hardhat-toolbox");
const { config } = require("dotenv");
const { resolve } = require("path");

config({ path: resolve(__dirname, "./.env") });

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

if (!ALCHEMY_API_KEY) {
  throw new Error("Please set your ALCHEMY_API_KEY in a .env file");
}

const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY;

if (!GOERLI_PRIVATE_KEY) {
  throw new Error("Please set your wallet PRIVATE_KEY in a .env file");
}

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY]
    }
  }
};
