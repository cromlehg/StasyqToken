import ether from '../helpers/ether';
import tokens from '../helpers/tokens';
import {advanceBlock} from '../helpers/advanceToBlock';
import {increaseTimeTo, duration} from '../helpers/increaseTime';
import latestTime from '../helpers/latestTime';
import EVMRevert from '../helpers/EVMRevert';

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(web3.BigNumber))
  .should();

export default function (Token, Crowdsale, wallets) {
  let token;
  let crowdsale;

  before(async function () {
    // Advance to the next block to correctly read time in the solidity "now" function interpreted by testrpc
    await advanceBlock();
  });

  beforeEach(async function () {
    token = await Token.new();
    crowdsale = await Crowdsale.new();
    await token.setSaleAgent(crowdsale.address);
    await crowdsale.setToken(token.address);
    await crowdsale.setStart(latestTime());
  });

  it('should directMint by owner', async function () {
    const owner = await crowdsale.owner();
    await crowdsale.directMint(wallets[4], tokens(1), {from: owner}).should.be.fulfilled;
    const balance = await token.balanceOf(wallets[4]);
    balance.should.bignumber.equal(this.price.times(1.45));
  });

  it('should directMint by Direct Mint Agend', async function () {
    const owner = await crowdsale.owner();
    await crowdsale.setDirectMintAgent(wallets[2], {from: owner});
    await crowdsale.directMint(wallets[5], tokens(1), {from: wallets[2]}).should.be.fulfilled;
    const balance = await token.balanceOf(wallets[5]);
    balance.should.bignumber.equal(this.price.times(1.45));
  });

  it('should send payments to masterWallet and slaveWallet 50/50', async function () {
    const investment = ether(1);
    await crowdsale.sendTransaction({value: investment, from: wallets[3]});
    const master = web3.eth.getBalance(this.masterWallet);
    const slave = web3.eth.getBalance(this.slaveWallet);
    master.should.bignumber.equal(investment.mul(this.masterWalletPercent).div(100));
    slave.should.bignumber.equal(investment.mul(this.slaveWalletPercent).div(100));
  });


  it('after finishMinting should lock founders TokensWallet per 90 days', async function() {
    const owner = await crowdsale.owner();
    await crowdsale.finishMinting({from: owner});
    const locked = await token.locked(this.foundersTokensWallet);
    const lockedTime = latestTime() + duration.days(this.foundersTokensLockPeriod);
    locked.should.be.bignumber.equal(lockedTime);
  });

  it('should transfer tokens when locked time is finished', async function() {
    await token.transferOwnership(wallets[1]);
    await crowdsale.setFoundersTokensWallet(wallets[2]);
    await crowdsale.sendTransaction({value: ether(1), from: wallets[3]});
    const owner = await crowdsale.owner();
    await crowdsale.finishMinting({from: owner});
    const lockedTime = latestTime() + duration.days(this.foundersTokensLockPeriod);
    await increaseTimeTo(lockedTime + duration.seconds(1));
    await token.approve(wallets[1], tokens(2000), {from: wallets[2]});
    const foundersBalance = await token.balanceOf(wallets[2]);
    const sendTokens = tokens(200);
    await token.transferFrom(wallets[2], wallets[4], sendTokens, {from: wallets[1]});
    const balance = await token.balanceOf(wallets[4]);
    const newFoundersBalance = await token.balanceOf(wallets[2]);
    balance.should.bignumber.equal(sendTokens);
    foundersBalance.sub(newFoundersBalance).should.bignumber.equal(sendTokens);
  });

  it('should transfer tokens before finishMinting from owner or sale agent only', async function() {
    await token.transferOwnership(wallets[1]);
    await crowdsale.sendTransaction({value: ether(1), from: wallets[1]});
    await crowdsale.sendTransaction({value: ether(1), from: wallets[2]});
    await crowdsale.sendTransaction({value: ether(1), from: wallets[3]});
    await token.setSaleAgent(wallets[2], {from: wallets[1]});
    await token.transfer(wallets[4], tokens(20), {from: wallets[1]}).should.be.fulfilled;
    await token.transfer(wallets[4], tokens(20), {from: wallets[2]}).should.be.fulfilled;
    await token.transfer(wallets[4], tokens(20), {from: wallets[3]}).should.be.rejectedWith(EVMRevert);
  });

  it('should transfer tokens after finishMinting from all', async function() {
    await token.transferOwnership(wallets[1]);
    await crowdsale.sendTransaction({value: ether(1), from: wallets[1]});
    await crowdsale.sendTransaction({value: ether(1), from: wallets[2]});
    await crowdsale.sendTransaction({value: ether(1), from: wallets[3]});
    const owner = await crowdsale.owner();
    await crowdsale.finishMinting({from: owner});
    await token.setSaleAgent(wallets[2], {from: wallets[1]});
    await token.transfer(wallets[4], tokens(20), {from: wallets[1]}).should.be.fulfilled;
    await token.transfer(wallets[4], tokens(20), {from: wallets[2]}).should.be.fulfilled;
    await token.transfer(wallets[4], tokens(20), {from: wallets[3]}).should.be.fulfilled;
  });
}
