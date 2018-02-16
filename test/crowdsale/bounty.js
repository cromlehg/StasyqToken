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

  it('should correctly calculate bonuses for founders and bounty', async function () {
    await crowdsale.sendTransaction({value: ether(0.1), from: wallets[0]});
    await crowdsale.sendTransaction({value: ether(99), from: wallets[2]});
    const owner = await crowdsale.owner();
    await crowdsale.finishMinting({from: owner});
    const firstInvestorTokens = await token.balanceOf(wallets[0]);
    const secondInvestorTokens = await token.balanceOf(wallets[2]);
    const foundersTokens = await token.balanceOf(this.foundersTokensWallet);
    const bountyTokens = await token.balanceOf(this.bountyTokensWallet);
    const totalTokens = firstInvestorTokens
      .plus(secondInvestorTokens)
      .plus(foundersTokens)
      .plus(bountyTokens);
    assert.equal(foundersTokens.div(totalTokens), this.foundersTokensPercent / 100);
    assert.equal(bountyTokens.div(totalTokens), this.bountyTokensPercent / 100);
  });
}
