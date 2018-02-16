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

  it('should accept payments within hardcap', async function () {
    await crowdsale.sendTransaction({value: this.hardcap.minus(ether(0.01)), from: wallets[3]}).should.be.fulfilled;
    await crowdsale.sendTransaction({value: this.minInvestmentLimit, from: wallets[4]}).should.be.fulfilled;
  });

  it('should reject payments below min investment limit', async function () {
    const value = this.minInvestmentLimit.minus(ether(0.01));
    await crowdsale.sendTransaction({value: value, from: wallets[5]}).should.be.rejectedWith(EVMRevert);
  });

  it('should reject payments outside hardcap', async function () {
    await crowdsale.sendTransaction({value: this.hardcap, from: wallets[5]}).should.be.fulfilled;
    await crowdsale.sendTransaction({value: ether(10), from: wallets[6]}).should.be.fulfilled;
    await crowdsale.sendTransaction({value: ether(10), from: wallets[7]}).should.be.rejectedWith(EVMRevert);
  });
}

