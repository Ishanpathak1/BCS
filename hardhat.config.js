require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();  // Loads environment variables from .env

module.exports = {
  solidity: "0.8.0",  // Adjust Solidity version based on your contract
  networks: {
    zkEVMCardanoTestnet: {
      url: process.env.ZKEVM_RPC_URL || "https://rpc.public.zkevm-test.net",  // Polygon zkEVM Testnet RPC URL
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],     // Load private key from .env
    },
  },
};

// Log environment variables to ensure they are correctly loaded
console.log("RPC URL:", process.env.ZKEVM_RPC_URL);
console.log("Private Key:", process.env.PRIVATE_KEY);




