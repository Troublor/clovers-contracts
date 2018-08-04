var utils = require("web3-utils");
var Reversi = artifacts.require("./Reversi.sol");
var Clovers = artifacts.require("./Clovers.sol");
var CloversMetadata = artifacts.require("./CloversMetadata.sol");
var CloversController = artifacts.require("./CloversController.sol");
var ClubTokenController = artifacts.require("./ClubTokenController.sol");
var ClubToken = artifacts.require("./ClubToken.sol");
var SimpleCloversMarket = artifacts.require("./SimpleCloversMarket.sol");
var CurationMarket = artifacts.require("./CurationMarket.sol");

const gasToCash = require("../helpers/utils").gasToCash;
const _ = require("../helpers/utils")._;

// let stakeAmount = 529271 * 1000000000 * 40; // gasPrice * 1GWEI * 40 (normal person price)
let stakeAmount = 96842 * 1000000000 * 40; // gasPrice * 1GWEI * 40 (oracle price)

let multiplier = 10;

const ethPrice = new web3.BigNumber("440");
const oneGwei = new web3.BigNumber("1000000000"); // 1 GWEI
let gasPrice = oneGwei.toString(10);

let stakePeriod = "6000"; // at 15 sec block times this is ~25 hours

let payMultiplier = "10";
let priceMultiplier = "10";
let basePrice = utils.toWei("0.001");

let decimals = "18";

let reserveRatio = "333333"; // parts per million 500000 / 1000000 = 1/2
let virtualBalance = utils.toWei("3333");
let virtualSupply = utils.toWei("100000");

module.exports = (deployer, helper, accounts) => {
  let oracle = accounts[8];

  deployer.then(async () => {
    try {
      var totalGas = new web3.BigNumber("0");
      let sofar = 0;
      let total = 17;
      // Deploy Clovers.sol (NFT)
      clovers = await Clovers.deployed();
      // var tx = web3.eth.getTransactionReceipt(clovers.transactionHash);
      //
      // console.log(_ + "Deploy clovers - " + tx.gasUsed);
      // gasToCash(tx.gasUsed);
      //
      // totalGas = totalGas.plus(tx.gasUsed);

      // Deploy CloversMetadata.sol
      // -w Clovers address
      cloversMetadata = await CloversMetadata.deployed();
      // var tx = web3.eth.getTransactionReceipt(cloversMetadata.transactionHash);
      // console.log(_ + "Deploy cloversMetadata - " + tx.gasUsed);
      // gasToCash(tx.gasUsed);
      //
      // totalGas = totalGas.plus(tx.gasUsed);

      // console.log(_ + "Update clovers - " + tx.receipt.gasUsed);
      // gasToCash(tx.receipt.gasUsed);
      //
      // totalGas = totalGas.plus(tx.receipt.gasUsed);

      // Deploy ClubToken.sol (ERC20)

      clubToken = await ClubToken.deployed();
      // var tx = web3.eth.getTransactionReceipt(clubToken.transactionHash);
      //
      // console.log(_ + "Deploy clubToken - " + tx.gasUsed);
      // gasToCash(tx.gasUsed);
      //
      // totalGas = totalGas.plus(tx.gasUsed);

      // Deploy Reversi.sol
      // -link w cloversController

      reversi = await Reversi.deployed();
      // var tx = web3.eth.getTransactionReceipt(reversi.transactionHash);
      //
      // console.log(_ + "Deploy reversi - " + tx.gasUsed);
      // gasToCash(tx.gasUsed);
      //
      // totalGas = totalGas.plus(tx.gasUsed);

      // Deploy ClubTokenController.sol
      // -w ClubToken address

      clubTokenController = await ClubTokenController.deployed();
      // var tx = web3.eth.getTransactionReceipt(
      //   clubTokenController.transactionHash
      // );
      //
      // console.log(_ + "Deploy clubTokenController - " + tx.gasUsed);
      // gasToCash(tx.gasUsed);
      //
      // totalGas = totalGas.plus(tx.gasUsed);

      // Deploy CloversController.sol
      // -w Clovers address
      // -w ClubToken address
      // -w ClubTokenController address

      cloversController = await CloversController.deployed();

      simpleCloversMarket = await SimpleCloversMarket.deployed();

      curationMarket = await CurationMarket.deployed();

      // Update Clovers.sol
      // -w CloversController address
      console.log(++sofar + "/" + total);
      var tx = await clovers.updateCloversControllerAddress(
        cloversController.address
      );

      console.log(++sofar + "/" + total);
      var tx = await clovers.updateClubTokenController(
        clubTokenController.address
      );

      // Update ClubToken.sol
      // -w CloversController address
      console.log(++sofar + "/" + total);
      var tx = await clubToken.updateCloversControllerAddress(
        cloversController.address
      );

      // Update ClubToken.sol
      // -w ClubTokenController address
      console.log(++sofar + "/" + total);
      var tx = await clubToken.updateClubTokenControllerAddress(
        clubTokenController.address
      );

      // Update CloversController.sol
      // -w curationMarket
      // -w simpleCloversMarket
      // -w oracle
      // -w stakeAmount
      // -w stakePeriod
      // -w payMultiplier
      console.log(++sofar + "/" + total);
      var tx = await cloversController.updateCurationMarket(
        curationMarket.address
      );

      console.log(++sofar + "/" + total);
      var tx = await cloversController.updateSimpleCloversMarket(
        simpleCloversMarket.address
      );

      console.log(++sofar + "/" + total);
      var tx = await cloversController.updateOracle(oracle);

      console.log(++sofar + "/" + total);
      var tx = await cloversController.updateStakeAmount(stakeAmount);

      console.log(++sofar + "/" + total);
      var tx = await cloversController.updateStakePeriod(stakePeriod);

      console.log(++sofar + "/" + total);
      var tx = await cloversController.updatePayMultipier(payMultiplier);

      console.log(++sofar + "/" + total);
      var tx = await cloversController.updatePriceMultipier(priceMultiplier);

      console.log(++sofar + "/" + total);
      var tx = await cloversController.updateBasePrice(basePrice);

      // Update ClubTokenController.sol
      // -w simpleCloversMarket
      // -w curationMarket
      // -w reserveRatio
      // -w virtualSupply
      // -w virtualBalance

      console.log(++sofar + "/" + total);
      var tx = await clubTokenController.updateSimpleCloversMarket(
        simpleCloversMarket.address
      );

      console.log(++sofar + "/" + total);
      var tx = await clubTokenController.updateCurationMarket(
        curationMarket.address
      );

      console.log(++sofar + "/" + total);
      var tx = await clubTokenController.updateReserveRatio(reserveRatio);

      console.log(++sofar + "/" + total);
      var tx = await clubTokenController.updateVirtualSupply(virtualSupply);

      console.log(++sofar + "/" + total);
      var tx = await clubTokenController.updateVirtualBalance(virtualBalance);
    } catch (error) {
      console.log(error);
    }
  });
};