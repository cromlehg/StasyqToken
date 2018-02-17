import ether from '../helpers/ether';
import tokens from '../helpers/tokens';
import {advanceBlock} from '../helpers/advanceToBlock';
import {increaseTimeTo, duration} from '../helpers/increaseTime';
import latestTime from '../helpers/latestTime';

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(web3.BigNumber))
  .should();

export default function (Token, Crowdsale, wallets) {
  let token;
  let crowdsale;
  const milestones = [
    {hardcap: 2000, price: 14500, bonus: 45},
    {hardcap: 2000, price: 14000, bonus: 40},
    {hardcap: 2000, price: 13500, bonus: 35},
    {hardcap: 2000, price: 13000, bonus: 30},
    {hardcap: 2000, price: 12500, bonus: 25},
    {hardcap: 2000, price: 12000, bonus: 20},
    {hardcap: 2000, price: 11500, bonus: 15},
    {hardcap: 2000, price: 11000, bonus: 10},
    {hardcap: 2000, price: 10500, bonus: 5},
    {hardcap: 2000, price: 10000, bonus: 0}
  ];

  before(async function () {
    // Advance to the next block to correctly read time in the solidity "now" function interpreted by testrpc
    await advanceBlock();
  });

  before(async function () {
    token = await Token.new();
    crowdsale = await Crowdsale.new();
    await token.setSaleAgent(crowdsale.address);
    await crowdsale.setToken(token.address);
    await crowdsale.setStart(latestTime());
  });

  milestones.forEach((milestone, i) => {
    if (i < 10){
      it(`should add ${milestone.bonus}% bonus for milestone #${i}`, async function () {
        await crowdsale.sendTransaction({value: ether(milestone.hardcap), from: wallets[i]});
        const balance = await token.balanceOf(wallets[i]);
        const tokens = ether(milestone.hardcap).mul(milestone.price);
        const bonusTokens = tokens.mul(milestone.bonus).div(100);
        balance.should.be.bignumber.equal(tokens.add(bonusTokens));
      });
    }
  });

}
