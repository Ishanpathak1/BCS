const hre = require("hardhat");

async function main() {
  // Fetch the contract to deploy
  const CommentSystem = await hre.ethers.getContractFactory("CommentSystem");

  // Deploy the contract with a custom gas limit
  const commentSystem = await CommentSystem.deploy({
    gasLimit: 6000000  // You can adjust this value based on your contract's needs
  });

  // Wait until the contract is deployed
  await commentSystem.deployed();

  console.log("CommentSystem deployed to:", commentSystem.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

