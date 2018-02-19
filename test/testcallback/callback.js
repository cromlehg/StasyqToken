import ether from '../helpers/ether';
import tokens from '../helpers/tokens';
import {advanceBlock} from '../helpers/advanceToBlock';
import {increaseTimeTo, duration} from '../helpers/increaseTime';
import latestTime from '../helpers/latestTime';
import EVMRevert from '../helpers/EVMRevert';
import unixTime from '../helpers/unixTime';

const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(web3.BigNumber))
  .should();

export default function (Token, Crowdsale, CallbackTest, wallets) {
  let token;
  let crowdsale;
  let callbacktest;

  before(async function () {
    // Advance to the next block to correctly read time in the solidity "now" function interpreted by testrpc
    await advanceBlock();
  });

  beforeEach(async function () {
    token = await Token.new();
    crowdsale = await Crowdsale.new();
    callbacktest = await CallbackTest.new();
    await token.setSaleAgent(crowdsale.address);
    await crowdsale.setToken(token.address);
    await crowdsale.setStart(latestTime());
    await token.transferOwnership(wallets[1]);
  });

  it ('transfer should call tokenFallback for registered contract', async function () {
    await crowdsale.sendTransaction({value: ether(1), from: wallets[1]});
    await token.registerCallback(callbacktest.address, {from: wallets[1]});
    await token.approve(callbacktest.address, tokens(10000), {from: wallets[1]});
    const sendvalue = tokens(300);
    await token.transfer(callbacktest.address, sendvalue, {from: wallets[1]});
    const value = await callbacktest.value();
    value.should.be.bignumber.equal(sendvalue);
    const from = await callbacktest.from();
    from.should.be.bignumber.equal(wallets[1]);
  });

  it ('transfer should not call tokenFallback for not registered contract', async function () {
    await crowdsale.sendTransaction({value: ether(1), from: wallets[1]});
    await token.deregisterCallback(callbacktest.address, {from: wallets[1]});
    await token.approve(callbacktest.address, tokens(10000), {from: wallets[1]});
    const sendvalue = tokens(400);
    const oldvalue = await callbacktest.value();
    await token.transfer(callbacktest.address, sendvalue, {from: wallets[1]});
    const value = await callbacktest.value();
    value.should.be.bignumber.equal(oldvalue);
  });

  it ('should not transfer tokens if sender address is locked', async function () {
    await crowdsale.sendTransaction({value: ether(1), from: wallets[1]});
    await token.registerCallback(callbacktest.address, {from: wallets[1]});
    await token.approve(callbacktest.address, tokens(10000), {from: wallets[1]});
    await token.setSaleAgent(wallets[1], {from: wallets[1]});
    await token.lock(wallets[1], 30, {from: wallets[1]});
    const sendvalue = tokens(200);
    await token.transfer(callbacktest.address, sendvalue, {from: wallets[1]}).should.be.rejectedWith(EVMRevert);
  });

  it ('transferFrom should call tokenFallback for registered contract', async function () {
    await crowdsale.sendTransaction({value: ether(1), from: wallets[1]});
    await token.registerCallback(callbacktest.address, {from: wallets[1]});
    await token.approve(callbacktest.address, tokens(10000), {from: wallets[1]});
    await token.approve(wallets[1], tokens(10000), {from: wallets[1]});
    const sendvalue = tokens(500);
    await token.transferFrom(wallets[1], callbacktest.address, sendvalue, {from: wallets[1]});
    const value = await callbacktest.value();
    value.should.be.bignumber.equal(sendvalue);
    const from = await callbacktest.from();
    from.should.be.bignumber.equal(wallets[1]);
  });

   it ('transferFrom should not call tokenFallback for not registered contract', async function () {
    await crowdsale.sendTransaction({value: ether(1), from: wallets[1]});
    await token.deregisterCallback(callbacktest.address, {from: wallets[1]});
    await token.approve(callbacktest.address, tokens(10000), {from: wallets[1]});
    await token.approve(wallets[1], tokens(10000), {from: wallets[1]});
    const sendvalue = tokens(600);
    const oldvalue = await callbacktest.value();
    await token.transferFrom(wallets[1], callbacktest.address, sendvalue, {from: wallets[1]});
    const value = await callbacktest.value();
    value.should.be.bignumber.equal(oldvalue);
  });

  it ('should not transfer tokens using trasferFrom if sender address is locked', async function () {
    await crowdsale.sendTransaction({value: ether(1), from: wallets[1]});
    await token.registerCallback(callbacktest.address, {from: wallets[1]});
    await token.approve(callbacktest.address, tokens(10000), {from: wallets[1]});
    await token.approve(wallets[1], tokens(10000), {from: wallets[1]});
    await token.setSaleAgent(wallets[1], {from: wallets[1]});
    await token.lock(wallets[1], 30, {from: wallets[1]});
    const sendvalue = tokens(200);
    await token.transferFrom(wallets[1], callbacktest.address, sendvalue, {from: wallets[1]}).should.be.rejectedWith(EVMRevert);
  });
}
