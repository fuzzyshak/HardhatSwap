// Get UNiSwap V2 Addresses.
const addressFactory = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"; //UniSwap Factory Address
const addressRouter = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"; //UniSwapV2 Router 02 Address
const addressFrom = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"; // WETH  the coin that we want to interact with. - BUSD - Binancne Smart Chain
const addressTo = "0x6B3595068778DD592e39A122f4f5a5cF09C90fE2"; //SUSHI on Etherscan - we will swap WETH with SUSHI
// Choose addressFactory, paste it in BSCScan, go to Contracts > Read Contract > choose allPairs() - enter zero > click Query.
//  By entering numbers, you can get every contract you could trade, just by looping pairs. 
// bring in the ABI - App Binary Interfaces
module.exports = {
    addressFactory,
    addressRouter,
    addressFrom,
    addressTo
}//Modules.exports

