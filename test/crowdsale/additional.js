import ether from '../helpers/ether';
import tokens from '../helpers/tokens';
import {advanceBlock} from '../helpers/advanceToBlock';
import {duration} from '../helpers/increaseTime';
import latestTime from '../helpers/latestTime';

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
    await crowdsale.setDirectMintAgent(wallets[1], {from: owner});
    await crowdsale.directMint(wallets[5], tokens(1), {from: wallets[1]}).should.be.fulfilled;
    const balance = await token.balanceOf(wallets[5]);
    balance.should.bignumber.equal(this.price.times(1.45));
  });

  it('after finishMinting should lock founders TokensWallet per 90 days', async function() {
    const owner = await crowdsale.owner();
    await crowdsale.finishMinting({from: owner});
    const locked = await token.locked(this.foundersTokensWallet);
    const lockedTime = latestTime() + duration.days(this.foundersTokensLockPeriod);
    locked.should.be.bignumber.equal(lockedTime);
  });
}
