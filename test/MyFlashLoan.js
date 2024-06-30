const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");


describe("MyFlashLoan", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFlashLoan() {
    const _swapRouter = "0xE592427A0AEce92De3Edee1F18E0157C05861564";
    const _factory = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
    const WETH_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
  

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();
    const externalWalletAddress = "0x23937F0E387d5FA471bDCDf74a5b0fafac7EB637";

    // Specify the amount to transfer
    const transferAmount = "400"; // 1 maticc
  
    // Perform the transfer
    const transferTx = await owner.sendTransaction({
      to: externalWalletAddress,
      value: transferAmount
    });
    const MyFlashLoan = await ethers.getContractFactory("MyFlashLoan");
    const myFlashLoan = await MyFlashLoan.deploy(_swapRouter,_factory,WETH_ADDRESS);

    return { myFlashLoan };
  }

  describe("Deployment", function () {
    let myFlashLoan, owner, otherAccount;

    // Directly deploy the contract before each test
    beforeEach(async function () {
      ({ myFlashLoan } = await deployFlashLoan());
      console.log(myFlashLoan)
    });

    it("Should Take the Loan ", async function () {
      

      const token0 = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"; // 0.30% tier 
      const token1 = "0x77A6f2e9A9E44fd5D5C3F9bE9E52831fC1C3C0A0"; // 0.30% tier 
      const fee1 = 3000; // 0.30% tier 
      const amount0 = 100;
      const amount1 = 10;
      const fee2 = 2000; // 0.20% tier 
      const fee3 = 3000; // 0.30% tier 

      const overrides = {
        gasLimit: 30000000,
      };

      const result =await  myFlashLoan.initFlash(
        token0,
        token1,
        fee1,
        amount0,
        amount1,
        fee2,
        fee3,
        overrides
      );

      console.log("Transaction result:", result);

      // Access specific data from the result
      // For example, if the result is an object with a 'data' property
      const data = await result.data;
      console.log("Data from the result:", data);

    });

    

 
  });


});
