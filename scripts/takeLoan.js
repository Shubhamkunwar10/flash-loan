const { ethers } = require("ethers");

// RPC URL for the Mumbai testnet
const rpcUrl = 'https://polygon-mumbai.infura.io/v3/7d5a5bcbc73540c7ba6436baf774d55b';

// Initializing ethers provider
const provider = new ethers.JsonRpcProvider(rpcUrl);



// Your wallet's private key (ensure this is kept secure and not exposed)
const privateKey = '248a3dbbf908db2d4cf718dd172f966af84fe7ebbd995e44c1d1ddd02f93b5aa';
const wallet = new ethers.Wallet(privateKey, provider);

// Contract details
const contractAddress = "0xCF56cA9C8156Cd3ddCc3F223A46Db71023372a85";
 const abi =  [
  {
    "inputs": [
      {
        "internalType": "contract ISwapRouter",
        "name": "_swapRouter",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_factory",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_WETH9",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "WETH9",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "factory",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token0",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "token1",
        "type": "address"
      },
      {
        "internalType": "uint24",
        "name": "fee1",
        "type": "uint24"
      },
      {
        "internalType": "uint256",
        "name": "amount0",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount1",
        "type": "uint256"
      },
      {
        "internalType": "uint24",
        "name": "fee2",
        "type": "uint24"
      },
      {
        "internalType": "uint24",
        "name": "fee3",
        "type": "uint24"
      }
    ],
    "name": "initFlash",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "refundETH",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "swapRouter",
    "outputs": [
      {
        "internalType": "contract ISwapRouter",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amountMinimum",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      }
    ],
    "name": "sweepToken",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "fee0",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "fee1",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "uniswapV3FlashCallback",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amountMinimum",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      }
    ],
    "name": "unwrapWETH9",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
];
// Creating a contract instance
const flashloanContract = new ethers.Contract(contractAddress, abi, wallet);

async function main() {
  const token0 = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";
  const token1 = "0x77A6f2e9A9E44fd5D5C3F9bE9E52831fC1C3C0A0";
  const fee1 = 30;
  const amount0 = 1;
  const amount1 = 1;
  const fee2 = 20;
  const fee3 = 25;

  try {
    // Sending the transaction
    const txResponse = await flashloanContract.initFlash(
      token0, token1, fee1, amount0, amount1, fee2, fee3, { gasLimit: 1000000 }
    );

    // Awaiting transaction confirmation
    const receipt = await txResponse.wait();
    console.log("Transaction successful with hash:", receipt.transactionHash);
  } catch (error) {
    console.error("Error executing flashloan:", error);
  }
}

main().catch((error) => {
  console.error(error);
});
