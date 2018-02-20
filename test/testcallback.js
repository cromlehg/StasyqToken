import ether from './helpers/ether';
import tokens from './helpers/tokens';
import unixTime from './helpers/unixTime';
import {duration} from './helpers/increaseTime';

import callback from './testcallback/callback';

const token = artifacts.require('StasyqToken.sol');
const crowdsale = artifacts.require('ITO.sol');
const callbacktest = artifacts.require('CallbackTest.sol');

contract('Callback test', function (accounts) {
  before(config);
  callback(token, crowdsale, callbacktest, accounts);
});

function config() {
  // variables list based on info from README
  this.start = unixTime('May 03 2018 13:00:00 GMT');
  this.period = 60;
  this.price = tokens(10000);
  this.hardcap = ether(20000);
  this.minInvestmentLimit = ether(0.1);
  this.masterWallet = '0x6715Feb90B78d4d7aD92FbaCA7Fd70481e12f836';
  this.slaveWallet = '0x8029618Ecb5445B73515d7C51AbB316A91FC7f23';
  this.contractOwner = '0x6715Feb90B78d4d7aD92FbaCA7Fd70481e12f836';
  this.foundersTokensWallet = '0x05E87Dc9c075256cB94951e0b35C581b93961885';
  this.bountyTokensWallet = '0x6715Feb90B78d4d7aD92FbaCA7Fd70481e12f836';
  this.masterWalletPercent = 50;
  this.slaveWalletPercent = 50;
  this.foundersTokensPercent = 25;
  this.bountyTokensPercent = 5;
  this.foundersTokensLockPeriod = 90;

  // variables for additional testing convinience
  this.end = this.start + duration.days(this.period);
  this.beforeStart = this.start - duration.seconds(10);
  this.afterEnd = this.end + duration.seconds(1);
}
