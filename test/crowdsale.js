import ether from './helpers/ether';
import tokens from './helpers/tokens';
import unixTime from './helpers/unixTime';
import {duration} from './helpers/increaseTime';

import capped from './crowdsale/capped';
import common from './crowdsale/common';
import milestonebonus from './crowdsale/milestonebonus';
import bounty from './crowdsale/bounty';
import additional from './crowdsale/additional';

const token = artifacts.require('StasyqToken.sol');
const crowdsale = artifacts.require('ITO.sol');

contract('ITO - common test', function (accounts) {
  before(config);
  common(token, crowdsale, accounts);
});

contract('ITO - capped crowdsale test', function (accounts) {
  before(config);
  capped(token, crowdsale, accounts);
});
/*
contract('ITO - milestone bonus test', function (accounts) {
  before(config);
  milestonebonus(token, crowdsale, accounts);
});
*/
contract('ITO - bounty test', function (accounts) {
  before(config);
  bounty(token, crowdsale, accounts);
});

contract('ITO - additional features test', function (accounts) {
  before(config);
  additional(token, crowdsale, accounts);
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
  this.contractOwner = '0x95EA6A4ec9F80436854702e5F05d238f27166A03';
  this.foundersTokensWallet = '0x95EA6A4ec9F80436854702e5F05d238f27166A03';
  this.bountyTokensWallet = '0x6715Feb90B78d4d7aD92FbaCA7Fd70481e12f836';
  this.masterWalletPercent = 50;
  this.slaveWalletPercent = 50;
  this.foundersTokensPercent = 25;
  this.bountyTokensPercent = 5;
  this.foundersTokensLockPeriod = duration.days(90);

  // variables for additional testing convinience
  this.end = this.start + duration.days(this.period);
  this.beforeStart = this.start - duration.seconds(10);
  this.afterEnd = this.end + duration.seconds(1);
}
