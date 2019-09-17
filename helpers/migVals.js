const BigNumber = require('bignumber.js')
const utils = require('web3-utils')
const oneGwei = 1000000000
var vals = (module.exports = {
  // stakeAmount: new BigNumber(529271).mul(1000000000).mul(40), // gasPrice * 1GWEI * 40 (normal person price)
  stakeAmount: new BigNumber(286774), // gasPrice * 10GWEI (oracle price)
  fastGasPrice: new BigNumber(10).mul(oneGwei),
  averageGasPrice: new BigNumber(5).mul(oneGwei),
  safeLowGasPrice: new BigNumber(1).mul(oneGwei),
  gasBlockMargin: new BigNumber(240), // ~1 hour at 15 second block times
  // stakeAmount: new BigNumber(0).mul(1000000000).mul(40), // gasPrice * 1GWEI * 40  (nothing)
  ethPrice: new BigNumber('200'),
  oneGwei: new BigNumber('1000000000'), // 1 GWEI
  gasPrice: new BigNumber('1000000000'),
  // stakePeriod: '6000', // at 15 sec block times this is ~25 hours
  stakePeriod: '60000', // at 15 sec block times this is ~250 hours
  payMultiplier: utils.toWei('0.327'),
  priceMultiplier: '3',
  marginOferror: '3',
  basePrice: utils.toWei('3'),
  paused: false,
  limit: utils.toWei('5'),
  decimals: '18',
  oracle: '0xaB0F3326F7F32988963D446543A0b3bbC21B8b92',
  reserveRatio: '750000', // parts per million 500000 / 1000000 = 1/2
  virtualBalance: utils.toWei('10'),
  virtualSupply: utils.toWei('10000'),
  virtualBalanceCM: utils.toWei('33333'),
  virtualSupplyCM: utils.toWei('100000'),
  updateCloversController,
  updateClubTokenController,
  deployCloversController,
  addAsAdmin,
  removeAsAdmin
})

async function updateCloversController({
  cloversController,
  // curationMarket,
  clubTokenController,
  simpleCloversMarket
}) {
  // Update CloversController.sol
  // -w curationMarket
  // -w simpleCloversMarket
  // -w oracle
  // -w stakeAmount
  // -w stakePeriod
  // -w payMultiplier
  // console.log('cloversController.updateCurationMarket')
  // var tx = await cloversController.updateCurationMarket(curationMarket.address)

  var currentClubTokenControllerAddress = await cloversController.clubTokenController()
  if (currentClubTokenControllerAddress.toLowerCase() !== clubTokenController.address.toLowerCase()) {
    console.log(`cloversController.updateClubTokenController from ${currentClubTokenControllerAddress} to ${clubTokenController.address}`)
    var tx = await cloversController.updateClubTokenController(
      clubTokenController.address
    )
  } else {
    console.log('clubTokenController hasnt changed')
  }


  var currentSimpleCloversMarket = await cloversController.simpleCloversMarket()
  if (currentSimpleCloversMarket.toLowerCase() !== simpleCloversMarket.address.toLowerCase()) {
    console.log(`cloversController.updateSimpleCloversMarket from ${currentSimpleCloversMarket} to ${simpleCloversMarket.address}`)
    var tx = await cloversController.updateSimpleCloversMarket(
      simpleCloversMarket.address
    )
  } else {
    console.log('simpleCloversMarket hasnt changed')
  }

  var currentOracle = await cloversController.oracle()
  if (currentOracle.toLowerCase() !== vals.oracle.toLowerCase()) {
    console.log(`cloversController.updateOracle from ${currentOracle} to ${vals.oracle}`)
    var tx = await cloversController.updateOracle(vals.oracle)
  } else {
    console.log('oracle hasnt changed')
  }

  var currentStakeAmount = await cloversController.stakeAmount()
  if (!currentStakeAmount.eq(vals.stakeAmount)) {
    console.log(`cloversController.updateStakeAmount from ${currentStakeAmount} to ${vals.stakeAmount}`)
    var tx = await cloversController.updateStakeAmount(vals.stakeAmount)
  } else {
    console.log('stakeAmount hasnt changed')
  }


  var currentStakePeriod = await cloversController.stakePeriod()
  if (!currentStakePeriod.eq(vals.stakePeriod)) {
    console.log(`cloversController.updateStakePeriod from ${currentStakePeriod} to ${vals.stakePeriod}`)
    var tx = await cloversController.updateStakePeriod(vals.stakePeriod) 
  } else {
    console.log('stakePeriod hasnt changed')
  }


  var gasBlockMargin = await cloversController.gasBlockMargin()
  if (!gasBlockMargin.eq(vals.gasBlockMargin)) {
    console.log(`cloversController.updategasBlockMargin from ${gasBlockMargin} to ${vals.gasBlockMargin}`)
    var tx = await cloversController.updategasBlockMargin(vals.gasBlockMargin) 
  } else {
    console.log('gasBlockMargin hasnt changed')
  }


  var currentPayMultiplier = await cloversController.payMultiplier()
  if (!currentPayMultiplier.eq(vals.payMultiplier)) {
    console.log(`cloversController.updatePayMultipier from ${currentPayMultiplier} to ${vals.payMultiplier}`)
    var tx = await cloversController.updatePayMultipier(vals.payMultiplier)  
  } else {
    console.log('payMultiplier hasnt changed')
  }


  var currentPriceMultiplier = await cloversController.priceMultiplier()
  if (!currentPriceMultiplier.eq(vals.priceMultiplier)) {
    console.log(`cloversController.updatePriceMultipier from ${currentPriceMultiplier} to ${vals.priceMultiplier}`)
    var tx = await cloversController.updatePriceMultipier(vals.priceMultiplier)  
  } else {
    console.log('priceMultiplier hasnt changed')
  }


  var currentBasePrice = await cloversController.basePrice()
  if (!currentBasePrice.eq(vals.basePrice)) {
    console.log(`cloversController.updateBasePrice from ${currentBasePrice} to ${vals.basePrice}`)
    var tx = await cloversController.updateBasePrice(vals.basePrice)  
  } else {
    console.log('basePrice hasnt changed')
  }


  var currentPaused = await cloversController.paused()
  if (currentPaused !== vals.paused) {
    console.log(`cloversController.updatePaused from ${currentPaused} to ${vals.paused}`)
    var tx = await cloversController.updatePaused(vals.paused)
  } else {
    console.log('paused hasnt changed')
  }


  var fastGasPrice = await cloversController.fastGasPrice()
  var averageGasPrice = await cloversController.averageGasPrice()
  var safeLowGasPrice = await cloversController.safeLowGasPrice()

  if (!fastGasPrice.eq(vals.fastGasPrice) || !averageGasPrice.eq(vals.averageGasPrice) || !safeLowGasPrice.eq(vals.safeLowGasPrice)) {
    console.log(`cloversController.updateGasPrices from ${fastGasPrice}, ${averageGasPrice}, ${safeLowGasPrice} to ${vals.fastGasPrice}, ${vals.averageGasPrice}, ${vals.safeLowGasPrice}`)
    var tx = await cloversController.updateGasPrices(vals.fastGasPrice, vals.averageGasPrice, vals.safeLowGasPrice)
  } else {
    console.log(`gas prices haven't changed`)
  }


}

async function updateClubTokenController({
  clubTokenController,
  // curationMarket,
  simpleCloversMarket,
  support,
  accounts
}) {
  // Update ClubTokenController.sol
  // -w simpleCloversMarket
  // -w curationMarket
  // -w reserveRatio
  // -w virtualSupply
  // -w virtualBalance
  // -w poolBalance
  // -w tokenSupply

  var currentSimpleCloversMarket = await clubTokenController.simpleCloversMarket()
  if (currentSimpleCloversMarket.toLowerCase() !== simpleCloversMarket.address.toLowerCase()) {
    console.log(`clubTokenController.updateSimpleCloversMarket from ${currentSimpleCloversMarket} to ${simpleCloversMarket.address}`)
    var tx = await clubTokenController.updateSimpleCloversMarket(
      simpleCloversMarket.address
    )
  } else {
    console.log('simpleCloversMarket hasnt changed')
  }

  // console.log('clubTokenController.updateCurationMarket')
  // var tx = await clubTokenController.updateCurationMarket(
  //   curationMarket.address
  // )

  var currentReserveRatio = await clubTokenController.reserveRatio()
  if (!currentReserveRatio.eq(vals.reserveRatio)) {
    console.log(`clubTokenController.updateReserveRatio from ${currentReserveRatio} to ${vals.reserveRatio}`)
    var tx = await clubTokenController.updateReserveRatio(vals.reserveRatio)
  } else {
    console.log('reserveRatio hasnt changed')
  }

  var currentVirtualSupply = await clubTokenController.virtualSupply()
  if (!currentVirtualSupply.eq(vals.virtualSupply)) {
    console.log(`clubTokenController.updateVirtualSupply from ${currentVirtualSupply.toString()} to ${vals.virtualSupply.toString()}`)
    var tx = await clubTokenController.updateVirtualSupply(vals.virtualSupply)
  } else {
    console.log('virtualSupply hasnt changed')
  }

  var currentVirtualBalance = await clubTokenController.virtualBalance()
  if (!currentVirtualBalance.eq(vals.virtualBalance)) {
    console.log(`clubTokenController.updateVirtualBalance from ${currentVirtualBalance.toString()} to ${vals.virtualBalance.toString()}`)
    var tx = await clubTokenController.updateVirtualBalance(vals.virtualBalance)
  } else {
    console.log('virtualBalance hasnt changed')
  }

  var currentPaused = await clubTokenController.paused()
  if (currentPaused !== vals.paused) {
    console.log(`clubTokenController.updatePaused from ${currentPaused} to ${vals.paused}`)
    var tx = await clubTokenController.updatePaused(vals.paused)
  } else {
    console.log('paused hasnt changed')
  }


  var currentSupport = await clubTokenController.support()
  if (currentSupport.toLowerCase() !== support.address.toLowerCase()) {
    console.log(`clubTokenController.updateSupport from ${currentSupport} to ${support.address}`)
    var tx = await clubTokenController.updateSupport(support.address)
  } else {
    console.log('support hasnt changed')
  }

  console.log('remove as admins to clubTokenController')
  // await addAsAdmin(clubTokenController, accounts)
  await removeAsAdmin(clubTokenController, accounts)

}




async function addAsAdmin(contract, accounts) {

  var secondOwner = await contract.isAdmin(accounts[0])
  if (!secondOwner) {
    console.log(`adding ${accounts[0]} as admin in contract`)
    await contract.transferAdminship(accounts[0])
  } else {
    console.log(`${accounts[0]} is already an admin in contract`)
  }


  var secondOwner = await contract.isAdmin(accounts[1])
  if (!secondOwner) {
    console.log(`adding ${accounts[1]} as admin in contract`)
    await contract.transferAdminship(accounts[1])
  } else {
    console.log(`${accounts[1]} is already an admin in contract`)
  }

  var secondOwner = await contract.isAdmin(accounts[2])
  if (!secondOwner) {
    console.log(`adding ${accounts[2]} as admin in contract`)
    await contract.transferAdminship(accounts[2])
  } else {
    console.log(`${accounts[2]} is already an admin in contract`)
  }

  var secondOwner = await contract.isAdmin(accounts[3])
  if (!secondOwner) {
    console.log(`adding ${accounts[3]} as admin in contract`)
    await contract.transferAdminship(accounts[3])
  } else {
    console.log(`${accounts[3]} is already an admin in contract`)
  }

  var secondOwner = await contract.isAdmin(accounts[4])
  if (!secondOwner) {
    console.log(`adding ${accounts[4]} as admin in contract`)
    await contract.transferAdminship(accounts[4])
  } else {
    console.log(`${accounts[4]} is already an admin in contract`)
  }
}

async function removeAsAdmin(contract, accounts) {

  var secondOwner = await contract.isAdmin(accounts[1])
  if (secondOwner) {
    console.log(`removing ${accounts[1]} as admin in contract`)
    await contract.renounceAdminship(accounts[1])
  } else {
    console.log(`${accounts[1]} is already removed as an admin in contract`)
  }

  var secondOwner = await contract.isAdmin(accounts[2])
  if (secondOwner) {
    console.log(`removing ${accounts[2]} as admin in contract`)
    await contract.renounceAdminship(accounts[2])
  } else {
    console.log(`${accounts[2]} is already removed as an admin in contract`)
  }

  var secondOwner = await contract.isAdmin(accounts[3])
  if (secondOwner) {
    console.log(`removing ${accounts[3]} as admin in contract`)
    await contract.renounceAdminship(accounts[3])
  } else {
    console.log(`${accounts[3]} is already removed as an admin in contract`)
  }

  var secondOwner = await contract.isAdmin(accounts[4])
  if (secondOwner) {
    console.log(`removing ${accounts[4]} as admin in contract`)
    await contract.renounceAdminship(accounts[4])
  } else {
    console.log(`${accounts[4]} is already removed as an admin in contract`)
  }

  var secondOwner = await contract.isAdmin(accounts[0])
  if (secondOwner) {
    console.log(`removing ${accounts[0]} as admin in contract`)
    await contract.renounceAdminship(accounts[0])
  } else {
    console.log(`${accounts[0]} is already removed as an admin in contract`)
  }
}