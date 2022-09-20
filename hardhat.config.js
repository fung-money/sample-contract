require("@nomicfoundation/hardhat-toolbox");
const { config } = require("dotenv");
const { resolve } = require("path");

config({ path: resolve(__dirname, "./.env") });

const { ALCHEMY_API_KEY_GOERLI, ALCHEMY_API_KEY_MUMBAI } = process.env;

if (!ALCHEMY_API_KEY_GOERLI || !ALCHEMY_API_KEY_MUMBAI) {
  throw new Error("Please set your ALCHEMY_API_KEY in a .env file");
}

const PRIVATE_KEY = process.env.PRIVATE_KEY;

if (!PRIVATE_KEY) {
  throw new Error("Please set your wallet PRIVATE_KEY in a .env file");
}

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY_GOERLI}`,
      accounts: [PRIVATE_KEY]
    },
    mumbai: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY_MUMBAI}`,
      accounts: [PRIVATE_KEY]
    }
  }
};
