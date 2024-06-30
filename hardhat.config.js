require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-solhint");

MNEMONIC = 'barrel sleep price warrior winter coil cat pepper element leopard gesture word'


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
    },
    polygon: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/3S29jMAW6hfzWtObHiZJ-dTsH5x9g3Ev",
      accounts: ['0x672567a52330f76a127251ab68a639a6b44e183899bfed62a896ca2ada5d40fe']
    }
  },
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
};