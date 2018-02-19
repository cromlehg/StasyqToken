import {advanceBlock} from '../helpers/advanceToBlock';
import unixTime from '../helpers/unixTime';

const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(web3.BigNumber))
  .should();

export default function (Token, Crowdsale, accounts) {
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
  });

  it('should have token address', async function () {
    const tokenOwner = await token.owner();
    tokenOwner.should.equal(accounts[0]);
  });

  it('should have crowdsale address', async function () {
    const crowdsaleOwner = await crowdsale.owner();
    crowdsaleOwner.should.equal(accounts[0]);
  });

  it('start date should be like in README', async function () {
    const start = await crowdsale.start();
    start.should.bignumber.equal(this.start);
  });

  it('period should be like in README', async function () {
    const period = await crowdsale.period();
    period.should.bignumber.equal(this.period);
  });

  it('minimal insvested limit should be like in README', async function () {
    const minPrice = await crowdsale.minPrice();
    minPrice.should.bignumber.equal(this.minInvestmentLimit);
  });

  it ('master wallet and slave wallet should be like in README', async function () {
    const masterWallet = await crowdsale.masterWallet();
    masterWallet.should.bignumber.equal(this.masterWallet);
    const slaveWallet = await crowdsale.slaveWallet();
    slaveWallet.should.bignumber.equal(this.slaveWallet);
  });

  it ('bounty wallet and founders wallet should be like in README', async function () {
    const bountyWallet = await crowdsale.bountyTokensWallet();
    bountyWallet.should.bignumber.equal(this.bountyTokensWallet);
    const foundersWallet = await crowdsale.foundersTokensWallet();
    foundersWallet.should.bignumber.equal(this.foundersTokensWallet);
  });

  it('slave wallet percent should be like in README', async function () {
    const slaveWalletPercent = await crowdsale.slaveWalletPercent();
    slaveWalletPercent.should.bignumber.equal(this.slaveWalletPercent);
  });

  it('bounty tokens percent should be like in README', async function () {
    const bountyTokensPercent = await crowdsale.bountyTokensPercent();
    bountyTokensPercent.should.bignumber.equal(this.bountyTokensPercent);
  });

  it('founders tokens percent should be like in README', async function () {
    const foundersTokensPercent = await crowdsale.foundersTokensPercent();
    foundersTokensPercent.should.bignumber.equal(this.foundersTokensPercent);
  });

  it('lock period should be like in README', async function () {
    const lockPeriod = await crowdsale.lockPeriod();
    lockPeriod.should.bignumber.equal(this.foundersTokensLockPeriod);
  });
}
