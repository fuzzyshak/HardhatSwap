const { expect, assert } = require("chai");
const { ethers } = require("hardhat");
//const { ethers, getNamedAccounts, BigNumber } = require("hardhat")  //NOt needed. 


const { addressFactory,
    addressRouter,
    addressFrom,
    addressTo
   } = require("../utils/AddressList");

   const {erc20ABI, factoryABI, routerABI} = require("../utils/AbiList");
const { Signer } = require("ethers");
const { HardhatEthersSigner } = require("@nomicfoundation/hardhat-ethers/signers");
    //const { HardhatEthersSigner } = require("@nomicfoundation/hardhat-ethers/src/signers");

   describe("Read and Write to the Blockchain ", () => {
    let provider,   //using let instead of const
       contractFactory, 
       contractRouter, 
       contractToken, 
       decimals, 
       amountIn, 
       amountOut; 
    //connecting to Provider
    provider = new ethers.providers.JsonRpcProvider(
        "https://eth-mainnet.g.alchemy.com/v2/iHgOpprjQIGA3ye1blc-SgLbbGpSuLfm"
       );
    // The following line is not part of Lecture 60
    providerHardhat = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");

    //Contract Addresses
    contractFactory = new ethers.Contract(addressFactory, factoryABI, provider);
    contractRouter = new ethers.Contract(addressRouter, routerABI, provider);
    contractToken = new ethers.Contract(addressFrom, erc20ABI, provider);
    //console.log(contractToken);
    //console.log(_isProvider);
    const amountInHuman = "1";
    amountIn = ethers.utils.parseUnits(amountInHuman, decimals).toString();

    // get Price Information.
    const getAmountOut = async () => {
        // get the addressFrom the number of decimals. 
        decimals = await contractToken.decimals();

    
        const amountsOut = await contractRouter.getAmountsOut(amountIn, [
            addressFrom, 
            addressTo
        ]);//const amoountsOut = ...

        //console.log(amountsOut, "This is the amountsOut");
        // Try this: console.log(amountsOut.toString());

    return amountsOut[1].toString();

    };

    //Testing connecting to the contract Addresses.
    it("connects to a provider, factory, token, and a router ", () => {
        assert(provider._isProvider);

        expect(contractFactory.address).to.equal(
            "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"   //AddressList.js > AddressFactory
        );

        expect(contractRouter.address).to.equal(
            "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D" //AddressList.js > AddressRouter
        );

        expect(contractToken.address).to.equal(
            "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" //AddressList.js > AddressFrom
        );

    })//it("connects to a provider...)#SUCCESS#

        it("Gets the Price of amountsOut", async () =>  { 
            const amount = await getAmountOut();
            //assert(amount.toString()); *no need for .toString()
            assert(amount);
            console.log(amount.toString(), "This is amount.string");

        });//it("Gets the Price of amountOut")

        //Lesson 61 - Connecting to Mainnet Fork
        //wallet =  wallet.connect(ethers.provider);
         it("Send a transaction / swaps a Token", async () => {
            //const hre = require("hardhat")
            
            //const hre = require("hardhat");
            //const assert = require("assert");
            //const [ownerSigner] = await providerHardhat.listAccounts(); //>WORKING<
            //const [ownerSigner] = await ethers.listAccounts(); //>WORKING 2<
            const [ownerSigner] = await ethers.getSigners();     //=> {Signer});
            //const [ownerSigner] = await provider.listAccounts(); //WORKING NOW
            //const [ownerSigner, address] = await ethers.getSigners(); //providerHardhat.listAccounts();
            //const [ownerSigner] = await providerHardhat.listAccounts();
            //[deployer, account1] = await ethers.getSigners();
            //console.log(ownerSigner); //Not working..!!
            console.log("this is Hardhat provider account address", ownerSigner);
            //console.log("this is OwnerSigner " + ownerSigner);
     
            
            const mainnetForkUniswapRouter = new ethers.Contract(
                addressRouter, 
                routerABI, 
                ownerSigner //Wallet that will sign the transactions. 
            );
            const myAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

            const amountOut = await getAmountOut();

            //const amountOut = await getAmountOut();

            const txSwap = await mainnetForkUniswapRouter.swapExactTokensForTokens(
                amountIn,// Amount In
                amountOut, // Amount Out
                [addressFrom, addressTo], // Path 
                myAddress, // Address To
                Date.now() + 1000 * 60 * 5, // Deadline of how long it is allowed to take, a date in the future. 1000 seconds
                {
                    gasLimit: 200000,
                    gasPrice: ethers.utils.parseUnits("5.5", "gwei"), //same as using Pancake swap
                }    // Gas amount, required an object creation. 
            );
                assert(txSwap.hash);
        const mainnetForkProvider = waffle.provider;
        const txReceipt = await mainnetForkedProvider.getTransactionReceipt(
            txSwap.hash
            );
        console.log("")
        console.log("SWAP THe transaction!!")
        console.log(txSwap)

        console.log("")
        console.log("Transactions receipts.")
        console.log(txReceipt);

        // NOT WORKING.is it working?
        

        });//it("Send a transaction / swaps a token..") 

   });//Describe("read and write to the blockchain")




















/*
describe("My Test Group", ()  => {
    const myName = "Fawaz";
    const myAge = 46;
    const myColor = "Blue";

    //to run a test you use IT 
    it("tests my name is  'Fawaz'", () => { //call back function
        expect(myName).equals("Fawaz");
    });//it("test")

    it("My age is not '100' ", () => { //call back function
        expect(myAge).not.equals(100);
    });//it("test")

    describe("My color ", () => { 
        it("has a color", () => {
            assert(myColor);            
        })
        it("shows my color as 'Blue'", () => {
            expect(myColor).equals("Blue");


        });




    });//describe("My color")



});//describe("MY test Group")
*/