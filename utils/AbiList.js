// UniSwapV2
const erc20ABI = ["function decimals() external view returns (uint8)"]; 

const factoryABI = ["function getPair(address tokenA, address tokenB) external view returns (address pair)"];
// 25FEB - we got FactoryAddress, > From there we got GetPair() function, > to get the Liquidity Pool of a pair that
//  we can trade, > 0x.... > then looked in that contract, for that Address (Liquidity Pool_), got bunch of info, for the 
// functions that we can use.  Token 0 and Token 1, 
// SOme functions to use: totalSypply(), getReserves() (can be used to get price information), We want to use these 
// functions to get pricing details for PancakeSwap. 
/*
// we will not be interacting with the pairABI  
  const pairABI = ["function token0() external view returns (address)", 
                "function token1() external view returns (address)",
                "function getReserves() public view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast)"
 //Pair ABI taken out        
            ];
*/
const routerABI = [
    "function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)",
    "function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)", 
    // SHAWN - "function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)",
    ];//const routerABI - taken from pasting the FactoryAddress in Etherscan > Contract > Read Contrct > Code find function

//You will beed four ABI's here: ERC, Factory, Pair, Router
module.exports = { erc20ABI, factoryABI, routerABI };

