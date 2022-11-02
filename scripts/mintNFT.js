require("dotenv").config();
const { ethers } = require("ethers");

const PUBLIC_KEY = "meta-mask-wallet-address";
const PRIVATE_KEY = "private-key-of-contract-address";

const API_URL = "https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}";
const CONTRACT_ADDRESS = "deployed-contract-address";
const tokenURI = "ipfs://${PINATA_CID}";

const run = async () => {
  const provider = new ethers.providers.JsonRpcProvider(API_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  const contract = require("./artifacts/contracts/FungSampleContract.sol/FungSampleContract.json");

  const etherInterface = new ethers.utils.Interface(contract.abi);

  // Get latest nonce
  const nonce = await provider.getTransactionCount(PUBLIC_KEY, "latest");
  // Get gas price
  const gasPrice = await provider.getGasPrice();
  // Get network
  const network = await provider.getNetwork();
  const { chainId } = network;
  //Transaction object
  const transaction = {
    from: PUBLIC_KEY,
    to: CONTRACT_ADDRESS,
    nonce,
    chainId,
    gasPrice,
    data: etherInterface.encodeFunctionData("mintNFT", [PUBLIC_KEY, tokenURI]),
  };
  //Estimate gas limit
  const estimatedGas = await provider.estimateGas(transaction);
  transaction["gasLimit"] = estimatedGas;

  //Sign & Send transaction
  const signedTx = await wallet.signTransaction(transaction);
  const transactionReceipt = await provider.sendTransaction(signedTx);
  await transactionReceipt.wait();
  const hash = transactionReceipt.hash;
  console.log("Your Transaction Hash is:", hash);
  // Get transaction receipt
  const receipt = await provider.getTransactionReceipt(hash);
  const { logs } = receipt;
  // Get token ID
  const tokenInBigNumber = ethers.BigNumber.from(logs[0].topics[3]);
  const tokenId = tokenInBigNumber.toNumber();
  console.log("Token ID minted:", tokenId);
};

run()
  .then(() => {
    console.log("Thats all folks!");
  })
  .catch((err) => {
    console.error(err);
  });
