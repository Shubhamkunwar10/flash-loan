// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
   const _swapRouter = "0xE592427A0AEce92De3Edee1F18E0157C05861564";
  const _factory = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
  const WETH_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";


  const FlashLoan = await hre.ethers.deployContract("MyFlashLoan", [_swapRouter,_factory,WETH_ADDRESS], {
  });

  await FlashLoan.waitForDeployment();

  console.log(
    `FlashLoan with  deployed to ${lock.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
